require('dotenv').config()
const mongoose = require('mongoose')
const FreeReportUser = require('./models/freeReportUserModel')
const Contact = require('./models/contactModel')

async function testConnection() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URL)
        console.log('✅ Connected to MongoDB successfully!')
        
        // Test creating a Free Report user
        const testUser = await FreeReportUser.create({
            name: 'Test User',
            email: `test${Date.now()}@example.com`,
            occupation: 'Test Developer'
        })
        console.log('✅ Created test Free Report user:', testUser.email)
        
        // Test creating a Contact
        const testContact = await Contact.create({
            name: 'Test Contact',
            email: `contact${Date.now()}@example.com`,
            message: 'This is a test message'
        })
        console.log('✅ Created test Contact:', testContact.email)
        
        // Test querying users
        const userCount = await FreeReportUser.countDocuments()
        console.log(`📊 Total Free Report users in database: ${userCount}`)
        
        // Test querying contacts
        const contactCount = await Contact.countDocuments()
        console.log(`📊 Total Contacts in database: ${contactCount}`)
        
        // Clean up test data
        await FreeReportUser.deleteOne({ _id: testUser._id })
        await Contact.deleteOne({ _id: testContact._id })
        console.log('🧹 Cleaned up test data')
        
        console.log('\n✅ All database operations working correctly!')
        
    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await mongoose.connection.close()
        console.log('👋 Database connection closed')
    }
}

testConnection()