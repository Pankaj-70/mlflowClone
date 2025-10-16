import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import ExperimentView from "./pages/ExperimentView";
import RunDetails from "./pages/RunDetails";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/exp/1" replace />} />
          <Route path="/exp/:id" element={<ExperimentView />} />
          <Route path="/run/:id" element={<RunDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
