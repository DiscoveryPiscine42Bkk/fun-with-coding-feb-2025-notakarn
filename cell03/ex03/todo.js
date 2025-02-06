document.addEventListener("DOMContentLoaded", function () {
    let ftList = document.getElementById("ft_list");
    let newButton = document.getElementById("new");

    console.log("Cookies on load:", document.cookie);

    // Load tasks from the cookie if available
    loadTasks();

    // Add event listener to the "New Task" button
    newButton.addEventListener("click", function () {
        let todoText = prompt("Enter a new to-do item:");
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText, true); // 'true' means save immediately
        }
    });

    // Function to add a new task to the DOM and optionally save it
    function addTodo(text, save) {
        let todoItem = document.createElement("div");
        todoItem.textContent = text;

        // Click event to delete the task
        todoItem.addEventListener("click", function () {
            if (confirm("Do you want to delete this task?")) {
                ftList.removeChild(todoItem);
                saveTasks(); // Update cookie after deletion
            }
        });

        // Add the task at the top of the list (prepend)
        ftList.prepend(todoItem);

        // Save to cookies immediately if needed
        if (save) {
            saveTasks();
        }
    }

    // Function to save the current tasks in the list to cookies
    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#ft_list div").forEach(todo => {
            tasks.push(todo.textContent); // Extract text content of each task
        });

        // Save to cookie (Never Expires) with proper format for modern browsers
        let cookieString = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = cookieString;

        // Debugging: Show what's saved in the cookie
        console.log("Tasks saved in cookie:", tasks);
    }

    // Function to load tasks from the cookie and display them in the correct order
    function loadTasks() {
        let cookie = document.cookie.split("; ").find(row => row.startsWith("todos="));

        if (cookie) {
            // Retrieve the cookie value and decode
            let cookieValue = cookie.split("=")[1];

            try {
                let tasks = JSON.parse(decodeURIComponent(cookieValue));

                // Clear the list before rendering new tasks (to prevent duplicates)
                ftList.innerHTML = "";

                // Add each task to the list in the saved order (start with the last added task at the top)
                tasks.reverse().forEach(task => addTodo(task, false)); // 'false' means don't save again

                // Debugging: Show the tasks loaded from the cookie
                console.log("Tasks loaded from cookie:", tasks);
            } catch (error) {
                console.error("Error parsing tasks from cookie:", error);
            }
        } else {
            console.log("No tasks found in the cookie.");
        }
    }
});
