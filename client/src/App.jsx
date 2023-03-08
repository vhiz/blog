import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import "./app.scss";
import { DarkModeContext } from "./context/darkmodeContext";
import { AuthContext } from "./context/authContext";
export default function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "post/:id",
          element: <Single />,
        },
        {
          path: "write",
          element: currentUser ? <Write /> : <Navigate to={"/login"} />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <div className="app">
        <div className="contanier">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}
