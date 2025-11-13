const mongoose = require('mongoose')

const Schema = mongoose.Schema

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
    },
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    }
}, { timestamps: true })

// Add indexes for better query performance
contactSchema.index({ email: 1 })
contactSchema.index({ status: 1 })
contactSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Contact', contactSchema)