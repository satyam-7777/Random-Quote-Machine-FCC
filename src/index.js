import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
//import AppWithContextAPI from "./AppWithContextAPI";
import "./styles.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
