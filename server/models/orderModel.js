import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
        },
      },
    ],
    customer: {
      firstName: {
        type: String,
        required: [true, "Please enter your first name."],
      },
      lastName: {
        type: String,
        required: [true, "Please enter your last name."],
      },
      email: {
        type: String,
        required: [true, "Please enter your email."],
      },
      phone: {
        type: String,
        required: [true, "Please enter your phone number."],
      },
    },
    shippingAddress: {
      address: {
        type: String,
        required: [true, "Please enter your address."],
      },
      city: {
        type: String,
        required: [true, "Please enter your city."],
      },
      state: {
        type: String,
        required: [true, "Please enter your state."]
      },
      postalCode: {
        type: String,
        required: [true, "Please enter your postal code."],
      },
    },
    subtotal: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },

    payment: {
      id: {
        type: String,
        required: true,
        select: false,
      },
      method: {
        type: String,
        enum: ["card", "paypal"],
        default: "card",
      },
      detail: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
