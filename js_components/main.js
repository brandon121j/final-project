// Redirects user if they haven't properly logged in
if (JSON.parse(localStorage.getItem('loggedUser') === null)) {
    location.href = "/html_components/index.html";
} 

// Logs user out when they leave the page
window.onunload = function () { 
    localStorage.removeItem('loggedUser');
}

let loggedUser = localStorage.getItem('loggedUser');

console.log(loggedUser);

let savedUsers = [];


$('#header').html(`<h1>${loggedUser}'s Finances</h1>`);