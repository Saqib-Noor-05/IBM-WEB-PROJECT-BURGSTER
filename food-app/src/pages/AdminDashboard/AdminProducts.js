import React from "react";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
    const navigate = useNavigate();

    const products = JSON.parse(localStorage.getItem("products")) || [];

    return (
        <div style={{ padding: "40px", background: "#f8f5f0", minHeight: "100vh" }}>
            <h2>All Products</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", marginTop: "30px" }}>
                {products.map((item, index) => (
                    <div key={index} style={{ background: "#fff", padding: "15px", borderRadius: "8px" }}>
                        <img src={item.image} alt="" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                        <h4>{item.title}</h4>
                        <p>{item.paragraph}</p>
                        <p>₹{item.price}</p>
                        <p>⭐ {item.rating}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate("/admin-add-product")}
                style={{
                    marginTop: "40px",
                    padding: "10px 20px",
                    background: "#000",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Add Product
            </button>
        </div>
    );
};

export default AdminProducts;