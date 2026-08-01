
$(document).scroll(function() {
    if($(document).scrollTop() >= 100) {
        $('.topbar').addClass('no-after');
        $('.topbar').addClass('no-before');
        $('.topbar').addClass('scroll');
        $('.logo').toggle(false);
        
    } else {
        $('.topbar').removeClass('no-after');
        $('.topbar').removeClass('no-before');
        $('.topbar').removeClass('scroll');
        $('.logo').toggle(true);
    }
});