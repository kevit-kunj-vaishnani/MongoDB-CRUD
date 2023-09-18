const express = require('express');
require("./db/mongoose");   // for connecting to the database ( compass app)
const User = require('./models/user');  // here we define  / given reference of model user which is a seperate file .  
const Task = require('./models/task');  // here we define  / given reference of model task which is in a seperate file . 

const app = express();
const port = process.env.PORT || 5000

app.use(express.json())

// here we have created 1st rest api route 
// (route for creating new user) =  start           // route is like /about, /help ,etc 
app.post('/users', (req,res)=>{                     // '/users' is what we will give in = localhost:5000/users in mongodb database
    const user = new User(req.body);

    user.save()
        .then( ()=>{
            res.status(201).send(user)
        })
        .catch( (e)=>{ 
            res.status(400).send(e)
        })
})
// user rest api route =  over




// route for creating new task =  start  
app.post('/tasks' , (req,res)=>{                    // '/tasks' is what we will give in = localhost:5000/tasks in mongodb database
    const task = new Task(req.body);

    task.save()
        .then( ()=>{
            res.status(201).send(task)
        })
        .catch( (e)=>{ 
            res.status(400).send(e)
        })
})

// task rest api route =  over


app.listen(port, ()=>{
    console.log("server is on port "+port);
})  