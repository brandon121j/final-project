// Redirects user if they haven't properly logged in
if (JSON.parse(localStorage.getItem('loggedUser') === null)) {
    location.href = "/html_components/index.html";
} 

// Retrieves username of logged in user
let loggedUser = localStorage.getItem('loggedUser');

// Logs user out when they leave the page
// window.onbeforeunload = function () { 
//     localStorage.removeItem('loggedUser');
// }

let userInfo = localStorage.getItem('savedData');

let userIndex;

let savedData = JSON.parse(userInfo);

for (i = 0; i < savedData.length; i++) {
    if (savedData[i].username === loggedUser) {
        userIndex = i;
        break;
    }
}

$('#header').html(`<h1>${loggedUser}'s Finances</h1>`);


const cpInput = $('#createProjectInput');

const cpButton = $('#createProjectButton');

const usernameSettings = $('.menuItems span')

const startingCash = $('.financeContainer input');

const settingsButton = $('.menu button');

const settingsOptions = $('.menuItems');

const darkModeButton = $('#darkMode');

usernameSettings.html(loggedUser);

let darkModeToggle = false;

const createProject = () => {
    let newProject = (`<h1 class="finances">${cpInput.val()}</h1>`);
    $('.financeSection').append(newProject);
}

const startingCashSetter = () => {
    console.log(startingCash.val());
    console.log('working');
}

let darkModeCounter = 0
const darkMode = () => {
    darkModeCounter++;
    darkModeCounter % 2 !== 0 ? darkModeToggle = true : darkModeToggle = false;
    if (darkModeToggle === true) {
        savedData[userIndex].darkMode = true;
        $('body').addClass('darkMode')
    } else {
        savedData[userIndex].darkMode = false;
        $('body').removeClass('darkMode');
    }
    console.log(savedData[userIndex].darkMode)
}

let sidebarCounter = 0;
const sidebar = () => {
    sidebarCounter++;
    if (sidebarCounter % 2 !== 0) {
        settingsOptions.css('display', 'block');
    } else {settingsOptions.css('display', 'none')}
    console.log(sidebarCounter)
}


startingCash.on('input', startingCashSetter);

cpButton.on('click', createProject);

settingsButton.on('click', sidebar);

darkModeButton.on('click', darkMode)