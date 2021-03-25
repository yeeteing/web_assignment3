$(document).ready(function(){
   /**
     * This operation binds a click event to the LIST tab
     */
    $("#show-loans").click(function (event) {
        event.preventDefault();
        $("#show-loans-content").show();
        $("#list-loans").empty();
        /**  Assembling the table everytime the button is clicked.
            This will make sure that if things are added, deleted or modified in the other tab,
            this table will be always up to date.
        */
        let tbl = '<table id="table-list-loan"><tr><th>ID</th><th>Book ID</th><th>Date</th><th>Client Name</th><th>Was Returned</th><th>Date of Return</th></tr></table>';
        $("#list-loans").append(tbl);
        // Here we query the server-side
        $.ajax({
            url: '/loans',
            type: 'GET',
            contentType: 'application/json',
            success: function (response) {
                for (let i = 0; i < response.loans.length; i++) {
                    let obj = response.loans[i];

                    console.log(obj);
                    let tbl_line = '';
                    /**  To add an effect in the table, we can apply
                         even and odd classes. */
                    if (i % 2 == 0) {
                        tbl_line = '<tr class="even-row"><td>' + obj._id + '</td><td>' + obj.book_id + '</td><td>' + obj.date + '</td><td>' + obj.client_name + '</td><td>' + obj.was_returned + '</td><td>' +  obj.date_of_return + '</td><tr/>';
                    } else {
                        tbl_line = '<tr class="odd-row"><td>' + obj._id + '</td><td>' + obj.book_id + '</td><td>' + obj.date + '</td><td>' + obj.client_name + '</td><td>' + obj.was_returned + '</td><td>' +  obj.date_of_return + '</td><tr/>';
                    }
                    $("#table-list-loan").append(tbl_line)
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
});