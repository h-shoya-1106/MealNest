$(function() {
  $("#userForm").submit(function(e) {
    e.preventDefault();

    const formData = {
      name : $("input[name='name']").val(),
      email : $("input[name='email']").val()
    };

    console.log(JSON.stringify(formData));
  });
});