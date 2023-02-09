
//make a clock

const showTime = () => {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = 'AM';

  if (hour === 0) {
    hour = 12;
  }

  if (hour > 12) {
    hour -= 12;
    am_pm = 'PM'
  }
  hour = (hour < 10) ? '0' + hour : hour;
  min = (min < 10) ? '0' + min : min;
  sec = (sec < 10) ? '0' + sec : sec;

  const currentTime = `${hour}:${min}:${sec} ${am_pm}`

  document.getElementById('clock-display').innerText = currentTime;

  setTimeout(showTime, 1000);
}




document.addEventListener('DOMContentLoaded', () => {

  showTime();

  async function getWeather() {
    const fetchWeather = await fetch('https://api.weather.gov/gridpoints/MTR/91,89/forecast');
    const data = await fetchWeather.json();
    const weatherBox = document.getElementById('temperature')
    weatherBox.innerHTML = `${data.properties.periods[0].shortForecast} ${data.properties.periods[0].temperature}°F`
  }


  getWeather();


  const submitButton = document.querySelector('#submit');

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    const userTaskContainer = document.createElement('div')
    userTaskContainer.id = 'user-task-container'
    
    // create a check box
    const checkBox = document.createElement('button')
    checkBox.id = 'check-box'

    checkBox.addEventListener('click', (e) => {
        // e.preventDefault();
        if (checkBox.style.backgroundColor === 'green') {
          checkBox.style.backgroundColor = 'white';
        } else {
          checkBox.style.backgroundColor = 'green';
        }
        
    })

    userTaskContainer.appendChild(checkBox);
    const taskWords = document.createElement('div');
    taskWords.id = 'task-words'
    userTaskContainer.appendChild(taskWords)

    // user adds tasks to to do list 
    const usersTask = document.getElementById('task');
    const task = document.createElement('li')
    
    task.id = 'task-text'
    taskWords.innerHTML = usersTask.value;
  
  
    usersTask.appendChild(userTaskContainer)
    
    // create a trash can (removes elements)
    let trashCanImage = document.createElement('img');
    trashCanImage.src = 'trash-can-icon.png';
    const deleteButton = trashCanImage;
    deleteButton.id = 'trash-can';
    
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      deleteButton.parentNode.remove();
      
    })
    userTaskContainer.appendChild(trashCanImage);
    
    
    document.querySelector('ul').appendChild(userTaskContainer);
    
    // empty user input 
    usersTask.value = ''; 
  })

  document.body.style.background = "#"+((1<<24)*Math.random()|0).toString(16);


})