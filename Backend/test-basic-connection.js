const mongoose = require('mongoose');

console.log('Testing basic MongoDB connection...');
console.log('MongoDB URL:', process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/softeefi');

// Basic connection without any options
mongoose.connect('mongodb://127.0.0.1:27017/softeefi')
    .then(() => {
        console.log('✓ SUCCESS! Connected to MongoDB');
        console.log('MongoDB version:', mongoose.version);
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Failed to connect:', error.message);
        console.error('Full error:', error);
        process.exit(1);
    });