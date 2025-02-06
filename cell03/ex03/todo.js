document.addEventListener("DOMContentLoaded", function () {
    let ftList = document.getElementById("ft_list");
    let newButton = document.getElementById("new");

    // Check and log cookies immediately on page load to confirm if they exist
    console.log("Cookies on load:", document.cookie);

    // Load tasks from cookies when the page loads
    loadTasks();

    newButton.addEventListener("click", function () {
        let todoText = prompt("Enter a new to-do item:");
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText, true); // 'true' means save immediately
        }
    });

    function addTodo(text, save) {
        let todoItem = document.createElement("div");
        todoItem.textContent = text;

        // Click event for deleting the task
        todoItem.addEventListener("click", function () {
            if (confirm("Do you want to delete this task?")) {
                ftList.removeChild(todoItem);
                saveTasks(); // Update cookie after deletion
            }
        });

        // Add the task at the top
        ftList.prepend(todoItem);

        // Save to cookies immediately if needed
        if (save) {
            saveTasks();
        }
    }

    function saveTasks() {
        let tasks = [];
        document.querySelectorAll("#ft_list div").forEach(todo => {
            tasks.push(todo.textContent);
        });

        // Save to cookie (Never Expires) with correct format for modern browsers
        let cookieString = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = cookieString;

        // Debugging: Show what's saved in the cookie
        console.log("Tasks saved in cookie:", tasks);
    }

    function loadTasks() {
        // Parse the cookie and check if it contains tasks
        let cookie = document.cookie.split("; ").find(row => row.startsWith("todos="));

        if (cookie) {
            // Retrieve the cookie value
            let cookieValue = cookie.split("=")[1];

            // Decode and parse the cookie value
            try {
                let tasks = JSON.parse(decodeURIComponent(cookieValue));

                // Clear the list before rendering new tasks (to prevent duplicates)
                ftList.innerHTML = "";

                tasks.forEach(task => addTodo(task, false)); // 'false' to avoid duplicate saving

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
