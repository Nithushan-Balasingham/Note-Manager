const mongoose = require ("mongoose")

const noteSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    title:{
        type:String,
        required:[true,"Plesae Enter the note title"]
    },
    description:{
        type:String,
        required:[true, "Please Enter the description"]
    },
    category:{
        type:String,
        enum:["work", "personal"],
        required:[true,"Plesae Enter the category"]
    }
},{
    timestamps:true
})

const Notes = mongoose.model.note || mongoose.model('note', noteSchema);

module.exports = Notes
