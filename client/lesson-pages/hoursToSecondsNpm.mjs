import { hoursToSeconds } from "date-fns";

const convertHoursToSecondsNpm = () => {
  const form = document.getElementById('timeConverterNpm');
  const paragraph = document.getElementById('secondsNpm');

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const hours = formData.get('hours');
    const seconds = hoursToSeconds(hours);

    paragraph.innerText = seconds;
  }
}

convertHoursToSecondsNpm();
