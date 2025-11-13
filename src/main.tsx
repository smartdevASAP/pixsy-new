import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AppProvider as UserProvider } from "./context/userContext.tsx";
import { AppProvider as PostProvider } from "./context/postContext.tsx";
import { AdminProvider } from "./context/adminContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <UserProvider>
          <PostProvider>
            <App />
          </PostProvider>
        </UserProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>
);
