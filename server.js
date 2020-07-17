const express = require("express")
const db = require("./users_model")

const server = express()

const port = process.env.PORT || 5000

server.use(express.json())

server.get("/", async (req, res, next) => {
    try{
        const users = await db.get()
        res.status(200).json(users)
    } catch(err) {
        next(err)
    }
})

server.post("/", async (req, res, next) => {
    try{
        const newUser = await db.add(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        next(err)
    }
})


server.delete("/:id", async (req, res, next) => {
    try{
        const deletedUser = await db.del(req.params.id)
        res.status(200).json(deletedUser)
    } catch(err) {
        next(err)
    }
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong"
    })
})

// use this when runing test so the the server does not keep listening after jest has finished the test 
// what this is basically saying is: if this module is being required into another file then don't start the server
// we don't need to start the server when using supertest 

if (!module.parent) { 
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`)
    })  
}


module.exports = server
