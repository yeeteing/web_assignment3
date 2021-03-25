$(document).ready(function () {
    /**
     * This function will get all the values in the inputs
     * and will create a valid object to be send to the server-side
     */
    function setBook() {
        let book = {};
        book.id = $("#add-id").val();
        book.name = $("#add-name").val();
        book.authors = $("#add-authors").val();
        book.year = $("#add-year").val();
        book.publisher = $("#add-publisher").val();
        return book;
    }

    function clearAddForm() {
        $("#add-id").val('');
        $("#add-name").val('');
        $("#add-authors").val('');
        $("#add-year").val('');
        $("#add-publisher").val('');
    }
    /**
     * This function binds an event to the add button.
     * The idea is that we assemble a valid object from the form
     * and send it to the server-side.
     */
    $("#add-book-btn").click(function (event) {
        event.preventDefault();
        let book = setBook();
        $.ajax({
            url: '/books',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(book),
            success: function (response) {
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
                clearAddForm();
            },
            //We can use the alert box to show if there's an error in the server-side
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    $("#update-id").on("input", function (event) {
        event.preventDefault();
        let updateId = $(this).val();
        console.log($(this).val());
        
        $.ajax({
            url: '/books/' + updateId,
            type: 'GET',
            contentType: 'application/json',
            success: function (response) {
                const obj = response.book;
                console.log(obj)
                if(obj === undefined || obj === null){
                    $("#update-name").val('');
                    $("#update-authors").val('');
                    $("#update-year").val('');
                    $("#update-publisher").val('');
                } else {
                    $("#update-name").val(obj.name);
                    $("#update-authors").val(obj.authors);
                    $("#update-year").val(obj.year);
                    $("#update-publisher").val(obj.publisher);
                }
                
            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    function clearUpdateForm() {
        $("#update-id").val('');
        $("#update-name").val('');
        $("#update-authors").val('');
        $("#update-year").val('');
        $("#update-publisher").val('');
    }

    function updateBook() {
        let book = {};
        book.name = $("#update-name").val();
        book.authors = $("#update-authors").val();
        book.year = $("#update-year").val();
        book.publisher = $("#update-publisher").val();
        return book;
    }

    $("#update-book-btn").click(function (event) {
        event.preventDefault();
        const updateId = $("#update-id").val();
        const book = updateBook();
        console.log(book)
        $.ajax({
            url: '/books/' + updateId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(book),
            success: function (response) {
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
                clearUpdateForm();
            },
            //We can use the alert box to show if there's an error in the server-side
            error: function (xhr, status, error) {
                console.log(error)
            
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    $("#delete-book-btn").click(function (event) {
        event.preventDefault();
        let deleteID = $("#delete-id").val();
        console.log(deleteID)
        $.ajax({
            url: '/books/' + deleteID,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
                $("#delete-id").val('');
            },
            //We can use the alert box to show if there's an error in the server-side
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});