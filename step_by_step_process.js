// EVERY THING INSIDE src folder of task-manager folder 



//first in db in that mongooes.js 

// db/monoose.js = 

const mongoose = require('mongoose')                                                             // importing mongoose npm library
const validator = require('validator')

mongoose.connect('mongodb://localhost:27017/task-manager-api' , { useNewUrlParser : true  }  )   // for connection with task-manager-api database

// example 1 = users
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
            if(i.toLowerCase().includes("password")===true)
            {
                throw new Error("password cannot be 'password'")
            }
        }
    }
})

const me = new User_data({
    name : 'dev' ,
    email : 'dev263@gmail.com' ,
    password : 'akjadsda'
})

me.save()                           // The .save() method returns a Promise, and you handle the result using .then() and .catch()
    .then(() => {
        console.log(me);
    })
    .catch((error) => {
        console.log(error);
    })


/* example 2 = task


const User = mongoose.model('task' , {
    discription : {
        type : String
    },

    completed : {
        type : Boolean
    }
})

// create a new User instance called task1
const task1 = new User({
    discription : 'this is task 1',
    completed : true
})

task1.save()
    .then(() => {
        console.log(task1);
    })
    .catch(() => {
        console.log("error reported");
    })

*/






then to user/task add into database (compass) through postman we made changes = 


/*
step by step process to make task dynamic with mongooes and mongobd = 
  		
  		step 1. create new file in models = task.js
  		step 2. now bring this code from mongoose.js to task.js ( task.js is in models) and remove from mongoose.js
  			
  			code = const User = mongoose.model('task' , {
				    discription : {
					type : String
				    },

				    completed : {
					type : Boolean
				    }
				})
			
			this code is in example 2 = task
				    
		step 3. add line in task.js above step 2 code
				const mongoose = require('mongoose')
		
		step 4 . add line in task.js below step 2 code
				module.exports = Task
		
		step 5 . add line in index.js above
				const Task = require('./models/task');  
			 here we define  / given reference of model task which is in a seperate file into this file(index.js) 

		step 6 . write below rest api route code in index.js
		
			code = 
				// route for creating new task =  start  
				
				app.post('/tasks' , (req,res)=>{
				    const task = new Task(req.body);

				    task.save()
					.then( ()=>{
					    res.send(task)
					})
					.catch( (e)=>{ 
					    res.status(400).send(e)
					})
				})

				// task rest api route =  over
				
		step 7 . go to postman and add new request in Task App with request name = Create task 	
		
		step 8 . make POST instead of GET and write url localhost:5000/tasks in postman
		
		step 9 . now from Params go to Body and in that go to raw and there give key value pair (key is whatever you have given in task.js inside models folder ) and instead of Text make it JSON
  		
  		step 10 . now click on send and check down it will print  
  		
  		step 11 . now go to compass inside there goto to task-manager-api in that tasks now refresh and check
 
		*/