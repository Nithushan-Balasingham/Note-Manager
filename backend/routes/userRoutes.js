const express = require("express")
const {addNewUser, loginUser, currentUser, logoutUser, updateUser, deleteUserAccount, getSingleUser} = require('../controllers/usercontroller')
const validToken = require("../middleware/verifyToken")

const router = express.Router()

router.post("/register",addNewUser)
router.post("/auth",loginUser)
router.post("/logout", logoutUser)
router.route("/:id").put(updateUser).delete(validToken,deleteUserAccount).get(getSingleUser)



module.exports = router