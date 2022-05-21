///////////
// Tasks //
///////////
const taskForm = document.querySelector('#new-task-form');
const inputTask = document.querySelector('#new-task-input');
const tasksList = document.querySelector('#task-list');
let localTasks = [];
let oldValue;

// restore tasks on page load
window.addEventListener('load', () => {
  if (localStorage.getItem('tasks') !== null) {
    localTasks = JSON.parse(localStorage.getItem('tasks'));
  }

  getLocalStorage()
})

// add button behavior
tasksList.addEventListener('click', changeTask);

// on submit add new task and save it to the local storage
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!inputTask.value) {
    alert('Please fill out the task!');
    return;
  }

  addTask(inputTask.value);
  addLocalStorage(inputTask.value);
  inputTask.value = '';
})

// create new task element
function addTask(taskValue) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task-item');

  const contentElement = document.createElement('input');
  contentElement.type = 'text';
  contentElement.value = taskValue;
  contentElement.setAttribute('readonly', 'readonly');
  contentElement.classList.add('task-content');

  const actionsElement = document.createElement('div');
  const editElement = document.createElement('button');
  const deleteElement = document.createElement('button');

  actionsElement.classList.add('actions');
  editElement.classList.add('edit-button');
  deleteElement.classList.add('delete-button');

  editElement.innerHTML = 'Edit';
  deleteElement.innerHTML = 'Delete';

  taskElement.appendChild(contentElement);
  actionsElement.appendChild(editElement);
  actionsElement.appendChild(deleteElement);
  taskElement.appendChild(actionsElement);
  tasksList.appendChild(taskElement);
}

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
    } else {
      changeLocalStorage(contentElement, 'replace');
      contentElement.setAttribute('readonly', 'readonly');
      editElement.innerHTML = 'Edit';
    }
  } else if (taskItem.classList[0] === 'delete-button') {
    const taskElement = taskItem.parentElement.parentElement
    changeLocalStorage(taskElement, 'delete');
    tasksList.removeChild(taskElement);
  }
}

// add to localStorage
function addLocalStorage(task) {
  localTasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(localTasks));
}

// modify localStorage
function changeLocalStorage(task, action) {
  if (action === 'delete') {
    const indexName = task.children[0].value;
    localTasks.splice(localTasks.indexOf(indexName), 1);
    localStorage.setItem('tasks', JSON.stringify(localTasks));
  } else if (action === 'replace') {
    const newValue = task.value;
    localTasks.splice(localTasks.indexOf(oldValue), 1, newValue);
    localStorage.setItem('tasks', JSON.stringify(localTasks));
  }
}

// restore task items
function getLocalStorage() {
  localTasks.forEach((task) => {
    addTask(task);
  })
}

///////////////////
// Date and Time //
///////////////////
const dateTimeElement = document.querySelector('#date-time');
const dateFormat = 'dl d. ml yl, th:tm:ts';

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

  const output = format.replace(/ml|ms|m|dl|ds|d|yl|y|th|tm|ts/gi, matched => formatMap[matched]);
  dateTimeElement.innerHTML = output;
}

// make the display live
setInterval(toDate, 1000, dateFormat);

///////////////
// Dark Mode //
///////////////
const darkModeToggle = document.querySelector('#dark-mode-toggle');
let darkMode = localStorage.getItem('darkMode');
  
function enableDarkMode() {
  document.body.classList.add('darkmode');
  localStorage.setItem('darkMode', 'enabled');
}
  
function disableDarkMode() {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
}
   
// if the darkmode has previously been enabled enable it
if (darkMode === 'enabled') {
  enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  if (darkMode !== 'enabled') {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
