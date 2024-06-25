import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SearchContextPrivider } from "./context/searchContext.jsx";
import { AuthContextPrivider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextPrivider>
      <SearchContextPrivider>
        <App />
      </SearchContextPrivider>
    </AuthContextPrivider>
  </React.StrictMode>
);
