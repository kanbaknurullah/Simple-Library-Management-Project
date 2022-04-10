const Response = require('../utils/response');
const query = require('../db').query;
const sqlQueries = require('../constants').sqlQueries;

module.exports.getBorrowedBooks = async function (request, response) {
    try {
        const books = await query(sqlQueries.get.borrowedBooks());

        Response.send(response, {
            books: books
        });

    } catch (error) {
        Response.handleError(response, error);
    }
};

module.exports.searchBorrowedByBorrower = async function (request, response) {
    try {
        var mysqlQuery = 'SELECT borrow_list.borrower_id, borrow_list.due_date, book.title FROM borrow_list JOIN book ON borrow_list.book_id = book.book_id WHERE borrower_id = ' + request.params.borrowerId;
        const books = await query(mysqlQuery);

        Response.send(response, {
            books: books
        });

    } catch (error) {
        Response.handleError(response, error);
    }
};

module.exports.searchBorrowedByTitle = async function (request, response) {
    try {
        var mysqlQuery = 'SELECT borrow_list.borrower_id,borrow_list.due_date, book.title FROM borrow_list JOIN book ON borrow_list.book_id = book.book_id WHERE title = \'' + request.params.bookTitle + '\'';
        const books = await query(mysqlQuery);

        Response.send(response, {
            books: books
        });

    } catch (error) {
        Response.handleError(response, error);
    }
};
