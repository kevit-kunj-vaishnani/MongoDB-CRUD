const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

                                                            // route for creating new task =  start  
router.post('/tasks', auth, async (req,res)=>{                   // '/tasks' is what we will give in = localhost:5000/tasks in mongodb database
     const task = new Task({
        ...req.body ,
        owner : req.user._id
     });

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

                                                            // route for fetching / reading all tasks of user who has log in = start
router.get('/tasks/me', auth, async (req,res) => {
    
    const match = {}
    const sort = {}

    if(req.query.completed)
    {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy)
    {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc'?-1 :  1
    } 

    try {   
        // const tasks = await Task.find({owner:req.user._id})
        // console.log(tasks);
        // res.send(tasks) 

        // above 3 or below 3
        await req.user.populate({
            path : 'mytasks' ,
            match ,
            options : {
                limit : parseInt(req.query.limit) ,
                skip : parseInt(req.query.skip) ,
                sort
            }
        })
        console.log(req.user.mytasks);
        /* when user is login as kunj = then all task of only kunj will be shown
                        [
                            {
                                _id: new ObjectId("650c35315f23805e33c9e033"),
                                discription: 'this is created by kunj',
                                completed: false,
                                owner: new ObjectId("650c32f0d50c0167667130a7"),
                                __v: 0
                            },
                            {
                                _id: new ObjectId("650d1fcf156e2157c7794710"),
                                discription: 'today i am at home',
                                completed: false,
                                owner: new ObjectId("650c32f0d50c0167667130a7"),
                                __v: 0
                            }
                        ]
        */
        res.send(req.user.mytasks) 
    } 
    catch(e) {
        res.status(500).send(e)
    }
})
                                                            // task rest api route =  over



                                                        // route for fetching / reading all tasks = start
router.get('/tasks/:id' ,auth ,async (req,res) => {
    // const _id = req.params.id ;

    try {
        const task = await Task.findOne({_id:req.params.id , owner:req.user._id})       // this req.params.id is id we will give in route '/tasks/:id'
                                            
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

router.patch('/tasks/:id', auth, async(req,res) => { 
const updates = Object.keys(req.body)
    const updates_allowed_on_column = [ 'discription' , 'completed' ]     
    const isValidOperation =  updates.every((i) => updates_allowed_on_column.includes(i))    
    
    if(isValidOperation===false)
    {
        res.status(404).send({ error : 'invalid update' })
    }
                                                        
    try{
        /* before when no login part was introduced

        const task = await Task.findById(req.params.id)

        //const task = await Task.findByIdAndUpdate(req.params.id , req.body , { new : true, runValidators: true})
                                                        
        if(task===null){
            res.status(404).send()
        }
                                                        
        else{
            updates.forEach((i) => task[i]=req.body[i])
            await task.save()

            res.send(task)
        }
        
        */

        // now a user who has login can only update his task =
        const task = await Task.findOne({_id: req.params.id , owner:req.user._id})

        if(task===null){
            res.status(404).send()
        }
                                                        
        else{
            updates.forEach((i) => task[i]=req.body[i])
            await task.save()

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
router.delete('/tasks/:id', auth, async(req,res) => {
    try 
    {
        /* before when no login part was introduced

        const task = await Task.findByIdAndDelete(req.params.id)

        if(task===null)
        {
            res.status(404).send()
        }

        else
        {
            res.send(task)
        }

        */
        
        // now a user who has login can only delete his task =
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})

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