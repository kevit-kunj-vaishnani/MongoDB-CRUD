// to run this =  dell@dell-OptiPlex-3000:~/Desktop/Kunj/temp/task-manager/src/db$ = node mongoose.js


const mongoose = require('mongoose')                                                             // importing mongoose npm library
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api' , { useNewUrlParser : true  }  )   // for connection with task-manager-api database
//.... 
                                                                                                //it is same as written in mongodb.js = 
                                                                                                // MongoClient.connect( 'mongodb://localhost:27017' , { useNewUrlParser : true , useUnifiedTopology: true } , callback function )
                                                                                                // but in mongoose.js we have to write mongodb://localhost:27017/Database-Name . here task-manager-api is database name


/* ...
// define a Mongoose model called "User_data" . 
// mongoose.model() method is used to define and create models for interacting with MongoDB collections.
// User_data is model name
*/
const User_data = mongoose.model('users' , {                                                           // if we had written ("user" , {)} it becomes "users" in compass. user = collection
    name : {
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
            if(i.includes("password")===true)
            {
                throw new Error("password cannot be 'password'")
            }
        }
    }
})

// create a new User instance called me
const me = new User_data({
    name : 'dev' ,
    email : 'dev263@gmail.com' ,
    password : 'password'
})

me.save()                           // The .save() method returns a Promise, and you handle the result using .then() and .catch()
    .then(() => {
        console.log(me);
    })
    .catch((error) => {
        console.log(error);
    })


/* example 2 


// const User = mongoose.model('task' , {
//     discription : {
//         type : String
//     },

//     completed : {
//         type : Boolean
//     }
// })

// const task1 = new User({
//     discription : 'this is task 1',
//     completed : true
// })

// task1.save()
//     .then(() => {
//         console.log(task1);
//     })
//     .catch(() => {
//         console.log("error reported");
//     })

*/

