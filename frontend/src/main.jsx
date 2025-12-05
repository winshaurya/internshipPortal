import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext"; // ⬅️ added

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 🔥 Global Auth Context Wrapper */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
