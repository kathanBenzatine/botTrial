import { TonConnectUIProvider } from "@tonconnect/ui-react";

import { App } from "@/components/App.jsx";
import { ErrorBoundary } from "@/components/ErrorBoundary.jsx";
import { publicUrl } from "@/helpers/publicUrl.js";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
function ErrorBoundaryError({ error }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <GoogleOAuthProvider clientId="836307284255-qucvqf3qf6ga7f5og5kgr1mqlqmbuchf.apps.googleusercontent.com">
      <TonConnectUIProvider
        manifestUrl={publicUrl("../../public/tonconnect-manifest.json")}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TonConnectUIProvider>
    </GoogleOAuthProvider>
  );
}
