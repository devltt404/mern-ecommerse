import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

const paypalAxios = axios.create();

let PAYPAL_ACCESS_TOKEN =
  "A21AAJU-zR4tJsxs-hYpxgKHwJNHXagxnxGyFa8lBYvv5kUJ7kz6Rn6o7GvAuoVz3kRwtP5lYBEoWKuwuJ6gIcTMkT5ZAa3sQ";

paypalAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response.data.error === "invalid_token") {
      console.warn("Access token might be invalid. Attempting refresh...");
      const { data } = await axios.post(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.PAYPAL_CLIENT_ID +
                  ":" +
                  process.env.PAYPAL_CLIENT_SECRET
              ).toString("base64"),
          },
        }
      );
      PAYPAL_ACCESS_TOKEN = data.access_token;
      error.config.headers["Authorization"] = "Bearer " + PAYPAL_ACCESS_TOKEN;
      return axios.request(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export const chargeWithPaypal = async ({
  totalCharge,
  card,
  billingAddress,
  res,
}) => {
  try {
    const { data } = await paypalAxios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: { currency_code: "USD", value: totalCharge },
          },
        ],
        payment_source: {
          card: {
            number: card.number,
            expiry: card.expiry,
            security_code: card.cvc,
            billing_address: {
              address_line_1: billingAddress.address,
              admin_area_2: billingAddress.city,
              admin_area_1: billingAddress.state,
              postal_code: billingAddress.postalCode,
              country_code: "US",
            },
          },
        },
      },
      {
        headers: {
          "PayPal-Request-Id": uuidv4(),
          "Content-Type": "application/json",
          Authorization: "Bearer " + PAYPAL_ACCESS_TOKEN,
        },
      }
    );
    return data.id;
  } catch (error) {
    const errorData = error.response.data;
    console.log(errorData);

    if (errorData.name === "UNPROCESSABLE_ENTITY") {
      res.status(400);
      throw new Error(
        "There's an error in Paypal payment: " +
          errorData.details[0].description
      );
    }

    res.status(500);
    throw new Error(
      "There's an error in Paypal payment. Please check it again."
    );
  }
};
