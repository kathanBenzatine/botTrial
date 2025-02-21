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
          social_id: "78944561252",
          username: "test_k",
          first_name: "demo_k",
          last_name: "test_k",
          avatar: "",
        }
      );
      const token = tok?.data?.body?.token;

      const response = await axios.get(
        "http://192.168.29.170:4000/api/payment/create",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    </div>
  );
}
