const mongoose = require('mongoose')  
const bcrypt = require('bcryptjs')

const taskSchema = mongoose.Schema({        
    discription : {
        type : String
    },

    completed : {
        type : Boolean ,
        default : false
    },

    owner : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true ,
        ref : 'users'                               // comes from user.js model in that mongoose.model('users' , userSchema )
    }
},
{
    timestamps:true
})


taskSchema.pre('save' , async function(next){
    const task = this
    next()
})


const Task = mongoose.model('tasks' , taskSchema )    // this written 'tasks' is tasks written in compass task-manager-api -> tasks


module.exports = Task


// step by step what we have to do is written in step_by_step_process.js file which is inside task-manager folder in vs code