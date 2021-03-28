$(document).ready(function () {
    $(".loan-content, .event-response").each(function (index) {
        $(this).hide();
    });

    $(".loanNav").click(function (index) {
        // get the clicked id
        let this_id = $(this).attr('id');
        $("button").removeClass("activeLoan")
        $(this).addClass("activeLoan")
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
                $(this).animate({height: "300px"},1000, 'linear');
            } else {
                $(this).hide();
            }
        });
    }
});