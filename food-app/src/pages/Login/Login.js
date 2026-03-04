import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.email || !data.password) {
            setMessage("Please fill in all fields ❌");
            return;
        }

        localStorage.setItem("token", "dummy-token");
        localStorage.setItem("user", JSON.stringify({
            email: data.email
        }));

        navigate("/");
        window.location.reload();
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <h2>Login to BURGSTER 🍔</h2>

                {message && <p className={message.includes("✅") ? "success-msg" : "error-msg"}>{message}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>OR</p>

                <p className="signup-text">
                    New user?{" "}
                    <span
                        className="signup-link"
                        onClick={() => navigate("/signup")}
                    >
                        Create Account
                    </span>
                </p>

                <button
                    className="admin-btn"
                    onClick={() => navigate("/admin-login")}
                >
                    Login as Admin
                </button>

            </div>
        </div>
    );
};

export default Login;