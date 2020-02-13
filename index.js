// implement your API here
const express = require('express');
const data = require('./data/db.js');

const server = express();

server.use(express.json());

// GET all Users
server.get('/api/users', (req, res) => {
    data.find() 
        .then(db => {
            res.status(200).json(db)
        })
        .catch(err => {
            res.status(500).json({message: 'The user information could not be retrieved'})
        })
})

// GET User with Id
server.get('/api/users/:id', (req, res) => {

    data.findById(req.params.id)
        .then( user => {
            user ? res.status(200).json(user) : res.status(404).json({ message: "The user with the specified ID does not exist"});
        })
})

//Create User
server.post('/api/users', (req, res) => {

    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        data.insert(req.body)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({message: "There was an error while saving the user to the database"})
            })
    }
})


//Edit user
server.put('/api/users/:id', (req, res) => {

    if(!req.params.id) {
        res.status(404).json({ message: "The user with the specified ID does not exist"});
    } else if (!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user"});
    } else {
        data.update(req.body)
            .then(user => {
                res.status(200).json(user)
            })
            .catch(error => {
                res.data(500).json({ message: "The user information could not be modified"});
            });
    }
 })
 
// DELETE user
 server.delete("/api/users/:id", (req, res) => {

     if(!req.params.id){
         res.status(404).json({ message: "The user with specified ID does not exist"})
     } else {
         data.remove(req.params.id)
            .then(user => {
                res.status(200).json({ message: "The user has been deleted"})
            })
     }
 })


const port = 5000;
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});