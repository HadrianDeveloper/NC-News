const {selectAllUsers} = require("../models/users-model.js");

exports.getAllUsers = (req, res, next) => {
    selectAllUsers()
    .then((usersArray) => {
        res.status(200).send({ allUsers: usersArray })
    })
    .catch(next)
}