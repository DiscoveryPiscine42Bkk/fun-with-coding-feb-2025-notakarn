document.addEventListener("DOMContentLoaded", function () {
    let ftList = document.getElementById("ft_list");
    let newButton = document.getElementById("new");

    console.log("Cookies on load:", document.cookie);

    loadTasks();
    //button click
    newButton.addEventListener("click", function () {
        let todoText = prompt("Enter a new to-do item:");
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText, true);
        }
    });
    //add list
    function addTodo(text, save) {
        let todoItem = document.createElement("div");
        todoItem.textContent = text;

        todoItem.addEventListener("click", function () {
            if (confirm("Do you want to delete this task?")) {
                ftList.removeChild(todoItem);
                saveTasks();
            }
        });

        ftList.prepend(todoItem);

        if (save) {
            saveTasks();
        }
    }

    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#ft_list div").forEach(todo => {
            tasks.push(todo.textContent);
        });

        let cookieString = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = cookieString;

        console.log("Tasks saved in cookie:", tasks);
    }

    function loadTasks() {
        let cookie = document.cookie.split("; ").find(row => row.startsWith("todos="));

        if (cookie) {
            let cookieValue = cookie.split("=")[1];

            try {
                let tasks = JSON.parse(decodeURIComponent(cookieValue));

                ftList.innerHTML = "";

                tasks.reverse().forEach(task => addTodo(task, false));

                console.log("Tasks loaded from cookie:", tasks);
            } catch (error) {
                console.error("Error parsing tasks from cookie:", error);
            }
        } else {
            console.log("No tasks found in the cookie.");
        }
    }
});
