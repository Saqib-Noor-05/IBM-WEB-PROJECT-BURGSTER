const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [
        {
            id: String,
            title: String,
            price: Number,
            quantity: Number,
            image: String,
        },
    ],
    deliveryDetails: {
        name: String,
        email: String,
        phone: String,
        address: String,
        city: String,
        postalCode: String,
        notes: String,
    },
    deliveryTime: {
        date: String,
        time: String,
    },
    subtotal: Number,
    tax: Number,
    shipping: Number,
    total: Number,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'on-the-way', 'delivered', 'cancelled'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'upi', 'cash'],
        default: 'cash',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
