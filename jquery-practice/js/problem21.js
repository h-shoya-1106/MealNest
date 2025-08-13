$(function() {
  const KEY = "editable_table_v1";

  function save() {
    const rows = [];
    $("#dataTable tbody tr").each(function(){
      rows.push({
        name: $(this).find("td").eq(0).text(),
        qty: $(this).find("td").eq(1).text()
      });
    });
    localStorage.setItem(KEY, JSON.stringify(rows));
  }

  function load() {
    const rows = JSON.parse(localStorage.getItem(KEY) || "[]");
    const $tbody = $("#dataTable tbody").empty();
    rows.forEach(r => {
      const $tr = $("<tr>");
      $tr.append($("<td>").text(r.name));
      $tr.append($("<td>").text(r.qty));
      $tr.append($("<td>").append($("<button class='delete'>削除</button>")));
      $tbody.append($tr);
    });
  }

  $("#addRow").on("click", function(){
    const name = $("#itemName").val().trim();
    const qty = $("#itemQty").val().trim();
    if(!name) return;
    const $tr = $("<tr>");
    $tr.append($("<td>").text(name));
    $tr.append($("<td>").text(qty || "0"));
    $tr.append($("<td>").append($("<button class='delete'>削除</button>")));
    $("#dataTable tbody").append($tr);
    $("#itemName").val(""); $("#itemQty").val("");
    save();
  });

  $("#dataTable").on("dblclick", "td", function(){
    const $td = $(this);
    if ($td.find("input").length) return;
    if ($td.index() === 2) return;

    const orig = $td.text();
    $td.addClass("editing");
    const $input = $("<input>").val(orig).css("width","100%");
    $td.empty().append($input);
    $input.focus();

    function finish() {
      const v = $input.val();
      $td.removeClass("editing").text(v);
      save();
    }

    $input.on("blur", finish).on("keydown", function(e){
      if (e.key === "Enter") $input.blur();
      if (e.key === "Escape") { $td.removeClass("editing").text(orig); }
    });
  });

  $("#dataTable").on("click", ".delete", function(){
    $(this).closest("tr").remove();
    save();
  });

  load();
});
