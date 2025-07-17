import { createRoot } from "react-dom/client";
// tailwind
import "./assets/styles/config/tailwind_config.css";

// start toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// primereact
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/tailwind-light/theme.css";

// style
import "./assets/styles/base/style.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth/Auth_Context.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </AuthProvider>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
);
