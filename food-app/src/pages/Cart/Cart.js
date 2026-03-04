import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Layout from "../../components/Layouts/Layout";
import "../../styles/CartStyle.css";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <Layout>
                <section className="cart_section">
                    <Container>
                        <Row>
                            <Col lg={12} className="text-center">
                                <h2>Your Cart is Empty</h2>
                                <p className="mt-3 mb-4">Add some delicious burgers to get started!</p>
                                <Link to="/" className="btn btn_red px-4">
                                    Continue Shopping
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="cart_section">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <h2 className="mb-4">Shopping Cart</h2>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={8}>
                            <div className="cart_table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="cart_item_with_image">
                                                        {item.image && typeof item.image === "string" ? (
                                                            <img src={item.image} alt={item.title} className="cart_item_image" />
                                                        ) : item.image ? (
                                                            item.image
                                                        ) : null}
                                                        <div className="cart_item_name">{item.title}</div>
                                                    </div>
                                                </td>
                                                <td>₹{item.price}</td>
                                                <td>
                                                    <div className="quantity_selector">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.id, item.quantity - 1)
                                                            }
                                                            className="qty_btn"
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            readOnly
                                                            className="qty_input"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(item.id, item.quantity + 1)
                                                            }
                                                            className="qty_btn"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                                                <td>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="btn_remove"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Col>

                        <Col lg={4}>
                            <div className="cart_summary">
                                <h4>Order Summary</h4>
                                <hr />
                                <div className="summary_item">
                                    <span>Subtotal:</span>
                                    <span>₹{getTotalPrice()}</span>
                                </div>
                                <div className="summary_item">
                                    <span>Shipping:</span>
                                    <span>₹39</span>
                                </div>
                                <div className="summary_item">
                                    <span>Tax:</span>
                                    <span>₹{(getTotalPrice() * 0.1).toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="summary_item total">
                                    <span>Total:</span>
                                    <span>₹{(parseFloat(getTotalPrice()) + 39 + parseFloat(getTotalPrice()) * 0.1).toFixed(2)}</span>
                                </div>

                                <Button
                                    className="btn btn_red w-100 mt-4 mb-2"
                                    onClick={() => navigate("/checkout")}
                                >
                                    Checkout
                                </Button>
                                <Link to="/" className="btn btn-outline-secondary w-100">
                                    Continue Shopping
                                </Link>

                                <button
                                    onClick={clearCart}
                                    className="btn btn-light w-100 mt-3"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    );
};

export default Cart;
