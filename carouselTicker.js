var carouselLeft = function(carousel, time){

	//Set Custom Variable
	var margin = 10;				//Margin right on pic
	var picWidth = 600 + margin;	//Width of the picture in div .pic


	//Set Global Variables
	var slideTime = time;								//Time
	var viewportSize = $("#viewport").width();			//Viewport div size
	var carousel = carousel;
	var picNo = $(carousel + ' div.pic').length;
	var lastpic = picNo - 1;
	var pixelPerMs = picWidth / slideTime;
	var width = picNo * picWidth;
	$(carousel).width(width);
	var timeLeft;


	//Horizontal Slider function
	var slideHoriz = function(time){
		time = (typeof time === "undefined") ? slideTime : time;
	//Sets first and last .pic
		var first = $(carousel + ' .pic')[0];
		var last = $(carousel + ' .pic')[lastpic];
	//Animates #carousel, inserts 1st .pic after last, resets position
		$(carousel).animate({left:-picWidth},time, 'linear', function(){
			$(first).insertAfter(last);
			$(carousel).css({left:0});

			slideHoriz();
		});
	};

	//Restart function - If there is timeLeft takes it to slideHoriz
	var restart = function(){
		slideHoriz(timeLeft);
	}

	//setListeners - Finds timeLeft and the stop position of carousel
	function setListeners(){
		$(carousel).on('mouseenter', function(){
		$(this).stop(false,false);		
		var leftStop = picWidth - $(this).css("left").replace(/[A-Za-z$-]/g, "");
			timeLeft = leftStop / pixelPerMs;
	});

	//Mouse leaves and restarts
	$(carousel).on('mouseleave', function(){
		restart();
	});
	}

	setListeners();
	slideHoriz();


}


var carouselRight = function(carousel,time){

	//Set Custom Variable
	var margin = 10;				//Margin right on pic
	var picWidth = 600 + margin;	//Width of the picture in div .pic


	//Set Global Variables
	var slideTime = time;								//Time
	var viewportSize = $(".viewport").width();			//Viewport div size
	var carousel = carousel;
	var picNo = $(carousel + " div.pic").length;
	var lastpic = picNo - 1;
	var pixelPerMs = picWidth / slideTime;
	var width = picNo * picWidth;
	var positionRight = (width - viewportSize);  //Finds position so last div is to right hand side of viewport
	$(carousel).width(width);
	$(carousel).css({left: - positionRight});
	var timeLeft;

	//Horizontal Slider function
	var slideHoriz = function(time){
		time = (typeof time === "undefined") ? slideTime : time;
	//Sets first and last .pic
		var first = $(carousel + ' .pic')[0];
		var last = $(carousel + ' .pic')[lastpic];
	//Animates #carousel, inserts 1st .pic after last, resets position
		$(carousel).animate({left: picWidth - positionRight},time, 'linear', function(){
			$(last).insertBefore(first);
			$(carousel).css({left: - positionRight});

			slideHoriz();
		});
	};

	//Restart function - If there is timeLeft takes it to slideHoriz
	var restart = function(){
		slideHoriz(timeLeft);
	}

	//setListeners - Finds timeLeft and the stop position of carousel
	function setListeners(){
		$(carousel).on('mouseenter', function(){
		$(this).stop(false,false);		
		var leftStop = positionRight - $(this).css("left").replace(/[A-Za-z$-]/g, "");
			timeLeft = slideTime - (leftStop / pixelPerMs);
	});

	//Mouse leaves and restarts
	$(carousel).on('mouseleave', function(){
		restart();
	});
	}

	setListeners();

	slideHoriz();

}

$(document).ready(carouselLeft('.carousel', 3000));

// $(document).ready(carouselRight('#carousel1', 10000));