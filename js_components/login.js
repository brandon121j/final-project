let userInfo = localStorage.getItem('savedData');

let data = JSON.parse(userInfo);

const username = $('#userName input');

const password = $('#password input');

const usernameMessage = $('#userName p')

const passwordMessage = $('#password p')

const button = $('button');

console.log(data)

const error = () => {
    for(i = 0; i < data.length; i++) {
        if (username.val() !== data[i].username && password.val() !== data[i].password || 
            username.val() !== data[i].username || password.val() !== data[i].password
        ) {
            passwordMessage.addClass('error');
            username.addClass('errorInput');
            password.addClass('errorInput');
            passwordMessage.html('* Invalid login credentials');
        } 
    }   
}

const redirect = () => {
    passwordMessage.html('');
    username.addClass('success');
    password.addClass('success');
    window.location.href = "/html_components/main.html"
}

const submit = () => {
    data.forEach(element => {
        username.val() === element.username && password.val() === element.password ? redirect() : error();
    })
}

button.on('click', submit);