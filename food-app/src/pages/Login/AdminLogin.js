import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const ADMIN_EMAIL = "admin@gmail.com";
        const ADMIN_PASSWORD = "admin123";

        if (data.email === ADMIN_EMAIL && data.password === ADMIN_PASSWORD) {
            Swal.fire({
                title: "Welcome Admin ",
                html: `
                    <div style="font-size:16px;">
                        <p><strong>Email:</strong> ${data.email}</p>
                        <p>Access Level: <span style="color:#facc15;">Full Control</span></p>
                    </div>
                `,
                icon: "success",
                background: "#111827",
                color: "#ffffff",
                confirmButtonText: "Enter Dashboard",
                confirmButtonColor: "#facc15"
            }).then(() => {
                localStorage.setItem("adminToken", "dummy-admin-token");
                localStorage.setItem("adminUser", JSON.stringify({
                    email: data.email,
                    role: "admin"
                }));
                navigate("/admin-dashboard");
            });
        } else {
            Swal.fire({
                title: "Access Denied",
                text: "Invalid Admin Credentials",
                icon: "error",
                background: "#1f2937",
                color: "#ffffff",
                confirmButtonColor: "#ef4444",
                confirmButtonText: "Try Again"
            });
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Admin Login 🔐</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Admin Email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Admin Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="login-btn">
                        Admin Login
                    </button>
                </form>

                <p>OR</p>

                <p className="signup-text">
                    <span
                        className="signup-link"
                        onClick={() => navigate("/login")}
                    >
                        Back to User Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;