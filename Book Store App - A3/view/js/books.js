
$(document).ready(function () {
    $(".book-detail, .event-response").each(function (index) {
        $(this).hide();
    });

    $(".bookNav").click(function (index) {
        // get the clicked id
        let this_id = $(this).attr('id');
        changeModifyContents(this_id);

        $(".event-response").each(function (index) {
            $(this).show();
        });
    });

    function changeModifyContents(modifyContnet) {
        $(".book-detail").each(function () {
            let this_id = $(this).attr('id');
            if (this_id.includes(modifyContnet.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
});