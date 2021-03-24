/* Loan.
id: The loan’s unique identifier.
book id: A reference to the book’s id that was on loan.
date: The date of the loan.
client name: The name of the client who borrowed the book.
was returned: The information if the book was returned.
date of return */


$(document).ready(function () {
    $(".loan-content, .event-response").each(function (index) {
        $(this).hide();
    });

    $(".loanNav").click(function (index) {
        // get the clicked id
        let this_id = $(this).attr('id');
        changeModifyContents(this_id);

        $(".event-response").each(function (index) {
            $(this).show();
        });
    });

    function changeModifyContents(modifyContnet) {
        $(".loan-content").each(function () {
            let this_id = $(this).attr('id');
            if (this_id.includes(modifyContnet.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
});