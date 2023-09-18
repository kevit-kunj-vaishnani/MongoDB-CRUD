const express = require('express');
require("./db/mongoose");   // for connecting to the database ( compass app)
const User = require('./models/user');  // here we define  / given reference of model user which is a seperate file .  
const Task = require('./models/task');  // here we define  / given reference of model task which is in a seperate file . 

const app = express();
const port = process.env.PORT || 5000

app.use(express.json())


//---------------------------------------------------------------------------- User ----------------------------------------------------------------------------

                                                    // here we have created 1st rest api route 
                                                    // route for creating new user =  start           // route is like /about, /help ,etc 
app.post('/users', (req,res)=>{                     // '/users' is what we will give in = localhost:5000/users in mongodb database
    const user = new User(req.body);

    user.save()
        .then( ()=>{
            console.log(req.body)
            res.status(201).send(user)
        })
        .catch( (e)=>{ 
            res.status(400).send(e)
        })
})
                                                                // user rest api route =  over


                                                // (this route is for fetching / reading all users) =  start   
app.get('/users', (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    User.find({})
        .then((users) => { 
            res.send(users) 
        })
        .catch((e) => { 
            res.status(500).send(e)
        })
})
                                                        // user rest api route =  over


                                                    // (this route is for fetching / reading 1 user based on id) =  start   
app.get('/users/:id', (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    const _id = req.params.id

    User.findById(_id)
    .then((user) => { 
        if(user === null)
        {
            return res.status(404).send()
        }  
        
        else
        {
            return res.send(user) 
        }
        
    })
    .catch((e) => { 
        res.status(500).send(e)
    })
})
                                                    // user rest api route =  over





// ---------------------------------------------------------------------------- Task ----------------------------------------------------------------------------


                                                                // route for creating new task =  start  
app.post('/tasks' , (req,res)=>{                    // '/tasks' is what we will give in = localhost:5000/tasks in mongodb database
    const task = new Task(req.body);

    task.save()
        .then( ()=>{
            console.log(req.body)
            res.status(201).send(task)
        })
        .catch( (e)=>{ 
            res.status(400).send(e)
        })
})
                                                                // task rest api route =  over

                                                            // route for fetching / reading all tasks = start
app.get('/tasks' , (req,res) => {
    Task.find({})
        .then((tasks) => { 
            res.send(tasks) 
        })
        .catch((e) => { 
            res.status(500).send(e)
        })
})
                                                            // task rest api route =  over



                                                        // route for fetching / reading all tasks = start
app.get('/tasks/:id' , (req,res) => {
    const _id = req.params.id ;

    Task.findById(_id)
    .then((task) => { 
        if(task === null)
        {
            return res.status(404).send()
        }  
        
        else
        {
            return res.send(task) 
        }
    })
})
                                                        // task rest api route =  over                                                                                                                              //task rest api route =  over

app.listen(port, ()=>{
    console.log("server is on port "+port);
})  