const express = require('express')
const { 
    createUser, 
    getUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/indexController');
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()
//require auth for all user routes
router.use(requireAuth)
// Get all indexes
router.get('/', getUsers)
//Get single index
router.get('/:id',getUser)
//Post a index
router.post('/', createUser);
  
//Delete a index
router.delete('/:id', deleteUser)
router.patch('/:id', updateUser)
module.exports = router