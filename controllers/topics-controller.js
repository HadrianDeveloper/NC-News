const { selectAllTopics } = require("../models/topics-model")

exports.getAllTopics = (req, res, next) => {
    selectAllTopics()
    .then((allTopics) => {
        res.status(200).send({ allTopics: allTopics })
    })
    .catch(next)
};

