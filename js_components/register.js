const button = $('button')

const username = $('#registerUsername input')

const password = $('#registerPassword input');

const confirm = $('#confirmPassword input');

const usernameMessage = $('#registerUsername p');

const passwordMessage = $('#registerPassword p');

const confirmMessage = $('#confirmPassword p');

const usernameError = '* username must be longer than 2 characters';

const passwordError = '* password must be longer than 2 characters';

const confirmError = '* Passwords must match';

let savedData;

if (JSON.parse(localStorage.getItem('savedData').length == 0)) {
    savedData = [];
} else {
    savedData = JSON.parse(localStorage.getItem('savedData'));
}

let registerValidator = {
    user: false,
    pass: false,
    confirm: false 
}

const submit = () => {
    let userData = {
        username: username.val(),
        password: password.val()
    }

    if (registerValidator.user === true &&
        registerValidator.pass === true &&
        registerValidator.confirm === true) {
            savedData.push(userData)
            localStorage.setItem('savedData', JSON.stringify(savedData))
            window.location.href = "/html_components/index.html"
        }
}

const validatorStatus = () => {
    let passValue = password.val();
    let confirmValue = confirm.val();
    let usernameValue = username.val();
    confirmValue === passValue && confirmValue.length > 3 ? registerValidator.confirm = true : registerValidator.confirm = false; 
    usernameValue.length > 3 ? registerValidator.user = true : registerValidator.user = false;
    passValue.length > 3 ? registerValidator.pass = true : registerValidator.pass = false;
}

const usernameValidator = () => {
    let usernameValue = username.val();
    usernameValue.length < 3 ? username.addClass('error') && usernameMessage.html(usernameError) : username.removeClass('error') && username.addClass('valid') && usernameMessage.html('');
}

const passwordValidator = () => {
    let passValue = password.val();
    passValue.length < 3 ? password.addClass('error') && passwordMessage.html(passwordError) : password.removeClass('error') && password.addClass('valid') && passwordMessage.html('');
}

const confirmValidator = () => {
    let confirmValue = confirm.val();
    let passValue = password.val();
    confirmValue !== passValue ? confirm.addClass('error') && confirmMessage.html(confirmError) :confirm.removeClass('error') &&confirm.addClass('valid') &&confirmMessage.html('');
}

$('input').on('change', validatorStatus);

username.on('blur', usernameValidator);

password.on('blur', passwordValidator);

confirm.on('blur', confirmValidator);

button.on('click', submit);




