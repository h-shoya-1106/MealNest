$(function(){
  const taskList = $("#taskList");

  function saveTasks(){
    const tasks = taskList.children().map(function(){
      return $(this).text();
    }).get();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks(){
    const saved = JSON.parse(localStorage.getItem("tasks") || "[]");
    saved.forEach(task => addTask(task));
  }

  function addTask(task){
    const li = $("<li>").text(task);
    taskList.append(li);
  }

  $("#addTask").on("click", function(){
    const task = $("#taskInput").val();
    if(task){
      addTask(task);
      saveTasks();
      $("#taskInput").val("");
    }
  });

  taskList.sortable({
    update: saveTasks
  });

  loadTasks();
});
