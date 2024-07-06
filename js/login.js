// Wait DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Get the login button by its id
  const loginButton = document.getElementById('loginButton');
  
  // Add a click event listener to the login button
  loginButton.addEventListener('click', function() {

    // Get user input text
    let userText = document.getElementById('user').value;

    // Get password input text
    let passwordText = document.getElementById('password').value;

    // Check if inputs are empty
    console.log(userText);
    console.log(passwordText);
    if (userText.length == 0) {
      alert("Empty user input");
      return;
    }
    if (passwordText.length == 0) {
      alert("Empty password input");
      return;
    }

    // Redirect to the target HTML page
    window.location.href = 'views/dashboard.html'; // Replace 'dashboard.html' with your target file
  });

});