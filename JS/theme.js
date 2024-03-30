function setTheme() {
  const root = document.documentElement;
  localStorage.setItem("theme", root.className === "light" ? "dark" : "light");;
  root.className = localStorage.getItem("theme");
}

function updateClock() {
  const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let date = new Date();
  let ids = {
    "hour": date.getHours(),
    "minutes" : date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes(),
    "period": date.getHours() >= 12 ? 'PM' : 'AM',
    "day-name": daysOfWeek[date.getDay()], 
    "month": months[date.getMonth()],
    "day-num": date.getDate(),
    "year": date.getFullYear()
  }

  for (let key in ids) {
    document.getElementById(key).innerHTML = ids[key];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.className = localStorage.getItem("theme") ? localStorage.getItem("theme") : "dark";
  setInterval(() => {
    updateClock();
  }, 1000)
})

document.querySelector('.theme-toggle').addEventListener('click', setTheme)