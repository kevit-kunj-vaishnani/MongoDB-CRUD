const mongoose = require('mongoose')  

const Task = mongoose.model('tasks' , {      //  this written 'tasks' is tasks written in compass task-manager-api -> tasks
    discription : {
        type : String
    },

    completed : {
        type : Boolean
    }
})


module.exports = Task


// step by step what we have to do is written in step_by_step_process.js file which is inside task-manager folder in vs code