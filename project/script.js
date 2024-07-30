document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Function to fetch and display todos
    function fetchTodos() {
        console.log("fetchTodos called");
        fetch('http://localhost:8081/todos')
            .then(response => response.json())
            .then(data => {
                const todoList = document.getElementById('todo-list');
                todoList.innerHTML = '';
                data.forEach(todo => {
                    const li = document.createElement('li');
                    li.textContent = todo.text;
                    todoList.appendChild(li);
                });
            })
            .catch(error => console.error('Error fetching todos:', error));
    }

    // Function to create a new todo
    function createTodo(todo) {
        console.log("createTodo called");
        fetch('http://localhost:8081/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            fetchTodos(); // Refresh the list after adding a new todo
        })
        .catch(error => console.error('Error creating todo:', error));
    }

    // Handle form submission
    const todoForm = document.getElementById('todo-form');
    if (todoForm) {
        todoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submitted");
            const todoText = document.getElementById('todo-text').value;
            if (todoText) {
                createTodo({ text: todoText });
                document.getElementById('todo-text').value = ''; // Clear the input field
            }
        });
    } else {
        console.error("Todo form not found");
    }

    // Initial fetch of todos
    fetchTodos();
});
