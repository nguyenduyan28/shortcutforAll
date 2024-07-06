document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('taskList').addEventListener('click', handleTaskListClick);

window.addEventListener('load', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById('taskList');
        const listItem = createTaskElement(taskText);

        taskList.appendChild(listItem);
        taskInput.value = "";

        saveTasks();
    }
}

function createTaskElement(taskText, completed = false) {
    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    taskSpan.className = 'task-content';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('deleteButton');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        listItem.classList.toggle('completed');
        saveTasks();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);
    listItem.appendChild(checkbox);

    if (completed) {
        listItem.classList.add('completed');
    }

    return listItem;
}

function handleTaskListClick(event) {
    if (event.target.classList.contains('deleteButton')) {
        const listItem = event.target.parentElement;
        listItem.remove();
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(listItem => {
        const taskText = listItem.querySelector('.task-content').textContent;
        const completed = listItem.classList.contains('completed');
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const listItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(listItem);
    });
}
