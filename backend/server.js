const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path");

const app = express(); // ✅ create app first

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// API routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const addressRoutes = require('./routes/addresses');
app.use('/api/addresses', addressRoutes);

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.use("/uploads", express.static("uploads"));

// React static build
app.use(express.static(path.join(__dirname, "../food-app/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../food-app/build/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});