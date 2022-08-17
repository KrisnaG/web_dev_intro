/**
 * 
 */

// Window onLoad action - set an interval
$(function() {
    setInterval("updateImage()", 5000);
});

/**
 * Update all images by animation to next image.
 */
function updateImage() {
    animationOne($("#animation_one img:visible"));
    animationTwo($("#animation_two img:visible"));
    animationThree($("#animation_three img:visible"));
}

/**
 * Transitions between images with a slide up/down animation effect
 * @param $visible image currently visible on screen
 */
function animationOne($visible) {
    var $next = $visible.next();

    // if last image wrap back to first image
    if (!$next.length)
        $next = $("#animation_one img:first");

    // animation
    $visible.slideUp(1500);
    $next.slideDown(1500);
}

/**
 * Transitions between images with a 360 rotation animation effect
 * @param $visible image currently visible on screen
 */
function animationTwo($visible) {
    var $next = $visible.next();

    // if last image wrap back to first image 
    if (!$next.length)
        $next = $("#animation_two img:first");

    $visible.animate(
        {
            "rotate": "360deg",
            "opacity": "0"
        },
        1000,
        function() {
            $next.fadeIn(1000);

            // remove animate properties
            $(this).removeAttr("style").hide();
        }
    );
}

/**
 * Transitions between images with a shrinking animation effect
 * @param $visible image currently visible on screen 
 */
function animationThree($visible) {
    var $next = $visible.next();

    // if last image wrap back to first image
    if (!$next.length)
        $next = $("#animation_three img:first");

    $visible.animate(
        {
            "margin-left": "+=100",
            "width": "10%",
            "opacity": "0"
        },
        1000,
        function() {
            $next.fadeIn(1000);

            // remove animate properties
            $(this).removeAttr("style").hide();
        }
    );
}