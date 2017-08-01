document.addEventListener('DOMContentLoaded', function() {
    var list = document.getElementById("todo-list");
    var todos = [];
    chrome.storage.local.get("todos", function (items) {
        console.log(items);
        todos = items.todos;
        for(var i = 0; i < todos.length; i++) {
            console.log(todos[i]);
            var todo = document.createElement("li");
            todo.className = "list-group-item";
            todo.innerHTML = todos[i];
            list.appendChild(todo);
        }
    });

    var addBtn = document.getElementById("add-new-todo");
    var todoText = document.getElementById("new-todo-text");

    addBtn.addEventListener('click', function () {
        var newTodo = todoText.value;
        console.log(newTodo);
        console.log(todos);
        todos.push(newTodo);

        var todo = document.createElement("li");
        todo.className = "list-group-item";
        todo.innerHTML = newTodo;
        list.appendChild(todo);

        chrome.storage.local.set({"todos": todos}, function () {
            console.log("new todo saved")
        });
    })
});