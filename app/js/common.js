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

    $('.objects-slider').slick({
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 10000,
        prevArrow: "<button type='button' class='slick-prev'></button>",
        nextArrow: "<button type='button' class='slick-next'></button>"
    });

    $('.feed-slider').slick({
        infinite: true,
        slidesToShow: 2,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 10000,
        prevArrow: "<button type='button' class='slick-prev'></button>",
        nextArrow: "<button type='button' class='slick-next'></button>",
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.feed-slider').photoswipe();

    if ($(window).width() >= 767) {
        $('.notice-item').equalHeights();
    }


    $('.grid-content').masonry({
        itemSelector: '.grid-item',
        columnWidth: 1,
    });


    $('.adv-stat').circleProgress({
        value: 0.5,
        size: 240,
        thickness: 5,
        startAngle: 4.72,
        emptyFill: "#fff",
        fill: "#fff",
        animation: {
            duration: 1600
        }
    });


    var waypoints = $('.adv-wrap').waypoint(function(direction) {
        $('.adv-stat span').each(function(){
           var $val = $(this).data("value");
           $(this).animateNumber(
               {
                   number: $val,
               },
               1600
           );
        });
        $('.adv-stat').circleProgress({fill: "#0096ff"});
        this.destroy();
    }, {
        offset: '35%'
    });


    /**
     * map
     */
    ymaps.ready(function(){
        var mapId = $('#map'),
            attitude = mapId.data("att"),
            longtitude = mapId.data("long"),
            zoom = mapId.data("zoom"),
            map = new ymaps.Map("map", {
                center: [attitude, longtitude],
                controls: ['zoomControl'],
                zoom: zoom
            }),

            myGeoObject = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [attitude, longtitude]
                },
            }, {
                preset: 'islands#redIcon',
            });

        map.geoObjects.add(myGeoObject);
        map.behaviors.disable('scrollZoom');

        if ($(window).width() <= 480) {
            map.behaviors.disable('drag');
        }
    });
    /**
     * END map
     */


    /**
     * tabs behavior
     */
    $('.tab-list').each(function(){
        var $this = $(this);
        var $tab = $this.find('li.active');
        var $link = $tab.find('a');
        var $panel = $($link.attr('href'));

        $this.on('click', '.tab-control', function(e) {
            e.preventDefault();
            var $link = $(this);
            var id = this.hash;

            if (id && !$link.is('.active')) {
                $panel.removeClass('active');
                $tab.removeClass('active');

                $panel = $(id).addClass('active');
                $tab = $link.parent().addClass('active');
                Waypoint.refreshAll();
            }
        });
    });
    /**
     * END tabs behavoir
     */


    //> useful articles rollup functionality
    $('.toggle-down').on('click', function(e){
        e.preventDefault();
        $(this).parents('.useful-item').addClass('toggle');
    });

    $('.toggle-up').on('click', function(e){
        e.preventDefault();
        th = $(this).parents('.useful-item');
        th.removeClass('toggle');
        $('html').animate({ scrollTop: th.offset().top - 20 }, 100);
    });
    //> end useful articles rollup functionality


    $(".user-phone").mask("+7 (999) 999-99-99",{autoclear: false});

    $.validate({
        form : '.contact-form',
    });

    $(function() {
        $("a[href='#callback']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "popup-zoom-in"
        })

    });

    //E-mail Ajax Send
    $(".contact-form").submit(function() { //Change
        var th = $(this);
        t = th.find(".btn-form").text();
        th.find(".btn-form").prop("disabled", "disabled").addClass('inactive').text("Сообщение отправлено!");

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {
            setTimeout(function() {
                // Done Functions
                th.find(".btn-form").removeAttr('disabled').removeClass('inactive').text(t);
                th.trigger("reset");
                $.magnificPopup.close();
            }, 2000);
        });
        return false;
    });

});
