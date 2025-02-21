import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { useTelegram } from "@telegram-apps/sdk-react";
export default function Demo({ links, Liks, setLiks }) {
  const navigate = useNavigate();
  const initiatePayment = async () => {
    try {
      const tok = await axios.post(
        "http://192.168.29.170:4000/api/user/signUp",
        {
          social_id: 78944561252,
          username: "test_k",
          first_name: "demo_k",
          last_name: "test_k",
          avatar: "",
        }
      );
      debugger;
      return;
      const response = await axios.get("/api/payment/create", {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTJlM2QwYzYxMzBjZjQ3MWZjNGE0OSIsImlhdCI6MTc0MDExMTA0NSwiZXhwIjoxNzQwNzE1ODQ1fQ.j0RoWWh0GDGmA0yKC8Wz7dXlg9CEg5Pn3jA3-kEuUMw`,
        },
      });

      // const { invoiceLink } = await response.json();

      // console.log("Opening invoice:", invoiceLink);

      WebApp.openInvoice(response?.data?.url, function (invoiceStatus) {
        if (invoiceStatus.status === "paid") {
          console.log("Payment successful!");
        } else {
          console.log("Payment failed or was cancelled.");
        }
      });
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
      <div className="TON-tabbs d-flex gap-4 justify-content-center">
        <div
          // onClick={() => {
          //   setShowTON({ type: "TON", show: true });
          //   setSelectedTab("TON");
          //   setIsSettingPage(false);
          // }}
          className={"active-my-page-tab"}
        >
          <div className=" d-flex justify-content-between align-items-center">
            <span>
              <img
                src="http://localhost:5174/src/assets/images/SmallBlueWallet.png"
                alt="Connect Wallet"
              />
            </span>
            <span className="">Connect Wallet</span>
          </div>
        </div>
      </div>
    </div>
  );
}
