const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    rating: Number,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);