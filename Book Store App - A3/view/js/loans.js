/* Loan.
id: The loan’s unique identifier.
book id: A reference to the book’s id that was on loan.
date: The date of the loan.
client name: The name of the client who borrowed the book.
was returned: The information if the book was returned.
date of return */


$(document).ready(function () {
    /**
     * If add a loa button is clicked
     * show a form
     */
    $("#add-a-loan").click(function (event) {
        console.log('l')
    });

    /**
     * If show loans button is clicked
     * show a form
     */
    $("#show-loans").click(function (event) {
        console.log('ls')
    });

    /**
     * If update loan button is clicked
     * show a form
     */
    $("#update-loan").click(function (event) {
        console.log('i')
    });

    /**
     * If delete loan button is clicked
     * show a form
     */
    $("#delete-loan").click(function (event) {
        console.log('sx')
    });

});