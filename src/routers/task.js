const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

                                                            // route for creating new task =  start  
router.post('/tasks' , async (req,res)=>{                   // '/tasks' is what we will give in = localhost:5000/tasks in mongodb database
    const task = new Task(req.body);

    try {
        await task.save()                                   // if anything in try block gets error then catch block will be executed
        console.log(req.body)
        res.status(201).send(task)
    } 
    catch(e) {
        res.status(400).send(e)
    }
})
                                                            // task rest api route =  over

                                                            // route for fetching / reading all tasks = start
router.get('/tasks' , async (req,res) => {
    
    try {
        const tasks = await Task.find({})
        res.send(tasks) 
    } 
    catch(e) {
        res.status(500).send(e)
    }
})
                                                            // task rest api route =  over



                                                        // route for fetching / reading all tasks = start
router.get('/tasks/:id' , async (req,res) => {
    const _id = req.params.id ;

    try {
        const task = await Task.findById(_id)

        if(task === null)
        {
            res.status(404).send()
        }  
        
        else
        {
            res.send(task) 
        }     
    } 
    catch(e){ 
        res.status(500).send(e)
    }

})
                                                        // task rest api route =  over      
                                                        
                                                        // route for updating 1 task = start

router.patch('/tasks/:id' , async(req,res) => { 
const updates = Object.keys(req.body)
    const updates_allowed_on_column = [ 'discription' , 'completed' ]     
    const isValidOperation =  updates.every((i) => updates_allowed_on_column.includes(i))    
    
    if(isValidOperation===false)
    {
        res.status(400).send({ error : 'invalid update' })
    }
                                                        
    try{
        const task = await Task.findByIdAndUpdate(req.params.id , req.body , { new : true, runValidators: true})
                                                        
        if(task===null){
            res.status(404).send()
        }
                                                        
        else{
            res.send(task)
        }
    }
    catch(e)
    {
        res.status(400).send()
    }
})
                                                        // task rest api route =  over 

                                                        // route for deleting 1 task = start
router.delete('/tasks/:id' , async(req,res) => {
    try 
    {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(task===null)
        {
            res.status(404).send()
        }

        else
        {
            res.send(task)
        }
    } 
    
    catch(e)
    {
        res.status(500).send()
    }
}) 
                                                        // task rest api route =  over 


module.exports = router