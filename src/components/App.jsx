import { useLaunchParams, miniApp, useSignal } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import {
  Navigate,
  Route,
  Routes,
  HashRouter,
  useNavigate,
} from "react-router-dom";

import { routes } from "@/navigation/routes.jsx";
import Demo from "@/pages/Demo";
import { useState } from "react";

export function App() {
  const [Liks, setLiks] = useState(0);
  const links = [
    "https://t.me/$i2b0N6ntwFUkAgAAFaQvAq7q0fA",
    "https://t.me/$L-6lxqntuFUIAwAAw_E5X8dDOUE",
  ];
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const navigate = useNavigate();
  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      {/* <HashRouter>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </HashRouter> */}
      <Routes>
        <Route
          path="/"
          element={<Demo links={links} setLiks={setLiks} Liks={Liks} />}
        />
        <Route
          path="/hello"
          element={
            <>
              <div>
                <button
                  style={{ background: "#cda000" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  HLELO
                </button>
              </div>
            </>
          }
        />
      </Routes>
    </AppRoot>
  );
}
