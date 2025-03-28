import { Route, Routes } from "react-router-dom";
import PrivateLayout from "./navigations/layouts/PrivateLayout";
import PublicLayout from "./navigations/layouts/PublicLayout";
import CreateMerchantScreen from "./screens/CreateMerchantScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import LoginScreen from "./screens/LoginScreen";
import MerchantsScreen from "./screens/MerchantsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import UpdateMerchantScreen from "./screens/UpdateMerchantScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";
import UsersScreen from "./screens/UsersScreen";
import UpdateProductScreen from "./screens/UpdateProductScreen";
import ShoppingcarsScreen from "./screens/ShoppingcarsScreen";
import OrdersScreen from "./screens/OrdersScreen";
import DashboardScreen from "./screens/DashboardScreen";

export default function App() {
  return (
    <Routes>
      <Route exact element={<PublicLayout />}>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Route>
      <Route exact element={<PrivateLayout />}>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/merchants/update/:merchantId" element={<UpdateMerchantScreen />} />
        <Route path="/merchants/create" element={<CreateMerchantScreen />} />
        <Route path="/merchants" element={<MerchantsScreen />} />
        <Route path="/users/create" element={<CreateUserScreen />} />
        <Route path="/users/update/:userId" element={<UpdateUserScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/products/update/:productId" element={<UpdateProductScreen />} />
        <Route path="/products/create" element={<CreateProductScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
        <Route path="/shoppingcars" element={<ShoppingcarsScreen />} />
        <Route path="/orders" element={<OrdersScreen />} />
        <Route path="/settings" element={<h1>設定</h1>} />
      </Route>
    </Routes>
  );
}
