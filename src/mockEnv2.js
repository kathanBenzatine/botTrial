import {
  mockTelegramEnv,
  isTMA,
  parseInitData,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";

if (import.meta.env.DEV) {
  (async () => {
    if (await isTMA()) return;

    let lp;
    try {
      lp = retrieveLaunchParams();
      if (!lp) throw new Error("Launch params are undefined.");
    } catch (e) {
      console.warn(
        "⚠️ Failed to retrieve launch params, mocking environment..."
      );

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
        ["hash", "mocked_hash_value"],
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
  })();
}
