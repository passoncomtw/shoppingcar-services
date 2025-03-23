import React from "react";
import { createBrowserRouter } from "react-router-dom";

// layouts
import PrivateLayout from "./navigations/layouts/PrivateLayout";
import BasicLayout from "./navigations/layouts/BasicLayout";

// 訪客頁面
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// 受保護頁面
import DashboardScreen from "./screens/DashboardScreen";
import MerchantsScreen from "./screens/MerchantsScreen";
import MerchantEditScreen from "./screens/MerchantEditScreen";
import UsersScreen from "./screens/UsersScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ShoppingcarsScreen from "./screens/ShoppingcarsScreen";
import OrdersScreen from "./screens/OrdersScreen";
import SettingScreen from "./screens/SettingScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      // 訪客路由
      {
        path: "/",
        element: <HomeScreen />,
      },
      {
        path: "/login",
        element: <LoginScreen />,
      },
      {
        path: "/register",
        element: <RegisterScreen />,
      },
    ],
  },
  {
    // 受保護路由
    element: <PrivateLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardScreen />,
      },
      {
        path: "/merchants",
        element: <MerchantsScreen />,
      },
      {
        path: "/merchants/:id",
        element: <MerchantEditScreen />,
      },
      {
        path: "/users",
        element: <UsersScreen />,
      },
      {
        path: "/products",
        element: <ProductsScreen />,
      },
      {
        path: "/products/:id",
        element: <ProductEditScreen />,
      },
      {
        path: "/shoppingcars",
        element: <ShoppingcarsScreen />,
      },
      {
        path: "/orders",
        element: <OrdersScreen />,
      },
      {
        path: "/settings",
        element: <SettingScreen />,
      },
    ],
  },
]); 