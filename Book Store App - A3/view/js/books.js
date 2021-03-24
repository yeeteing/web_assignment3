
$(document).ready(function () {
    $(".modify, .book-detail, .event-response").each(function (index) {
        $(this).hide();
    });

    $(".modifyBookNav").click(function (index) {
        // get the clicked id
        let this_id = $(this).attr('id');
        changeModifyContents(this_id);

        $(".event-response").each(function (index) {
            $(this).show();
        });
    });

    $(".detailBookNav").click(function (index) {
        // get the clicked id
        let this_id = $(this).attr('id');
        changeDetailContents(this_id);

        $(".event-response").each(function (index) {
            $(this).show();
        });
    });

    function changeModifyContents(modifyContnet) {
        $(".modify").each(function () {
            let this_id = $(this).attr('id');
            if (this_id.includes(modifyContnet.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    function changeDetailContents(modifyContnet) {
        $(".book-detail").each(function () {
            let this_id = $(this).attr('id');
            console.log(this_id)
            if (this_id.includes(modifyContnet.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
});