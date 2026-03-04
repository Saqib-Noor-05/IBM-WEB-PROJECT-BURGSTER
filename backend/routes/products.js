const express = require("express");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/bulk", upload.array("images"), async (req, res) => {
    try {
        const productsData = JSON.parse(req.body.products);

        const savedProducts = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];
            const data = productsData[i];

            const product = new Product({
                title: data.title,
                paragraph: data.paragraph,
                price: data.price,
                rating: data.rating,
                image: `/uploads/${file.filename}`
            });

            await product.save();
            savedProducts.push(product);
        }

        res.json(savedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
});

module.exports = router;