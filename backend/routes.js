const borrowerController = require('./controllers/borrowerController');
const libraryController = require('./controllers/libraryController');
const mainViewController = require('./controllers/mainViewController');
const db = require('./db');

// Initialize the routes.
module.exports.initialize = function (app) {
    app.post('/borrow/add/:bookTitle/:id', borrowerController.borrowBook);

    app.get('/getBooks', borrowerController.getBooks);

    app.get('/searchByTitle/:bookTitle', borrowerController.searchByTitle);
    app.get('/searchByIsbn/:bookIsbn', borrowerController.searchByIsbn);
    app.get('/searchByAuthor/:bookAuthor', borrowerController.searchByAuthor);

    app.get('/main/getBorrowedBooks', mainViewController.getBorrowedBooks);
    app.get('/main/searchBorrowedByBorrower/:borrowerId', mainViewController.searchBorrowedByBorrower);
    app.get('/main/searchBorrewedByTitle/:bookTitle', mainViewController.searchBorrowedByTitle);

    app.post('/library/insertBook/:isbn/:title/:author', libraryController.insertBook);
    app.post('/library/deleteBook/:title', libraryController.deleteBook);

  
    
}