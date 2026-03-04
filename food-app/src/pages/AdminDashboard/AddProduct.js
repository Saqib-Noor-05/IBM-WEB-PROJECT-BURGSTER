import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

const AddProduct = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-layout" style={{ flexDirection: "column" }}>
            <main className="admin-main" style={{ width: "100%" }}>
                <section className="admin-section">
                    <h2 className="admin-title">Upload Products</h2>
                    <div className="admin-cards">
                        <div
                            className="stat-card"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/admin-single-upload")}
                        >
                            <p className="stat-label">Option 1</p>
                            <p className="stat-value">Add Product With Details</p>
                        </div>
                        <div
                            className="stat-card"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/admin-bulk-upload")}
                        >
                            <p className="stat-label">Option 2</p>
                            <p className="stat-value">Upload Bulk Products</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AddProduct;