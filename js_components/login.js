let userInfo = localStorage.getItem('savedData');

let savedData = JSON.parse(userInfo);

const username = $('#userInput');

const password = $('#passwordInput');

const usernameMessage = $('#userName p');

const passwordMessage = $('#password p');

const button = $('button');

let userIndex;

const error = () => {
    passwordMessage.addClass('error');
    username.addClass('errorInput');
    password.addClass('errorInput');
    passwordMessage.html('* Invalid login credentials');
}

const success = () => {
    passwordMessage.html('');
    username.addClass('success');
    password.addClass('success');
}

// Retrieves index number of associated username 
const indexCache = () => {
    for (i = 0; i < savedData.length; i++) {
        if (savedData[i].username === username.val()) {
            userIndex = i;
            break;
        }
    }
}

const redirect = () => {
    try {
        if (
        username.val() === savedData[userIndex].username && 
        password.val() === savedData[userIndex].password 
        ) {
            success();
            localStorage.setItem('loggedUser', savedData[userIndex].username);
            window.location.href = "/html_components/main.html";
        } else {
            error();
        }
    } catch (e) {error()}
}

username.on('change', indexCache)

button.on('click', redirect);