/**
 * This script manages the components of the LIST tab
 */

$(document).ready(function () {
    /**
     * This operation binds a click event to the LIST tab
     */
    $("#show-books").click(function (event) {
        event.preventDefault();
        $("#show-books-content").show();
        $("#list-books").empty();
        /**  Assembling the table everytime the button is clicked.
            This will make sure that if things are added, deleted or modified in the other tab,
            this table will be always up to date.
        */
        let tbl = '<table id="table-list"><tr><th>ID</th><th>Name</th><th>Authors’ name</th><th>Year</th><th>Publisher</th></tr></table>';
        $("#list-books").append(tbl);
        // Here we query the server-side
        $.ajax({
            url: '/books',
            type: 'GET',
            contentType: 'application/json',
            success: function (response) {
                for (let i = 0; i < response.books.length; i++) {
                    let obj = response.books[i];

                    console.log(obj);
                    let tbl_line = '';
                    /**  To add an effect in the table, we can apply
                         even and odd classes. */
                    if (i % 2 == 0) {
                        tbl_line = '<tr class="even-row"><td>' + obj._id + '</td><td>' + obj.name + '</td><td>' + obj.authors + '</td><td>' + obj.year + '</td><td>' + obj.publisher + '</td><tr/>';
                    } else {
                        tbl_line = '<tr class="odd-row"><td>' + obj._id + '</td><td>' + obj.name + '</td><td>' + obj.authors + '</td><td>' + obj.year + '</td><td>' + obj.publisher + '</td><tr/>';
                    }
                    $("#table-list").append(tbl_line)
                }
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
            },
            // If there's an error, we can use the alert box to make sure we understand the problem
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    $("#detail-book").click(function (event) {
        $("#list-book-detail").empty();
    })

    /**
     * This function binds an event to the find contact button.
     */
    $("#find-book-btn").click(function (event) {
        event.preventDefault();
        $("#list-book-detail").empty();
        /**  Assembling the table everytime the button is clicked.
            This will make sure that if things are added, deleted or modified in the other tab,
            this table will be always up to date.
        */
        let tbl = '<table id="list"><tr><th>ID</th><th>Name</th><th>Authors’ name</th><th>Year</th><th>Publisher</th></tr></table>';
        $("#list-book-detail").append(tbl);
        let book_id = $("#find-id").val();

        $.ajax({
            url: '/books/' + book_id,
            type: 'GET',
            contentType: 'application/json',
            success: function (response) {
                const obj = response.book;
                console.log(response);
                $("#find-out").text(response.msg);
                let tbl_line = '';
                tbl_line = '<tr class="even-row"><td>' + obj._id + '</td><td>' + obj.name + '</td><td>' + obj.authors + '</td><td>' + obj.year + '</td><td>' + obj.publisher + '</td><tr/>';

                $("#list").append(tbl_line)
                $("#find-id").val('');
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});