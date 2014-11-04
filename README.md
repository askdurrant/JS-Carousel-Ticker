JQUERY FULLY RESPONSIVE CAROUSEL TICKER
=======================================

A lightweight jQuery carousel ticker script for easy to implement sliders.

Available Options
-----------------

* direction (default = left) - Sets direction of movement (Possible values: left, right)
* animSpeed (default = 2000) - Sets speed of animation transition (integer in ms)
* controls (default = true) - Defines if you want left/right controls. Keypress left and right also work (Possible values: true, false)
* pauseOnHover (default = true) - Defines whether the animation will pause when you hover your mouse (Possible values: true, false)
* picInViewport (default = 2) - Defines the number of pictures desired in the viewport. The script will calculate everything for you (Possible values: Any integer up to the total number of pictures - 1)

Setup
-----

Include the jQuery library in your document.

### Example layout:

__HTML__

    <div class="outside">
        <div class="viewport">
            <div class="carousel">
                <div class="pic">
                    <img src="images/1.png" />
                </div>
                <div class="pic">
                    <img src="images/2.png" />
                </div>
                <div class="pic">
                    <img src="images/3.png" />
                </div>
                <div class="pic">
                    <img src="images/4.png" />
                </div>
                <div class="pic">
                    <img src="images/5.png" />
                </div>
                <div class="pic">
                    <img src="images/6.png" />
                </div>
                <div class="pic">
                    <img src="images/7.png" />
                </div>
                <div class="pic">
                    <img src="images/8.png" />
                </div>
            </div>
        </div>
    </div>

__CSS__

/* REQUIRED CSS */

.viewport{
    width: 100%;
    overflow: hidden;
    position: relative;
    height: 0;
    margin-bottom: 20px;
}

.carousel{
    top: 0;
    left: 0;
    margin: 0 auto;
    position: absolute;
    height: 100%;
}

.pic{
    display: block;
    position: relative;
    margin: 0;
    padding: 0;
    float: left;
    height: 100%;
}

.pic img{
    width: 100%;
    height: 100%;
}

/* Optional Outer Container */

.outside{
    max-width:1200px;
}


### Calling the Script

$(document).ready( 
	containerTicker('//Class of the container', { //OPTIONS HERE })
);

To define options, put inside the {} seperated by a comma.

Eg.

$(document).ready( 
	containerTicker(containerTicker('.carousel', {direction: 'left', animSpeed: 1000, picsInViewport: 2})
);

### Requirements

1. The container class must be defined on calling the script
2. Each slide must have the class '.pic' for the slider to work
3. The viewport must have the class '.viewport'