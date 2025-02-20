import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
// import { useTelegram } from "@telegram-apps/sdk-react";
export default function Demo() {
  const initiatePayment = () => {
    try {
      WebApp.openInvoice(
        "https://t.me/$L-6lxqntuFUIAwAAw_E5X8dDOUE",
        function (invoiceStatus) {
          if (invoiceStatus.status === "paid") {
            console.log("Payment successful!");
          } else {
            console.log("Payment failed or was cancelled.");
          }
        }
      );
    } catch (error) {
      console.error("Error opening invoice:", error);
    }
  };
  // const invoice = initInvoice();
  // invoice.open("https://t.me/invoice/abIIks213", "url").then((status) => {
  //   // Output: 'paid'
  //   return console.log(status);
  // });
  return (
    <div className="" style={{ textAlign: "center" }}>
      <button
        onClick={initiatePayment}
        style={{ background: "blue", padding: "5px" }}
      >
        PLAY
      </button>
    </div>
  );
}
