module.exports.sqlQueries = {
    createTables: {
        book: "CREATE TABLE book (book_id INT AUTO_INCREMENT,isbn VARCHAR(13) NOT NULL,title VARCHAR(80) NOT NULL,author VARCHAR(80) NOT NULL,is_borrowed TINYINT(1) DEFAULT(0),PRIMARY KEY(book_id))",
        borrow_list: "CREATE TABLE borrow_list(book_id INT,borrower_id VARCHAR(11), due_date DATE,PRIMARY KEY(book_id),FOREIGN KEY(book_id) REFERENCES book(book_id) ON DELETE CASCADE)",
        
    },
    dropTables: {
        book: "DROP TABLE book",
        borrow_list: "DROP TABLE borrow_list",
       
    },
    get: {
        books: () => {
            return 'SELECT * FROM book';
        },
        booksByTitle: (title) => {
            return `SELECT * FROM book WHERE title = "${title}"`;
        },
        booksByIsbn: (isbn) => {
            return `SELECT * FROM book WHERE isbn = "${isbn}"`;
        },
        booksByAuthor: (authorName) => {
            return `SELECT * FROM book WHERE author = "${authorName}"`;
        },
        borrowedBooks: () => {
            return 'SELECT borrow_list.borrower_id,borrow_list.due_date, book.title FROM borrow_list JOIN book ON borrow_list.book_id = book.book_id ORDER BY borrow_list.borrower_id DESC';
        },

        borrowedBooksByBorrower: (ID) => {
            return 'SELECT borrow_list.borrower_id,borrow_list.due_date, book.title FROM borrow_list JOIN book ON borrow_list.book_id = book.book_id WHERE borrower_id = "${ID}"';
        },
        borrowedBooksByTitle: (title) => {
            return 'SELECT borrow_list.borrower_id,borrow_list.due_date, book.title FROM borrow_list JOIN book ON borrow_list.book_id = book.book_id WHERE title = ${title} ORDER BY borrow_list.borrower_id DESC';
        },

       
    },
    add: {
        book: (isbn, title, author) => {
            return `INSERT INTO book(isbn,title,author,is_borrowed) VALUES("${isbn}","${title}","${author}",0)`
        },
        borrow: (book_id, id, due_date) => {
            return `INSERT INTO borrow_list VALUES(${book_id}, "${id}", "${due_date}")`
        },
        
    },
    update: {
        status: (title) => {
            return `UPDATE book SET is_borrowed = 1 WHERE title = "${title}"`
        },

    },
    
    delete: {
        book: (title) => {
            
            return `DELETE FROM book WHERE book.title = "${title}"`;
        },
        borrow: (bookId) => {
            
            return `DELETE FROM borrow_list WHERE borrow_list.book_id = ${bookId}`;
        }
        
    },
    count: {
        borrowedBook: (id) => {

            return `SELECT COUNT(*) FROM borrow_list WHERE borrower_id = "${id}"`;
        },
       
    },
    createTrigger: {
        afterBorrowAdded: 'CREATE TRIGGER borrow BEFORE INSERT ON borrow_list FOR EACH ROW UPDATE book SET is_borrowed = 1 WHERE NEW.book_ID=book_id',
        
    },
    
}