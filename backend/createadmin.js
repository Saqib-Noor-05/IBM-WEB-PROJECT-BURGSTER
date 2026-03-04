const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("your_mongodb_connection_string");

async function createAdmin() {
    const admin = new User({
        firstName: "Saqib",
        lastName: "Admin",
        email: "admin@gmail.com",
        password: "123456",
        isAdmin: true
    });

    await admin.save();
    console.log("Admin created successfully");
    process.exit();
}

createAdmin();