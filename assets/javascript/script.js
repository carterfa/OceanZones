

$(window).scroll( function (){
    if ($(window).scrollTop() > 500 && $(window).scrollTop() < 2400){
        $("#epiZone").css("position", "fixed");
        $("#epiZone").css("top", 0);
        $("#epiZone").css("left", 0);
    }else{
        $("#epiZone").css("position", "static");
    }
})