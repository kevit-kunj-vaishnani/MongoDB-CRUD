// require('../src/db/mongoose.js')
// const Task = require('../src/models/task.js')

// Task.findByIdAndDelete('65080701237a3e7554cd4e6d')
//     .then((task) => {
//         console.log(task);
//         return Task.countDocuments({ completed : false })
//     })
//     .then((result) => {
//         console.log(result)
//     })
//     .catch((e) => {
//         console.log(e);
//     })


require('../src/db/mongoose.js')
const Task = require('../src/models/task.js')

const delete_Task_And_Count = async (id) => {
    const task = await Task.findByIdAndDelete(id) // first id is column/field name in database in task model and second id is value user has given in function
    const count = await Task.countDocuments( { completed : false })
    return count;
}

delete_Task_And_Count('650846889f2382afbef9dc82')
    .then((count) => {
        console.log(count);
    })
    .catch((e) => {
        console.log(e);
    })