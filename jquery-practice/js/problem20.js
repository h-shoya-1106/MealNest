$(function() {
    const STORAGE_KEY = "kanban_board_v1";

    function saveBoard() {
        const board = {
            todo: $('#todo li').map(function() {
                return $(this).clone().children(".delete-btn").remove().end().text().trim();
            }).get(),
            inprogress: $('#inprogress li').map(function() {
                return $(this).clone().children(".delete-btn").remove().end().text().trim();
            }).get(),
            done: $('#done li').map(function() {
                return $(this).clone().children(".delete-btn").remove().end().text().trim();
            }).get()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
    }

    function createTaskElement(text) {
        return $("<li>")
            .text(text)
            .append(" ")
            .append($("<button>")
                .addClass("delete-btn")
                .text("削除")
            );
    }

    function loadBoard() {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        $('#todo,#inprogress,#done').empty();
        (saved.todo || []).forEach(t => $("#todo").append(createTaskElement(t)));
        (saved.inprogress || []).forEach(t => $("#inprogress").append(createTaskElement(t)));
        (saved.done || []).forEach(t => $("#done").append(createTaskElement(t)));
    }

    $('#addToDo').click(function(e) {
        e.preventDefault();
        let inputVal = $('#newTask').val();
        if (!inputVal) return;
        $('#todo').append(createTaskElement(inputVal));
        $('#newTask').val('');
        saveBoard();
    });

    $(document).on("click", ".delete-btn", function(e) {
        e.stopPropagation();
        $(this).parent("li").remove();
        saveBoard();
    });

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
