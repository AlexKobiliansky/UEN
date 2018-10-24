$(document).ready(function() {


    $('ul.sf-menu').superfish();


    /**
     * mobile-mnu customization
     */
    var $toggleMenu = $(".toggle-mnu");

    $toggleMenu.click(function() {
        $(this).toggleClass("on");
        // return false;
    });

    var $mmenu = $("#mobile-mnu").mmenu({
        "navbar": {
            "title" : "УРАЛЭНЕРГОНАЛАДКА",
        },
        "extensions": [
            "position-right",
            "theme-dark",
            "pagedim-black",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-content"
        },
    });

    var API = $mmenu.data("mmenu");

    API.bind( "close:start", function() {
        setTimeout(function() {
            $toggleMenu.removeClass( "on" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    $('.intro-slider').slick({
        infinite: true,
        speed: 600,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 10000,
        prevArrow: "<button type='button' class='slick-prev'></button>",
        nextArrow: "<button type='button' class='slick-next'></button>"
    });

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });

});
