const mongoose = require('mongoose')                                                             // importing mongoose npm library
const validator = require('validator')

const User_data = mongoose.model('users' , {                                                           // if we had written ("user" , {)} it becomes "users" in compass. user = collection
    name : {                                                                                           //  this written 'users' is users written in compass task-manager-api -> users
        type : String ,
        required : true ,
        trim : true
    },

    email : {
        type : String ,
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
    }
})

module.exports = User_data