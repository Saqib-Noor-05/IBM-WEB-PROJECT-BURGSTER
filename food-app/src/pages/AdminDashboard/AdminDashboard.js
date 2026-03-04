import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";
import menuItems from "../../data/menuItems";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("orders");

    const statusOptions = useMemo(
        () => ["Pending", "Preparing", "Cooking", "Out for delivery", "Delivered", "Cancelled"],
        []
    );

    const defaultOrders = useMemo(
        () => [
            { id: "1", user: "Aqib", amount: 299, status: "Delivered" },
            { id: "2", user: "Amjad", amount: 175, status: "Pending" },
            { id: "3", user: "Zainul", amount: 295, status: "Preparing" },
            { id: "4", user: "RIya", amount: 390, status: "Out for delivery" },
        ],
        []
    );

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("adminOrders")) || null;
        setOrders(Array.isArray(storedOrders) && storedOrders.length ? storedOrders : defaultOrders);

        const deleted = JSON.parse(localStorage.getItem("deletedProductIds")) || [];
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const deletedSet = new Set(Array.isArray(deleted) ? deleted : []);
        const merged = [...menuItems, ...storedProducts].filter((p) => !deletedSet.has(p.id));
        setProducts(merged);
    }, [defaultOrders]);

    const updateOrderStatus = (orderId, nextStatus) => {
        const updated = orders.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o));
        setOrders(updated);
        localStorage.setItem("adminOrders", JSON.stringify(updated));
    };

    const getStatusClass = (status) => {
        const key = String(status || "").toLowerCase();
        if (key.includes("deliver")) return "delivered";
        if (key.includes("cancel")) return "cancelled";
        if (key.includes("out")) return "out";
        if (key.includes("cook")) return "cooking";
        if (key.includes("prepar")) return "preparing";
        return "pending";
    };

    const deleteProduct = (productId) => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        const isStored = storedProducts.some((p) => p.id === productId);

        if (isStored) {
            const next = storedProducts.filter((p) => p.id !== productId);
            localStorage.setItem("products", JSON.stringify(next));
        } else {
            const deleted = JSON.parse(localStorage.getItem("deletedProductIds")) || [];
            const deletedSet = new Set(Array.isArray(deleted) ? deleted : []);
            deletedSet.add(productId);
            localStorage.setItem("deletedProductIds", JSON.stringify(Array.from(deletedSet)));
        }

        setProducts((prev) => prev.filter((p) => p.id !== productId));
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        navigate("/admin-login");
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-logo">ADMIN PANEL</div>
                <nav className="admin-nav">
                    <button
                        className={active === "dashboard" ? "nav-link active" : "nav-link"}
                        onClick={() => setActive("dashboard")}
                    >
                        Dashboard
                    </button>
                    <button
                        className={active === "orders" ? "nav-link active" : "nav-link"}
                        onClick={() => setActive("orders")}
                    >
                        Orders
                    </button>
                    <button
                        className={active === "products" ? "nav-link active" : "nav-link"}
                        onClick={() => setActive("products")}
                    >
                        Products
                    </button>
                    <button className="nav-link logout" onClick={logout}>
                        Logout
                    </button>
                </nav>
            </aside>

            <main className="admin-main">
                {active === "dashboard" && (
                    <section className="admin-section">
                        <h2 className="admin-title">Dashboard</h2>
                        <div className="admin-cards">
                            <div className="stat-card">
                                <p className="stat-label">Total Products</p>
                                <p className="stat-value">{products.length}</p>
                            </div>
                            <div className="stat-card">
                                <p className="stat-label">Total Revenue</p>
                                <p className="stat-value">₹25,000</p>
                            </div>
                        </div>
                    </section>
                )}

                {active === "orders" && (
                    <section className="admin-section">
                        <h2 className="admin-title">Orders</h2>
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, idx) => (
                                        <tr key={order.id}>
                                            <td>{idx + 1}</td>
                                            <td>{order.user}</td>
                                            <td>₹{order.amount}</td>
                                            <td>
                                                <div className="order-status-cell">
                                                    <span className={`status-pill ${getStatusClass(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                    <select
                                                        className="status-select"
                                                        value={order.status}
                                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                    >
                                                        {statusOptions.map((s) => (
                                                            <option key={s} value={s}>
                                                                {s}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {active === "products" && (
                    <section className="admin-section">
                        <h2 className="admin-title">Products</h2>
                        <div className="admin-cards">
                            <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => navigate("/admin-single-upload")}>
                                <p className="stat-label">Option 1</p>
                                <p className="stat-value">Single Product Upload</p>
                            </div>
                            <div className="stat-card" style={{ cursor: "pointer" }} onClick={() => navigate("/admin-bulk-upload")}>
                                <p className="stat-label">Option 2</p>
                                <p className="stat-value">Bulk Products Upload</p>
                            </div>
                        </div>

                        <div style={{ marginTop: "26px" }}>
                            <h3 className="admin-subtitle">Menu Products</h3>
                            <div className="products-grid">
                                {products.map((item) => (
                                    <div key={item.id} className="product-card">
                                        <div className="product-image-wrapper">
                                            <img src={item.image} alt={item.title} className="product-image" />
                                        </div>
                                        <h4 className="product-title">{item.title}</h4>
                                        <p className="product-desc">{item.paragraph}</p>
                                        <div className="product-meta">
                                            <span className="product-price">₹{item.price}</span>
                                            <button
                                                className="danger-btn"
                                                onClick={() => deleteProduct(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;