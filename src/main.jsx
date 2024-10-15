import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Spectra from "./pages/spectra.jsx";
import Buoy from "./pages/Buoy.jsx";
import Weather from "./pages/Weather.jsx";
import "./index.css";


import Root from "./layout/Root.jsx";
import Home from "./Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/spectra", element: <Spectra /> },
      { path: "/buoy", element: <Buoy /> },
      { path: "/weather", element: <Weather /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
