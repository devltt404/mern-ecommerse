import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchPage from "./components/SearchPage.jsx";
import AdminContainer from "./containers/AdminContainer.jsx";
import NoUserOnlyContainer from "./containers/NoUserOnlyContainer.jsx";
import ShopContainer from "./containers/ShopContainer.jsx";
import CartPage from "./pages/CartPage.jsx";
import CategoryProductsPage from "./pages/CategoryProductsPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import OrderDetailPage from "./pages/OrderDetailPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AddProductPage from "./pages/admin/AddProductPage.jsx";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage.jsx";
import CategoriesPage from "./pages/admin/CategoriesPage.jsx";
import DashboardPage from "./pages/admin/DashboardPage.jsx";
import EditProductPage from "./pages/admin/EditProductPage.jsx";
import ProductsPage from "./pages/admin/ProductsPage.jsx";
import UsersPage from "./pages/admin/UsersPage.jsx";
import { axiosInstances } from "./utils/axiosInstances.js";
import setupInterceptor from "./utils/setupInterceptor.js";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAxiosSetupped, setIsAxiosSetupped] = useState(false);

  useEffect(() => {
    if (!isAxiosSetupped) {
      setupInterceptor(dispatch, navigate, axiosInstances);
      setIsAxiosSetupped(true);
    }
  }, []);

  return (
    isAxiosSetupped && (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Routes>
          <Route element={<ShopContainer />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders/success" element={<OrderSuccessPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route
              path="/category/:category"
              element={<CategoryProductsPage />}
            />
            <Route path="/search" element={<SearchPage />} />
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
            <Route path="products/edit" element={<EditProductPage />} />
          </Route>
        </Routes>
        <Toaster />
      </GoogleOAuthProvider>
    )
  );
}

export default App;
