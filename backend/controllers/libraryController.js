const Response = require('../utils/response');
const query = require('../db').query;
const sqlQueries = require('../constants').sqlQueries;

module.exports.insertBook = function (request, response) {
    try {
        query(sqlQueries.add.book(request.params.isbn, request.params.title, request.params.author));

        Response.send(response);

    } catch (error) {
        Response.handleError(response, error);
    }
};

module.exports.deleteBook = async function (request, response) {
    try {
        const books = await query(sqlQueries.delete.book(request.params.title));

        Response.send(response);

    } catch (error) {
        Response.handleError(response, error);
    }
};

