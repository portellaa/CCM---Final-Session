/**
 * Created with JetBrains WebStorm.
 * User: meligaletiko
 * Date: 5/30/13
 * Time: 12:36 AM
 * To change this template use File | Settings | File Templates.
 */
var menuSelected;
var contentActive;
var inviteTimeout = 2000;
var inviteTimer;
var map = null;
var contentString = '<div id="content"><div id="siteNotice"></div><h3 id="firstHeading" class="firstHeading">Auditório Livraria - Universidade de Aveiro</h3><div id="bodyContent" style="text-align: left;"><strong>Para aceder à livraria<strong><ol><li>Descer as escadas</li><li>Virar à direita e continuar em frente</li><li>Passar pelo CUA - Café da Universidade de Aveiro à sua esquerda.</li></ol></div></div>';

function initializeMap() {

    if (map == null)
    {
        var stairs = new google.maps.LatLng(40.631003, -8.658981);
        var mapOptions = {
            zoom: 20,
            center: stairs,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        };

        map = new google.maps.Map($("#map").get(0), mapOptions);

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var marker = new google.maps.Marker({
            position: stairs,
            map: map,
            title: 'Auditório Livraria - Universidade de Aveiro'
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    }
}

function turnInvite()
{
    $("div#invite .invite-img").each(function()
    {
        $("#image-info").css('display', 'none');
        $(this).toggleClass("active");
    });
}

function setTimer()
{
    inviteTimer = setTimeout(function()
    {
        turnInvite();
    }, inviteTimeout);
}

function unsetTimer()
{
    clearTimeout(inviteTimer);
}

$(document).ready(function() {

    menuSelected = $("div#menu.menu a.selected");
    contentActive = $("div#invite.content.active");

    $("#invite-imgs").on('mouseover', function(){
        unsetTimer();
        if ($("#invite-front").hasClass("active"))
            $("#image-info").css('display', 'block');
    });

    $("#invite-imgs").on('mouseout', function(){
        if ($("#invite-front").hasClass("active"))
        {
            $("#image-info").css('display', 'none');
            setTimer();
        }
    });

    $("#invite-imgs").click(function(){
        turnInvite();
    });

    $(".menu > ul > li > a").click(function()
    {
        if (menuSelected.get(0) != $(this).get(0))
        {
            menuSelected = $(this);
            $(".menu > ul > li > a").each(function()
            {
                $(this).removeClass("selected");
            });

            menuSelected.addClass("selected");

            $(contentActive).removeClass("active");
            contentActive = $(menuSelected.attr('href'));
            if (contentActive.selector == "#location")
                initializeMap();
            $(contentActive).addClass("active");
        }

        return false;
    });

    setTimer();
});
