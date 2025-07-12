import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Buoy from "./pages/Buoy.jsx";
import Weather from "./pages/Weather.jsx";
import Forecast from "./pages/Forecast.jsx";
import "./index.css";


import Root from "./layout/Root.jsx";
import Home from "./Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/buoy", element: <Buoy /> },
      { path: "/weather", element: <Weather /> },
      { path: "/forecast", element: <Forecast /> },
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
