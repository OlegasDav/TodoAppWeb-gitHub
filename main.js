// variables
var enterTodoItem = document.getElementById('enter');
var title = document.getElementById('title');
var description = document.getElementById('description');
var difficulty = document.getElementById('difficulty');
var todoList = document.getElementById("todos");
var doneList = document.getElementById("dones");
var addForm = document.getElementById('addForm');

var updateTodoItem = document.getElementById('update');
var editTitle = document.getElementById('editTitle');
var editDescription = document.getElementById('editDescription');
var editDifficulty = document.getElementById('editDifficulty');
var editIsDone = document.getElementById('editIsDone');
var id;

function CreateCard(todo) {

  return `
  <div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item" data-id=${todo.id}>
      <h4 class="mb-3 input-name">${todo.title}</h4>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><strong>Description:</strong> ${todo.description} </li>
        <li class="list-group-item"><strong>Difficulty:</strong> ${todo.difficulty} </li>
        <li class="list-group-item"><strong>Date created:</strong> ${todo.dateCreated} </li>
      </ul>
      <button type="button" class="btn btn-danger delete">Delete</button>
      <button type="button" class="btn btn-success">${todo.isDone ? "Move back": "Move to Done"}</button>
      <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
  </div>`;
}

// Get all Todo item cards
window.onload = async () => {
  const todos = await getTodos();

  todos.forEach(todo => {
    if (!todo.isDone) {
      todoList.innerHTML += CreateCard(todo);

      return;
    }
      doneList.innerHTML += CreateCard(todo);
  });
}

// Validation
document.addEventListener('input', () => {
  if (title.value != '' && description.value != '' && difficulty.value != '') {
    enterTodoItem.setAttribute("data-bs-dismiss", "modal");
  } else {
    enterTodoItem.removeAttribute("data-bs-dismiss");
  }
  if (title.value) {
    title.classList.remove('is-invalid');
  }
  if (description.value) {
    description.classList.remove('is-invalid');
  }
  if (difficulty.value) {
    difficulty.classList.remove('is-invalid');
  }

  if (editTitle.value != '' && editDescription.value != '' && editDifficulty.value != '' && editIsDone.value != '') {
    updateTodoItem.setAttribute("data-bs-dismiss", "modal");
  } else {
    updateTodoItem.removeAttribute("data-bs-dismiss");
  }
  if (editTitle.value) {
    editTitle.classList.remove('is-invalid');
  }
  if (editDescription.value) {
    editDescription.classList.remove('is-invalid');
  }
  if (editDifficulty.value) {
    editDifficulty.classList.remove('is-invalid');
  }
  if (editIsDone.value) {
    editIsDone.classList.remove('is-invalid');
  }
});


enterTodoItem.addEventListener('click', async () => {
  if (title.value == '') {
    title.classList.add('is-invalid');
  }
  if (description.value == '') {
    description.classList.add('is-invalid');
  }
  if (difficulty.value == '') {
    difficulty.classList.add('is-invalid');
  }
  if (title.value != '' && description.value != '' && difficulty.value != '') {
    var todoItem = {
      title: title.value,
      description: description.value,
      difficulty: difficulty.value
    };
    
    await createTodo(todoItem);
    addForm.reset();
    enterTodoItem.removeAttribute("data-bs-dismiss");
    location.reload();
  }
});

// Todo item card actions
document.addEventListener("click", async function (e) {

  if (e.target.matches(".delete")) {
    id = e.target.closest(".todo-item").getAttribute("data-id");
    await deleteTodo(id);
    e.target.closest(".todo-item").remove();
    location.reload();
    return;
  }

  if (e.target.matches(".edit")) {
    const todoItem = e.target.closest(".todo-item");

    id = todoItem.getAttribute("data-id");

    var editedTodo = await getTodo(id);
    editTitle.value = editedTodo.title;
    editDescription.value = editedTodo.description;
    editDifficulty.value = editedTodo.difficulty;
    editIsDone.value = editedTodo.isDone;
  }

  if (e.target.matches("#update")) {
    if (editTitle.value == '') {
      editTitle.classList.add('is-invalid');
    }
    if (editDescription.value == '') {
      editDescription.classList.add('is-invalid');
    }
    if (editDifficulty.value == '') {
      editDifficulty.classList.add('is-invalid');
    }
    if (editIsDone.value == '') {
      editIsDone.classList.add('is-invalid');
    }
    if (editTitle.value != '' && editDescription.value != '' && editDifficulty.value != '' && editIsDone.value != '') {
      var isDone = editIsDone.value.toLowerCase() == "true" ? true : false;
      var todoItem = {
        title: editTitle.value,
        description: editDescription.value,
        difficulty: editDifficulty.value,
        isDone: isDone
      };
      await updateTodo(id, todoItem);
      location.reload();
    }
  }

  if (e.target.matches(".btn-success")) {
    var card = e.target.closest(".todo-item");
    var status = false;
    id = e.target.closest(".todo-item").getAttribute("data-id");

    if (e.target.innerText == "Move to Done") {
      status = true;
      await updateStatusTodo(id, status);
      doneList.appendChild(card);
      location.reload();
      return;
    }

    await updateStatusTodo(id, status);
    todoList.appendChild(card);
    location.reload();
  }
});
