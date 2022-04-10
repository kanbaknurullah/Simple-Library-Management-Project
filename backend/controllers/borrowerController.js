const Response = require('../utils/response');
const query = require('../db').query;
const sqlQueries = require('../constants').sqlQueries;



module.exports.getBooks = async function (request, response) {
    try {
        const books = await query(sqlQueries.get.books());

        Response.send(response, {
            books: books
        });
        
    } catch (error) {
        Response.handleError(response, error);
    }
};



module.exports.borrowBook = async function (request, response) {
    try {
        const book = await query(sqlQueries.get.booksByTitle(request.params.bookTitle));
        var date = new Date();
        date.setDate(date.getDate() + 15);
        const numOfBorrowed = await query(sqlQueries.count.borrowedBook(request.params.id));
        if (numOfBorrowed == 8 || book[0].is_borrowed == 1 || request.params.id.length != 11) {
            Response.handleError(response, error);
            console.log("entered if");
        } else {
            query(sqlQueries.add.borrow(book[0].book_id, request.params.id, date.toISOString().slice(0, 10)));
            console.log(book[0].book_id + ' ' + request.params.id + ' ' + date.toISOString().slice(0, 10));
            Response.send(response);

        }
       

    } catch (error) {
        console.log('error!');
        Response.handleError(response, error);
    }
};

module.exports.searchByTitle = async function (request, response) {
    try {
        const books = await query(sqlQueries.get.booksByTitle(request.params.bookTitle));

        Response.send(response, {
            books: books
        });

    } catch (error) {
        Response.handleError(response, error);
    }
};

module.exports.searchByIsbn = async function (request, response) {
    try {
        
        const books = await query(sqlQueries.get.booksByIsbn(request.params.bookIsbn));

        Response.send(response, {
            books: books
        });
        
    } catch (error) {
        Response.handleError(response, error);
    }
};

module.exports.searchByAuthor = async function (request, response) {
    try {
        const books = await query(sqlQueries.get.booksByAuthor(request.params.bookAuthor));

        Response.send(response, {
            books: books
        });

    } catch (error) {
        Response.handleError(response, error);
    }
};
