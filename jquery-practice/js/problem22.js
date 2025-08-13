$(function() {
  $("#fileInput").on("change", function() {
    const files = Array.from(this.files);
    $("#fileList").empty();

    files.forEach((file, idx) => {
      const $row = $("<div class='file-row'>")
        .append($("<div>").text(file.name))
        .append($("<div class='bar'><div class='progress'></div></div>"))
        .append($("<div class='meta'>状態: <span class='status'>待機中</span></div>"));

      $("#fileList").append($row);

      const $progress = $row.find(".progress");
      const $status = $row.find(".status");
      let p = 0;
      $status.text("アップロード中");

      const timer = setInterval(() => {
        p += Math.random() * 15;
        if (p >= 100) {
          p = 100;
          clearInterval(timer);
          $status.text("完了");
        }
        $progress.css("width", p + "%");
      }, 250);
    });
  });
});
