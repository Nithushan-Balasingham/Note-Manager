const asyncHandler = require("express-async-handler")
const Note = require("../models/notemodel")
const jwt = require("jsonwebtoken")
const validToken = require("../middleware/verifyToken")


const addNote = asyncHandler(async (req,res)=>{
    console.log("Note", req.body);
    const {title,description,category} =req.body;
    if(!title || !description || !category){
        res.status(400);
        return res.json({error:"All fields are Mandatory"})
    }
    try {
        const note = await Note.create({
            title,
            description,
            category,
            user_id: req.user.id
        });
        res.status(200).json(note)
    } catch (error) {
       console.error("Error", error.message) 
       return res.status(500).json({error:"Server Error"})
    }
})

const getNotes = asyncHandler(async(req,res)=>{
    try {
        const notes = await Note.find({user_id:req.user.id})
        res.status(200).json(notes)
        console.log(notes)
    } catch (error) {
        console.error("Error" , error.message)
        return res.status(500).json({error:"Server Error"})
    }
})
const getSingleNote = asyncHandler(async(req,res)=>{
    const id = req.params.id;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const note = await Note.findById(id);
        if(!note){
          res.status(404).json("Not  Found")
        }
        if(note.user_id.toString()!== req.user.id){
          res.status(403).json("Not Authorized")
        }
        res.status(200).json(note)
      }
  })

const updateNote = asyncHandler(async(req,res)=>{
    const id = req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const note = await Note.findById(id);
        if(!note){
            res.status(404).json({message:"Not Found"})
        }
        if(note.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("Not Authorized")
        }
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json(updatedNote)

}})

const deleteNote = asyncHandler(async(req,res)=>{
    const id =req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const note = await Note.findById(id);
        if(!note){
            res.status(404)
            throw new Error("Not Found")
        }
        if(note.user_id.toString() !== req.user.id){
            res.status(403);
            throw new Error("Not Authorized")
        }
        await Note.deleteOne({_id:id})
        res.status(200).json(note)
}})

module.exports ={
    addNote,
    getNotes,
    getSingleNote,
    updateNote,
    deleteNote
}