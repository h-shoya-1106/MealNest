$(function(){
  function saveState() {
    let openSections = [];
    $(".accordion-header").each(function(i){
      if ($(this).next().is(":visible")) {
        openSections.push($(this).data("id"));
      }
    });
    localStorage.setItem("accordionState", JSON.stringify(openSections));
  }

  $(".accordion-header").on("click", function(){
    $(this).toggleClass("active-header").next().slideToggle();
    saveState();
  });

  let saved = JSON.parse(localStorage.getItem("accordionState") || "[]");
  $(".accordion-header").each(function(){
    if (saved.includes($(this).data("id"))) {
      $(this).addClass("active-header").next().show();
    }
  });
});
