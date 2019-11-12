const distUnits = ["m", "ft", "mi", "km"];
const presUnits = ["atm", "psi", "bar"];
let distIdx = 0;
let presIdx = 0;
let sfd = distUnits[distIdx];
let sfp = presUnits[presIdx];

function depthGauge() {

    //calculates correct height
    const winAdj = $(window).scrollTop() + ($(window).height() / 2);
    const topHt = parseInt($(".top").css("height"));
    let deepm = parseInt((winAdj - topHt) / 10);

    let presTxt = "";
    let deepTxt = "";

    //runs pressure conversions
    switch (presIdx) {
        case 0:
            //atmospheres
            presTxt = parseInt(1 + (deepm / 10));
            break;
        case 1:
            //psi
            presTxt = parseInt(14.6 + (14.6* (deepm / 10)));
            break;

        case 2:
            //bar
            presTxt = parseInt(1 + (deepm / 10));
            break;


    }


    //runs distance conversions
    switch (distIdx) {
        case 0:
            //meters
            deepTxt = deepm;
            break;
        case 1:
            //feet
            deepTxt = parseInt(deepm * 3.28);
            break;

        case 2:
            //miles
            deepTxt = (deepm / 1609.344).toFixed(2);
            break;

        case 3:
            //kilometers
            deepTxt = (deepm / 1000).toFixed(2);
            break;

    }

    //displays text in the DOM
    if (deepm < 0 || deepm > 11000) {
        $("#depthTxt").css("display", "none");
        $("#presTxt").css("display", "none");
    }
    else {
        $("#depthTxt").css("display", "block");
        $("#depthTxt").text(deepTxt + sfd);

        $("#presTxt").css("display", "block");
        $("#presTxt").text(presTxt + sfp);
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
    depthGauge();

    //sticky title functions
    $(window).scroll(function () {
        depthGauge();
        let windowTop = $(window).scrollTop();
        zoneScroll(windowTop);

    })

    //changes distance units
    $("#distTogl").on("click", function () {

        if (distIdx < distUnits.length - 1) {
            distIdx++;
        } else {
            distIdx = 0;
        }

        sfd = distUnits[distIdx];

        $("#distTogl").text(sfd);
    })

    //changes pressure units
    $("#presTogl").on("click", function () {

        if (presIdx < presUnits.length - 1) {
            presIdx++;
        } else {
            presIdx = 0;
        }

        sfp = presUnits[presIdx];

        $("#presTogl").text(sfp);
    })

})