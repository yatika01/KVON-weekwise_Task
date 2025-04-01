// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        console.log('User already logged in.');
    } else {
        console.log('User not logged in.');
    }
});

// Handle login form submission
const loginForm = document.querySelector('#login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate successful login
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login Successful!');

        // Redirect to index.html after login
        window.location.href = 'index.html';
    });
}

// Handle signup form submission
const signupForm = document.querySelector('#signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate successful signup
        localStorage.setItem('isLoggedIn', 'true');
        alert('Signup Successful!');

        // Redirect to index.html after signup
        window.location.href = 'index.html';
    });
}
// Redirect to login page if not logged in
function requireAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        alert('Please log in to access this page.');
        window.location.href = 'login.html';
    }
}

// Call requireAuth() only on quiz.html
if (window.location.pathname.includes('quiz.html')) {
    requireAuth();
}

// Redirect to login only on restricted pages if not logged in
const restrictedPages = ['quiz.html', 'index.html','trivia.html'];
const currentPage = window.location.pathname.split('/').pop();

if (restrictedPages.includes(currentPage) && localStorage.getItem('isLoggedIn') !== 'true') {
    localStorage.setItem('redirectAfterLogin', currentPage);
    window.location.href = 'login.html';
}
$(document).ready(function () {
    $('.card').hover(
        function () {
            $(this).css({ 'transform': 'translateY(-10px)', 'box-shadow': '0 12px 25px rgba(0, 0, 0, 0.2)' });
        },
        function () {
            $(this).css({ 'transform': 'translateY(0)', 'box-shadow': '0 8px 15px rgba(0, 0, 0, 0.1)' });
        }
    );
});
function toggleDarkMode() {
    // Toggle dark mode on the body
    document.body.classList.toggle("dark-mode");

    // Toggle dark mode on the card
    const card = document.querySelector(".card");
    card.classList.toggle("bg-dark");
    card.classList.toggle("text-light");
  }