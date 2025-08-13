$(function() {
  let activeTags = [];

  function applyFilter() {
    const keyword = $("#filterInput").val().trim().toLowerCase();
    $("#items .item").each(function(){
      const text = $(this).text().toLowerCase();
      const tags = $(this).data("tags").toString().split(",").map(s => s.trim());

      const tagMatch = activeTags.length === 0 || activeTags.some(t => tags.indexOf(t) !== -1);
      const textMatch = keyword === "" || text.indexOf(keyword) !== -1;

      $(this).toggle(tagMatch && textMatch);
    });
  }

  $(".tag").on("click", function(){
    const t = $(this).data("tag");
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) activeTags.push(t);
    else activeTags = activeTags.filter(x => x !== t);
    applyFilter();
  });

  $("#filterInput").on("input", applyFilter);
});
