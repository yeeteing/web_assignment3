
$(document).ready(function () {

    $(".book-detail, .event-response").each(function (index) {
        $(this).hide();
    });

    $(".bookNav, .tablinks, .loanNav").hover(function () {
        $(this).css("background-color", "#f0e0e8");
    }, function () {
        $(this).css("background-color", "#f1f1f1");
    })

    $(".tablinks").click(function (index) {
        // get the clicked id
        let this_id = $(this).attr('id');
        $("button").removeClass("activeTab")
        $(this).addClass("activeTab")
    });

    $(".bookNav").click(function (index) {
        // get the clicked id
        let this_id = $(this).attr('id');
        $("button").removeClass("activeBook")
        $(this).addClass("activeBook")
        
        changeModifyContents(this_id);

        $(".event-response").each(function (index) {
            $(this).show();
        });
    });

    function changeModifyContents(clickedId) {

        $(".book-detail").each(function () {
            let this_id = $(this).attr('id');
            if (this_id.includes(clickedId.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
});