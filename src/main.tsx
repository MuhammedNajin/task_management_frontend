import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Wrapper from "./wrapper/wrapper.tsx";
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Wrapper>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </Wrapper>
  </StrictMode>
);
