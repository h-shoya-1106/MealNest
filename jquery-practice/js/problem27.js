$(function(){
  let page = 1;
  let loading = false;

  function loadItems() {
    loading = true;
    $(".loading").show();
    setTimeout(function(){
      for (let i = 1; i <= 10; i++) {
        $("#contentArea").append(`<div class="item">アイテム ${(page-1)*10 + i}</div>`);
      }
      page++;
      loading = false;
      $(".loading").hide();
    }, 800);
  }

  loadItems();

  $(window).on("scroll", function(){
    if (!loading && $(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
      loadItems();
    }
  });
});
