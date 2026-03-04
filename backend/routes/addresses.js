const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/add-address', async (req, res) => {
    try {
        const { userId, label, address, city, postalCode, phone, isDefault } = req.body;

        if (!userId || !label || !address || !city || !phone) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses.push({
            label,
            address,
            city,
            postalCode,
            phone,
            isDefault: isDefault || false,
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Address added successfully',
            addresses: user.addresses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/get-addresses/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            addresses: user.addresses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update-address/:userId/:addressId', async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const { label, address, city, postalCode, phone, isDefault } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
        if (addressIndex === -1) {
            return res.status(404).json({ message: 'Address not found' });
        }

        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        user.addresses[addressIndex] = {
            ...user.addresses[addressIndex],
            label: label || user.addresses[addressIndex].label,
            address: address || user.addresses[addressIndex].address,
            city: city || user.addresses[addressIndex].city,
            postalCode: postalCode || user.addresses[addressIndex].postalCode,
            phone: phone || user.addresses[addressIndex].phone,
            isDefault: isDefault !== undefined ? isDefault : user.addresses[addressIndex].isDefault,
        };

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            addresses: user.addresses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete-address/:userId/:addressId', async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully',
            addresses: user.addresses,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
