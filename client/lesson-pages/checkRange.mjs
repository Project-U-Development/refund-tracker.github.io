const checkRange = () => {
  const form = document.getElementById('range');
  const paragraph = document.getElementById('result');

  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const min = formData.get('min');
    const max = formData.get('max');
    const num = formData.get('number');

    paragraph.innerText = `Is in range: ${_.inRange(num, min, max)}`;
  }
}

checkRange();
