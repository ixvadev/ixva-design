/*global $*/

$(function () {
    
    "use strict";
    
/*==================================
    * Author        : Ideas_Factory
    * Template Name : Morgan - Creative Portfolio Template
==================================== */
    
/*=========== TABLE OF CONTENTS ===========

    01. Isotope Plugin
    02. window height
    03. Navbar
    04. Smooth Scroll
    05. MagnifPopup Plugin
    06. Form Validation
    07. Window Scroll
    08. Window Resize
    09. FitText Plugin
    10. Preloader

======================================*/

    var $grid = $('.grid'),
        i;

    /*--------------------------------
        01. Isotope Plugin
    ----------------------------------*/
    $(window).on('load', function () {

        $grid.isotope({
          // options...
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use element for option
                columnWidth: '.grid-sizer'
            }
        });
        //-- filter items on button click --//
        $(".portfolio ul li").on('click', function () {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
            $(this).addClass("active_filter").siblings().removeClass("active_filter");
        });
        
    });

    
    /*----------------------------------------------
        02. window height
    -----------------------------------------------*/
        $(".full_height").height($(window).height());

    /*--------------------------------
        03. Navbar
    ----------------------------------*/
    //-- navbar mobile menu --//
    $("nav .navbar-nav li a").on('click', function () {
        $(".navbar-collapse").removeClass("in");
        $(".navbar-toggle").addClass("collapsed");
    });

    function nav__scroll(){

        if ($(window).scrollTop() >= 50) {
            $("nav").addClass("nav_scroll");
        } else {
            $("nav").removeClass("nav_scroll");
        }

    }
    nav__scroll();
    
    /*--------------------------------
        04. Smooth Scroll
    ----------------------------------*/
    $(".smooth_scroll").on('click', function (event) {

        event.preventDefault();
        if (this.hash !== "") {
            
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                
                window.location.hash = hash;
            });
            
        }
        
    });

    /*--------------------------------
       05. MagnifPopup Plugin
    ----------------------------------*/
    var my_img = '.my_img',
        magnifPopup = function () {

        $(my_img).magnificPopup({
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-with-zoom',
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true
            }
        });

    };
    // Call the functions 
    if( $(my_img).length ){

        magnifPopup();

    }

    $('.boxContent').on("click", function () {

        $(this).parents('.box').find(my_img).trigger("click");

    });

    /*--------------------------------
        06. Form Validation
    ----------------------------------*/
    $('.contact form .submit').on('click', function () {
        $('.contact form .form-control').removeClass("errorForm");
        $('.msg_success,.msg_error').css("display","");
        
        var error = false,
            name = $('.contact form input[type="text"]');
        
        if (name.val() === "" || name.val() === " ") {
            error = true;
            $(name).addClass("errorForm");
        }
        
        var email_compare = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
            email = $('.contact form input[type="email"]');
        
        if (email.val() === "" || email.val() === " ") {
            $(email).addClass("errorForm");
            error = true;
        } else if (!email_compare.test(email.val())) {
            $(email).addClass("errorForm");
            error = true;
        }
        
        var msg = $('.contact form textarea');
        
        if (msg.val() === "" || msg.val() === " ") {
            error = true;
            $(msg).addClass("errorForm");
            
        }
    
        if (error === true) {
            return false;
        }
        
        var data_string = $('.contact form').serialize();
        
    
        $.ajax({
            type: "POST",
            url: $('.contact form').attr('action'),
            data: data_string,
            
            success: function (message) {
                if (message === 'SENDING') {
                    $('.msg_success').fadeIn('slow');
                } else {
                    $('.msg_error').fadeIn('slow');
                }
            }
            
        });
        
        return false;
        
    });

    /*--------------------------------
        07. Window Scroll
    ----------------------------------*/
    $(window).on("scroll", function () {

        var my_skill = ".about .skills .skill";
        if ($(my_skill).length !== 0){
            spy_scroll(my_skill);
        }
        

        var animate_on_scroll = ".animated";
        if ($(animate_on_scroll).length !== 0){
            spy_scroll(animate_on_scroll,"animate"); 
        }

        nav__scroll();
        
        //-- Scroll top --//
        var scrollTop = $(".top");
        if (scrollTop.length !== 0) {
            if ( $(window).scrollTop() >= $(".about").offset().top ) {
                scrollTop.addClass("scroll_top_show");
            } else {
                scrollTop.removeClass("scroll_top_show");
            }
        }
        
    });

    /*--------------------------------
        08. Window Resize
    ----------------------------------*/
    $(window).on("resize", function () {

        $(".full_height").height($(window).height());

    });

    /*--------------------------------
        09. FitText Plugin
    ----------------------------------*/ 
    var home__h1 = ".home h1";

    if ($(home__h1).length){

        $(home__h1).fitText(1, { maxFontSize: 95 });

    }

    /*--------------------------------
        10. Preloader
    ----------------------------------*/
    if ( $(".loader").length ) {

        var loader = new SVGLoader( document.getElementById( 'loader' ), { easingIn : mina.easeinout } );
        
        loader.show();

        $(window).on('load', function () {

            $('.startLoad').fadeOut('slow');

            setTimeout(function() {
                $(".pageload-overlay").css("background-color","transparent");
                loader.hide();
            }, 1000)

            setTimeout(function() {
                $('.page-loader').fadeOut();
            }, 1925)
            
        });

    }else{

        $("body").css("overflow","auto");
        
    }

});
