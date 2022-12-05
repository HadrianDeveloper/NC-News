const { rows } = require('pg/lib/defaults.js');
const db = require('../db/connection.js')

exports.selectAllTopics = () => {
    return db
    .query('SELECT * FROM topics')
    .then(({rows}) => {
        return (rows.length) ? rows 
            : Promise.reject({ 
                statusCode: 204, msg: 'No data to retrieve. Topics table empty!'
            })
    })
};

