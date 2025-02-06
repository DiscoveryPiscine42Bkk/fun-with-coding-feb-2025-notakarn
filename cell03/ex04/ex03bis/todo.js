$(document).ready(function () {
    let ftList = $("#ft_list");
    let newButton = $("#new");

    console.log("Cookies on load:", document.cookie);

    loadTasks();

    // Button click to add a new task
    newButton.on("click", function () {
        let todoText = prompt("Enter a new to-do item:");
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText, true);
        }
    });

    // Function to add a task
    function addTodo(text, save) {
        let todoItem = $("<div>").addClass("task-item").text(text);

        todoItem.on("click", function () {
            if (confirm("Do you want to delete this task?")) {
                todoItem.remove();
                saveTasks(); // call function save cookies
            }
        });

        ftList.prepend(todoItem);

        if (save) {
            saveTasks();
        }
    }

    // save cookies
    function saveTasks() {
        let tasks = [];
        $("#ft_list div").each(function () {
            tasks.push($(this).text());
        });

        let cookieString = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = cookieString;

        console.log("Tasks saved in cookie:", tasks);
    }

    // load cookies
    function loadTasks() {
        let cookie = document.cookie.split("; ").find(row => row.startsWith("todos="));

        if (cookie) {
            let cookieValue = cookie.split("=")[1];

            try {   // Handle error?
                let tasks = JSON.parse(decodeURIComponent(cookieValue));

                ftList.empty(); // Clear the current list

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
