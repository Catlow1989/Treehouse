//Sliders and Range Finders using NoUISlider


$(document).ready(function(){


  $("#num_bedrooms").noUiSlider({
    start: [ 0, 5 ],
    step:1,
    range: {
      'min': [  0 ],
      'max': [ 5 ]
    },
    connect: true,
    format: wNumb({
      decimals: 0
    })


  });



  //display lower value and upper value in spans
  $("#num_bedrooms").Link('lower').to($('.lower_bed'));
  $("#num_bedrooms").Link('upper').to($('.upper_bed'));


  //serialize values into hidden form fields


  $("#num_bedrooms").Link('lower').to($("#min_beds"), null, wNumb({
    decimals: 0
  }));


  $("#num_bedrooms").Link('upper').to($("#max_beds"), null, wNumb({
    decimals: 0
  }));



  $("#search_radius").noUiSlider({
    start: [ 0 ],
    connect: "lower",
    range: {
      'min': [   0 ],
      '50%': [  5 ],
      'max': [ 20 ]
    },
    format: wNumb({
      decimals: 0
    })
  });


  //serialize values into hidden form fields
  $("#search_radius").Link('lower').to('search_rad');

  //display lower value and upper value in spans
  $("#search_radius").Link('lower').to($('.search_rad'));

  $("#search_radius").Link('lower').to($("#within"), null, wNumb({
    decimals: 0, 
    postfix: '-miles'
  }));

  $("#within").val("1-miles");


    var lowerVal = 0;

  $("#search_radius").on({ 


             slide: function(){
                lowerVal = $('span.search_rad').text();
                  if (lowerVal == '0'){
                        $( "#within" ).val( "1-miles" );
                  }
             }
        });



});




$(function(){
    var $selects = $('select');

    $selects.easyDropDown({
        cutOff: 5,
        wrapperClass: 'dropdown',
        onChange: function(selected){
            // do something
        }
    });
});


