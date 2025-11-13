// Script to make a user an admin
// Run with: node scripts/makeAdmin.js your-email@example.com

require('dotenv').config();
const mongoose = require('mongoose');
const RealUser = require('../models/realUserModel');

const makeAdmin = async (email) => {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        // Find user and update
        const user = await RealUser.findOneAndUpdate(
            { email: email },
            { isAdmin: true },
            { new: true }
        );

        if (user) {
            console.log(`✅ User ${email} is now an admin`);
        } else {
            console.log(`❌ User ${email} not found`);
            console.log('Creating a new admin user...');
            
            // Create a new admin user with a temporary password
            const tempPassword = 'AdminSufian@2000';
            const newAdmin = await RealUser.signup(email, tempPassword);
            newAdmin.isAdmin = true;
            await newAdmin.save();
            console.log(`✅ Created new admin user: ${email}`);
            console.log(`⚠️  Temporary password: ${tempPassword}`);
            console.log(`🔒 Please change this password immediately after logging in!`);
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

// Get email from command line argument
const email = process.argv[2];

if (!email) {
    console.log('Usage: node scripts/makeAdmin.js your-email@example.com');
    process.exit(1);
}

makeAdmin(email);