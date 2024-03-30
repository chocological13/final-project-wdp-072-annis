// Book button
function submitOrder(event) {
    event.preventDefault(); // Prevent form submission
    let name = document.getElementById("name").value;
    let service = document.getElementById("service").value;

    // Display confirmation message
    alert("Thank you, " + name + "! Your appointment for \"" + service + "\" has been booked.");

    // Reset form fields
    document.getElementById("name").value = "";
    document.getElementById("service").selectedIndex = 0;

    // Close the modal
    let modalElement = document.getElementById("serviceModal");
    let modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  }

// to-do function
// Retrieve todos from local storage
function getTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
  }
  
  // Save todos to local storage
  function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Add a new todo item
  function addTodo() {
    event.preventDefault();
    const input = document.getElementById('todoInput');
    const todoText = input.value.trim();
  
    if (todoText) {
      const todos = getTodos();
      const newTodo = { text: todoText, completed: false };
      todos.push(newTodo);
      saveTodos(todos);
      renderTodos(todos);
      input.value = '';
    }
  }
  
  // Remove a todo item
  function removeTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos(todos);
  }
  
  // Toggle the completed status of a todo item
  function toggleCompleted(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos(todos);
  }
  
  // Render todos on the page
  function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
  
    todos.forEach((todo, index) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item d-flex align-items-center';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => toggleCompleted(index));
  
      const todoText = document.createElement('span');
      todoText.textContent = todo.text;
      todoText.className = 'flex-grow-1 mx-3';
  
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = '&times;';
      deleteButton.className = 'btn btn-danger';
      deleteButton.addEventListener('click', () => removeTodo(index));
  
      listItem.appendChild(checkbox);
      listItem.appendChild(todoText);
      listItem.appendChild(deleteButton);
      todoList.appendChild(listItem);
    });
  
    const clearBtn = document.getElementById('clearBtn');
    clearBtn.style.display = todos.length > 0 ? 'block' : 'none';
  }
  
  // Clear all todos
  function clearTodo() {
    localStorage.removeItem('todos');
    renderTodos([]);
  }
  
  // Initialize the app
  function init() {
    const todos = getTodos();
    renderTodos(todos);
  }
  
  init();