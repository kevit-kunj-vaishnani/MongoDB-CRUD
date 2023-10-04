// terminal ~ 
// npm test



const request  = require('supertest')
const app = require('../src/app')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User_data = require('../src/models/user')

const userOneId = new mongoose.Types.ObjectId()

// simple object creted
const userOne = {
    _id: userOneId,
    name : 'abhi',
    email : 'abhi@gmail.com',
    password : 12345678,
    tokens: [{
        token : jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}


beforeEach(async () => {   // before testing it will clear database always
    await User_data.deleteMany()

    const user = new User_data(userOne)
    await user.save()
})

test('should sign-up new user', async () => {  
    const response = await request(app).post('/users').send({  
            name : 'kunj',
            email : 'kunj@gmail.com',
            password : 12345678
    }).expect(201)     


    // Assert that database was changed correctly
    const user = await User_data.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'kunj',
            email: 'kunj@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('12345678')
})                       // post = http method , '/users' = url path


test('should login existing user' , async () => {  
    const response = await request(app).post('/users/login').send({  
        email : userOne.email,
        password : `${userOne.password}`
}).expect(200) 

    // below code will check condition written in line 63. and fails test case if condition gets false
    const user = await User_data.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('should login non-existing user' , async () => {  
    await request(app).post('/users/login').send({  
        email : userOne.email,
        password : `fvfsfddf`
}).expect(400) 
})


test('should get profile for user who is login', async ()=> {  
    await request(app)
                .get('/users/me')
                .set('Authorization' , `Bearer ${userOne.tokens[0].token}` )    //  Authorization is header in postman
                .send()
                .expect(200)     
})  

test('should not get profile for user who is login', async ()=> {  
    await request(app)
                .get('/users/me')
                .send()
                .expect(401)
}) 


test('delete account of user' , async () => {
    await request(app)
    .delete('/users/me')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}` )    //  Authorization is header in postman
    .send()
    .expect(200)

    // below code will check condition written in line 101. and fails test case if condition gets false
    const user = await User_data.findById(userOneId)
    expect(user).toBeNull()
})


test('should not delete account of un_authorised user' , async() => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})


test('should upload avatar image' , async () => {


     await request(app)
    .post('/users/me/avatar')
    .set('Authorization' , `Bearer ${userOne.tokens[0].token}` )    //  Authorization is header in postman
    .attach('avatar' , 'tests/fixtures/kunj.jpeg')
    .expect(200)

    // below code will check condition written in line 120. and fails test case if condition gets false
    const user = await User_data.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('should update existing user' , async () => {  
    await request(app)
            .patch('/users/me')
            .set('Authorization' , `Bearer ${userOne.tokens[0].token}` )    //  Authorization is header in postman
            .send({name:'abhi'})
            .expect(200) 
    
    // below code will check condition written in line 137. and fails test case if condition gets false
    const user = await User_data.findById(userOneId)
    expect(user.name).toEqual('abhi')
})


test('should not update field which does not exist' , async () => {  
    await request(app)
            .patch('/users/me')
            .set('Authorization' , `Bearer ${userOne.tokens[0].token}` )    //  Authorization is header in postman
            .send({location:'pune'})
            .expect(400) 
})