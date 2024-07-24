// JavaScript to handle adding todos
document.getElementById('send-button').addEventListener('click', function() {
    var todoInput = document.getElementById('todo-input').value;
    if (todoInput.length > 0 && todoInput.length <= 140) {
        var todoList = document.querySelector('.todo-list');
        var newTodo = document.createElement('li');
        newTodo.textContent = todoInput;
        todoList.appendChild(newTodo);
        document.getElementById('todo-input').value = '';
    } else {
        alert('Todo must be between 1 and 140 characters.');
    }
});
