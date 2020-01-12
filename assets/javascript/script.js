const distUnits = ["m", "ft", "mi", "km"];
const presUnits = ["atm", "psi", "bar"];
let distIdx = 0;
let presIdx = 0;

//depth gauge changes with scrolling
function depthGauge() {

    //calculates correct height
    let topHt = parseInt($(".top").css("height"));
    const winAdj = $(window).scrollTop() + ($(window).height() / 2);
    let deepm = parseInt((winAdj - topHt) / 10);


    let presTxt = "";
    let deepTxt = "";
    let sfd = distUnits[distIdx];
    let sfp = presUnits[presIdx];

    //sets toggle display
    $("#presTogl").text(sfp);
    $("#distTogl").text(sfd);

    //runs pressure conversions
    switch (presIdx) {
        case 0:
            //atmospheres
            presTxt = parseInt(1 + (deepm / 10));
            break;
        case 1:
            //psi
            presTxt = parseInt(14.6 + (14.6 * (deepm / 10)));
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

function mapScroll(windowTop) {

    let windowHt = $(window).height();
    let mapHt = parseInt($(".minimap").css("height"));
    let oceanDpth = parseInt($("#wholeocean").css("height"));
    //adjusts thickness of slider based on height
    let winscale = (windowHt * parseInt(mapHt)) / parseInt(oceanDpth);
    let slider = $("#mapslider");
    let sliderHt = parseInt($("#mapslider").css("height"));

    //sets mapslider size based on window
    $("#mapslider").css("height", winscale);

    //scrolls map slider based on window
    let scrollscale = (windowTop / oceanDpth) * mapHt;
    if (windowTop > 500 && scrollscale < (mapHt - sliderHt)) {
        slider.css({ top: scrollscale });
        //prevents slider from going past bottom of map
    } else if (scrollscale > (mapHt - sliderHt)) {
        slider.css({ top: (mapHt - sliderHt) });
    }
    else {
        slider.css({ top: 0 });
    }
}

function zoneScroll(windowTop) {

    let zone;
    let topHt = parseInt($(".top").css("height"));

    //epipelagic zone scrolling
    if (windowTop > topHt && windowTop < 2000 + topHt) {
        zone = $("#epiZone");
    } else {
        $("#epiZone").css("position", "static");
    }
    //mesopelagic zone scrolling
    if (windowTop > 2000 + topHt && windowTop < 10000 + topHt) {
        zone = $("#mesoZone");
    } else {
        $("#mesoZone").css("position", "static");
    }
    //bathypelagic zone scrolling
    if (windowTop > 10000 + topHt && windowTop < 40000 + topHt) {
        zone = $("#bathyZone");
    } else {
        $("#bathyZone").css("position", "static");
    }
    //abyssopelagic zone scrolling
    if (windowTop > 40000 + topHt && windowTop < 60000 + topHt) {
        zone = $("#abyssZone");
    } else {
        $("#abyssZone").css("position", "static");
    }
    //hadopelagic zone scrolling
    if (windowTop > 60000 + topHt) {
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

//click map to automatically scroll
function mapGo(location) {
    //let mapHt = parseInt($(".minimap").css("height"));
    //calculation to translate part clicked to location on page
    //let location = parseInt(((relY * oceanDpth) / mapHt));
    //goes to surface in position above slider
    // if (relY < 0) {
    //     location = surface;
    // } else if (relY > mapHt) {
    //     location = deep;
    // }

    console.log(location);

    //scrolls to location
    $('html, body').animate({
        scrollTop: location
    },
        1500,
    );

}

$(document).ready(function () {
    let windowTop = $(window).scrollTop();
    //HUD persistence
    depthGauge();
    mapScroll(windowTop);
    //sets top and ocean floor
    $(".oceanfloor").css("height", (($(window).height() / 1.5)));
    //$(".top").css("height", (($(window).height() / 1.5)));

    //sticky title functions
    $(window).scroll(function () {
        windowTop = $(window).scrollTop();
        depthGauge();
        zoneScroll(windowTop);
        mapScroll(windowTop);

    });

    //responsiveness for window resizing
    $(window).resize(function () {
        //adjusts top and ocean floor to match gauge height
        $(".oceanfloor").css("height", (($(window).height() / 1.5)));
        $(".top").css("height", (($(window).height() / 1.5)));
        mapScroll($(window).scrollTop());
    });

    //changes distance units
    $("#distTogl").on("click", function () {

        if (distIdx < distUnits.length - 1) {
            distIdx++;
        } else {
            distIdx = 0;
        }

        depthGauge();
    });

    //changes pressure units
    $("#presTogl").on("click", function () {

        if (presIdx < presUnits.length - 1) {
            presIdx++;
        } else {
            presIdx = 0;
        }

        depthGauge();
    });

    //change map visibility
    $("#mapTogl").on("click", function () {

        // console.log($("#mapTogl").css("text-decoration"));

        $(".minimap").toggle();

        if ($("#mapTogl").css("text-decoration") === "none solid rgb(255, 255, 255)") {
            $("#mapTogl").css("text-decoration", "line-through");
        } else {
            $("#mapTogl").css("text-decoration", "none");
        }
    });

    //lines visibility
    $("#linesTogl").on("click", function () {

        if ($("#linesTogl").css("text-decoration") === "none solid rgb(255, 255, 255)") {
            $("#linesTogl").css("text-decoration", "line-through");
            $(".ocean").css("outline", "none");
        } else {
            $("#linesTogl").css("text-decoration", "none");
            $(".ocean").css("outline", "2px solid white");
        }
    });


    $(".mapNav").click(function (event) {

        let topHt = parseInt($(".top").css("height"));
        let oceanDpth = parseInt($("#wholeocean").css("height"));
        let location = 0;

        switch ($(this).attr("id")) {
            case "goSurface":
                break;

            case "mapEpi":
                location = topHt - ($(window).height() / 2);
                break;

            case "goDeep":
                location = topHt + oceanDpth - ($(window).height() / 2);
                break;
        }

        mapGo(location);
    });


    //changes options visibility
    $("#menu").on("click", function () {

        $("#optionsMenu").toggle();

        if ($("#optionsMenu").css("display") === "block") {
            $("#menu").html("&#10005;");
        } else {
            $("#menu").html("&#9776;")
        }

    });

})