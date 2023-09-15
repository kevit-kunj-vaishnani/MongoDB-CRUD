/*//..............................................................  create start ..............................................................................

// 1) topic =  create = 

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;                       // created an instance of the MongoClient

// const connectionURL = 'mongodb://localhost:27017'              // defined the connection URL for the MongoDB server
// const databaseName = 'task-manager'                            // defined the name of the database 

// MongoClient.connect(connectionURL , { useNewUrlParser : true , useUnifiedTopology: true } , (error,client) => {      //Use the MongoClient.connect method to establish a connection to the MongoDB server using the specified connectionURL
//                                                                                                                       //MongoClient.connect(url , options , callback function)
//         if(error)
//         {
//             return "error";
//         }

//         else
//         {
//             const db = client.db(databaseName);  //  to get a reference to the database inside the callback function we have written = "client.db(databaseName)". Now with a db we can interact with the "task-manager" database.

                                                
//             db.collection('users').insertMany(   // db.collection('users') method is used to specify that we want to work with the "users" collection in "task-manager" database.
//             [                                    // by using insertOne method we have inserted a new document into the "users" collection
//                 {                                                                        
//                     roll :  1 ,                  // field 1
//                     name : 'kunj'                 // field 2
//                 },

//                 {
//                     roll :  2 ,                  
//                     name : 'dev'                
//                 }

//             ], (error,result) => {
//                     if(error)
//                     {
//                         console.log('Unable to insert user');
//                         return ;
//                     }

//                     else
//                     {
//                         console.log(result.ops);        // ops = array of documents that were inserted using insertOne , insertMany 
//                     }
//                 }
//             )

//             return ;
//         }
// })

// for single insert = 

// db.collection('users').insertOne(
//         {
//             roll :  2 ,                  
//             name : 'dev'                
//         }, (error,result) => {
//                 if(error)
//                 {
//                     console.log('Unable to insert user');
//                     return ;
//                         }

//                 else
//                 {
//                     console.log(result.ops);        
//                 }
//         }
// )
//


/* ------------------------------------------------------------------------- ObjectId -----------------------------------------------------------------------

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

//                                              all 3 can be written with destructure = 
//                                         const { MongoClient , ObjectID } = require('mongodb');




// 1(1). printing _id(ObjectId) in terminal as field for insertMany

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;                       
// const ObjectID = mongodb.ObjectID;

// const connectionURL = 'mongodb://localhost:27017'  ;            
// const databaseName = 'task-manager' ;                           

// const objId = new ObjectID();

// MongoClient.connect(connectionURL , { useNewUrlParser : true , useUnifiedTopology: true } , (error,client) => {      
                                                                                                                      
//         if(error)
//         {
//             return "error";
//         }

//         else
//         {
//             const db = client.db(databaseName);  

                                                
//             db.collection('temp').insertMany(   
//             [                                    
//                 {  
//                     _id :  objId,                                                                      
//                     roll :  1 ,                 
//                     name : 'kunj'               
//                 },

//                 {
//                     roll :  2 ,                  
//                     name : 'dev'                
//                 }

//             ], (error,result) => {
//                     if(error)
//                     {
//                         console.log('Unable to insert user');
//                         return ;
//                     }

//                     else
//                     {
//                         console.log(result.ops);        
//                     }
//                 }
//             )

//             return ;
//         }
// })

// output = 

// [
//   { _id: 6502adae99604255f3063fc0, roll: 1, name: 'kunj' },
//   { roll: 2, name: 'dev', _id: 6502adae99604255f3063fc1 }
// ]
//



//  1(2). printing _id(ObjectId) in terminal as field for insertOne


// const { MongoClient , ObjectID } = require('mongodb');

// const connectionURL = 'mongodb://localhost:27017'  ;            // defined the connection URL for the MongoDB server
// const databaseName = 'task-manager' ;                           // defined the name of the database 

// const objId = new ObjectID();

// MongoClient.connect(connectionURL , { useNewUrlParser : true , useUnifiedTopology: true } , (error,client) => {      //Use the MongoClient.connect method to establish a connection to the MongoDB server using the specified connectionURL
//                                                                                                                       //MongoClient.connect(url , options , callback function)
//         if(error)
//         {
//             return "error";
//         }

//         else
//         {
//             const db = client.db(databaseName);  //  to get a reference to the database inside the callback function we have written = "client.db(databaseName)". Now with a db we can interact with the "task-manager" database.

                                                
//             db.collection('users').insertOne(
//                 { 
//                     _id  : objId,
//                     roll :  2 ,                  
//                     name : 'dev'  
                    
//                 }, (error,result) => {
//                         if(error)
//                         {
//                             console.log('Unable to insert user');
//                             return ;
//                         }
        
//                         else
//                         {
//                             console.log(result.ops);        
//                         }
//                 }
//         )

//             return ;
//         }
// })

// output = 

// [ { _id: 6502af33a5636257cd3bc3a8, roll: 2, name: 'dev' } ]




//..............................................................  create end ..............................................................................*/

/*//..............................................................  read start ..............................................................................

// 2) topic = read

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;                       // created an instance of the MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://localhost:27017'              // defined the connection URL for the MongoDB server
const databaseName = 'task-manager'                            // defined the name of the database 

MongoClient.connect(connectionURL , { useNewUrlParser : true , useUnifiedTopology: true } , (error,client) => {      //Use the MongoClient.connect method to establish a connection to the MongoDB server using the specified connectionURL
                                                                                                                      //MongoClient.connect(url , options , callback function)
        if(error)
        {
            return "error";
        }

        else
        {
            const db = client.db(databaseName);  

                                                
            db.collection('users').findOne( { name : 'kunj' }, (error,user) => {
                    if(error)
                    {
                        console.log('Unable to insert user');
                        return ;
                    }

                    else
                    {
                        console.log(user); 
                        return ;       
                    }
                }
            )
        }
})

// output in terminal 
// = 
// { _id: 6502a170657a084920bc568c, roll: 1, name: 'kunj' }

// to find user using _id = 

    // db.collection('users').findOne( { _id : new ObjectID("6502a170657a084920bc568c") } , (error,user)=>{

    //                     } 
    // )


//..............................................................  read end ..............................................................................*/

/*//............................................................  update start ..............................................................................

// 3) topic = update 

// updating fields by searching that user with _id = 

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;                       // created an instance of the MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://localhost:27017'              // defined the connection URL for the MongoDB server
const databaseName = 'task-manager'                            // defined the name of the database 

MongoClient.connect(connectionURL , { useNewUrlParser : true , useUnifiedTopology: true } , (error,client) => {      //Use the MongoClient.connect method to establish a connection to the MongoDB server using the specified connectionURL
                                                                                                                      //MongoClient.connect(url , options , callback function)
        if(error)
        {
            return "error";
        }

        else
        {
            const db = client.db(databaseName);  

                                                
            db.collection('users').updateOne( 
                { _id : new ObjectID("6502a170657a084920bc568d") },
                {
                    $set : {
                        name:'dharmic'
                    }
                }
            )
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
        }
})



// Updating fields by searching that user with name 


// db.collection('users').updateOne( 
//                 { name : 'dev' },
//                 {
//                     $set : {
//                         name:'dhar'
//                     }
//                 }
//             )
//             .then((result) => {
//                 console.log(result);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })



//............................................................  update end ..............................................................................*/

/*//............................................................  delete start ..............................................................................

// 4) delete topic =   

// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;                       // created an instance of the MongoClient
// const ObjectID = mongodb.ObjectID

// const connectionURL = 'mongodb://localhost:27017'              // defined the connection URL for the MongoDB server
// const databaseName = 'task-manager'                            // defined the name of the database 

// MongoClient.connect(connectionURL , { useNewUrlParser : true , useUnifiedTopology: true } , (error,client) => {      //Use the MongoClient.connect method to establish a connection to the MongoDB server using the specified connectionURL
//                                                                                                                       //MongoClient.connect(url , options , callback function)
//         if(error)
//         {
//             return "error";
//         }

//         else
//         {
//             const db = client.db(databaseName);  

                                                
//             db.collection('users').deleteOne( 
//                 { _id : new ObjectID("6502a170657a084920bc568d") }
//             )
//             .then((result) => {
//                 console.log(result);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//         }
// })


/*



const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;                       // created an instance of the MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://localhost:27017'              // defined the connection URL for the MongoDB server
const databaseName = 'task-manager'                            // defined the name of the database 

MongoClient.connect(connectionURL , { useNewUrlParser : true , useUnifiedTopology: true } , (error,client) => {      //Use the MongoClient.connect method to establish a connection to the MongoDB server using the specified connectionURL
                                                                                                                      //MongoClient.connect(url , options , callback function)
        if(error)
        {
            return "error";
        }

        else
        {
            const db = client.db(databaseName);  

                                                
            db.collection('users').deleteMany( 
                { div : A }
            )
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
        }
})




//............................................................  delete end ..............................................................................*/
