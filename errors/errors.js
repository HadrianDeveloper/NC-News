exports.handle404s = (req, res) => {
    res.status(404).send({msg: 'URL not found'})
};

exports.handleCustomErrors = (err, req, res, next) => {
    const { statusCode, msg } = err;
    res.status(statusCode).send({msg})
};

exports.handlePSQLerrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad request!'})
    } else {
        next(err)
    }
};

