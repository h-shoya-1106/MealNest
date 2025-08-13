$(function() {
    $('.accordion').click(function() {
        $(this).next('.panel').slideToggle();
    })
})