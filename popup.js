document.addEventListener('DOMContentLoaded', function() {
    var storage = chrome.storage.local;
    var list = document.getElementById("todo-list");
    var todos = [];
    storage.get("todos", function (items) {
        console.log(items);
        todos = items.todos;
        for(var i = 0; i < todos.length; i++) {
            console.log(todos[i]);
            addTodo(list, todos[i]);
        }
    });

    var addBtn = document.getElementById("add-new-todo");
    var clearBtn = document.getElementById("clear-todos");
    var todoText = document.getElementById("new-todo-text");

    addBtn.addEventListener('click', function () {
        var newTodo = todoText.value;
        console.log(newTodo);
        console.log(todos);
        todos.push(newTodo);

        addTodo(list, newTodo);

        storage.set({"todos": todos}, function () {
            console.log("new todo saved")
        });
    });

    clearBtn.addEventListener('click', function () {
        storage.set({"todos": []});
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    });
});

function addTodo(list, todoText) {
    var todo = document.createElement("li");
    todo.className = "list-group-item";
    todo.innerHTML = todoText;
    list.appendChild(todo);
}