// variables
//var todoForm = document.getElementById("todo-form");
var enterTodoItem = document.getElementById('enter');
var title = document.getElementById('title');
var description = document.getElementById('description');
var difficulty = document.getElementById('difficulty');
var todoList = document.getElementById("todos");
var doneList = document.getElementById("dones");
var addForm = document.getElementById('addForm');
//var todoInput = document.getElementById("todo-input");
var editInput = document.getElementById('edit-input');

// Get all Todo item cards
window.onload = async () => {
  const todos = await getTodos();

  todos.forEach(todo => {
    if (!todo.isDone) {
      var todoItem = CreateCard('move-todo', 'Move to Done');
      todoList.innerHTML += todoItem;
    } else {
      var todoItem = CreateCard('move-done', 'Move Back');;
      doneList.innerHTML += todoItem;
    }

    function CreateCard(classTodoItem, buttonTodoItem) {

      return `
      <div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item" data-id=${todo.id}>
          <h4 class="mb-3 input-name">${todo.title}</h4>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Description:</strong> ${todo.description} </li>
            <li class="list-group-item"><strong>Difficulty:</strong> ${todo.difficulty} </li>
            <li class="list-group-item"><strong>Date created:</strong> ${todo.dateCreated} </li>
          </ul>
          <button type="button" class="btn btn-danger delete">Delete</button>
          <button type="button" class="btn btn-success ${classTodoItem}">${buttonTodoItem}</button>
          <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
      </div>`;
    }
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
    let newTodoItem = await createTodoItem(title.value, description.value, difficulty.value);

    var todoItem = `
    <div class="border border-1 shadow-sm p-3 mb-3  rounded todo-item" data-id=${newTodoItem.id}>
        <h4 class="mb-3 input-name">${newTodoItem.title}</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><strong>Description:</strong> ${newTodoItem.description} </li>
          <li class="list-group-item"><strong>Difficulty:</strong> ${newTodoItem.difficulty} </li>
          <li class="list-group-item"><strong>Date created:</strong> ${newTodoItem.dateCreated} </li>
        </ul>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo">Move to Done</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#edit-modal">Edit</button>
    </div>`;
    todoList.innerHTML += todoItem;
    addForm.reset();
    enterTodoItem.removeAttribute("data-bs-dismiss");
  }
});

// todoForm.addEventListener("submit", function (e) {
//   e.preventDefault();

//   if (todoInput.value.length > 0) {
//     todoInput.classList.remove("is-invalid");
//     var todoItem = `
//         <div class="border border-1 shadow-sm p-3 mb-3 rounded todo-item">
//             <h4 class="mb-3 input-name">${todoInput.value}</h4>
//             <button type="button" class="btn btn-danger delete">Delete</button>
//             <button type="button" class="btn btn-success move-todo">Move to Done</button>
//             <button type="button" class="btn btn-warning edit" data-bs-toggle="modal"
//                 data-bs-target="#edit-modal">Edit</button>
//         </div>`;
//     todoList.innerHTML += todoItem;
//     todoForm.reset();
//   } else {
//     todoInput.classList.add("is-invalid");
//   }
// });

// Todo item card actions
document.addEventListener("click", async function (e) {
  if (e.target.matches(".delete")) {
    location.reload();
    let id = e.target.closest(".todo-item").getAttribute("data-id");
    deleteTodoItem(id);
    e.target.closest(".todo-item").remove();
    return;
  }

  if (e.target.matches(".btn-success")) {
    var card = e.target.closest(".todo-item");
    var status = false;
    let id = e.target.closest(".todo-item").getAttribute("data-id");

    if (e.target.innerText == "Move to Done") {
      e.target.innerText = "Move back";
      status = true;
      updateStatusTodoItem(id, status);
      doneList.appendChild(card);
      return;
    }

    e.target.innerText = "Move to Done";
    updateStatusTodoItem(id, status);
    todoList.appendChild(card);
  }
});
