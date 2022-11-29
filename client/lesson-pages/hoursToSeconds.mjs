import { hoursToSeconds } from "https://unpkg.com/date-fns@2.29.3/esm/index.js";

const convertHoursToSeconds = () => {
  const form = document.getElementById('timeConverter');
  const paragraph = document.getElementById('seconds');

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const hours = formData.get('hours');
    const seconds = hoursToSeconds(hours);

    paragraph.innerText = seconds;
  }
}

convertHoursToSeconds();
