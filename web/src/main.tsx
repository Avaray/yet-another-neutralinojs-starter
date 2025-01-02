import { app, events, init, window as W } from "@neutralinojs/lib";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
// import "uno.css";

try {
  init();
} catch (err) {
  console.warn("Neutralino.js failed to initialize.", err);
}

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

events.on("windowClose", () => app.exit());

W.focus();
