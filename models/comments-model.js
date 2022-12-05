const db = require('../db/connection.js')

exports.selectAllComments = () => {
    return db
    .query('SELECT * FROM comments')
    .then(({rows}) => rows)
};


exports.removeComment = (id) => {
    return db
    .query(`DELETE FROM comments WHERE comment_id = $1`, [id])
    .then(({rowCount}) => {
        if (!rowCount) {
            return Promise.reject({ statusCode: 404, msg: 'Comment not found!'})
        } else {
            return;
        }
    })
}


