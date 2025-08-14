$(function(){
  $("#openModal").on("click", function(){
    $("#modalOverlay").fadeIn();
  });

  $(".closeBtn, #modalOverlay").on("click", function(e){
    if (e.target.id === "modalOverlay" || $(e.target).hasClass("closeBtn")) {
      $("#modalOverlay").fadeOut();
    }
  });

  $("#userForm input[name='name']").on("input", function(){
    let val = $(this).val().trim();
    $("#nameError").text(val === "" ? "名前を入力してください" : "");
  });

  $("#userForm input[name='email']").on("input", function(){
    let val = $(this).val().trim();
    let valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    $("#emailError").text(valid ? "" : "正しいメールアドレスを入力してください");
  });

  $("#userForm").on("submit", function(e){
    e.preventDefault();
    if ($("#nameError").text() === "" && $("#emailError").text() === "") {
      alert("登録完了！");
      $("#modalOverlay").fadeOut();
    }
  });
});
