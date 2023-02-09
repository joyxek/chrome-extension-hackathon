//make a clock

const showTime = () => {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  let am_pm = "AM";

  if (hour === 0) {
    hour = 12;
  }

  if (hour === 12) {
    am_pm = "PM";
  }

  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  const currentTime = `${hour}:${min}:${sec} ${am_pm}`;

  document.getElementById("clock-display").innerText = currentTime;

  setTimeout(showTime, 1000);
};

//get a pastel color for the background
function getColor() {
  return (
    "hsl(" +
    360 * Math.random() +
    "," +
    (25 + 70 * Math.random()) +
    "%," +
    (85 + 10 * Math.random()) +
    "%)"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  showTime();

  async function getWeather() {
    const fetchWeather = await fetch(
      "https://api.weather.gov/gridpoints/MTR/91,89/forecast"
    );
    const data = await fetchWeather.json();
    const weatherBox = document.getElementById("temperature");
    const weatherImage = document.getElementById("weather-icon");

    weatherBox.innerHTML = `${data.properties.periods[0].shortForecast} ${data.properties.periods[0].temperature}°F`;

    const rainy = data.properties.periods[0].shortForecast.includes("rain");
    const cloudy = data.properties.periods[0].shortForecast.includes("cloud");

    if (data.properties.periods[0].isDaytime) {
      if (!rainy && !cloudy) {
        weatherImage.src = "day-sun.png";
      } else if (rainy) {
        weatherImage.src = "rain.png";
      } else {
        weatherImage.src = "day-cloudy.png";
      }
    } else {
      if (!rainy && !cloudy) {
        weatherImage.src = "night-clear.png";
      } else if (rainy) {
        weatherImage.src = "rain.png";
      } else {
        weatherImage.src = "night-cloudy.png";
      }
    }
  }

  getWeather();

  const submitButton = document.querySelector("#submit");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const userTaskContainer = document.createElement("div");
    userTaskContainer.id = "user-task-container";
    const usersTask = document.getElementById("task");

    //prevents user from submitting an empty string
    if (usersTask.value === "") {
      return false;
    }

    // create a check box
    const checkBox = document.createElement("button");
    checkBox.id = "check-box";
    userTaskContainer.appendChild(checkBox);

    checkBox.addEventListener("click", (e) => {
      checkBox.style.backgroundColor = "green";
      userTaskContainer.classList.add("removed");
      setTimeout(() => {
        userTaskContainer.remove();
      }, 750);
    });

    //textbox for new tasks
    const taskWords = document.createElement("div");
    taskWords.id = "task-words";
    taskWords.innerHTML = usersTask.value;
    userTaskContainer.appendChild(taskWords);

    // create a trash can to remove unwanted elements
    const trashCanImage = document.createElement("img");
    trashCanImage.src = "trash-can-icon.png";
    trashCanImage.id = "trash-can";

    
    userTaskContainer.appendChild(trashCanImage);
    
    // on mouse hover, append
    const openTrash = document.createElement("img");
    openTrash.src = "trash-open.png";
    openTrash.id = "trash-can-open";
    
    trashCanImage.addEventListener("mouseover", (e) => {
      trashCanImage.remove();
      console.log("hovered over trash");
      openTrash.style.padding = '0px';
      userTaskContainer.appendChild(openTrash);
    });
    
    openTrash.addEventListener("mouseout", (e) => {
      openTrash.remove();
      console.log('unhovered over trash');
      userTaskContainer.appendChild(trashCanImage);
    })
    
    openTrash.addEventListener("click", (e) => {
      e.preventDefault();
      openTrash.parentNode.remove();
    });

    //  user adds tasks to to do list
    const task = document.createElement("li");
    task.id = "task-text";
    task.appendChild(userTaskContainer);

    document.querySelector("ul").appendChild(task);

    // empty user input
    usersTask.value = "";
  });

  document.body.style.background = getColor();
});
