(async () => {
  // Check if running in a Telegram WebApp
  const isTelegram = window.Telegram?.WebApp !== undefined;

  // Check if running in development mode
  const isDev = import.meta.env.DEV;

  let lp; // Launch Parameters

  if (isDev) {
    console.warn("⚠️ Running in Development Mode");

    if (await isTMA()) {
      return;
    }

    try {
      lp = retrieveLaunchParams();
    } catch (e) {
      const initDataRaw = new URLSearchParams([
        [
          "user",
          JSON.stringify({
            id: 99281932,
            first_name: "Andrew",
            last_name: "Rogue",
            username: "rogue",
            language_code: "en",
            is_premium: true,
            allows_write_to_pm: true,
          }),
        ],
        [
          "hash",
          "89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31",
        ],
        ["auth_date", "1716922846"],
        ["start_param", "debug"],
        ["chat_type", "sender"],
        ["chat_instance", "8428209589180549439"],
      ]).toString();

      lp = {
        themeParams: {
          accentTextColor: "#6ab2f2",
          bgColor: "#17212b",
          buttonColor: "#5288c1",
          buttonTextColor: "#ffffff",
          destructiveTextColor: "#ec3942",
          headerBgColor: "#17212b",
          hintColor: "#708499",
          linkColor: "#6ab3f3",
          secondaryBgColor: "#232e3c",
          sectionBgColor: "#17212b",
          sectionHeaderTextColor: "#6ab3f3",
          subtitleTextColor: "#708499",
          textColor: "#f5f5f5",
        },
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: "8",
        platform: "tdesktop",
      };
    }

    mockTelegramEnv(lp);
    console.warn(
      "⚠️ Mocking Telegram environment in development mode. This will not work in production."
    );
  } else if (isTelegram) {
    console.log("✅ Running inside Telegram WebApp");

    // Use real Telegram WebApp data
    window.Telegram.WebApp.expand(); // Expand to full screen
    lp = {
      themeParams: window.Telegram.WebApp.themeParams,
      initData: parseInitData(window.Telegram.WebApp.initData),
      initDataRaw: window.Telegram.WebApp.initData,
      version: window.Telegram.WebApp.version,
      platform: window.Telegram.WebApp.platform,
    };
  } else {
    console.log("🌐 Running on a live web page outside Telegram");

    // Mock environment only if needed (optional)
    if (shouldMockLive()) {
      lp = mockLiveEnv();
      console.warn("⚠️ Mocking environment for live web page.");
    } else {
      console.warn("⚠️ Running without Telegram features.");
    }
  }

  // Apply Launch Params
  if (lp) {
    applyLaunchParams(lp);
  }
})();

// Function to determine whether to mock in live mode
function shouldMockLive() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("mock");
}

// Function to mock the live environment
function mockLiveEnv() {
  return {
    themeParams: {
      accentTextColor: "#ffcc00",
      bgColor: "#ffffff",
      buttonColor: "#ff9900",
      buttonTextColor: "#000000",
    },
    initData: {},
    initDataRaw: "",
    version: "live-mock",
    platform: "web",
  };
}

// Function to apply launch parameters
function applyLaunchParams(lp) {
  console.log("Applying launch parameters:", lp);
}
