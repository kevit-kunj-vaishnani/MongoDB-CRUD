// ------------------------------- file / photo upload -----------------------------------------------------------

const multer = require('multer')

const multer = require('multer')
const upload = multer({
    dest : 'images'
})


app.post('/upload'  ,   upload.single('upload') ,   (req,res)=>{
    res.send();
})

// ---------------------------------------------- ----------------------------------------------------------------



// ------------------------------- file / photo upload -----------------------------------------------------------
const multer = require('multer')
const upload = multer({
    dest : 'images',
    limits : {
        fileSize : 1000000
    },
    fileFilter(req,file,cb){
        if(file.originalname.endsWith('.jpg'))
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
// ---------------------------------------------- ----------------------------------------------------------------
