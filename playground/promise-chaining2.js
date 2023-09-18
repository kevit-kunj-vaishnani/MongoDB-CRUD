require('../src/db/mongoose.js')
const Task = require('../src/models/task.js')

Task.findByIdAndDelete('65080701237a3e7554cd4e6d')
    .then((task) => {
        console.log(task);
        return Task.countDocuments({ completed : false })
    })
    .then((result) => {
        console.log(result)
    })
    .catch((e) => {
        console.log(e);
    })
