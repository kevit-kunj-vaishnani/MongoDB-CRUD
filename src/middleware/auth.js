const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{                                                    
        const token = req.header('Authorization')           // = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhYTNjZTdiMWZkNDlkYmQ3ZmJiMDQiLCJpYXQiOjE2OTUyMTI5NDZ9.D9QmPm-oLperrqaYJZZfqWdkgNiBkxCnOLXb5sGLpRA'
        const filtered_jwt = token.replace('Bearer ','')    
        /* 
        
        -   .replace(what you want to replace , new value) 
        -   jwt value = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhYTNjZTdiMWZkNDlkYmQ3ZmJiMDQiLCJpYXQiOjE2OTUyMTI5NDZ9.D9QmPm-oLperrqaYJZZfqWdkgNiBkxCnOLXb5sGLpRA
        -   'Bearer ' is extra which we don't want so we have used filtered_jwt
        
        */
        const decoded = jwt.verify(filtered_jwt , 'this is web token')
        const user = await User.findOne({_id: decoded._id , 'tokens.token': filtered_jwt})
    
        // console.log(user);
        if(user == null){
            throw new Error()
        }

        else{
            req.user = user
            next()
        }        
    }

    catch(e){
        res.status(401).send({error: 'please authentication'})
    }
}

module.exports = auth 