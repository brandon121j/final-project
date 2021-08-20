let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));


console.log(loggedUser);

$('#header').html(`<h1>${loggedUser}'s Finances</h1>`)