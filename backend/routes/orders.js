const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');

const router = express.Router();

router.post('/create-order', async (req, res) => {
    try {
        const { userId, items, deliveryDetails, deliveryTime, subtotal, tax, shipping, total, paymentMethod } = req.body;

        if (!userId || !items || !deliveryDetails || !deliveryTime) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const order = await Order.create({
            userId,
            items,
            deliveryDetails,
            deliveryTime,
            subtotal,
            tax,
            shipping,
            total,
            paymentMethod: paymentMethod || 'cash',
        });

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get-orders/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get-order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update-order-status/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated',
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/cancel-order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' }, { new: true });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Order cancelled',
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
