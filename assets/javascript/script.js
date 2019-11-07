
//sticky title functions
$(window).scroll(function () {

    //epipelagic zone scrolling
    if ($(window).scrollTop() > 500 && $(window).scrollTop() < 2400) {
        $("#epiZone").css("position", "fixed");
        $("#epiZone").css("top", 0);
        $("#epiZone").css("left", 0);
    } else {
        $("#epiZone").css("position", "static");
    }

    //mesopelagic zone scrolling
    if ($(window).scrollTop() > 2500 && $(window).scrollTop() < 10400) {
        $("#mesoZone").css("position", "fixed");
        $("#mesoZone").css("top", 0);
        $("#mesoZone").css("left", 0);
    } else {
        $("#mesoZone").css("position", "static");
    }

    //bathypelagic zone scrolling
    if ($(window).scrollTop() > 10550 && $(window).scrollTop() < 40500) {
        $("#bathyZone").css("position", "fixed");
        $("#bathyZone").css("top", 0);
        $("#bathyZone").css("left", 0);
    } else {
        $("#bathyZone").css("position", "static");
    }

    //abyssopelagic zone scrolling
    if ($(window).scrollTop() > 40600 && $(window).scrollTop() < 60650) {
        $("#abyssZone").css("position", "fixed");
        $("#abyssZone").css("top", 0);
        $("#abyssZone").css("left", 0);
    } else {
        $("#abyssZone").css("position", "static");
    }

    //hadopelagic zone scrolling
    if ($(window).scrollTop() > 60700) {
        $("#hadoZone").css("position", "fixed");
        $("#hadoZone").css("top", 0);
        $("#hadoZone").css("left", 0);
    } else {
        $("#hadoZone").css("position", "static");
    }
})