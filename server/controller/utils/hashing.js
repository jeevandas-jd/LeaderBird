const { hash, compare } = require("bcrypt")


exports.doHash=(vlaue,saltValue)=>{
    const result=hash(vlaue,saltValue);
    return result
}

exports.doHashValidation =(value,hashedValue)=>{
    const result=compare(value,hashedValue);

    console.log(`here is the hash result => ${result}`)
    return result
}