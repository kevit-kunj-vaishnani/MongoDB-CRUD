const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try{                                                    
        const token = req.header('Authorization')           // = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhYTNjZTdiMWZkNDlkYmQ3ZmJiMDQiLCJpYXQiOjE2OTUyMTI5NDZ9.D9QmPm-oLperrqaYJZZfqWdkgNiBkxCnOLXb5sGLpRA'
        const filtered_jwt = token.replace('Bearer ','')    // if 'Brearer ' not found in token than it will give same value as it has. so now filtered_jwt value is same as token  
        /* 
        
        -   .replace(what you want to replace , new value) 
        -   jwt value = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhYTNjZTdiMWZkNDlkYmQ3ZmJiMDQiLCJpYXQiOjE2OTUyMTI5NDZ9.D9QmPm-oLperrqaYJZZfqWdkgNiBkxCnOLXb5sGLpRA
        -   'Bearer ' is extra which we don't want so we have used filtered_jwt
        
        */
        const decoded = jwt.verify(filtered_jwt , 'this is web token')
        const user = await User.findOne({_id: decoded._id , 'tokens.token': filtered_jwt})

/*      console.log(user)

        { 
          _id: new ObjectId("650aa3ce7b1fd49dbd7fbb04"),
          name: 'dev patel',
          email: 'dev@gmail.com',
          password: '$2a$08$gRl/byLYBFXNbHR.3ad6IeFvYkdfXHj.2KqS9/kve2pWz31Z3WnVa',
          __v: 8,
          age: 22,
          tokens: [
            {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhYTNjZTdiMWZkNDlkYmQ3ZmJiMDQiLCJpYXQiOjE2OTUyNzMzNjB9.B5y8TvN4M5L3ticOGPv2wigRu3_OrEjbUaNHmcq9Gvo',
              _id: new ObjectId("650bd19059d36e24c7b61a37")
            }
          ]
        }
*/

        if(user == null){
            throw new Error()
        }

        else{
            req.token = filtered_jwt
            req.user = user
            // console.log(req.user); same as above comment output
            next()
        }        
    }

    catch(e){
        res.status(401).send({error: 'please authenticate'})
    }
}

module.exports = auth 