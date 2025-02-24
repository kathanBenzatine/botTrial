import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Loader from "../components/Loader/Loader";
// import { useTelegram } from "@telegram-apps/sdk-react";
export default function Demo() {
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, coins: 100, price: "⭐ 1" },
    { id: 2, coins: 600, price: "⭐ 2" },
    { id: 3, coins: 1500, price: "⭐ 3" },
    { id: 4, coins: 8000, price: "⭐ 4" },
    { id: 5, coins: 20000, price: "⭐ 5" },
  ];

  const initiatePayment = async () => {
    // use selected Option
    try {
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
      // if (response) {
      //   setLoading(false);
      // }
      WebApp.openInvoice(response?.data?.url, function (invoiceStatus) {
        if (invoiceStatus) {
          setLoading(false);
          console.log(invoiceStatus, "success invoiceStatus");
        } else {
          setLoading(false);
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
            // onClick={initiatePayment}
            onClick={handleShow}
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
          <div
            style={{
              position: "fixed",
              zIndex: "30",
              background: "black",
              opacity: "0.5",
              inset: "0px",
            }}
          ></div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <Loader />
          </div>
        </>
      )}
      {!Loading && show && (
        <>
          <button variant="primary" onClick={handleShow}>
            Launch demo modal
          </button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container mt-4 telegram-ui">
                <h2 className="text-center">💎 Buy In-App Coins</h2>
                <p className="text-muted text-center">
                  Exchange your Telegram stars for coins!
                </p>

                <div className="row justify-content-center">
                  {options.map((option) => (
                    <div key={option.id} className="col-md-4 col-sm-6 mb-3">
                      <div
                        className={`card coin-card ${
                          selectedOption?.id === option.id ? "selected" : ""
                        }`}
                        onClick={() => setSelectedOption(option)}
                      >
                        <h4 className="coin-amount">💰 {option.coins} Coins</h4>
                        <h5 className="coin-price">{option.price}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button variant="secondary" onClick={handleClose}>
                Close
              </button>
              <button
                variant="primary"
                onClick={() => {
                  setLoading(true);
                  handleClose();
                  initiatePayment();
                }}
              >
                Save Changes
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}
