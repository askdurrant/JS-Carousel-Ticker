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
	var rightPosition = -(containerWidth - 100);

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
	var percentPerMs = containerWidth / totalAnimSpeed; //Find percent/ms
	var timeLeft;

  //Set animate end point
  var animDirec;

  if(direction === 'left'){
  	$(container + ' > .pic').css('float', 'left');
  }
  else if(direction === 'right'){
  	$(container + ' > .pic').css('float', 'right');
  	$(container).css('left', rightPosition + '%');
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
			$(container).css('left', rightPosition + '%');
			slideHorizRight();
		});
	};

  //Set animate CSS Direction
	if(direction === 'left'){
      animDirec = {};
      animDirec[direction] = - (100 / picsInViewport) + "%";
      slideHorizLeft();
  }
  else if(direction === 'right'){
      animDirec = {};
      animDirec['left'] = rightPosition + (100 / picsInViewport) + "%";
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
			var pixelToPercentLeft = -($(this).css("left").replace(/[A-Za-z$-%]/g, "") / individualWidth);
			var pixelToPercentRight = ((rightPosition + (100 / picsInViewport))/(100 / picsInViewport)) -($(this).css("left").replace(/[A-Za-z$-%]/g, "")) / individualWidth;

			if(direction === 'left'){
				timeLeft = (1-pixelToPercentLeft) * animSpeed;	
			}
			else if(direction === 'right'){
				timeLeft = (pixelToPercentRight) * animSpeed;	
			}
		});		
		//Mouse leaves and restarts
		$(container).on('mouseleave', function(){
			restart();
		});
	}

	setListeners();
};

$(document).ready(containerTicker('.carousel', {direction: 'left', animSpeed: 1000, picsInViewport: 2}));

$(document).ready(containerTicker('.carousel1', {direction: 'right', animSpeed: 2000, picsInViewport: 4}));
