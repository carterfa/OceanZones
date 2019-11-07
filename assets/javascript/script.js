let feet = false;

function deepText() {

    //calculates correct height
    let deepm = parseInt(($(window).scrollTop() + ($(window).height() / 2) - 500) / 10);
    let sf = "m";

    //runs conversion to feet if toggled
    if (feet === true) {
        deepTxt = parseInt(deepm * 3.28);
        sf = "ft";
    } else {
        deepTxt = deepm;
        sf = "m";
    }

    //displays text in the DOM
    if (deepm < 0) {
        $("#depthTxt").css("display", "none");
    } else if (deepm > 11000) {
        $("#depthTxt").css("display", "none");
    }
    else {
        $("#depthTxt").css("display", "block");
        $("#depthTxt").text(deepTxt + sf);
    }

}

function zoneScroll(windowTop) {

    let zone;

    //epipelagic zone scrolling
    if (windowTop > 500 && windowTop < 2500) {
        zone = $("#epiZone");
    } else {
        $("#epiZone").css("position", "static");
    }
    //mesopelagic zone scrolling
    if (windowTop > 2500 && windowTop < 10500) {
        zone = $("#mesoZone");
    } else {
        $("#mesoZone").css("position", "static");
    }
    //bathypelagic zone scrolling
    if (windowTop > 10500 && windowTop < 40500) {
        zone = $("#bathyZone");
    } else {
        $("#bathyZone").css("position", "static");
    }
    //abyssopelagic zone scrolling
    if (windowTop > 40500 && windowTop < 60500) {
        zone = $("#abyssZone");
    } else {
        $("#abyssZone").css("position", "static");
    }
    //hadopelagic zone scrolling
    if (windowTop > 60500) {
        zone = $("#hadoZone");
    } else {
        $("#hadoZone").css("position", "static");
    }

    if (zone) {
        zone.css("position", "fixed");
        zone.css("top", 0);
        zone.css("left", 0);
    }

}

$(document).ready(function () {
    //depth gauge persistence
    deepText();
    //sticky title functions
    $(window).scroll(function () {
        deepText();
        let windowTop = $(window).scrollTop();
        zoneScroll(windowTop);

    })

    //changes units
    $(".unitTogl").on("click", function () {
        feet = !feet;
        if (feet) { $(".unitTogl").text("FT"); }
         else { $(".unitTogl").text("M"); }
    })

})