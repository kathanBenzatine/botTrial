import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Loader from "../components/Loader/Loader";
import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";
import { isTMA } from "@telegram-apps/bridge";
import { requestPhoneAccess } from "@telegram-apps/sdk-react";
export default function Demo() {
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [googleSuccess, setgoogleSuccess] = useState(false);
  const [googleFail, setgoogleFail] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [getToken, setgetToken] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const [options, setoptions] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tok;
        if (!isTMA("simple")) {
          console.log("outside TELEGRAM ENVIRONMENT");
          const status = await requestPhoneAccess();
          console.log(status);
          tok = await axios.post("https://api.tontoon.app/api/user/signUp", {
            social_id: "78944561252",
            username: "test_k",
            first_name: "demo_k",
            last_name: "last_name",
            avatar: "",
          });
        } else {
          console.log("inside TELEGRAM ENVIRONMENT");
          tok = await axios.post("https://api.tontoon.app/api/user/signUp", {
            social_id: WebApp?.initDataUnsafe.user?.id?.toString(),
            username: WebApp.initDataUnsafe.user?.username,
            first_name: WebApp.initDataUnsafe.user?.first_name,
            last_name: WebApp.initDataUnsafe.user?.first_name,
            avatar: WebApp?.initDataUnsafe?.user?.photo_url || "",
          });
        }
        const token = tok?.data?.body?.token;
        setgetToken(token);
        const response = await axios.get("https://api.tontoon.app/api/coin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setoptions(
          response?.data?.body?.map((item, index) => ({
            id: item?._id,
            coins: item.coin,
            price: `⭐ ${item.star}`,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const initiatePayment = async (id) => {
    // use selected Option
    try {
      const response = await axios.get(
        `https://api.tontoon.app/api/payment/create/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      );
      if (response) {
        setLoading(false);
      }
      WebApp.openInvoice(response?.data?.body?.url, function (invoiceStatus) {
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

  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
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

          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => {
                setgoogleFail(true);
                console.log("Google Login Failed");
              }}
            />
          </div>
          {googleSuccess && (
            <h1 className="" style={{ color: "black" }}>
              GOOGLE LOGIN SUCCESSFULLY DONE
            </h1>
          )}
          {googleFail && (
            <h1 className="" style={{ color: "black" }}>
              GOOGLE LOGIN FAILED
            </h1>
          )}
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
                  {options?.map((option) => (
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
                  initiatePayment(selectedOption?.id);
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
