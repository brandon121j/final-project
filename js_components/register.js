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

// Retrieves saved users from local storage
if (JSON.parse(localStorage.getItem('savedData') === null)) {
    savedData = [];
} else {
    savedData = JSON.parse(localStorage.getItem('savedData'));
} 

let registerValidator = {
    user: false,
    uniqueUser: false,
    pass: false,
    confirm: false 
}

const validatorStatus = () => {
    let passValue = password.val();
    let confirmValue = confirm.val();
    let usernameValue = username.val();
    if (savedData.length > 0) {
        for(i = 0; i < savedData.length; i++) {
            if (savedData[i].username === usernameValue) {
                registerValidator.uniqueUser = false;
                break;
            } else {registerValidator.uniqueUser = true}
        }
    } else {registerValidator.uniqueUser = true}

    usernameValue.length > 2 ? registerValidator.user = true : registerValidator.user = false;
    passValue.length > 2 ? registerValidator.pass = true : registerValidator.pass = false;
    confirmValue === passValue && confirmValue.length > 2 ? registerValidator.confirm = true : registerValidator.confirm = false; 
}

const submit = () => {
    let passValue = password.val();
    let confirmValue = confirm.val();
    let usernameValue = username.val();

    let userData = {
        username: username.val(),
        password: password.val(),
        darkMode: false
    }

    if (
        registerValidator.user === true &&
        registerValidator.pass === true &&
        registerValidator.confirm === true &&
        registerValidator.uniqueUser === true &&
        usernameValue.length > 2 && 
        passValue.length > 2 && 
        confirmValue.length > 2 &&
        passValue === confirmValue
        ) {
            savedData.push(userData)
            localStorage.setItem('savedData', JSON.stringify(savedData))
            window.location.href = "../index.html"
        }
}

const usernameValidator = () => {
    registerValidator.user !== true ? username.removeClass('valid') && username.addClass('error') && usernameMessage.html(usernameError) : username.removeClass('error') && username.addClass('valid') && usernameMessage.html('') && takenValidator();
}

const takenValidator = () => {
    registerValidator.uniqueUser !== true ? username.removeClass('valid') && username.addClass('error') && usernameMessage.html('* Username taken') : username.removeClass('error') && username.addClass('valid') && usernameMessage.html('')
}

const passwordValidator = () => {
    registerValidator.pass !== true ? password.addClass('error') && passwordMessage.html(passwordError) : password.removeClass('error') && password.addClass('valid') && passwordMessage.html('');
}

const confirmValidator = () => {
    registerValidator.confirm !== true ? confirm.addClass('error') && confirmMessage.html(confirmError) : confirm.removeClass('error') && confirm.addClass('valid') && confirmMessage.html('');

}

$('input').on('change', validatorStatus);

username.on('blur', usernameValidator);

password.on('blur', passwordValidator);

confirm.on('blur', confirmValidator);

button.on('click', submit);

