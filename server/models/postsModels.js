const { User } = require("lucide-react")
const mongoos=require("mongoose")

const postSchema=mongoos.Schema({

    title:{
        typeof:String,
        required:[true,"title is required"],
        trim:true,
    },
    description:{
        typeof:String,
        required:[true,"description id is required"],
        trim:true,
    },
    userId:{
        type:mongoos.Types.ObjectId,
        ref:"User",
        requred:true,
    }
},{
    timestamps:true
})

module.exports =mongoos.Model('postSchema');