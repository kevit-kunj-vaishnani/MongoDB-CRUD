const jwt = require('jsonwebtoken')

const f = async () => {
    const token = jwt.sign({ _id : 'abcdeg'}, 'this is web token' , { expiresIn: '7 days'})
    console.log(token);

    const data = jwt.verify(token, 'this is web token')
    console.log(data)
}

f()