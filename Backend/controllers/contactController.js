let Contact;
if (process.env.USE_MOCK_DB === 'true') {
    const { createMockModel } = require('../middleware/mockDatabase');
    Contact = createMockModel('Contact');
} else {
    Contact = require('../models/contactModel');
}
const { sendContactEmail } = require('../Utils/emailService')

// Create new contact message
const createContact = async (req, res) => {
    const { name, email, phone, message } = req.body

    try {
        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                error: 'Please fill out all required fields.' 
            })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Please provide a valid email address' 
            })
        }

        // Save to database
        const newContact = await Contact.create({
            name,
            email,
            phone: phone || '',
            message,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        })

        // Send email notification
        try {
            await sendContactEmail({ name, email, message })
        } catch (emailError) {
            console.error('Error sending email:', emailError)
            // Don't fail the request if email fails, data is already saved
        }
        
        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully.',
            contactId: newContact._id
        })
    } catch (error) {
        console.error('Error creating contact:', error)
        res.status(500).json({ 
            error: 'Failed to send message. Please try again.' 
        })
    }
}

// Get all contacts (admin only)
const getAllContacts = async (req, res) => {
    try {
        // Add pagination
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 50
        const skip = (page - 1) * limit

        // Add filtering
        const filter = {}
        if (req.query.status) {
            filter.status = req.query.status
        }
        if (req.query.search) {
            filter.$or = [
                { name: new RegExp(req.query.search, 'i') },
                { email: new RegExp(req.query.search, 'i') },
                { message: new RegExp(req.query.search, 'i') }
            ]
        }

        const contacts = await Contact.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .select('-__v')
        
        const totalContacts = await Contact.countDocuments(filter)
        
        res.status(200).json({
            count: contacts.length,
            total: totalContacts,
            page,
            pages: Math.ceil(totalContacts / limit),
            contacts
        })
    } catch (error) {
        console.error('Error fetching contacts:', error)
        res.status(500).json({ 
            error: 'Failed to fetch contacts.' 
        })
    }
}

// Get single contact by ID
const getContact = async (req, res) => {
    const { id } = req.params

    try {
        const contact = await Contact.findById(id)

        if (!contact) {
            return res.status(404).json({ 
                error: 'Contact not found.' 
            })
        }

        // Mark as read if it was new
        if (contact.status === 'new') {
            contact.status = 'read'
            await contact.save()
        }

        res.status(200).json({ contact })
    } catch (error) {
        console.error('Error fetching contact:', error)
        res.status(500).json({ 
            error: 'Failed to fetch contact.' 
        })
    }
}

// Update contact status
const updateContactStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    try {
        if (!['new', 'read', 'replied', 'archived'].includes(status)) {
            return res.status(400).json({ 
                error: 'Invalid status value.' 
            })
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        )

        if (!updatedContact) {
            return res.status(404).json({ 
                error: 'Contact not found.' 
            })
        }

        res.status(200).json({
            success: true,
            message: 'Status updated successfully.',
            contact: updatedContact
        })
    } catch (error) {
        console.error('Error updating contact status:', error)
        res.status(500).json({ 
            error: 'Failed to update status.' 
        })
    }
}

// Delete contact
const deleteContact = async (req, res) => {
    const { id } = req.params

    try {
        const deletedContact = await Contact.findByIdAndDelete(id)

        if (!deletedContact) {
            return res.status(404).json({ 
                error: 'Contact not found.' 
            })
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully.',
            deletedContact
        })
    } catch (error) {
        console.error('Error deleting contact:', error)
        res.status(500).json({ 
            error: 'Failed to delete contact.' 
        })
    }
}

// Get contact statistics
const getContactStats = async (req, res) => {
    try {
        const stats = await Contact.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ])

        const totalContacts = await Contact.countDocuments()
        const todayContacts = await Contact.countDocuments({
            createdAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0))
            }
        })

        const formattedStats = {
            total: totalContacts,
            today: todayContacts,
            byStatus: {}
        }

        stats.forEach(stat => {
            formattedStats.byStatus[stat._id] = stat.count
        })

        res.status(200).json({ stats: formattedStats })
    } catch (error) {
        console.error('Error fetching contact stats:', error)
        res.status(500).json({ 
            error: 'Failed to fetch statistics.' 
        })
    }
}

module.exports = {
    createContact,
    getAllContacts,
    getContact,
    updateContactStatus,
    deleteContact,
    getContactStats
}