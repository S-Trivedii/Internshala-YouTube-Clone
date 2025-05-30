import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./utils/context/UserContext.jsx";
import { SearchProvider } from "./utils/context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </UserProvider>
  </StrictMode>
);
