$('#animateBtn').click(function() {
  $('#box')
    .animate(
      {
        marginLeft: "200px",
      },
      1000
    )
    .animate(
      {
        marginLeft: "0px",
      },
      1000
    )
    .fadeOut(500);
});