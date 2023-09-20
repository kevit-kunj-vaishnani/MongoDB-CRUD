const bcrypt = require('bcrypt')

const f = async () => {
    const password = 'kunjv2512002'
    const hashPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashPassword);

    const did_It_Match = await bcrypt.compare('kunjv25' , hashPassword)
    console.log(did_It_Match);
}

f()