import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SingleUpload = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [paragraph, setParagraph] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState(5);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image || !title || !paragraph || !price) return;

        const products = JSON.parse(localStorage.getItem("products")) || [];
        const newProduct = {
            id: `admin-${Date.now()}`,
            title,
            paragraph,
            price: Number(price),
            rating: Number(rating) || 5,
            image,
        };

        localStorage.setItem("products", JSON.stringify([...products, newProduct]));
        navigate("/admin-products");
    };

    return (
        <div style={{ padding: "40px", background: "#020617", minHeight: "100vh", color: "#f9fafb" }}>
            <h2 style={{ marginBottom: "24px" }}>Add Product With Details</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "600px",
                    background: "#020617",
                    borderRadius: "16px",
                    padding: "24px 28px",
                    boxShadow: "0 18px 40px rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.4)",
                }}
            >
                <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                        Product Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "1px solid #4b5563",
                            background: "#020617",
                            color: "#e5e7eb",
                        }}
                    />
                    {image && (
                        <div style={{ marginTop: "12px" }}>
                            <img
                                src={image}
                                alt="Preview"
                                style={{ width: "120px", height: "90px", objectFit: "cover", borderRadius: "8px" }}
                            />
                        </div>
                    )}
                </div>

                <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Burger name"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "1px solid #4b5563",
                            background: "#020617",
                            color: "#e5e7eb",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                        Description
                    </label>
                    <textarea
                        value={paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                        rows={3}
                        placeholder="Short description"
                        style={{
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: "1px solid #4b5563",
                            background: "#020617",
                            color: "#e5e7eb",
                            resize: "vertical",
                        }}
                    />
                </div>

                <div style={{ display: "flex", gap: "16px", marginBottom: "22px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: "8px",
                                border: "1px solid #4b5563",
                                background: "#020617",
                                color: "#e5e7eb",
                            }}
                        />
                    </div>
                    <div style={{ width: "140px" }}>
                        <label style={{ display: "block", marginBottom: "6px", fontSize: "14px" }}>
                            Rating
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            step="0.5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            style={{
                                width: "100%",
                                padding: "10px 12px",
                                borderRadius: "8px",
                                border: "1px solid #4b5563",
                                background: "#020617",
                                color: "#e5e7eb",
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                    <button
                        type="submit"
                        style={{
                            border: "none",
                            outline: "none",
                            cursor: "pointer",
                            borderRadius: "999px",
                            padding: "10px 24px",
                            fontSize: "14px",
                            fontWeight: 600,
                            background: "linear-gradient(90deg,#facc15,#f97316)",
                            color: "#111827",
                        }}
                    >
                        Save Product
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/admin-products")}
                        style={{
                            borderRadius: "999px",
                            padding: "10px 22px",
                            fontSize: "14px",
                            border: "1px solid #4b5563",
                            background: "transparent",
                            color: "#e5e7eb",
                            cursor: "pointer",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SingleUpload;