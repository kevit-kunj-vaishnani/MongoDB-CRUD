const express = require('express')
const User = require('../models/user')

const router = new express.Router()

                                                                // route for creating new user =  start           // route is like /about, /help ,etc 
router.post('/users', async (req,res)=>{                           // '/users' is what we will give in = localhost:5000/users in mongodb database
    const user = new User(req.body);

    try{
        await user.save()
        console.log(req.body)
        res.status(201).send(user)
    }   
    catch(e){
         res.status(400).send(e)
    }
})
                                                                // user rest api route =  over


                                                        // (this route is for fetching / reading all users) =  start   
router.get('/users', async (req,res)=>{                    // '/users' is what we will give in = localhost:5000/users in mongodb database
    
    try{
        const users = await User.find({})
        res.send(users)
    }   
    catch(e){
        res.status(500).send(e)
    }
})
                                                        // user rest api route =  over


                                                    // (this route is for fetching / reading 1 user based on id) =  start   
router.get('/users/:id', async (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        
        if(user === null)
        {
            res.status(404).send()
        }

        else
        {
            res.send(user) 
        }
    }
    catch(e){
        res.status(500).send(e)
    }

})
                                                    // user rest api route =  over


router.patch('/users/:id' , async(req,res) => { 
    const updates = Object.keys(req.body)
    const updates_allowed_on_column = [ 'name' , 'email' , 'age' , 'password' ]     
    const isValidOperation =  updates.every((i) => updates_allowed_on_column.includes(i))    
    
    if(isValidOperation===false)
    {
        res.status(400).send({ error : 'invalid update' })
    }

    try{
        const user = await User.findByIdAndUpdate(req.params.id , req.body , { new : true, runValidators: true})

        if(user===null){
            res.status(404).send()
        }

        else{
            res.send(user)
        }
    }
    catch(e)
    {
        res.status(400).send()
    }
})


router.delete('/users/:id' , async(req,res) => {
    try 
    {
        const user = await User.findByIdAndDelete(req.params.id)

        if(user===null)
        {
            res.status(404).send()
        }

        else
        {
            res.send(user)
        }
    } 
    
    catch(e)
    {
        res.status(500).send()
    }
}) 

module.exports = router
