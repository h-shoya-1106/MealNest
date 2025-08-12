$(function() {
  $('#loadData').click(function() {
    let url = "https://jsonplaceholder.typicode.com/posts?_limit=5";
  
    $.getJSON(url, function(data) {
      $("#dataList").empty();
        $.each(data, function(index, item) {
          $("#dataList").append(`<li>${index}:${item.title}</li>`);
      });
    })
  })
})
