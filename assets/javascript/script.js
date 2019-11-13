const distUnits = ["m", "ft", "mi", "km"];
const presUnits = ["atm", "psi", "bar"];
let distIdx = 0;
let presIdx = 0;


function depthGauge() {

    //calculates correct height
    const winAdj = $(window).scrollTop() + ($(window).height() / 2);
    const topHt = parseInt($(".top").css("height"));
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
    let mapHt = parseInt($("#minimap").css("height"));
    let oceanDpth = parseInt($("#wholeocean").css("height"));
    let winscale = (windowHt * parseInt(mapHt)) / parseInt(oceanDpth) * 10;
    let slider = $("#mapslider");
    let sliderHt = parseInt($("#mapslider").css("height"));

    //sets mapslider size based on window
    $("#mapslider").css("height", winscale);


    //scrolls based on window
    let scrollscale = (windowTop / oceanDpth) * mapHt;
    if (windowTop > 500 && scrollscale < (mapHt - sliderHt)) {
        slider.css({ top: scrollscale });
    } else if (scrollscale > (mapHt - sliderHt)) {
        slider.css({ top: (mapHt - sliderHt) });
    }
    else {
        slider.css({ top: 0 });
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

function mapGo(relY) {
    let mapHt = parseInt($("#minimap").css("height"));
    let oceanDpth = parseInt($("#wholeocean").css("height"));
    let windowTop = $(window).scrollTop();
    const topHt = parseInt($(".top").css("height"));

    let location = parseInt(((relY * oceanDpth) / mapHt) + topHt);

    console.log(location);

    $('html, body').animate({ 
        scrollTop: location}, 
        1400, 
     );

}

$(document).ready(function () {
    //depth gauge persistence
    depthGauge();
    //sets ocean floor
    $(".oceanfloor").css("height", (($(window).height() / 2)));


    //sticky title functions
    $(window).scroll(function () {
        depthGauge();
        let windowTop = $(window).scrollTop();
        zoneScroll(windowTop);
        mapScroll(windowTop);

    });


    $(window).resize(function () {
        //adjusts ocean floor to gauge height
        $(".oceanfloor").css("height", (($(window).height() / 2)));
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
    })

    //changes pressure units
    $("#presTogl").on("click", function () {

        if (presIdx < presUnits.length - 1) {
            presIdx++;
        } else {
            presIdx = 0;
        }

        depthGauge();
    })

    $("#minimap").click(function (event) {
        let offset = $(this).offset();
        let relY = event.pageY - offset.top;
        console.log(relY);
        mapGo(relY);
    });

})