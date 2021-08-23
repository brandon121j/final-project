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

// Loads current logged user's name at the top of page
$('#header').html(`<h1>${loggedUser}'s Finances</h1>`);

const cpInput = $('#createProjectInput');

const cpButton = $('#createProjectButton');

const startingCash = $('.formContainer input');

const settingsButton = $('.menu button');

const settingsOptions = $('.menuItems');

const darkModeButton = $('#darkMode');

const logoutButton = $('#logout');

const budgetProfiles = $('.finances h1');

const expenseAdder = $('.buttonContainer button');

const remainingCash = $('.remainingCash')

let expenseNames = $('.expenseName');

let expenseValues = $('.expenseNumber');

let sidebarCounter = 0;

let addedExpenses = 0;

let remainingCashValue = 0;

let financeData = {
    starting: 0,
    expenseName: [],
    expenseValue: []
}

const startingCashSetter = () => {
    financeData.starting = startingCash.val();
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
}

const logout = () => {
    localStorage.setItem('savedData', JSON.stringify(savedData))
    location.href = "/html_components/index.html"
    localStorage.removeItem('loggedUser')
}

const newExpenseAdder = () => {
    financeData.expenseName.push(expenseNames.val());
    financeData.expenseValue.push(expenseValues.val())
    let appendedExpenses = (`<h3>${expenseNames.val()}:   <span>-$${expenseValues.val()}<span></h3>`);
    $('.finances').append(appendedExpenses)
    calculator();
}

const calculator = () => {
    addedExpenses = 0;
    for (i = 0; i < financeData.expenseValue.length; i++) {
        addedExpenses += Number(financeData.expenseValue[i])
    }
    remainingCashValue = Number(financeData.starting) - Number(addedExpenses) 
    remainingCash.html(`Remaining Cash: $${remainingCashValue}`)
    console.log(addedExpenses)
}


startingCash.on('input', startingCashSetter);

settingsButton.on('click', sidebar);

darkModeButton.on('click', darkMode)

logoutButton.on('click', logout);

expenseAdder.on('click', newExpenseAdder);


