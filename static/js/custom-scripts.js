// JavaScript Document

//prepare variables
var degree = 0;
//function that handles the planet animation
function rotate() {

	$planet = $("div.planet");

	  //CSS3
	$planet.css({ 'transform' : 'rotate(' + degree + 'deg)'}); 
	  // For webkit browsers: e.g. Chrome
	$planet.css({ WebkitTransform : 'rotate(' + degree*2 + 'deg)'});
	  // For Mozilla browser: e.g. Firefox
	$planet.css({ '-moz-transform' : 'rotate(' + degree + 'deg)'});
	  //IE9
	$planet.css({ '-ms-transform' : 'rotate(' + degree + 'deg)'});
	  //Opera
	$planet.css({ '-o-transform' : 'rotate(' + degree + 'deg)'});
	
	// Animate rotation with a recursive call
	var timer = setTimeout(function() {
		degree-=0.1; 
		rotate();
	},10);

}

//function that handles dog movement animation
function dogRun(){
	
	var dog = $("div.dog");
	
	var timer2 = setTimeout(function() {
								 
		if(dog.css("background-position") == "0px 0px")
			dog.css({"background-position":"-80px -2px"});
		else
			dog.css({"background-position":"0px 0px"});							 
			
		dogRun();	
		
	}, 130);	
	
}