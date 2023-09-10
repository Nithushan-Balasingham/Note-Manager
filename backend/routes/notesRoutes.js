const express = require("express")
const { addNote, getNotes, getSingleNote, updateNote, deleteNote } = require("../controllers/notescontroller")
const validToken = require("../middleware/verifyToken")
const router = express.Router()



router.route('/addnote').post(validToken,addNote)

router.route("/").get(validToken,getNotes)
router.route("/:id").get(validToken,getSingleNote).put(validToken,updateNote).delete(validToken,deleteNote)




module.exports=router