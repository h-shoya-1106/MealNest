$(function(){
  const nameInput = $("input[name='name']");
  const emailInput = $("input[name='email']");

  function validate(){
    let valid = true;

    if(nameInput.val().trim() === ""){
      $("#nameError").text("名前を入力してください");
      valid = false;
    } else {
      $("#nameError").text("");
    }

    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    if(!emailPattern.test(emailInput.val())){
      $("#emailError").text("有効なメールアドレスを入力してください");
      valid = false;
    } else {
      $("#emailError").text("");
    }

    return valid;
  }

  $("input").on("input", validate);

  $("#regForm").on("submit", function(e){
    if(!validate()){
      e.preventDefault();
    }
  });
});
