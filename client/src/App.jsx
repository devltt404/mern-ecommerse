import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { axiosInstances } from "./helpers/axiosInstances.js";
import setupInterceptor from "./helpers/setupInterceptor.js";

import {
  AdminContainer,
  NoUserOnlyContainer,
  ShopContainer,
  UserOnlyContainer,
} from "./components";
import {
  AddProductPage,
  AdminOrdersPage,
  CartPage,
  CategoriesPage,
  CheckoutPage,
  DashboardPage,
  EditProductPage,
  IndexPage,
  LoginPage,
  NotFoundPage,
  OrderDetailPage,
  OrdersPage,
  ProductDetailPage,
  ProductsByCategoryPage,
  ProductsBySearchPage,
  ProductsPage,
  RegisterPage,
  UsersPage,
} from "./pages";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAxiosSetup, setIsAxiosSetup] = useState(false);

  useEffect(() => {
    if (!isAxiosSetup) {
      setupInterceptor(dispatch, navigate, axiosInstances);
      setIsAxiosSetup(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    isAxiosSetup && (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route element={<ShopContainer />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<UserOnlyContainer />}>
              <Route path="" element={<OrdersPage />} />
              <Route path=":id" element={<OrderDetailPage />} />
            </Route>
            <Route
              path="/category/:category"
              element={<ProductsByCategoryPage />}
            />
            <Route path="/search" element={<ProductsBySearchPage />} />
            <Route element={<NoUserOnlyContainer />}>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/not-found" element={<NotFoundPage />} />
          </Route>

          <Route path="/admin" element={<AdminContainer />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="products/add" element={<AddProductPage />} />
            <Route path="products/edit/:id" element={<EditProductPage />} />
          </Route>
        </Routes>
        <Toaster />
      </GoogleOAuthProvider>
    )
  );
}

export default App;
