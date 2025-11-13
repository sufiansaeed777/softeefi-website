let FreeReportUser;
if (process.env.USE_MOCK_DB === 'true') {
    const { createMockModel } = require('../middleware/mockDatabase');
    FreeReportUser = createMockModel('FreeReportUser');
} else {
    FreeReportUser = require('../models/freeReportUserModel');
}

// Register user for free reports access
const registerUser = async (req, res) => {
    const { name, email, occupation } = req.body

    try {
        // Validate required fields
        if (!name || !email || !occupation) {
            return res.status(400).json({ 
                error: 'Please provide all required fields: name, email, and occupation' 
            })
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                error: 'Please provide a valid email address' 
            })
        }

        // Validate occupation using AI or fallback rules
        // const { validateOccupation } = require('../Utils/openaiService')
        // const occupationValidation = await validateOccupation(occupation)
        
        // Validation is done on frontend via Gemini API
        // if (!occupationValidation.isValid) {
        //     return res.status(400).json({ 
        //         error: occupationValidation.message || 'Please enter a valid occupation or job title' 
        //     })
        // }

        // Check if user already exists
        const existingUser = await FreeReportUser.findOne({ email })
        
        if (existingUser) {
            // User already registered, just grant access
            return res.status(200).json({ 
                message: 'Welcome back! Access granted.',
                alreadyRegistered: true,
                userId: existingUser._id
            })
        }

        // Create new user
        const newUser = await FreeReportUser.create({
            name,
            email,
            occupation,
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        })

        res.status(201).json({ 
            message: 'Registration successful! Access granted.',
            userId: newUser._id,
            alreadyRegistered: false
        })

    } catch (error) {
        console.error('Error registering free report user:', error)
        res.status(500).json({ 
            error: 'An error occurred while processing your request. Please try again.' 
        })
    }
}

// Check if email already has access
const checkAccess = async (req, res) => {
    const { email } = req.params

    try {
        if (!email) {
            return res.status(400).json({ 
                error: 'Email parameter is required' 
            })
        }

        const user = await FreeReportUser.findOne({ email })
        
        if (user) {
            res.status(200).json({ 
                hasAccess: true,
                message: 'User has access to free reports',
                userData: {
                    name: user.name,
                    occupation: user.occupation,
                    registeredAt: user.accessGrantedAt
                }
            })
        } else {
            res.status(200).json({ 
                hasAccess: false,
                message: 'User needs to register for access' 
            })
        }
    } catch (error) {
        console.error('Error checking access:', error)
        res.status(500).json({ 
            error: 'An error occurred while checking access' 
        })
    }
}

// Get all registered users (admin only - add authentication middleware in production)
const getAllUsers = async (req, res) => {
    try {
        // Add pagination
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 50
        const skip = (page - 1) * limit

        // Add filtering
        const filter = {}
        if (req.query.occupation) {
            filter.occupation = new RegExp(req.query.occupation, 'i')
        }
        if (req.query.search) {
            filter.$or = [
                { name: new RegExp(req.query.search, 'i') },
                { email: new RegExp(req.query.search, 'i') }
            ]
        }

        const users = await FreeReportUser.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
            .select('-__v')
        
        const totalUsers = await FreeReportUser.countDocuments(filter)
        
        res.status(200).json({
            count: users.length,
            total: totalUsers,
            page,
            pages: Math.ceil(totalUsers / limit),
            users
        })
    } catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({ 
            error: 'An error occurred while fetching users' 
        })
    }
}

// Delete a user (admin only)
const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const deletedUser = await FreeReportUser.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({ 
                error: 'User not found' 
            })
        }

        res.status(200).json({ 
            message: 'User deleted successfully',
            deletedUser
        })
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({ 
            error: 'An error occurred while deleting user' 
        })
    }
}

// Export users data (admin only)
const exportUsers = async (req, res) => {
    try {
        const users = await FreeReportUser.find({})
            .sort({ createdAt: -1 })
            .select('name email occupation accessGrantedAt createdAt')
        
        // Convert to CSV format
        const csvHeader = 'Name,Email,Occupation,Access Granted At,Created At\n'
        const csvData = users.map(user => 
            `"${user.name}","${user.email}","${user.occupation}","${user.accessGrantedAt}","${user.createdAt}"`
        ).join('\n')

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment; filename=free-report-users.csv')
        res.status(200).send(csvHeader + csvData)
    } catch (error) {
        console.error('Error exporting users:', error)
        res.status(500).json({ 
            error: 'An error occurred while exporting users' 
        })
    }
}

module.exports = {
    registerUser,
    checkAccess,
    getAllUsers,
    deleteUser,
    exportUsers
}