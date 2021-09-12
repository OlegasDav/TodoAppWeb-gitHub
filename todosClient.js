const baseUrl = "https://localhost:5001/todos";

async function getTodos() {
    const response = await fetch(baseUrl);

    return response.json();
}

async function getTodo(id) {
    const response = await fetch(`${baseUrl}/${id}`);

    return response.json();
}

async function createTodo(todoItem) {
    let response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify(todoItem),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return response.json();
}

async function updateTodo(id, todoItem) {
    let response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        body: JSON.stringify(todoItem),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    return response.json();
}

async function updateStatusTodo(id, status) {
    let response = await fetch(`${baseUrl}/${id}/status`, {
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

async function deleteTodo(id) {
    await fetch(`${baseUrl}/${id}`, {
        method: "DELETE"
    });
}
