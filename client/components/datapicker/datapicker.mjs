
const date = new Date();

function renderCalendar () {
    
    date.setDate(1);

const monthDays = document.querySelector('.days');

const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();


const firstDayIndex = date.getDay();

const lastDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();


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
            "December"
        ];

const year = date.getFullYear();

document.querySelector('.date h1').innerHTML = months[date.getMonth()] + ' ' + year;
let days = '';

for(let x =firstDayIndex; x>0; x--) {
    days += `<div class='prev-date'>${prevLastDay - x + 1}</div>`;
}

for(let i = 1; i<=lastDay; i++) {
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class='today'>${i}</div>`;
    } else {
        days += `<div>${i}</div>`;
    }
    monthDays.innerHTML = days;
}

for(let j = 1; j <= nextDays; j++) {
    days +=`<div class='next-date'>${j}</div>`;
}
}

document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
})

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
})

renderCalendar();
const elements = document.getElementsByClassName('container');
for(i=0; i<elements.length; i++) {
    elements[i].addEventListener('mousedown', showDatapicker);
    elements[i].addEventListener('mouseleave', hideDatapicker);
}

function showDatapicker() {
    if(this.children.length>1){
        this.children[1].style.height = 'auto';
        this.children[1].style.opacity = '1';
        this.children[1].style.overflow = 'visible';  
    }
}
function hideDatapicker() {
    if(this.children.length>1){
        this.children[1].style.height = '0';
        this.children[1].style.opacity = '0';
        this.children[1].style.overflow = 'hidden';  
    }
}