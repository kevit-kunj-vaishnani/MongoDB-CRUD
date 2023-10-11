const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const {welcome , cancel} = require('../emails/account.js')
const  logger  = require('../logger.js')
const User_data = require('../models/user')


const router = new express.Router()

                                                                // route for creating new user =  start           // route is like /about, /help ,etc 
router.post('/users', async (req,res)=>{                           // '/users' is what we will give in = localhost:5000/users in mongodb database
    const user = new User(req.body);

    try{
        await user.save()
        welcome(user.email , user.name)                              // save the newly created user object to a database
        const token = await user.generateAuthenticationToken()
        console.log(req.body)
        res.status(201).send({ user: user, token: token})  // aa send thi niche print karse postman ma
    }     
    catch(e){
         res.status(400).send(e)
    }
})
                                                                // user rest api route =  over

                           
                                                                // route for creating new user =  start           // route is like /about, /help ,etc 
router.post('/users/login' , async (req,res) =>{
    try
    {
        const user = await User.findUserByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthenticationToken()
        res.send({ user:user , token:token })  // this will print in postman
        
        logger.info(`${user.name} have login`);

    }
    catch(e)
    {
        res.status(400).send(e)
    }
})
                                                                // user rest api route =  over
                                                                
  
                                                                // route for log out user =  start           // route is like /about, /help ,etc 
router.post('/users/logout', auth, async (req,res) => {
    try 
    {
        console.log(req.token);
        req.user.tokens = req.user.tokens.filter((i) => {
            return i.token !== req.token
        } )

        await req.user.save()
        res.send()

        logger.info(`${req.user.name} have logout`);
    } 
    
    catch(error)
    {
        res.status(500).send(error)
    }
})
                                                               // user rest api route =  over
                                                                

                                                                // route for log out with tokens array clear =  start           // route is like /about, /help ,etc 
router.post('/users/logoutAll', auth, async (req,res) => {
    try 
    {
        req.user.tokens = []

        await req.user.save()
        res.send()
    } 
    
    catch(error)
    {
        res.status(500).send(error)
    }
})
                                                               // user rest api route =  over
 


// Read profile                                                      // (this route is for fetching / reading all users) =  start 
// NOTE = if middleware(auth) calls the next() then only this async function will be executed       
router.get('/users/me', auth,  async (req,res)=>{                    // '/users' is what we will give in = localhost:5000/users in mongodb database
    
    /* code before we added user log in concept
    try{
        const users = await User.find({})
        res.send(users)
    }   
    catch(e){
        res.status(500).send(e)
    }

    */
    res.send(req.user)
})
                                                        // user rest api route =  over


                                                    // (this route is for fetching / reading 1 user based on id) =  start   
router.get('/users/:id',auth ,async (req,res)=>{                // '/users' is what we will give in = localhost:5000/users in mongodb database
    const _id = req.params.id

    try{
        const user = await User.findById({_id:req.params.id , owner:req.user._id})
        
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


router.patch('/users/me', auth, async(req,res) => {                                         // req.body =  { name: 'm1 patel', email: 'm@gmail.com' } . what you have written in compass to update in patch user.
    const updates = Object.keys(req.body)                                               // Object.keys(req.body) = [name , email] = updates
    const updates_allowed_on_column = [ 'name' , 'email' , 'age' , 'password' ]     
    const isValidOperation =  updates.every((i) => updates_allowed_on_column.includes(i))    

    if(isValidOperation===false)
    {
        res.status(400).send({ error : 'invalid update' })
    }

    try{
 
        updates.forEach((i) => req.user[i]=req.body[i])                     // user = {_id: new ObjectId("650a8fdeab00c33b24aa4a1a"), name: 'm1 patel' ,email: 'm@gmail.com', password: '$2a$08$t3HnaUnSyoKrqf59oaVWcuueCEkX.eW9Ml80oiBwF3PsYbdD6C532', __v: 0 } what is already in compass / database
        await req.user.save()                                               // user[i]=req.body[i]   ->   user[name]=req.body[name]

        res.send(req.user)

    }
    catch(e)
    {
        res.status(400).send(e)
    }
})


router.delete('/users/me', auth, async (req,res) => {
    try{
        const user = await User.findOneAndDelete({_id: req.user._id})     // remove is user defined method and not built in method . here as soon as this is call it will do whatever we have defined in userSchema remove in models user
        cancel(req.user.email , req.user.name)
        if (user===null ) 
        {
            res.status(400).send('User Not Found');
        }

        else
        {
            res.send(req.user) 
        }

    }catch(e){
        res.status(500).send(e)
    }
}) 


// ------------------------------- file / photo upload ----------------------------------------------
const upload = multer ({
    // dest : 'avatars',        // folder name in vs code where this photos will be saved in vs code
    limits : { 
        fileSize:1000000
    },
    fileFilter(req,file,cb)
    {
        if(file.originalname.match(/\.(png|jpg|jpeg)$/))
        {
            cb(undefined,true)            
        }

        else
        {
           cb(new Error('please upload png / jpg / jpeg file'))
        }
    }
})

router.post('/users/me/avatar'  , auth ,   upload.single('avatar') ,  async (req,res)=>{                        // avatar is folder name where image is saved
        const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()    

        req.user.avatar =  buffer                             // to set  
        await req.user.save()
        res.send()

}, ( error, req, res, next ) => {                                       // this is another call back function as parameter which is used to handle error
    res.status(400).send({'error': error.message})
}
);

router.delete('/users/me/avatar'  , auth ,  async (req,res)=>{                        // avatar is folder name where image is saved

        req.user.avatar = undefined                                     // to delete
        await req.user.save()
        res.send() 
}       
);

router.get('/users/:id/avatar' , async (req, res) => {
    try{
        const user = await User.findById(req.params.id)

        if(user===null || user.avatar===null)
        {
            throw new Error()
        }

        else
        {
            res.set('Content-Type' , 'image/jpg')
            res.send(user.avatar)
        }
    }

    catch(error){
        res.status(404).send()
    }
})
// -----------------------------------------------------------------------------

module.exports = router
