$(document).ready(function(){
    var projectCard = $('.project-card');
    projectCard.hover(function(event){
        $(event.target).closest("div.card").css('box-shadow', '0 0 20px #808080');
    }, function(event){
        $(event.target).closest("div.card").css('box-shadow', '0 0 5px #808080');
    });
});