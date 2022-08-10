/**
 * 
 */

// Window onLoad action - set an interval
$(function() {
    setInterval("updateImage()", 5000);
});

/**
 * 
 */
function updateImage() {
    animationOne($('#animation_one img:visible'));
    animationTwo($('#animation_two img:visible'));
    animationThree($('#animation_three img:visible'));
}

/**
 * 
 * @param {*} $visible 
 */
function animationOne($visible) {
    var $next = $visible.next();

    if ($next.length == 0)
        $next = $('#animation_one img:first');

    $visible.hide(1500);
    $next.show(1500);
}

/**
 * 
 * @param {*} $visible 
 */
function animationTwo($visible) {
    var $next = $visible.next();

    if ($next.length == 0)
        $next = $('#animation_two img:first');

    $visible.slideUp(1500);
    $next.slideDown(1500);
}

/**
 * 
 * @param {*} $visible 
 */
function animationThree($visible) {
    var $next = $visible.next();

    if ($next.length == 0)
        $next = $('#animation_three img:first');

    $visible.animate(
        {
            rotate: '360deg',
            'opacity': '0.1'
        }, 
        1000,
        function() {
            $next.fadeIn(1000);
            $(this).removeAttr('style').hide();
        }
        );
}