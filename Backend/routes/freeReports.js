const express = require('express')
const router = express.Router()
const requireAdmin = require('../middleware/requireAdmin')
const {
    registerUser,
    checkAccess,
    getAllUsers,
    deleteUser,
    exportUsers
} = require('../controllers/freeReportController')

// POST route to register user for free reports access
router.post('/register', registerUser)

// GET route to check if email already has access
router.get('/check-access/:email', checkAccess)

// GET route to get all registered users (admin only)
router.get('/users', requireAdmin, getAllUsers)

// DELETE route to delete a user (admin only)
router.delete('/users/:id', requireAdmin, deleteUser)

// GET route to export users as CSV (admin only)
router.get('/export', requireAdmin, exportUsers)

module.exports = router