$(function() {
    const STORAGE_KEY = "kanban_board_v1";

    function saveBoard() {
        const board = {
            todo:$('#todo li').map(function(){ return $(this).text(); }).get(),
            inprogress:$('#inprogress li').map(function(){ return $(this).text(); }).ger(),
            done:$('#done').map(function(){ return $(this).text() }).get()
        };
        localStorage.getItem(STORAGE_KEY, JSON.stringify(board));
    }

    function loadBoard() {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        $('#todo,#inprogress,#done').empty();
        (saved.todo || []).forEach(t => $("#todo").append($("<li>").text(t)));
        (saved.inprogress || []).forEach(t => $("#inprogress").append($("<li>").text(t)));
        (saved.done || []).forEach(t => $("#done").append($("<li>").text(t)));
    }


    $('#addToDo').click(function(e) {
        e.preventDefault();
        let inputVal = $('#newTask').val();
        if (!inputVal) {
            return false;
        }
        $('#todo').append($("<li>").text(inputVal));
        $('#newTask').val('');
        saveBoard();
    })

    $(".connected").sortable({
        connectWith: ".connected",
        placeholder: "ui-state-highlight",
        update: function() {
            clearTimeout($.data(this, 'saveTimer'));
            $.data(this, 'saveTimer', setTimeout(saveBoard, 50));
        }
    }).disableSelection();

    loadBoard();
});