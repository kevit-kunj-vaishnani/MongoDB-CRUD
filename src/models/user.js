const mongoose = require('mongoose')                                                             // importing mongoose npm library
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({                                                                 // if we had written ("user" , {)} it becomes "users" in compass. user = collection
    name : {                                                                                           //  this written 'users' is users written in compass task-manager-api -> users
        type : String ,
        required : true ,
        trim : true
    },

    email : {
        type : String ,
        unique :true ,
        required : true ,
        trim : true ,
        validate(i){
            if(validator.isEmail(i) === false)
            {
                throw new Error("email invalid")
            }
        }
    } ,

    age : {
        type : Number,
        validate(i){
            if(i<0)
            {
                throw new Error("Please give age above 0")
            }
        }
    } ,

    password : {
        type : String ,
        required : true ,
        minlength: 6 ,
        trim : true ,
        validate(i){
            if(i.toLowerCase().includes("password")===true)
            {
                throw new Error("password cannot be 'password'")
            }
        }
    },

    tokens : [{
        token : {
            type : String , 
            required : true
        }
    }]
})



// for generating token
userSchema.methods.generateAuthenticationToken = async function() {
    const user = this                                                                       //  this keyword ne badle user lakhsi jya jarur adse tya
    const token = jwt.sign({ _id: user._id.toString()} , 'this is web token')   // instead of 'this' keyword we will use 'user' var {_id: this._id.toString()}

    user.tokens = user.tokens.concat({token:token}) // 1st tokens will be empty array. after token is generated now it will concate and print that in tokens array 
    await user.save()

    return token
}


// for login through email and password
userSchema.statics.findUserByCredentials = async (email,password) => {       // findByCredentials is function we have made so we have to write static
    const user = await User_data.findOne( {email:email} )

    if(user===null)
    {
        console.log('email invalid');
        throw new Error('email invalid')
    }

    else
    {
        const did_Password_Match = await bcrypt.compare(password , user.password)    // (which we entered in login page , which we have set already)

        if(did_Password_Match===false)
        {
            console.log('password invalid');
            throw new Error('password invalid')
        }

        else
        {
            return user
        }
    }
} 


// for making password into hashpassword
userSchema.pre('save' , async function(next){
    const user = this
    // console.log('hi');
    
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password , 8)
    }
    
    next( )
})

const User_data = mongoose.model('users' , userSchema )     // users is a model name

module.exports = User_data




/*
1. Mongoose schema is a blueprint for a document in MongoDB. It defines the structure of the document, including the fields that it can have, their types, and any validation rules that should be applied.
2. Mongoose model is a class that is generated from a Mongoose schema. It provides an interface for interacting with the database to create, read, update, and delete documents.

in short mongoose schema defines structure of document and mongoose model allows to do crud on that document

3. middleware functions used to perform tasks such as data validation, logging, and authorization.

(userSchema.pre or userSchema.post) 
4. pre and post  schema in Mongoose refer to middleware functions that are executed before and after certain Mongoose methods are called.

5. Pre schema middleware functions are executed before the Mongoose method is called. They are typically used to validate data or perform other tasks that need to be done before the operation can be completed successfully.
6. Post schema middleware functions are executed after the Mongoose method is called. They are typically used to perform tasks such as logging, sending notifications, or updating other documents in the database.
*/ 