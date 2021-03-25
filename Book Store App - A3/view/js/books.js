
$(document).ready(function () {

    $(".book-detail, .event-response").each(function (index) {
        $(this).hide();
    });

    $(".bookNav, .tablinks, .loanNav").hover(function () {
        $(this).css("background-color", "#f0e0e8");
    }, function () {
        $(this).css("background-color", "#f1f1f1");
    })

    $(".bookNav").click(function (index) {
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
                $(this).animate({height: "300px"},1000, 'linear');
            } else {
                $(this).hide();
            }
        });
    }
});