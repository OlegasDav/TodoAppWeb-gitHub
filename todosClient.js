async function getTodos() {
    const response = await fetch("https://localhost:5001/todos");

    return response.json();
}

async function createTodoItem(titleItem, descriptionItem, difficultyItem) {
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

async function updateStatusTodoItem(id, status) {
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

function deleteTodoItem(id) {
    fetch("https://localhost:5001/todos/" + id, {
        method: "DELETE"
    });
}

// async function createTodo(a, b) {
//     let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         body: JSON.stringify({
//             title: a,
//             body: b,
//             userId: 1,
//         }),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         }
//     });

//     let todos = await response.json();

//     console.log(todos);
// }

// createTodo("tetis", "mama");