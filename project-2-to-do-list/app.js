// Select elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

let tasks = [];

// Load tasks on page load
window.onload = loadTasks;

// Event listener for adding tasks
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value;
    const taskPriority = document.getElementById('priority-input').value // Get priority

    if(taskText === ''){
        alert('Please enter a task');
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        priority: taskPriority // Add priority to task
    }

    tasks.push(task);
    taskInput.value = ""; // Clear input field
    renderTasks();
    saveTasks(); // Save tasks to localStorage
});

// Function to render tasks
function renderTasks(){
    taskList.innerHTML = ''; // Clear task list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'complete' : '';
        li.innerHTML = `
        <span>${task.text}</span> 
        <div class="task-buttons">
            <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="editTask(${index})">Edit</button>
        </div> 
        `;
        taskList.appendChild(li);
    })
}

// Function to toggle task completion
function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    saveTasks(); // Save tasks to localStorage

}

// Function to delete task
function deleteTask(index){
    tasks.splice(index, 1);
    renderTasks();
    saveTasks(); // Save tasks to localStorage
}


// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if(storedTasks){
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Function to edit task
function editTask(index) {
    const newTaskText = prompt('Edit your task:', tasks[index].text);
    if(newTaskText !== null && newTaskText.trim() !== ''){
        tasks[index].text = newTaskText;
        renderTasks();
        saveTasks(); // Save tasks to localStorage
    }
}



