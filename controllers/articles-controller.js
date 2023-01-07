const { 
        selectAllArticles, 
        selectArticleById, 
        selectCommentsForArticle, 
        insertComment, 
        updateArticle } = require("../models/articles-model.js");
const { 
        checkArticleExists, 
        checkUserExists, 
        checkTopicExists, 
        checkObjectStructure } = require("../utils/utils.js")

exports.getAllArticles = (req, res, next) => {

    const {query} = req;

    if (query.topic) {
        checkTopicExists(query.topic)
        .then((topicExists) => {
            if (!topicExists) next({ statusCode: 404, msg: 'Topic not found!'});
        })
    };

    selectAllArticles(query)
    .then((allArticles) => {
        res.status(200).send({allArticles: allArticles})
    })
    .catch(next)
};

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id; 
    const isValidInput = (/^\d*$/);

    if (!isValidInput.test(id)) {
        next({ statusCode: 400, msg: 'Bad request - invalid input!'})
    };
    
    selectArticleById(id)
    .then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
};

exports.getArticleById2 = (req, res, next) => {
    selectArticleById(req.params.article_id)
    .then((article) => {
        res.status(200).send({ article })
    })
    .catch(next)
};

exports.getCommentsForArticle = (req, res, next) => {
    const id = req.params.article_id

    checkArticleExists(id)
    .then((exists) => {
        if (exists) {
            selectCommentsForArticle(id)
            .then((results) => res.status(200).send(results))
            .catch((err) => next(err))
        } else {
            return Promise.reject({statusCode: 404, msg: 'No article with that ID' })
        }
    })
    .catch((err) => {
        next(err)
    })
};

exports.postComment = (req, res, next) => {
    const id = req.params.article_id;
    const body = req.body;

    if (!checkObjectStructure('POST', body)) next({ 
        statusCode: 400, msg: 'Bad request! Missing or incorrect properties' 
    });    

    checkUserExists(body.username)
    .then((userExists) => {
        if (!userExists) {
            next({statusCode: 401, msg: 'User not found' });
        };
        return checkArticleExists(id);
    })
    .then((articleExists) => {
        if (!articleExists) {
            next({ statusCode: 404, msg: 'No article with that ID' });
        };
        return insertComment(id, body);    
    })
    .then(({rows}) => {
        res.status(201).send({article: rows[0]});
    })
    .catch((err) => {
        next(err);
    })
};

exports.patchArticle = (req, res, next) => {

    const id = req.params.article_id;
    const votesObj = req.body;

    if (!checkObjectStructure('PATCH', votesObj)) next({ 
        statusCode: 400, msg: 'Bad request! Missing or incorrect properties' 
    });    

    checkArticleExists(id)
    .then((articleExists) => {
        if (!articleExists) next({ statusCode: 404, msg: 'No article with that ID' });
        return updateArticle(id, votesObj)
    })
    .then((updatedObject) => {
        res.status(200).send({article: updatedObject})
    })
    .catch((err) => next(err))
};
