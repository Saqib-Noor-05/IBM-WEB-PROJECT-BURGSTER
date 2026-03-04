import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BulkUpload = () => {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);

    const handleFiles = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        let limitedFiles = files;
        if (files.length > 10) {
            limitedFiles = files.slice(0, 10);
            alert("You can upload a maximum of 10 images at a time. Only the first 10 were added.");
        }

        const readers = limitedFiles.map(
            (file, index) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        resolve({
                            id: `admin-bulk-${Date.now()}-${index}`,
                            file,
                            image: reader.result,
                            title: "",
                            paragraph: "",
                            price: "",
                            rating: 5
                        });
                    };
                    reader.readAsDataURL(file);
                })
        );

        const newRows = await Promise.all(readers);
        setRows(newRows);
    };

    const updateRow = (index, field, value) => {
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const saveProducts = () => {
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const formatted = rows.map((row, index) => ({
            id: row.id || `admin-bulk-${Date.now()}-${index}`,
            title: row.title,
            paragraph: row.paragraph,
            price: row.price,
            rating: row.rating,
            image: row.image
        }));
        localStorage.setItem("products", JSON.stringify([...products, ...formatted]));
        navigate("/admin-products");
    };

    return (
        <div style={{ padding: "40px", background: "#020617", minHeight: "100vh", color: "#f9fafb" }}>
            <h2 style={{ marginBottom: "18px" }}>Upload Bulk Products</h2>

            <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFiles}
                style={{
                    width: "100%",
                    maxWidth: "520px",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: "1px solid #4b5563",
                    background: "#020617",
                    color: "#e5e7eb",
                }}
            />

            {rows.length > 0 && (
                <div
                    style={{
                        marginTop: "18px",
                        background: "#020617",
                        borderRadius: "16px",
                        border: "1px solid rgba(148,163,184,0.4)",
                        overflow: "hidden",
                        boxShadow: "0 18px 40px rgba(15,23,42,0.75)",
                    }}
                >
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead style={{ background: "rgba(15,23,42,0.9)" }}>
                            <tr>
                                <th style={{ padding: "12px 14px", textAlign: "left", color: "#9ca3af" }}>Image</th>
                                <th style={{ padding: "12px 14px", textAlign: "left", color: "#9ca3af" }}>Title</th>
                                <th style={{ padding: "12px 14px", textAlign: "left", color: "#9ca3af" }}>Description</th>
                                <th style={{ padding: "12px 14px", textAlign: "left", color: "#9ca3af" }}>Price</th>
                                <th style={{ padding: "12px 14px", textAlign: "left", color: "#9ca3af" }}>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index} style={{ borderTop: "1px solid rgba(31,41,55,0.9)" }}>
                                    <td style={{ padding: "12px 14px" }}>
                                        <img
                                            src={row.image}
                                            alt=""
                                            width="60"
                                            height="45"
                                            style={{ objectFit: "cover", borderRadius: "8px" }}
                                        />
                                    </td>
                                    <td style={{ padding: "12px 14px" }}>
                                        <input
                                            value={row.title}
                                            onChange={(e) => updateRow(index, "title", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px 10px",
                                                borderRadius: "8px",
                                                border: "1px solid #4b5563",
                                                background: "#020617",
                                                color: "#e5e7eb",
                                            }}
                                        />
                                    </td>
                                    <td style={{ padding: "12px 14px" }}>
                                        <input
                                            value={row.paragraph}
                                            onChange={(e) => updateRow(index, "paragraph", e.target.value)}
                                            style={{
                                                width: "100%",
                                                padding: "8px 10px",
                                                borderRadius: "8px",
                                                border: "1px solid #4b5563",
                                                background: "#020617",
                                                color: "#e5e7eb",
                                            }}
                                        />
                                    </td>
                                    <td style={{ padding: "12px 14px" }}>
                                        <input
                                            type="number"
                                            value={row.price}
                                            onChange={(e) => updateRow(index, "price", e.target.value)}
                                            style={{
                                                width: "110px",
                                                padding: "8px 10px",
                                                borderRadius: "8px",
                                                border: "1px solid #4b5563",
                                                background: "#020617",
                                                color: "#e5e7eb",
                                            }}
                                        />
                                    </td>
                                    <td style={{ padding: "12px 14px" }}>
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            value={row.rating}
                                            onChange={(e) => updateRow(index, "rating", e.target.value)}
                                            style={{
                                                width: "90px",
                                                padding: "8px 10px",
                                                borderRadius: "8px",
                                                border: "1px solid #4b5563",
                                                background: "#020617",
                                                color: "#e5e7eb",
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ padding: "16px 14px" }}>
                        <button
                            onClick={saveProducts}
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
                            Save All Products
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BulkUpload;