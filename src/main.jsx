import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
