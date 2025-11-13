const realUser = require('../models/realUserModel')
console.log('realUser in controller:', realUser)
const jwt = require('jsonwebtoken')

const createToken = (_id) =>
{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}
// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try
    {
        const user = await realUser.login(email,password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
    //res.json({mssg:'login user'})
}

// signup user
const signupUser = async (req, res) =>{
    const {email, password} = req.body
    try
    {
        const user = await realUser.signup(email,password)
        //create token
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
    
}

module.exports = {signupUser,loginUser}