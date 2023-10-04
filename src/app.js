const express = require('express');
require("./db/mongoose");               // for connecting to the database ( compass app)
const User = require('./models/user');  // here we define  / given reference of model user which is a seperate file .  
const Task = require('./models/task');  // here we define  / given reference of model task which is in a seperate file . 

const user_Router = require('./routers/user')   // importing user file from routers folder
const task_Router = require('./routers/task');
const { model } = require('mongoose');

const app = express();
const port = process.env.PORT

// ------------------------------- file / photo upload -----------------------------------------------------------
/*
const multer = require('multer')
const upload = multer({
    dest : 'images',
    limits : {
        fileSize : 1000000
    },
    fileFilter(req,file,cb){
        // if(file.originalname.endsWith('.jpg'))
        if(file.originalname.match(/\.(jpg|jpeg)$/))
        {
            cb(undefined,true)
        }

        else
        {
           cb(new Error('please upload .jpg file'))
        }

    }
})
app.post('/upload'  ,   upload.single('upload') ,   (req,res)=>{
    res.send();
})
*/
// ---------------------------------------------------------------------------------------------------------------

app.use(express.json())

//---------------------------------------------------------------------------- User ----------------------------------------------------------------------------

app.use(user_Router) 

// ---------------------------------------------------------------------------- Task ----------------------------------------------------------------------------

app.use(task_Router)

// ----------------------------------------------------------------------------  ----------------------------------------------------------------------------



module.exports = app