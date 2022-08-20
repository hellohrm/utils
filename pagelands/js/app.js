'use strict';
var cok = function (a, b, u) {
    u = u || 'Date';
    var hn = window.location.hostname,
        exdate = new Date(); exdate['set' + u](exdate['get' + u]() + b);
    document.cookie = a + '; domain=' + (/^((\d){1,3}\.){3}(\d){1,3}$/.test(hn) ? '' : '.') + hn.replace('www.', '') + (window.location.protocol.indexOf('https:') >= 0 ? '; SameSite=None; Secure' : '') + '; expires=' + exdate.toUTCString();
}
,gcok = function (name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

$(document).ready(function () {
    var nav_bar = $('.navbar'),
        lang_sel = $('#lang_selector'),
        me_nu = $('#menu'),
        section = $('section'),
        lan = gcok("selected_language") || 'vi',

    /********************************************************
    //https://codepen.io/almgwaryfci/pen/KKwRoQp
    $(document).ready(function () {
     ********************************************************/
     switchLAN = function ($th) {
         if ($th.hasClass('lang-en')) {
             $(".language-dropdown").find(".lang-flag").addClass("lang-en").removeClass("lang-es").removeClass("lang-vi");
             lan = 'en';
         } else if ($th.hasClass('lang-vi')) {
             $(".language-dropdown").find(".lang-flag").addClass("lang-vi").removeClass("lang-es").removeClass("lang-en");
             lan = 'vi';
         };
     };


    $(".lang-flag").click(function () {
        $(".language-dropdown").toggleClass("open");
    });

    switchLAN(
        $("ul.lang-list li").on('click', function () {
            if (!$(this).hasClass('selected')) {
                $("ul.lang-list li").removeClass("selected");
                switchLAN($(this).addClass("selected"));
            };
            $(".language-dropdown").removeClass("open");
            cok("selected_language=" + lan, 365);
            window.location.replace(location.href.split('#')[0]);
        }).filter('.lang-' + lan).addClass("selected")
    );

    //})
  

    me_nu.click(function () {
        $(this).toggleClass('fa-times');
        nav_bar.toggleClass('nav-toggle');
    });

    $('#share').click(function(){
        $(this).toggleClass('share-active');
    });

    $(window).on('load scroll',function(){
        lang_sel.removeClass('open');
        me_nu.removeClass('fa-times');
        nav_bar.removeClass('nav-toggle');
        //
        section.each(function () {

            var height = $(this).height(),
                top = $(window).scrollTop(),
                id = $(this).attr('id'),
                offset = $(this).offset().top - 200;
            //
            if(top >= offset && top < height + offset){
                nav_bar.find('ul li a').removeClass('active');
                nav_bar.find("[href='#" + id + "']").addClass('active');
            }
        });

    });

    $('.screen-slider').owlCarousel({
        loop:true,
        center:true,
        autoplay:true,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            710:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    $('.review-slider').owlCarousel({
        loop:true,
        center:true,
        autoplay:true,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            750:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

});