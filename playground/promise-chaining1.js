require('../src/db/mongoose.js')
const User = require('../src/models/user.js')

User.findByIdAndUpdate('65040645f97b34625010681c' , { age : 90} )
    .then((user) => {
        console.log(user)
        return User.countDocuments({ age : 90 })
    })
    .then((result) => {
        console.log(result)
    })
    .catch((e) => {
        console.log(e);
    })
