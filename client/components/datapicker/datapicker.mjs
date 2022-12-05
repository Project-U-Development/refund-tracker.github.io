const date = new Date();
const calendarBox = document.querySelector(".dropdown");
const dropdown = document.getElementById("myDropdown");
const monthDays = document.querySelector(".days");
const nonActiveInput = document.querySelector(".calendar-input-label")


function renderCalendar() {
  date.setDate(1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();
  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const year = date.getFullYear();

  document.querySelector(".date h1").innerHTML =
    months[date.getMonth()] + " " + year;
  let days = "";
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class='prev-date'>${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class='today'>${i}</div>`;
    } else {
      days += `<div class='curDay'>${i}</div>`;
    }
    monthDays.innerHTML = days;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class='next-date'>${j}</div>`;
  }
  monthDays.innerHTML = days;
}

function listenToClick() {
  const elements = document.querySelectorAll(".curDay");
  for (const el of elements) {
    el.addEventListener("click", clickHandler);
  }
}

function clickHandler(event) {
  const year = date.getFullYear();
  const monthIndex = date.getMonth() + 1;
  const pickedDate = getTime(
    new Date(year + "-" + monthIndex + "-" + event.target.innerText)
  );
  setDueDate(pickedDate);
  hide();
}

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});
renderCalendar();


function ShowmyDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
  calendarBox.classList.toggle("hilighted");
  nonActiveInput.classList.add("activated-input-label")

}

function hide() {
  dropdown.classList.remove("show");
  calendarBox.classList.remove("hilighted");
  nonActiveInput.classList.remove("activated-input-label")
}

function addZero(d) {
  return d < 10 ? "0" + d : d;
}
function getTime(t) {
  let Y = t.getFullYear();
  let M = addZero(t.getMonth() + 1);
  let D = addZero(t.getDate());
  return `${D}-${M}-${Y}`;
}
const curDate = getTime(new Date());

setDueDate(curDate);
function setDueDate(dueDate) {
  document.getElementById("DuedateId").value = dueDate;
}
listenToClick();

const elements = document.getElementsByClassName("calendar");
for (i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", showDatapicker);
}

function showDatapicker() {
  if (this.children.length > 1) {
    this.children[1].style.height = "auto";
    this.children[1].style.opacity = "1";
    this.children[1].style.overflow = "visible";
  }
  listenToClick();
}

//function validate
const datepicker = document.getElementById("DuedateId");

function allowOnlyDigits(event) {
  const isDigit = /^\d$/.test(event.key);
  if (!isDigit) event.preventDefault();
}

function insertDash(event) {
  const newValue = `${event.target.value}${event.key}`;

  const needsDash = /^\d{2}(\-\d{2})?$/gim.test(newValue);
  if (needsDash) {
    event.preventDefault();
    event.target.value = `${newValue}-`;
  }
}

datepicker.onkeypress = (event) => {
  allowOnlyDigits(event);
  insertDash(event);
};
