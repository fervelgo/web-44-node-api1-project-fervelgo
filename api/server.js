// BUILD YOUR SERVER HERE

const express = require('express');
const users = require('./users/model')
const server = express()

server.use(express.json())

//GET array of users   

server.get('/api/users', (req,res) => {
    users.find()
    .then( user => {
        res.status(200).json(user)
    })
    .catch( () => {
        res.status(500).json({ message: 'error error error'})
    });
})

// GET users by id

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    users.findById(id)
    .then(users => {
        if (!users) {
            res.status(404).json({ message: 'user not found'})
        } else {
            res.status(200).json(users)
        }
    })
})

// POST Create a new user inside the body of the request

server.post('api/users/',  (req,res) => {
    const { name, bio } = req.body
    users.insert({ name, bio })
    .then( user => {
        res.status(201).json(user)
    })
    .catch( () => {
        res.status(500).json({ message: 'Failed to add user'})
    })
});

//PUT Edit user 

server.put('api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    users.update(id, {name, bio})
    .then(updateUser => {
        if(!updateUser) {
            res.status(404).json({message: 'user not found'})
        } else {
            res.json(updateUser)
        }
    })
    .catch(() => {
        res.status(500).json({message: 'no user updated'})
    })
})

//DELETE Delete a user

server.delete('api/users/:id', (req,res) => {
    const { id } = req.params
    users.remove(id)
    .then(deleted => {
        if(!deleted) {
            res.status(404).json({message: 'could not find user for deleting'})
    } else {
        res.json(deleted)
    }
})
.catch(() =>{
    res.status(500.json({message: 'error deleting'}))
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
