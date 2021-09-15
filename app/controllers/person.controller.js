const Person = require('./app/models/person.model');

// create new person
exports.create = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: "Person can't be empty"
        })
    }

    const person = new Person({
        title: req.body.title || "Untitled person",
        content: req.body.content
    })

    Person.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send(err.message.json())
        })
}

// get all persons
exports.findAll = (req, res) => {
    Person.find()
        .then(persons => {
            res.send(persons)
        })
        .catch(err => {
            res.status(500).send(err.message.json())
        })
}

// find a person with Id
exports.findOne = (req, res) => {
    Person.findById(req.params.id)
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found"
                })
            }

            res.send(person)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Person not found with id ${req.params.id}`
                })
            }
            return res.status(500).send({
                message: `Error retrieving while person. id: ${req.params.id}, ${err.message}`
            })
        })
}

// update a person identified by the id
exports.update = (req, res) => {
    if (!req.body.content) {
        return res.status(400).send({
            message: `Person content cannot be empty`
        })
    }

    Person.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled person",
        content: req.body.content
    }, { new: true })
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: `Person not found with Id: ${req.params.id}`
                })
            }
            res.send(person)
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Person not found with id ${req.params.id}`
                })
            }
            return res.status(500).send({
                message: `Error retrieving while person. id: ${req.params.id}, ${err.message}`
            })
        })
}

// delete a person with the specified id
exports.delete = (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(person => {
            if (!person) {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.id
                });
            }
            res.send({
                message: `Person deleted succ!`
            })
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Person not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete person with id " + req.params.id
            });
        })
};