$(function() {
  $('#list').on('click', 'li', function() {
    $(this).css('color', 'red');
  });

  $('#addItem').click(function() {
    let li = '<li>新しい項目</li>';
    $('#list').append(li);
  });
});
