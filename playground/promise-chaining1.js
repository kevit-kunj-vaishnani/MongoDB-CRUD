// require('../src/db/mongoose.js')
// const User = require('../src/models/user.js')

// User.findByIdAndUpdate('65040645f97b34625010681c' , { age : 90} )
//     .then((user) => {
//         console.log(user)
//         return User.countDocuments({ age : 90 })
//     })
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((e) => {
//         console.log(e);
//     })


require('../src/db/mongoose.js')
const User = require('../src/models/user.js')

const Update_Age_And_Count = async (id, age) => {
    const user = await User.findByIdAndUpdate(id , {age:age})   // first age is column/field name in database user model and second age is value user has given in function
    const count = await User.countDocuments({age:age})
    return count;
}

Update_Age_And_Count('65044222b9242e0ce0240d38', 24)
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    })