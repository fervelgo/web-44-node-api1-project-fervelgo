// BUILD YOUR SERVER HERE

const express = require('express');
const Users = require('./users/model')
const server = express()

server.use(express.json())

//GET array of users   

server.get('/api/users', (req,res) => {
    Users.find()
    .then( user => {
        res.status(200).json(user)
    })
    .catch( () => {
        res.status(500).json({ message: "The users information could not be retrieved"})
    });
})

// GET users by id

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    Users.findById(id)
    .then(users => {
        if (!users) {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else {
            res.status(200).json(users)
        }
    })
})

// POST Create a new user inside the body of the request

server.post('/api/users',  (req,res) => {
    const user = req.body
    Users.insert(user)
    .then( newUser => {
        console.log(user)
        res.status(201).json(newUser)
    })
    .catch( () => {
        res.status(500).json({ message: "There was an error while saving the user to the database"})
    })
});

//PUT Edit user 

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    Users.update(id, {name, bio})
    .then(updateUser => {
        if(!updateUser) {
            res.status(404).json({message: "The user with the specified ID does not exist" })
        } else {
            res.json(updateUser)
        }
    })
    .catch(() => {
        res.status(500).json({message: "The user information could not be modified"})
    })
})

//DELETE Delete a user

server.delete('/api/users/:id', (req,res) => {
    const { id } = req.params
    Users.remove(id)
    .then(deleted => {
        if(!deleted) {
            res.status(404).json({message: "The user with the specified ID does not exist"})
    } else {
        res.json(deleted)
    }
})
.catch(() =>{
    res.status(500).json({message: "The user could not be removed"})
})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}