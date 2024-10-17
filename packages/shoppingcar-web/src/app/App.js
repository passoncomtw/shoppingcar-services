import { Route, Routes } from "react-router-dom";
import PrivateLayout from "./navigations/layouts/PrivateLayout";
import PublicLayout from "./navigations/layouts/PublicLayout";
import CreateUserScreen from "./screens/CreateUserScreen";
import LoginScreen from "./screens/LoginScreen";
import MerchantsScreen from "./screens/MerchantsScreen";
import ProductsScreen from "./screens/ProductsScreen";
import PublicScreen from "./screens/PublicScreen";
import UpdateUserScreen from "./screens/UpdateUserScreen";
import UsersScreen from "./screens/UsersScreen";

export default function App() {
  return (
    <Routes>
      <Route exact element={<PublicLayout />}>
        <Route path="/" element={<PublicScreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Route>
      <Route exact element={<PrivateLayout />}>
        <Route path="/merchants" element={<MerchantsScreen />} />
        <Route path="/users/create" element={<CreateUserScreen />} />
        <Route path="/users/update/:userId" element={<UpdateUserScreen />} />
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
      </Route>
    </Routes>
  );
}
