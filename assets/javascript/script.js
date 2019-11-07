
function deepText() {
    let deep = parseInt(($(window).scrollTop() + $(window).height() - 500) / 10);
    if (deep < 0) {
        $("#depthTxt").text("0m");
    } else {
        $("#depthTxt").text(deep + "m");
    }
}

$(document).ready(function () {
    //sticky title functions
    $(window).scroll(function () {
        deepText();

        let windowTop = $(window).scrollTop();
        //epipelagic zone scrolling
        if (windowTop > 500 && windowTop < 2500) {
            $("#epiZone").css("position", "fixed");
            $("#epiZone").css("top", 0);
            $("#epiZone").css("left", 0);
        } else {
            $("#epiZone").css("position", "static");
        }

        //mesopelagic zone scrolling
        if (windowTop > 2500 && windowTop < 10500) {
            $("#mesoZone").css("position", "fixed");
            $("#mesoZone").css("top", 0);
            $("#mesoZone").css("left", 0);
        } else {
            $("#mesoZone").css("position", "static");
        }

        //bathypelagic zone scrolling
        if (windowTop > 10500 && windowTop < 40500) {
            $("#bathyZone").css("position", "fixed");
            $("#bathyZone").css("top", 0);
            $("#bathyZone").css("left", 0);
        } else {
            $("#bathyZone").css("position", "static");
        }

        //abyssopelagic zone scrolling
        if (windowTop > 40500 && windowTop < 60500) {
            $("#abyssZone").css("position", "fixed");
            $("#abyssZone").css("top", 0);
            $("#abyssZone").css("left", 0);
        } else {
            $("#abyssZone").css("position", "static");
        }

        //hadopelagic zone scrolling
        if (windowTop > 60500) {
            $("#hadoZone").css("position", "fixed");
            $("#hadoZone").css("top", 0);
            $("#hadoZone").css("left", 0);
        } else {
            $("#hadoZone").css("position", "static");
        }
    })

})