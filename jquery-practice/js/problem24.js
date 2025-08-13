$(function() {
  const START = 9, END = 17;
  const KEY = "day_planner_v1";

  function render() {
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    $("#slots").empty();
    for (let h = START; h <= END; h++) {
      const $slot = $("<div class='slot' data-hour='"+h+"'>");
      $slot.append($("<div class='time'>").text(h + ":00"));
      $slot.append($("<div class='event'>").text(saved[h] || ""));
      $("#slots").append($slot);
    }
  }

  $("#slots").on("click", ".slot", function(){
    const hour = $(this).data("hour");
    const current = $(this).find(".event").text();
    const txt = prompt(hour + "時の予定を入力してください（空で削除）", current);
    const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (txt === null) return;
    if (txt.trim() === "") {
      delete saved[hour];
    } else {
      saved[hour] = txt;
    }
    localStorage.setItem(KEY, JSON.stringify(saved));
    render();
  });

  render();
});
