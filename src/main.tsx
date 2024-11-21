import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Footer from "./Footer.tsx";

createRoot(document.querySelector("body")!).render(
    <StrictMode>
        <App />
        <Footer />
    </StrictMode>
);
