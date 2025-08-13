$(function() {
    $("#imageInput").on("change", function() {
        const files = this.files;
        $("#previewList").empty();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = $('<img>').attr('src', e.target.result);
                const li = $('<li>').append(img);
                $("#previewList").append(li);
            };

            reader.readAsDataURL(file);
        }

        $("#previewList").sortable();
        $("#previewList").disableSelection();
    });
})
