const inputEmail = document.querySelector('#eMail');
inputEmail.addEventListener('input', (event) => {
    document.querySelector('#buttonEnterEmail').disabled = !event.target.checkValidity();
})

