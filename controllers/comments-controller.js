const { removeComment, selectAllComments } = require("../models/comments-model.js");

exports.getAllComments = (req, res, next) => {
    selectAllComments()
    .then((allComments) => {
        res.status(200).send({comments: allComments})
    })
    .catch(next)
}

exports.deleteCommentById = (req, res, next) => {
    
    const commentId = req.params.comment_id;

    removeComment(commentId)
    .then(() => {
        res.status(204).send()
    })
    .catch(next)
};


