import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useTelegram } from "@telegram-apps/sdk-react";
export default function Demo() {
  const navigate = useNavigate();
  const initiatePayment = () => {
    // try {
    //   WebApp.openInvoice(
    //     "https://t.me/$L-6lxqntuFUIAwAAw_E5X8dDOUE",
    //     function (invoiceStatus) {
    //       if (invoiceStatus.status === "paid") {
    //         console.log("Payment successful!");
    //       } else {
    //         console.log("Payment failed or was cancelled.");
    //       }
    //     }
    //   );
    // } catch (error) {
    //   console.error("Error opening invoice:", error);
    // }
    // const handleClick = () => {
    //   Construct the deep link URL to send the /pay command to the bot
    const botLink = `https://t.me/trialTriallairt_bot?start=pay`;
    window.location.href = botLink;
    // };
  };
  // const invoice = initInvoice();
  // invoice.open("https://t.me/invoice/abIIks213", "url").then((status) => {
  //   // Output: 'paid'
  //   return console.log(status);
  // });
  return (
    <div className="" style={{ textAlign: "center" }}>
      <button
        className="col-6"
        onClick={initiatePayment}
        style={{ background: "blue", padding: "5px" }}
      >
        PLAY
      </button>
      <button
        style={{ background: "red" }}
        className="
      col-6"
        onClick={() => {
          navigate("/hello");
        }}
      >
        PAUSE
      </button>
    </div>
  );
}
