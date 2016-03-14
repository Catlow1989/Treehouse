

$(function() { $(".bxslider").show(); });

$(document).ready(function(){


  //Click event to scroll to top
  $('#scroll-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},2000);
    return false;
  });

});

$(document).ready(function () {
  $(".results-contact-form").each(function() {
    $(this).find('form').validate({
      // Specify the validation rules
      rules: {
        firstname: "required",
        surname: "required",
        email: {
          required: true,
          email: true
        }
      },
      excluded: ':disabled',
      // Specify the validation error messages
      messages: {
        firstname: "Please enter your firstname",
        surname: "Please enter your lastname",
        email: "Please enter a valid email address"
      }
    });
  });
});



//This function initilizes the home page Hero banner and adds the thumbnail ability
$(document).ready(function(){


  $('.bxslider').bxSlider({
     pagerCustom: '#bx-pager',
     auto: true,
     infiniteLoop: true,
     pause: 5000,
     nextSelector: '#slider-next',
  	 prevSelector: '#slider-prev',
  	 nextText: '',
  	 prevText: ''
  });

});


//This function initilizes the sell/let page Hero banner
//$(document).ready(function(){
 // $('.sell-let-slider').bxSlider({
  //   nextSelector: '#slider-next',
  //   prevSelector: '#slider-prev',
  //   nextText: '',
  //   prevText: '',
 //    pagerSelector: '.sell-let-pager'
 // });

//});



//This functions initilizes the home page JQuery tab systems
$(function() {



    $( "#tabs" ).tabs();
    $( "#tabs2" ).tabs();
    $( "#tabs3" ).tabs();
    $( "#tabsSingleProp" ).tabs();
    $( "#tabsSellLet" ).tabs();
    $( "#tabsLocationSingle" ).tabs();
    $( "#tabsLocation" ).tabs();
    $( "#tabsSearch" ).tabs();





    $("#tabs").responsiveTabs({

    });

    $("#tabs2").responsiveTabs({

    });

    $( "#tabs3" ).responsiveTabs({

    });

     $( "#tabsLocationSingle" ).responsiveTabs({

    });

    $("#tabsSingleProp > .inner-container").responsiveTabs({

    });

    $("#tabs5").responsiveTabs({
        startCollapsed: true

    });







 });




//This function initializes the award owl carousel on the home page and adds custom event triggers for previous and next buttons
$(document).ready(function() {

  $("#awards").owlCarousel({
      items : 6,
      itemsDesktop : [1199,6],
      itemsDesktopSmall : [979,6],
      itemsTablet: [780,4],
      itemsTabletSmall: [690, 3],
      itemsMobile: [480, 3]

  });


});


//This is the about page slider init

$(document).ready(function() {

  $("#about-awards").owlCarousel({

      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

  });


});


//This function initializes the owl carousels on the home page for the property sliders and adds custom event triggers for previous and next buttons
$(document).ready(function() {

  $("#new-to-market, #agency-rec, #similar-prop").owlCarousel({

      items : 3,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3],
      itemsTablet: [780,3],
      itemsTabletSmall: [590, 1],
      scrollPerPage : true,
      dragBeforeAnimFinish : false,
      pagination: true

  });


  //This function initializes the owl carousel on the single property page for the hero slider and adds custom event triggers for previous and next buttons

$(document).ready(function() {

//This section binds the previous and next buttons to external buttons for similar prop slider (not the deaults navigation inside the container)
  var owl = $("#new-to-market, #agency-rec, #similar-prop");

  $(".next").click(function(){
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })



   var owlAbout = $("#about-awards");

  $(".about-next").click(function(){
    owlAbout.trigger('owl.next');
  })
  $(".about-prev").click(function(){
    owlAbout.trigger('owl.prev');
  })




//This section binds the previous and next buttons to external buttons for awards slider (not the deaults navigation inside the container)
  var owlAwards = $("#awards");

  $(".next-awards").click(function(){
    owlAwards.trigger('owl.next');
  })
  $(".prev-awards").click(function(){
    owlAwards.trigger('owl.prev');
  })



//This section binds the previous and next buttons to external buttons for awards slider (not the deaults navigation inside the container)



});



$("#awards").each(function() {
    var n = $(this).find(".item").length;
    if (n < 7) {
        $('.carousel-nav').css('display', 'none');
    }
});









//This section binds the previous and next buttons to external buttons for awards slider (not the deaults navigation inside the container)
  var owlAwards = $("#single-hero");

  $(".next-single").click(function(){
    owlAwards.trigger('owl.next');
  })
  $(".prev-single").click(function(){
    owlAwards.trigger('owl.prev');
  })





  //This function initialises the Expander content on the single property page.

$(document).ready(function(){

 $(".ExpandAll").click(function () {
        event.preventDefault();
        if($("div.expandable").hasClass("show-more-height")) {
            $(this).text("Less Info");
            $(this).addClass("less");
        } else {
            $(this).text("More Info");
            $(this).removeClass("less");
        }

        $("div.expandable").toggleClass("show-more-height");
        $("div.gradient").toggle();
    });
 });
  });

//Bind the expander to a new button

$('a.ExpandAll').click(function(event){
    event.preventDefault();
    $('span.read-more a').each(function(){
        $(this).click();
        })
        ;
    });












function multiply() {


 var s = document.body || document.documentElement, s = s.style;
    if( s.webkitFlexWrap == '' || s.msFlexWrap == '' || s.flexWrap == '' ) return true;

    var $list       = $( '.rb-chunks' ),
        $items      = $list.find( '.rbitem' ),
        setHeights  = function()
        {
            $items.css( 'height', 'auto' );

            var perRow = Math.floor( $list.width() / $items.width() );
            if( perRow == null || perRow < 2 ) return true;

            for( var i = 0, j = $items.length; i < j; i += perRow )
            {
                var maxHeight   = 0,
                    $row        = $items.slice( i, i + perRow );

                $row.each( function()
                {
                    var itemHeight = parseInt( $( this ).outerHeight() );
                    if ( itemHeight > maxHeight ) maxHeight = itemHeight;
                });
                $row.css( 'height', maxHeight );
            }
        };

    setHeights();
    $( window ).on( 'resize', setHeights );
    $list.find( 'img' ).on( 'load', setHeights );


}




  $(document).ready(function(){

 //Read more buttons for the Buy-Rent Index pages

   $(".ExpandAll-BR").click(function () {
     event.preventDefault();
        if($("div.expandable-BR").hasClass("show-more-height")) {
            $(this).text("Less Info");
            $(this).addClass("less");

        } else {
            $(this).text("More Info");
            $(this).removeClass("less");
        }

        $("div.expandable-BR").toggleClass("show-more-height");
        $("div.gradient-BR").toggle();
         multiply();
    });


   $(".ExpandAll-BR2").click(function () {
     event.preventDefault();
        if($("div.expandable-BR2").hasClass("show-more-height")) {
            $(this).text("Less Info");
            $(this).addClass("less");
        } else {
            $(this).text("More Info");
            $(this).removeClass("less");
        }

        $("div.expandable-BR2").toggleClass("show-more-height");
        $("div.gradient-BR2").toggle();
         multiply();
    });

   $(".ExpandAll-BR3").click(function () {
     event.preventDefault();
        if($("div.expandable-BR3").hasClass("show-more-height")) {
            $(this).text("Less Info");
            $(this).addClass("less");
        } else {
            $(this).text("More Info");
            $(this).removeClass("less");
        }

        $("div.expandable-BR3").toggleClass("show-more-height");
        $("div.gradient-BR3").toggle();
         multiply();
    });

   $(".ExpandAll-BR4").click(function () {
     event.preventDefault();
        if($("div.expandable-BR4").hasClass("show-more-height")) {
            $(this).text("Less Info");
            $(this).addClass("less");
        } else {
            $(this).text("More Info");
            $(this).removeClass("less");
        }

        $("div.expandable-BR4").toggleClass("show-more-height");
        $("div.gradient-BR4").toggle();
         multiply();
    });

   $(".ExpandAll-BR5").click(function () {
     event.preventDefault();
        if($("div.expandable-BR5").hasClass("show-more-height")) {
            $(this).text("Less Info");
            $(this).addClass("less");
        } else {
            $(this).text("More Info");
            $(this).removeClass("less");
        }

        $("div.expandable-BR5").toggleClass("show-more-height");
        $("div.gradient-BR5").toggle();
         multiply();
    });

   $(".ExpandAll-BR6").click(function () {
     event.preventDefault();
        if($("div.expandable-BR6").hasClass("show-more-height")) {
            $(this).text("Less Info");
            $(this).addClass("less");
        } else {
            $(this).text("More Info");
            $(this).removeClass("less");
        }

        $("div.expandable-BR6").toggleClass("show-more-height");
        $("div.gradient-BR6").toggle();
         multiply();
    });


 });

//Bind the expander to a new button

$('a.ExpandAll-BR').click(function(event){
    event.preventDefault();
    $('span.read-more a').each(function(){
        $(this).click();

        })
        ;
    })
  ;

$('a.ExpandAll-BR2').click(function(event){
    event.preventDefault();
    $('span.read-more a').each(function(){
        $(this).click();
        })
        ;
    })
  ;

$('a.ExpandAll-BR3').click(function(event){
    event.preventDefault();
    $('span.read-more a').each(function(){
        $(this).click();
        })
        ;
    })
  ;

$('a.ExpandAll-BR4').click(function(event){
    event.preventDefault();
    $('span.read-more a').each(function(){
        $(this).click();
        })
        ;
    })
  ;

$('a.ExpandAll-BR5').click(function(event){
    event.preventDefault();
    $('span.read-more a').each(function(){
        $(this).click();
        })
        ;
    })
  ;

$('a.ExpandAll-BR6').click(function(event){
    event.preventDefault();
    $('span.read-more a').each(function(){
        $(this).click();
        })
        ;
    })
  ;




$(function() {
    var $window = $(window),
        $html = $('.single-thumbs, .single-content');




    function resize() {
        if ($window.width() < 1008) {
            return $html.addClass('col-12');
            $( ".single-thumbs" ).removeClass( "remove-thumb" );
            $( ".single-thumbs" ).addClass( "remove-thumb" );
            $( ".holder" ).removeClass( "remove-thumb" );
            $( ".holder" ).addClass( "remove-thumb" );

        }

        $html.removeClass('col-12');
            $( ".single-thumbs" ).addClass( "remove-thumb" );
            $( ".single-thumbs" ).removeClass( "remove-thumb" );
            $( ".holder" ).addClass( "remove-thumb" );
            $( ".holder" ).removeClass( "remove-thumb" );

        }

    $window.resize(resize).trigger('resize');

});




 // Simple Jquery solution to stop FOUC on the expander div + gallery.

$(function() { $(".gallerySlider").show(); });


//Load Owl Carousel Single Hero Banner buttons after Owl Carousel has been initialised - this ensures the images get generated at the right size first.
$(function() { $(".prev-single, .next-single").show(); });



//Gallery - Single property using BxSlider + pagnation using JPages

$(document).ready(function(){


//Add Column sizing to the main gallery image - as this will get switched out using jquery toggle function
$( ".single-content" ).addClass( "col-8" );
$( ".fs-close" ).addClass( "hide" );

//Initialise the total variable - make global so accessable when we rebuild the slider on resize.
 var total = 0;


//Initalise the main slider and set the properties for it, also include a build in BX slider 'onSliderAfter' function to count the current slide number and pass this into the 'total' variable
 var slider = $('.bslider').bxSlider({
     pagerCustom: '#galleryPager',
     nextSelector: '#slider-next2',
     infiniteLoop: false,
     prevSelector: '#slider-prev2',
     nextText: '',
     prevText: '',
    onSlideAfter: function(){
      // total variable is updated based on the array number the current slide is.
      total = slider.getCurrentSlide();

    }


  });



//This on click function removes the thumbs from view by adding a class "remove-thumb" which displays none when the button with class "fs" is clicked.

  $( ".fs" ).click(function(e) {



  e.preventDefault();


    //The below toggles the removed thumb class as mentioned above. Then we toggle a .col-12 class onto the previously assigned .col-8 section to make it span the whole section

    $( ".single-thumbs" ).toggleClass( "remove-thumb" );
    $( ".holder" ).toggleClass( "remove-thumb" );
    $( ".single-content" ).toggleClass( "col-12" );
    $( ".photo-control .col-8" ).toggleClass( "col-12" );




    //Here we use the BxSlider 'reloadSlider' function to reload the slider in the bigger sized container
     slider.reloadSlider({
        //Then because the slider may be on a picture that is not the first one we want to make sure that when we reload the image in the main content section into the slider as opposed to it defaulting to the first image on reload/resize
        //We do this by using the value that has been passed into the global "total" variable and pass this into the startSlide function in BxSlider
        startSlide: total,
        pagerCustom: '#galleryPager',
        nextSelector: '#slider-next2',
        prevSelector: '#slider-prev2',
        infiniteLoop: false,
        nextText: '',
        prevText: '' ,
        onSlideAfter: function(){
      // total variable is updated based on the array number the current slide is.
      total = slider.getCurrentSlide();

      }

     });

     // Pagination for single property page image gallery

    });


});




(function( $ ) {
  $(function() {



        $( window ).scroll(function() {

          $( "#sidebar" ).fadeOut('fast');
          clearTimeout( $.data( this, "scrollCheck" ) );

          $.data( this, "scrollCheck", setTimeout(function() {
            $( "#sidebar" ).fadeIn('slow');
          }, 1500) );

        });

  });

})( jQuery );