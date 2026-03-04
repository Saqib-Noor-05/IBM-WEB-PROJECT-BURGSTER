import React, { useState } from "react";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [sentOtpValue, setSentOtpValue] = useState("");
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mobile.match(/^\d{10}$/)) {
            alert("Please provide a valid 10-digit mobile number");
            return;
        }
        if (otpSent && otp.trim() === "") {
            alert("Please enter the OTP sent to your mobile number");
            return;
        }


        Swal.fire({
            title: "Order Placed! 🍔",
            html: `
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Mobile:</strong> ${mobile}</p>
    <p><strong>Payment:</strong> ${paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</p>
  `,
            icon: "success",
            confirmButtonText: "Continue",
            confirmButtonColor: "#ff6b00",
            background: "#1e1e1e",
            color: "#fff"
        }).then(() => {
            navigate("/order-confirmation");
        });
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                <label>
                    Delivery Address:
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        placeholder="Enter your address"
                    />
                </label>


                <label>
                    Mobile Number:
                    <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                        placeholder="10-digit mobile"
                        maxLength={10}
                    />
                </label>

                {!otpSent && (
                    <button
                        type="button"
                        className="send-otp-btn"
                        onClick={() => {
                            if (mobile.match(/^\d{10}$/)) {
                                const code = Math.floor(1000 + Math.random() * 9000).toString();
                                setSentOtpValue(code);
                                Swal.fire({
                                    title: "Verification Code Sent 🔐",
                                    html: `
    <div style="text-align:center">
      <p>We've sent a 4-digit OTP to</p>
      <strong>${mobile}</strong>
      <hr/>
      <p style="color:#ff6b00">Demo OTP: ${code}</p>
    </div>
  `,
                                    icon: "success",
                                    confirmButtonText: "Enter OTP",
                                    confirmButtonColor: "#ff6b00"
                                });
                                setOtpSent(true);
                            } else {
                                alert("Please enter a valid 10-digit mobile number");
                            }
                        }}
                    >
                        Send OTP
                    </button>
                )}

                {otpSent && (
                    <>
                        <label>
                            Enter OTP:
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                placeholder="Enter OTP"
                            />
                        </label>
                        <p className="dummy-otp-msg">(for demo use OTP: {sentOtpValue})</p>
                    </>
                )}

                <fieldset className="payment-options">
                    <legend>Payment Method</legend>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                        />
                        Cash on Delivery
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="online"
                            checked={paymentMethod === "online"}
                            onChange={() => setPaymentMethod("online")}
                        />
                        Online Payment
                    </label>
                </fieldset>

                <button type="submit" className="place-order-btn">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
