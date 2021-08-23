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

// Retrieves all registered users
let userInfo = localStorage.getItem('savedData');

let savedData = JSON.parse(userInfo);

let userIndex;

// Retrieves current user from array of registered users
for (i = 0; i < savedData.length; i++) {
    if (savedData[i].username === loggedUser) {
        userIndex = i;
        break;
    }
}

// Sets users preference of darkmode on page load
savedData[userIndex].darkMode === true ? $('body').addClass('darkMode') : $('body').removeClass('darkMode');

// Adds ON/OFF toggle switch in sidebar menu
savedData[userIndex].darkMode === true ? $('#darkMode').html('Dark Mode: ON') : $('#darkMode').html('Dark Mode: OFF');

$('#header').html(`<h1>${loggedUser}'s Finances</h1>`);


const cpInput = $('#createProjectInput');

const cpButton = $('#createProjectButton');

const startingCash = $('.financeContainer input');

const settingsButton = $('.menu button');

const settingsOptions = $('.menuItems');

const darkModeButton = $('#darkMode');

const logoutButton = $('#logout');

let sidebarCounter = 0;

const createProject = () => {
    let newProject = (`<h1 class="finances">${cpInput.val()}</h1>`);
    $('.financeSection').append(newProject);
}

const startingCashSetter = () => {
    console.log(startingCash.val());
    console.log('working');
}


const darkMode = () => { 
    savedData[userIndex].darkMode === true ? savedData[userIndex].darkMode = false : savedData[userIndex].darkMode = true;
    savedData[userIndex].darkMode === true ? $('body').addClass('darkMode') : $('body').removeClass('darkMode');
    savedData[userIndex].darkMode === true ? $('#darkMode').html('Dark Mode: ON') : $('#darkMode').html('Dark Mode: OFF');
}


const sidebar = () => {
    sidebarCounter++;
    if (sidebarCounter % 2 !== 0) {
        settingsOptions.css('display', 'block');
    } else {settingsOptions.css('display', 'none')}
    console.log(sidebarCounter)
}

const logout = () => {
    localStorage.setItem('savedData', JSON.stringify(savedData))
    location.href = "/html_components/index.html"
    localStorage.removeItem('loggedUser')
}


startingCash.on('input', startingCashSetter);

cpButton.on('click', createProject);

settingsButton.on('click', sidebar);

darkModeButton.on('click', darkMode)

logoutButton.on('click', logout)
    

