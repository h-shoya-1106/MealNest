$(function(){
  function checkScroll(){
    $(".fadein").each(function(){
      const top = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();

      if (scroll > top - windowHeight + 100) {
        $(this).addClass("show");
      }
    });
  }

  $(window).on("scroll", checkScroll);
  checkScroll();
});
