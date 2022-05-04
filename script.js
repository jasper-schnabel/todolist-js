window.addEventListener('load', () => {
  const form = document.querySelector('#new-task-form');
  const input = document.querySelector('#new-task-input');
  const tasks = document.querySelector('#task-list');

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

    // button functionality
    editElement.addEventListener('click', () => {
      if (editElement.innerHTML == 'Edit') {
        contentElement.removeAttribute('readonly');
        contentElement.focus();
        editElement.innerHTML = 'Save';
      } else {
        contentElement.setAttribute('readonly', 'readonly');
        editElement.innerHTML = 'Edit';
      }
    })

    deleteElement.addEventListener('click', () => {
      tasks.removeChild(taskElement);
    })

    // assemble it all together
    taskElement.appendChild(contentElement);
    actionsElement.appendChild(editElement);
    actionsElement.appendChild(deleteElement);
    taskElement.appendChild(actionsElement);
    tasks.appendChild(taskElement);
  })

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
