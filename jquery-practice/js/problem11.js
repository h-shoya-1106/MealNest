$(function() {
    // タブ切り替え
    $('.tab').on('click', function() {
        $('.tabs').removeClass('active');
        $(this).addClass('active');

        $('.tab-content').hide();
        $($(this).data('target')).show();
    });

    // アコーディオン
    $('.accordion').click(function() {
        $(this).next('.panel').slideToggle();
    });

    // Ajax非同期通信
    $('#loadAjax').click(function() {
        let url = "https://jsonplaceholder.typicode.com/users?_limit=5";
        $.getJSON(url, function(data) {
            $.each(data, function(index, user) {
                $('#ajaxData').append(`<li>${index}: ${user.name} (${user.email})</li>`)
            });
        });
    });
});