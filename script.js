window.addEventListener('load', () => {
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const tasks = document.querySelector('#task-list');
  let oldValue;

  tasks.addEventListener('click', changeTask);

  // prevent the page from realoding on task submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // throw an error if the input is empty
    if (!input.value) {
      alert('Please fill out the task!');
      return;
    }

    // task element
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');

    // content element
    const contentElement = document.createElement('input');
    contentElement.type = 'text';
    contentElement.value = input.value;
    contentElement.setAttribute('readonly', 'readonly');
    contentElement.classList.add('task-content');

    // save to local storage
    saveLocalStorage(input.value);

    // clear input after a task has been added
    input.value = '';

    // buttons and wrapper element
    const actionsElement = document.createElement('div');
    const editElement = document.createElement('button');
    const deleteElement = document.createElement('button');

    actionsElement.classList.add('actions');
    editElement.classList.add('edit-button');
    deleteElement.classList.add('delete-button');

    editElement.innerHTML = 'Edit';
    deleteElement.innerHTML = 'Delete';

    // assemble it all together
    taskElement.appendChild(contentElement);
    actionsElement.appendChild(editElement);
    actionsElement.appendChild(deleteElement);
    taskElement.appendChild(actionsElement);
    tasks.appendChild(taskElement);
  })

  // button functionality
  function changeTask(e) {
    const taskItem = e.target;

    if (taskItem.classList[0] === 'edit-button') {
      const editElement = taskItem;
      const contentElement = taskItem.parentElement.parentElement.childNodes[0];

      if (editElement.innerHTML == 'Edit') {
        contentElement.removeAttribute('readonly');
        contentElement.focus();
        editElement.innerHTML = 'Save';
        oldValue = contentElement.value;
        console.log(editElement)
        console.log(contentElement)
      } else {
        changeLocalStorage(contentElement, 'replace');
        contentElement.setAttribute('readonly', 'readonly');
        editElement.innerHTML = 'Edit';
      }
    } else if (taskItem.classList[0] === 'delete-button') {
      const taskElement = taskItem.parentElement.parentElement
      changeLocalStorage(taskElement, 'delete');
      tasks.removeChild(taskElement);
    }
  }

  // save localStorage
  function saveLocalStorage(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // delete/edit localStorage
  function changeLocalStorage(task, action) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if (action === 'delete') {
      const indexName = task.children[0].value;
      tasks.splice(tasks.indexOf(indexName), 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else if (action === 'replace') {
      const newValue = task.value;
      tasks.splice(tasks.indexOf(oldValue), 1, newValue);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // format date helper
  const dateTimeElement = document.querySelector('#date-time');

  // use an object, to replace the characters with the matching format
  function toDate(format) {
    const date = new Date();
    const weekday = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'];
    const shortWeekday = ['Mon','Tue','Wed','Thu','Fri','Sat', 'Sun'];
    const month = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const shortMonth = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const formatMap = {
      ml: month[date.getMonth()],
      ms: shortMonth[date.getMonth()],
      m: date.getMonth() + 1,
      dl: weekday[date.getDay()],
      ds: shortWeekday[date.getDay()],
      d: date.getDate(),
      yl: date.getFullYear(),
      y: date.getFullYear().toString().slice(-2),
      th: date.getHours(),
      tm: date.toLocaleString('default', { minute: '2-digit' }),
      ts: date.toLocaleString('default', { second: '2-digit' }),
    };
    const output = format.replace(/ml|ms|m|dl|ds|d|yl|y|th|tm|ts/gi, matched => formatMap[matched])

    dateTimeElement.innerHTML = output;
  }

  const dateFormat = 'dl d. ml yl, th:tm:ts';
  // make the display live
  setInterval(toDate, 1000, dateFormat);

  let darkMode = localStorage.getItem('darkMode');
  const darkModeToggle = document.querySelector('#dark-mode-toggle');
  
  function enableDarkMode() {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkMode', 'enabled');
  }
  
  function disableDarkMode() {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkMode', null);
  }
   
  // if darkMode has previously been enabled enable it
  if (darkMode === 'enabled') {
    enableDarkMode();
  }
  
  // add toggle functionality
  darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode'); 
    if (darkMode !== 'enabled') {
      enableDarkMode();
    } else {  
      disableDarkMode(); 
    }
  });
})
