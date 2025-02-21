import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";
// import { useTelegram } from "@telegram-apps/sdk-react";
export default function Demo({ links, Liks, setLiks }) {
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initiatePayment = async () => {
    // {
    //   social_id: "78944561252",
    //   username: "test_k",
    //   first_name: "demo_k",
    //   last_name: "test_k",
    //   avatar: "",
    // }
    try {
      setLoading(true);
      const tok = await axios.post("https://api.tontoon.app/api/user/signUp", {
        social_id: WebApp?.initDataUnsafe.user?.id?.toString() || "78944561252",
        username: WebApp.initDataUnsafe.user?.username || "test_k",
        first_name: WebApp.initDataUnsafe.user?.first_name || "demo_k",
        last_name: WebApp.initDataUnsafe.user?.first_name || "last_name",
        avatar: WebApp?.initDataUnsafe?.user?.photo_url || "",
      });
      const token = tok?.data?.body?.token;

      const response = await axios.get(
        "https://api.tontoon.app/api/payment/create",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setLoading(false);
      }
      WebApp.openInvoice(response?.data?.url, function (invoiceStatus) {
        console.log(invoiceStatus, "invoiceStatus");
        if (invoiceStatus) {
          setLoading(false);
          console.log(invoiceStatus, "success invoiceStatus");
        } else {
          console.log("Payment failed or was cancelled.");
        }
      });
    } catch (error) {
      setLoading(false);
      console.error("Error opening invoice:", error);
    }
  };

  return (
    <div className="" style={{ textAlign: "center" }}>
      {!Loading ? (
        <>
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
        </>
      ) : (
        <>
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </>
      )}
    </div>
  );
}
