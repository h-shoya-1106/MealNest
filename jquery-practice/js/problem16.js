$(function(){
  let currentIndex = 0;
  const images = $(".gallery img").map(function(){ return $(this).attr("src"); }).get();

  $(".gallery img").on("click", function(){
    currentIndex = parseInt($(this).data("index"));
    showImage();
    $(".modal").fadeIn();
  });

  $("#prev").on("click", function(){
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  });

  $("#next").on("click", function(){
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  });

  $(document).on("keydown", function(e){
    if (e.key === "ArrowLeft") $("#prev").click();
    if (e.key === "ArrowRight") $("#next").click();
    if (e.key === "Escape") $(".modal").fadeOut();
  });

  $(".modal").on("click", function(e){
    if (e.target === this) $(this).fadeOut();
  });

  function showImage(){
    $("#modalImage").attr("src", images[currentIndex]);
  }
});
