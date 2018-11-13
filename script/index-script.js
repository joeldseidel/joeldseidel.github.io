$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
    $('#scroll-button').click(function(e){
        e.preventDefault();
        var sectionTo = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(sectionTo).offset().top
        }, 750);
    });
});