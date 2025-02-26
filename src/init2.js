import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
} from "@telegram-apps/sdk-react";

/**
 * Initializes the application and configures its dependencies.
 */
export function init2(debug) {
  try {
    const launchParams = retrieveLaunchParams();

    // If launchParams is undefined, log a warning instead of crashing.
    if (!launchParams) {
      console.warn(
        "⚠️ Warning: Launch parameters are undefined. Running in fallback mode."
      );
    }

    // Set debug mode.
    $debug.set(debug);

    // Initialize Telegram SDK safely.
    initSDK();

    backButton.isSupported() && backButton.mount();
    miniApp.mount();
    themeParams.mount();
    initData.restore();

    void viewport.mount().catch((e) => {
      console.error("Error mounting viewport:", e);
    });

    viewport.bindCssVars();
    miniApp.bindCssVars();
    themeParams.bindCssVars();
  } catch (error) {
    console.error("🚨 Error initializing Telegram SDK:", error);
  }
}
