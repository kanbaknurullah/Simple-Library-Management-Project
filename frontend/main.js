const global = {
    currentPage: 'Main',
    mainClasses: {
        'Main': '.main-container',
        'Library': '.main-listener',
        'Borrow': '.all-songs-listener',
    },
    payload: {}
};

init = () => {
    window.onload = function () {
        if(window.location == 'file:///C:/Users/kanba/Desktop/Project3/code/frontend/borrow.html'){
            setBorrowerPage();
        }else if(window.location == 'file:///C:/Users/kanba/Desktop/Project3/code/frontend/index.html'){
            getBorrowedBooks();
            setMainPageEvents();
        }else if(window.location == 'file:///C:/Users/kanba/Desktop/Project3/code/frontend/library.html'){
            setLibraryPage();
        }

        
        
    }
    
};


getBorrowedBooks = () => {
    let url;
    let rowHTML;


    jQuery.ajax({
        type: "GET",
        url: "http://localhost:5001/main/getBorrowedBooks",
        success: function (response) {
            response.data.books.forEach(function (book) {

                rowHTML = '<tr>'+'<td>' + book.borrower_id + '</td>'+
                          '<td>' + book.title + '</td>'+
                          '<td>' + book.due_date + '</td>'+ '</tr>'
                    ;
                

                jQuery('.borrowedBooksTable > table > tbody').append(rowHTML);

            });

        }
    });
}



setLibraryPage = () => {
    fillTable();

    jQuery('.deleteBookButton').on('click', function () {        
        var bookTitle = jQuery('.deleteBookTitle').val();
        
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:5001/library/deleteBook/" + bookTitle,
            success: function (response) {
                fillTable();
                console.log('successfully deleted')
            }
        });
          
    });


    jQuery('.insertBookButton').on('click', function () { 
        var bookIsbn = jQuery('.insertBookIsbn').val();       
        var bookTitle = jQuery('.insertBookTitle').val();
        var bookAuthor = jQuery('.insertBookAuthor').val();
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:5001/library/insertBook/" + bookIsbn + "/" + bookTitle + "/" + bookAuthor,
            success: function (response) {
                fillTable();
                console.log('successfully inserted')
            }
        });
            
    });

    

    jQuery('.searchButton').on('click', function () { 
        var searchBy = jQuery('.searchBy').val();       
        var keyword = jQuery('.keyword').val();
        var temp = "http://localhost:5001/" + searchBy + "/";

        var keywords = keyword.split(" ");
        for (var i = 0; i < keywords.length - 1; i++) {
            temp = temp  + keywords[i] + "%20";
        }
        temp = temp + keywords[keywords.length-1];
        
        
        jQuery.ajax({
            type: "GET",
            url: temp,
            success: function (response) {
                jQuery('.booksTable > table > tbody > tr').remove();
                response.data.books.forEach(function (book) {

                rowHTML = '<tr>'+'<td>' + book.isbn + '</td>'+
                          '<td>' + book.title + '</td>'+
                          '<td>' + book.author + '</td>'+
                          '<td>' + book.is_borrowed + '</td>'+ '</tr>'
                    ;
                

                jQuery('.booksTable > table > tbody').append(rowHTML);
                });

            }
        });

        
            
    });
}

fillTable = () => {
    var url;
    var rowHTML;


    jQuery.ajax({
        type: "GET",
        url: "http://localhost:5001/getBooks",
        success: function (response) {
            jQuery('.booksTable > table > tbody > tr').remove();
            response.data.books.forEach(function (book) {

                rowHTML = '<tr>'+'<td>' + book.isbn + '</td>'+
                          '<td>' + book.title + '</td>'+
                          '<td>' + book.author + '</td>'+
                          '<td>' + book.is_borrowed + '</td>'+ '</tr>'
                    ;
                

                jQuery('.booksTable > table > tbody').append(rowHTML);

            });

        }
    });
}

setBorrowerPage = () => {
    fillTable();

    jQuery('.borrowButton').on('click', function () {        
        var bookTitle = jQuery('.borrowedBookTitle').val();
        var borrowerId = jQuery('.borrowerId').val();
        console.log(borrowerId);
        console.log(bookTitle);
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:5001/borrow/add/" + bookTitle + "/" + borrowerId + "/",
            success: function (response) {
                fillTable();
                console.log('successfully borrowed')
            }
        });

            
    });

    jQuery('.searchButton').on('click', function () { 
        var searchBy = jQuery('.searchBy').val();       
        var keyword = jQuery('.keyword').val();
        var temp = "http://localhost:5001/" + searchBy + "/";

        var keywords = keyword.split(" ");
        for (var i = 0; i < keywords.length - 1; i++) {
            temp = temp  + keywords[i] + "%20";
        }
        temp = temp + keywords[keywords.length-1];
        
        
        jQuery.ajax({
            type: "GET",
            url: temp,
            success: function (response) {
                jQuery('.booksTable > table > tbody > tr').remove();
                response.data.books.forEach(function (book) {

                rowHTML = '<tr>'+'<td>' + book.isbn + '</td>'+
                          '<td>' + book.title + '</td>'+
                          '<td>' + book.author + '</td>'+
                          '<td>' + book.is_borrowed + '</td>'+ '</tr>'
                    ;
                

                jQuery('.booksTable > table > tbody').append(rowHTML);
                });

            }
        });

        
            
    });
        
    
}




setMainPageEvents = () => {

    jQuery('.borrowerBtn').on('click', function () {        
        window.location = 'file:///C:/Users/kanba/Desktop/Project3/code/frontend/borrow.html';
        
    });

    jQuery('.libraryBtn').on('click', function () {
        window.location = 'file:///C:/Users/kanba/Desktop/Project3/code/frontend/library.html';
 
    });


    jQuery('.searchSubmitBtn').on('click', function () { 
        var searchBy = jQuery('.searchBy').val();       
        var keyword = jQuery('.keyword').val();
        var temp = "http://localhost:5001/main/" + searchBy + "/";

        var keywords = keyword.split(" ");
        for (var i = 0; i < keywords.length - 1; i++) {
            temp = temp  + keywords[i] + "%20";
        }
        temp = temp + keywords[keywords.length-1];

        if(keyword.length == 0){
            temp = "http://localhost:5001/getBorrowedBooks";
        }
        
        console.log(temp);
        jQuery.ajax({
            type: "GET",
            url: temp,
            success: function (response) {
            jQuery('.borrowedBooksTable > table > tbody > tr').remove();
            response.data.books.forEach(function (book) {

                rowHTML = '<tr>'+'<td>' + book.borrower_id + '</td>'+
                          '<td>' + book.title + '</td>'+
                          '<td>' + book.due_date + '</td>'+ '</tr>'
                    ;
                

                jQuery('.borrowedBooksTable > table > tbody').append(rowHTML);

                });

            }
    });


});
    

};


init();