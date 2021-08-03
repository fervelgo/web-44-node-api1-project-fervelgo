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

module.exports = {}; // EXPORT YOUR SERVER instead of {}
