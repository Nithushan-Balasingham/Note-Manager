const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter the Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter the Password"]
    },
},{
    timestamps:true
})
const Users = mongoose.model.User || mongoose.model('user', userSchema);
module.exports = Users; 
