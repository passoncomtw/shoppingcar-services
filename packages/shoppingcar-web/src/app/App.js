import {
  Routes,
  Route,
} from "react-router-dom";
import PrivateLayout from "./navigations/layouts/PrivateLayout";
import PublicLayout from "./navigations/layouts/PublicLayout";
import MerchantsScreen from "./screens/MerchantsScreen";
import UsersScreen from "./screens/UsersScreen";
import CreateUserScreen from "./screens/CreateUserScreen";
import ProductsScreen from "./screens/ProductsScreen";
import LoginScreen from "./screens/LoginScreen";
import PublicScreen from "./screens/PublicScreen";

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
        <Route path="/users" element={<UsersScreen />} />
        <Route path="/products" element={<ProductsScreen />} />
      </Route>
    </Routes>
  );
}
