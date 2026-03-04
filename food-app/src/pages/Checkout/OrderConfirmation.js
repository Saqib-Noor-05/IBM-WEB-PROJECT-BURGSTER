import React from "react";
import "./checkout.css";

const OrderConfirmation = () => {
    return (
        <div className="checkout-container">
            <h2>Order Confirmed! 🎉</h2>
            <p>Your order has been placed successfully. We will start preparing your food shortly.</p>
            <p>Thank you for choosing our service!</p>
        </div>
    );
};

export default OrderConfirmation;
