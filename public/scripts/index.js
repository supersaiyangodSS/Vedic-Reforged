
const checkBox = document.querySelector('#checkbox');
const submitBtn = document.querySelector('#submitBtn');
const form = document.querySelector('#myForm');
const addressHP = document.querySelector('#address-hp');

const promptModal = (msg) => {
    const promptModalDom = document.querySelector('#prompt-modal');
    promptModalDom.innerText = msg;
    promptModalDom.classList.remove('-translate-y-16');
    setInterval(() => {
        promptModalDom.classList.add('-translate-y-16');
    }, 4000);
}

function submitForm (e) {
    const usernameDom = document.querySelector('#username').value;
    const passwordDom = document.querySelector('#password').value;
    let isValid = true;
    e.preventDefault();
    if (addressHP.value.length > 0) {
        return promptModal('Access Denied!');
    }
    if (usernameDom.trim() === '') {
        isValid = false;
        return promptModal('invalid username');
    }
    if (passwordDom.trim() === '' || passwordDom.trim().length < 8) {
        isValid = false;
        return promptModal('password should be atleast 8 characters long');
    }

    if (isValid) {
        form.submit();
    }
}

submitBtn.addEventListener('click', submitForm);
form.addEventListener('submit', submitForm);

