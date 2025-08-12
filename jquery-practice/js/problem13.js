$(function() {
  $("#sortable").sortable({
    update: function() {
      const order = $(this).sortable("toArray");
      console.log("現在の順序:", order);
    }
  });
  $("#sortable").disableSelection();
});
