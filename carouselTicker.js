var containerTicker = function(container, config){

	var container = container;

	//Config Attributes
	var direction = config['direction'];
	var animSpeed = config['animSpeed'];
	var pauseOnHover = config['pauseOnHover'];
	var margin = config['margin'];
	var picsInViewport = config['picsInViewport'];

	//Set Defaults
	var defaultDirection = 'left';
	var defaultAnimSpeed = 2000;
	var defaultPauseOnHover = true;
	var defaultMargin = 0;
	var defaultPicsInViewport = 2;

	//Test if Undefined
	direction = (typeof direction === 'undefined') ? defaultDirection : direction;
	animSpeed = (typeof animSpeed === 'undefined') ? defaultAnimSpeed : animSpeed;
	pauseOnHover = (typeof pauseOnHover === 'undefined') ? defaultPauseOnHover : pauseOnHover;
	margin = (typeof margin === 'undefined') ? defaultMargin : margin;
	picsInViewport = (typeof picsInViewport === 'undefined') ? defaultPicsInViewport : picsInViewport;

	//No. of pics and last pic
	var viewportSize = $(container).parent().width()	//Viewport Div Size
	var pictureNum = $(container + ' .pic').length;
	var lastPic = pictureNum - 1;

	//Pic Width calculations
	var picWidth = [];
	var picHeight = [];
	var picWidthTotal = 0;
	var picWidthAll = 0;


	// Sets container width
	var containerWidth = ( (pictureNum / picsInViewport) * 100);
	var containerWidthPercent = containerWidth + '%';
	$(container).css({'width' : containerWidthPercent});
	var picWidthPercent = containerWidth / pictureNum;

	// Finds padding for .viewport
	var pic = $('.pic img')[0];
	var picWidth = pic.naturalWidth;
	var picHeight = pic.naturalHeight

	var viewportPadding = ( ( ( picHeight / picWidth ) / picsInViewport) * 100) + '%';
	$(container).parent().css({'padding-bottom' : viewportPadding});

	// Sets pic width
	var picDivWidth = (100 / pictureNum) + '%';
	$('.pic').css({'width' : picDivWidth});

	//Calculates how many pixels per milisecond
	var totalAnimSpeed = animSpeed * pictureNum; //Finds total length of time for ticker to complete 1 cycle
	var pixelPerMs = 400 / totalAnimSpeed; //Find pixels/ms
	var timeLeft;

  //Set animate end point
  var animDirec;

  if(direction === 'left'){
  	$(container + ' > .pic').css('float', 'left');
  }
  else if(direction === 'right'){
  	$(container + ' > .pic').css('float', 'right');
  	$(container).css('left', -(containerWidth - 100) + '%');
  }


	//Horizontal Slider function LEFT
	function slideHorizLeft(time){
	time = (typeof time === "undefined") ? animSpeed : timeLeft;
	//Sets first and last .pic
		var first = $(container + ' .pic')[0];
		var last = $(container + ' .pic')[lastPic];
	//Animates #container, inserts 1st .pic after last, resets position
		$(container).animate(animDirec, time, 'linear', function(){
			$(first).insertAfter(last);
			$(container).css(direction, '0');
			slideHorizLeft();
		});
	};

	//Horizontal Slider function RIGHT
	function slideHorizRight(time){
	time = (typeof time === "undefined") ? animSpeed : timeLeft;
	//Sets first and last .pic
		var first = $(container + ' .pic')[0];
		var last = $(container + ' .pic')[lastPic];
	//Animates #container, inserts 1st .pic after last, resets position
		$(container).animate(animDirec, time, 'linear', function(){
			$(first).insertAfter(last);
			$(container).css(direction, '0');
			slideHorizRight();
		});
	};

  //Set animate CSS Direction
	if(direction === 'left'){
      animDirec = {};
      animDirec[direction] = -50 + "%";
      slideHorizLeft();
  }
  else if(direction === 'right'){
      animDirec = {};
      animDirec[direction] = -100 + "%";
      slideHorizRight();
  }

	//Restart function - If there is timeLeft takes it to slideHoriz
	var restart = function(){
		if(direction === 'left'){
			slideHorizLeft(timeLeft);
		}
		else if(direction === 'right'){
			slideHorizRight(timeLeft);
		}	
	}

	//setListeners - Finds timeLeft and the stop position of container
	function setListeners(){
		$(container).on('mouseenter', function(){
			$(this).stop(false,false);		

			var individualWidth = $(container + ' .pic').width();
			var pixelToPercentLeft = ($(this).css("left").replace(/[A-Za-z$-]/g, "") / individualWidth) * picWidthPercent;
			var pixelToPercentRight = ($(this).css("right").replace(/[A-Za-z$-]/g, "") / individualWidth) * picWidthPercent;

			if(direction === 'left'){
				var stopPosition = picWidthPercent - $(this).css("left").replace(/[A-Za-z$-]/g, "");
						timeLeft = animSpeed -  (pixelToPercentLeft / pixelPerMs);	
			}
			else if(direction === 'right'){
				var stopPosition = $(this).css("right").replace(/[A-Za-z$-]/g, "") / 2;
						timeLeft = animSpeed - ((pixelToPercentRight / pixelPerMs) / 2);
			}
		});		
		//Mouse leaves and restarts
		$(container).on('mouseleave', function(){
			restart();
		});
	}

	setListeners();
};

$(document).ready(containerTicker('.carousel', {direction: 'left', animSpeed: 3000, margin: 10}));

$(document).ready(containerTicker('.carousel1', {direction: 'right', animSpeed: 2000}));






// $(document).ready(carouselLeft('.carousel', 3000));

	//Calculates width of all the pictures
	// for (i=0; i < pictureNum; i++){		
	// 	var picture = $('.pic img')[i];
	// 	picWidth[i] = picture.width;
	// 	picWidthAll += picWidth[i];
	// 	picHeight[i] = picture.height;
	// };


	// Adds margin to container if applicable
	// if(margin !== 0){
	// 	var totalMargin = margin * pictureNum;
	// 	picWidthTotal = picWidthAll + totalMargin;
	// }
	// else{
	// 	picWidthTotal = picWidthAll;
	// }


	// console.log(picWidthTotal);
	// console.log(picHeight);

	// // Sets CSS propoerties
	// var viewportPadding = ( ( ( picHeight[0] / picWidth[0] ) / picsInViewport) * 100) + '%';
	// console.log(viewportPadding);

	// $('.viewport').css({'padding-bottom' : viewportPadding});








// var carouselLeft = function(carousel, time){

// 	//Set Custom Variable
// 	var margin = 10;				//Margin right on pic
// 	var picWidth = 600 + margin;	//Width of the picture in div .pic


// 	//Set Global Variables
// 	var slideTime = time;								//Time
// 	var viewportSize = $("#viewport").width();			//Viewport div size
// 	var carousel = carousel;
// 	var picNo = $(carousel + ' div.pic').length;
// 	var lastpic = picNo - 1;
// 	var pixelPerMs = picWidth / slideTime;
// 	var width = picNo * picWidth;
// 	$(carousel).width(width);
// 	var timeLeft;


// 	//Horizontal Slider function
// 	var slideHoriz = function(time){
// 		time = (typeof time === "undefined") ? slideTime : time;
// 	//Sets first and last .pic
// 		var first = $(carousel + ' .pic')[0];
// 		var last = $(carousel + ' .pic')[lastpic];
// 	//Animates #carousel, inserts 1st .pic after last, resets position
// 		$(carousel).animate({left:-picWidth},time, 'linear', function(){
// 			$(first).insertAfter(last);
// 			$(carousel).css({left:0});

// 			slideHoriz();
// 		});
// 	};

// 	//Restart function - If there is timeLeft takes it to slideHoriz
// 	var restart = function(){
// 		slideHoriz(timeLeft);
// 	}

// 	//setListeners - Finds timeLeft and the stop position of carousel
// 	function setListeners(){
// 		$(carousel).on('mouseenter', function(){
// 		$(this).stop(false,false);		
// 		var leftStop = picWidth - $(this).css("left").replace(/[A-Za-z$-]/g, "");
// 			timeLeft = leftStop / pixelPerMs;
// 	});

// 	//Mouse leaves and restarts
// 	$(carousel).on('mouseleave', function(){
// 		restart();
// 	});
// 	}

// 	setListeners();
// 	slideHoriz();


// }


// var carouselRight = function(carousel,time){

// 	//Set Custom Variable
// 	var margin = 10;				//Margin right on pic
// 	var picWidth = 600 + margin;	//Width of the picture in div .pic


// 	//Set Global Variables
// 	var slideTime = time;								//Time
// 	var viewportSize = $(".viewport").width();			//Viewport div size
// 	var carousel = carousel;
// 	var picNo = $(carousel + " div.pic").length;
// 	var lastpic = picNo - 1;
// 	var pixelPerMs = picWidth / slideTime;
// 	var width = picNo * picWidth;
// 	var positionRight = (width - viewportSize);  //Finds position so last div is to right hand side of viewport
// 	$(carousel).width(width);
// 	$(carousel).css({left: - positionRight});
// 	var timeLeft;

// 	//Horizontal Slider function
// 	var slideHoriz = function(time){
// 		time = (typeof time === "undefined") ? slideTime : time;
// 	//Sets first and last .pic
// 		var first = $(carousel + ' .pic')[0];
// 		var last = $(carousel + ' .pic')[lastpic];
// 	//Animates #carousel, inserts 1st .pic after last, resets position
// 		$(carousel).animate({left: picWidth - positionRight},time, 'linear', function(){
// 			$(last).insertBefore(first);
// 			$(carousel).css({left: - positionRight});

// 			slideHoriz();
// 		});
// 	};

// 	//Restart function - If there is timeLeft takes it to slideHoriz
// 	var restart = function(){
// 		slideHoriz(timeLeft);
// 	}

// 	//setListeners - Finds timeLeft and the stop position of carousel
// 	function setListeners(){
// 		$(carousel).on('mouseenter', function(){
// 		$(this).stop(false,false);		
// 		var leftStop = positionRight - $(this).css("left").replace(/[A-Za-z$-]/g, "");
// 			timeLeft = slideTime - (leftStop / pixelPerMs);
// 	});

// 	//Mouse leaves and restarts
// 	$(carousel).on('mouseleave', function(){
// 		restart();
// 	});
// 	}

// 	setListeners();

// 	slideHoriz();

// }