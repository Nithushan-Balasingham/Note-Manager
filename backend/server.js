const express = require('express')
const connectDb = require("./dbconfig/dbConfig")
const dotenv = require ('dotenv').config()
const cors = require('cors')

connectDb()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/notes",require("./routes/notesRoutes"))
app.use(cors())
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
