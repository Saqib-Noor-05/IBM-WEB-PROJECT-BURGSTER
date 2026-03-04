const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async (firstName, lastName, email, password) => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/food-delivery';

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB connected');

        const adminExists = await User.findOne({ email });
        if (adminExists) {
            console.log('❌ Admin user already exists!');
            await mongoose.disconnect();
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone: '9999999999',
            address: 'Admin Address',
            isAdmin: true,
        });

        console.log('✅ Admin user created successfully!');
        console.log('Email:', email);
        console.log('Admin ID:', admin._id);

        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

const args = process.argv.slice(2);
if (args.length < 4) {
    console.log('Usage: node create-admin.js <firstName> <lastName> <email> <password>');
    console.log('Example: node create-admin.js Admin User admin@example.com admin123');
    process.exit(1);
}

const [firstName, lastName, email, password] = args;
createAdmin(firstName, lastName, email, password);
