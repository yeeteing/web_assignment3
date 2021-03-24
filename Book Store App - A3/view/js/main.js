/**
 * Run this scripts on loan
 * When dom is ready, hide two books and loans content.
 * When one if (books or loans) is clicked, show the content
 */
$(document).ready(function () {
    // hide the books and loans content while DOM ready
    $(".content").each(function (index) {
        $(this).hide();
    });

    // if any of the link is clicked, shows the content
    $(".tablinks").click(function () {
        changeContents($(this).text());
    });

    // function for switching contents
    function changeContents(tab_element_clicked) {
        $(".content").each(function (index) {
            let this_id = $(this).attr('id');
            if (this_id.includes(tab_element_clicked.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

});