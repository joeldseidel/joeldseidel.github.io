var image;
var namePlate;
$(document).ready(function(){
    image = $('.name-photo');
    namePlate = $('#name-plate-center');
    setImageHeight(image, namePlate);
    setTextMargin(image, namePlate);
    $('.work-button').click(function(){
        window.location.href = "mywork.html";
    });
});

$(window).resize(function(){
    setImageHeight();
    setTextMargin();
});

function setImageHeight(){
    var namePlateHeight = namePlate.outerHeight();
    var newImageHeight = namePlateHeight * 1.5;
    image.css('height', newImageHeight);
}

function setTextMargin(){
    var imageSize = image.outerHeight();
    var containerSidePadding = namePlate.css('padding-left');
    containerSidePadding = containerSidePadding.replace('px', '');
    var totalSideMargin = imageSize + containerSidePadding * 2;
    console.log(totalSideMargin);
    $('.text-column').css('margin-left', totalSideMargin);
}