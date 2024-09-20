import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";
import { PublicLayout, PrivateLayout } from "./navigations";
import HomeScreen from "./screens/HomeScreen";
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
        <Route path="/protected" element={<HomeScreen />} />
      </Route>
    </Routes>
  );
}
