(function() {
  function createAppTitle (title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createToDoItemForm () {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите новое дело';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    form.append(input);
    form.append(buttonWrapper);
    buttonWrapper.append(button);

    button.disabled = true;
    input.addEventListener('input', function () {
        button.disabled = false;
        if (!input.value) {
            button.disabled = true;
        }
    });

    return {
        form,
        input,
        button,
    };
  }

  function createToDoList () {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createToDoItem (name) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton,
    }
  }

  function createTodoApp (container, title = 'Список дел', key, array) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createToDoItemForm();
    let todoList = createToDoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let todos = [];

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createToDoItem(todoItemForm.input.value);

      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
        addTodo(todoItemForm.input.value, true);
      });

      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
        }
      });

      todoList.append(todoItem.item);

      todoItemForm.input.value = '';
      todoItemForm.button.disabled = true;

      addTodo(todoItemForm.input.value, false);
    });

    for (let object of array) {
      let todoItem = createToDoItem(object.name);
      todoList.append(todoItem.item);

      if (object.done) {
        todoItem.item.classList.toggle('list-group-item-success');
      }

      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
        addTodo(object.name, object.done);
      });

      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
        }
      });
    };

    function addTodo (item, status) {
      let todo = {
        id: 1,
        title: item,
        done: status,
      };

      todos.push(todo);
    }
  }

  window.createTodoApp = createTodoApp;
}) ();

