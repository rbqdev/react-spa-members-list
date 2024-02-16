import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className="app">
      {/* hidden: Semantic app heading */}
      <h1 className="hidden">Juntos Somos Mais - App</h1>
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
