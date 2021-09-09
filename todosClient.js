async function getTodos() {
    const response = await fetch("https://localhost:5001/todos");

    return response.json();
}

async function getTodo(id) {
    const response = await fetch("https://localhost:5001/todos/" + id);

    return response.json();
}

async function createTodo(titleItem, descriptionItem, difficultyItem) {
    let response = await fetch("https://localhost:5001/todos", {
        method: "POST",
        body: JSON.stringify({
            title: titleItem,
            description: descriptionItem,
            difficulty: difficultyItem
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return response.json();
}

async function updateTodo(id, title, description, difficulty, isDone) {
    let response = await fetch("https://localhost:5001/todos/" + id, {
        method: "PUT",
        body: JSON.stringify({
            title,
            description,
            difficulty,
            isDone
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return response.json();
}

async function updateStatusTodo(id, status) {
    let response = await fetch("https://localhost:5001/todos/" + id + "/status", {
        method: "PUT",
        body: JSON.stringify({
            isDone: status
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return response.json();
}

function deleteTodo(id) {
    fetch("https://localhost:5001/todos/" + id, {
        method: "DELETE"
    });
}
