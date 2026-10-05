const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll(".task");

const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".modal .bg");

const addTaskButton = document.querySelector("#add-task-btn");
const addTaskModalButton = document.querySelector("#add-task-btn-modal");

// Count elements
const todoCount = document.querySelector("#todo-count");
const progressCount = document.querySelector("#progress-count");
const doneCount = document.querySelector("#done-count");

let draggElement = null;


// -------------------- COUNT --------------------

function updateCount() {
    todoCount.innerText = todo.querySelectorAll(".task").length;
    progressCount.innerText = progress.querySelectorAll(".task").length;
    doneCount.innerText = done.querySelectorAll(".task").length;
}


// -------------------- DRAG TASK --------------------

function addDragEventsOnTask(task) {

    task.addEventListener("dragstart", () => {
        console.log("drag started");

        draggElement = task;
    });

    task.addEventListener("dragend", () => {
        console.log("drag ended");

        draggElement = null;
    });
}


// -------------------- DELETE TASK --------------------

function addDeleteEventOnTask(task) {

    const deleteButton = task.querySelector("button");

    deleteButton.addEventListener("click", () => {

        task.remove();

        // Update count after deleting
        updateCount();
    });
}


// Add events to existing tasks
tasks.forEach(task => {

    addDragEventsOnTask(task);

    addDeleteEventOnTask(task);
});


// -------------------- DRAG COLUMN --------------------

function addDragEventsOnColumn(column) {

    column.addEventListener("dragenter", () => {

        column.classList.add("hover-over");
    });


    column.addEventListener("dragleave", () => {

        column.classList.remove("hover-over");
    });


    column.addEventListener("dragover", (e) => {

        e.preventDefault();
    });


    column.addEventListener("drop", (e) => {

        e.preventDefault();

        if (draggElement) {

            column.appendChild(draggElement);
        }

        column.classList.remove("hover-over");

        // Update count after moving task
        updateCount();
    });
}


// Add drag events to all columns
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


// -------------------- OPEN MODAL --------------------

addTaskButton.addEventListener("click", () => {

    modal.classList.add("active");
});


// -------------------- CLOSE MODAL --------------------

modalbg.addEventListener("click", () => {

    modal.classList.remove("active");
});


// -------------------- ADD NEW TASK --------------------

addTaskModalButton.addEventListener("click", () => {

    const taskTitle =
        document.querySelector("#task-title-input").value;

    const taskDesc =
        document.querySelector("#task-desc-input").value;

    const taskStatus =
        document.querySelector("#task-status").value;


    // Validation
    if (
        taskTitle.trim() === "" ||
        taskDesc.trim() === ""
    ) {

        alert("Please enter task title and description");

        return;
    }


    // Create task div
    const div = document.createElement("div");

    div.classList.add("task");

    div.setAttribute("draggable", "true");


    // Add task content
    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button>Delete</button>
    `;


    // Decide which column
    let column;


    if (taskStatus === "todo") {

        column = todo;

    } else if (taskStatus === "progress") {

        column = progress;

    } else {

        column = done;
    }


    // Add task to selected column
    column.appendChild(div);


    // Add events to new task
    addDragEventsOnTask(div);

    addDeleteEventOnTask(div);


    // Update count
    updateCount();


    // Close modal
    modal.classList.remove("active");


    // Clear inputs
    document.querySelector("#task-title-input").value = "";

    document.querySelector("#task-desc-input").value = "";
});


// -------------------- INITIAL COUNT --------------------

updateCount();