/* Loan.
id: The loan’s unique identifier.
book id: A reference to the book’s id that was on loan.
date: The date of the loan.
client name: The name of the client who borrowed the book.
was returned: The information if the book was returned.
date of return */
$(document).ready(function () {
    /**
     * This function will get all the values in the inputs
     * and will create a valid object to be send to the server-side
     */
    function setLoan() {
        let loan = {};
        loan.id = $("#loan-add-id").val();
        loan.book_id = $("#loan-add-bookId").val();
        loan.date = $("#loan-add-date").val();
        loan.client_name = $("#loan-add-clientName").val();
        loan.was_returned = $("#loan-add-wasReturned").prop("checked");
        loan.date_of_return = $("#loan-add-dateReturned").val();
        return loan;
    }

    function clearAddLoan() {
        $("#loan-add-id").val('');
        $("#loan-add-bookId").val('');
        $("#loan-add-date").val('');
        $("#loan-add-clientName").val('');
        $("#loan-add-wasReturned").prop("checked",false);
        $("#loan-add-wasNotReturned").prop("checked",false);
        $("#loan-add-dateReturned").val('');
    }
    /**
     * This function binds an event to the add button.
     * The idea is that we assemble a valid object from the form
     * and send it to the server-side.
     */
    $("#add-loan-btn").submit(function (event) {
        event.preventDefault();
        let loan = setLoan();

        $.ajax({
            url: '/loans',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loan),
            success: function (response) {
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
                clearAddLoan();
            },
            //We can use the alert box to show if there's an error in the server-side
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    $("#loan-update-id").on("input", function (event) {
        event.preventDefault();
        let updateId = $(this).val();
        if (updateId !== null || updateId !== undefined) {
            $.ajax({
                url: '/loans/' + updateId,
                type: 'GET',
                contentType: 'application/json',
                success: function (response) {
                    const obj = response.loan;
                    
                    if (obj === undefined || obj === null) {
                        $("#loan-update-bookId").val('');
                        $("#loan-update-date").val('');
                        $("#loan-update-clientName").val('');
                        $("#loan-update-wasReturned").prop('checked', false);
                        $("#loan-update-wasNotReturned").prop('checked', false);
                        $("#loan-update-dateReturned").val('');
                    } else {
                        $("#loan-update-bookId").val(obj.book_id);
                        $("#loan-update-date").val(obj.date);
                        $("#loan-update-clientName").val(obj.client_name);
                        obj.was_returned ? $("#loan-update-wasReturned").prop('checked', true) : $("#loan-update-wasNotReturned").prop('checked', true);
                        $("#loan-update-dateReturned").val(obj.date_of_return);
                    }
                },
                error: function (xhr, status, error) {
                    var errorMessage = xhr.status + ': ' + xhr.statusText
                    alert('Error - ' + errorMessage);
                }
            });
        }
    });

    function updateLoan() {
        let loan = {};
        loan.id = $("#loan-update-id").val();
        loan.book_id = $("#loan-update-bookId").val();
        loan.date = $("#loan-update-date").val();
        loan.client_name = $("#loan-update-clientName").val();
        loan.was_returned = $("#loan-update-wasReturned").prop("checked");
        loan.date_of_return = $("#loan-update-dateReturned").val();
        return loan;
    }

    function clearUpdateLoan() {
        $("#loan-update-id").val('');
        $("#loan-update-bookId").val('');
        $("#loan-update-date").val('');
        $("#loan-update-clientName").val('');
        $("#loan-update-wasReturned").prop("checked",false);
        $("#loan-update-wasNotReturned").prop("checked",false);
        $("#loan-update-dateReturned").val('');
    }

    $("#update-loan-btn").submit(function (event) {
        event.preventDefault();
        const updateId = $("#loan-update-id").val();
        const loan = updateLoan();
        
        $.ajax({
            url: '/loans/' + updateId,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(loan),
            success: function (response) {
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
                clearUpdateLoan();
            },
            //We can use the alert box to show if there's an error in the server-side
            error: function (xhr, status, error) {
                console.log(error)
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

    $("#delete-loan-btn").submit(function (event) {
        event.preventDefault();
        let deleteID = $("#loan-delete-id").val();
        console.log(deleteID)
        $.ajax({
            url: '/loans/' + deleteID,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                // We can print in the front-end console to verify
                // what is coming back from the server side
                console.log(JSON.stringify(response));
                $("#add-out").append("<p> $" + JSON.stringify(response.msg) + "</p>");
                $("#loan-delete-id").val('');
            },
            //We can use the alert box to show if there's an error in the server-side
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                alert('Error - ' + errorMessage);
            }
        });
    });

});