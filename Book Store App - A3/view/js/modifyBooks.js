$(document).ready(function(){
    /**
     * This function will get all the values in the inputs
     * and will create a valid object to be send to the server-side
     */
    function addBook(){
        let book = {};
        book.id = $("#add-id").val();
        book.name = $("#add-name").val();
        book.authors = $("#add-authors").val();
        book.year = $("#add-year").val();
        book.publisher = $("#add-publisher").val();
        return book;
    }
    /**
     * This function binds an event to the add button.
     * The idea is that we assemble a valid object from the form
     * and send it to the server-side.
     */
    $("#add-book-btn").click(function(event){
        event.preventDefault();
         let book = addBook();
       $.ajax({
            url: '/books',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(book),
            success: function(response){
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                $("#add-out").text(JSON.stringify(response));
            },        
            //We can use the alert box to show if there's an error in the server-side
            error: function(xhr, status, error){
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });
});