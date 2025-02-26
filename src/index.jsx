import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import { Root } from "@/components/Root";
// import { init } from "@/init.js";
import { init2 } from "@/init2.js";
import "@telegram-apps/telegram-ui/dist/styles.css";
import "./index.css";

// Mock the environment in case, we are outside Telegram.
// import './mockEnv.js';
import "./mockEnv2.js";
// Configure all application dependencies.
// init(retrieveLaunchParams().startParam === 'debug' || import.meta.env.DEV);

let launchParams;
try {
  launchParams = retrieveLaunchParams();
} catch (error) {
  console.warn(
    "⚠️ Warning: Unable to retrieve launch parameters. Running without them."
  );
  launchParams = {}; // Fallback empty object
}

init2(retrieveLaunchParams().startParam === "debug" || import.meta.env.DEV);
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
