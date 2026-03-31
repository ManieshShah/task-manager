function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText, false);

    saveTasks();
    input.value = "";
}

function createTaskElement(taskText, isCompleted) {
    let li = document.createElement("li");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    // Task text
    let span = document.createElement("span");
    span.innerText = taskText;

    // Apply completed style if needed
    if (isCompleted) {
        li.classList.add("completed");
    }

    // Toggle complete
    checkbox.onchange = function () {
        li.classList.toggle("completed");
        saveTasks();
    };

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function (event) {
        event.stopPropagation();
        li.remove();
        saveTasks();
    };

    // Append elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
    let tasks = [];

    document.querySelectorAll("li").forEach(function (li) {
        let text = li.querySelector("span").innerText;
        let completed = li.querySelector("input").checked;

        tasks.push({ text: text, completed: completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on page load
window.onload = function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {
        createTaskElement(task.text, task.completed);
    });
};

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});