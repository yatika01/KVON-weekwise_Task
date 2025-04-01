const toggleButton = document.getElementById('dark-mode-toggle');
const icon = document.getElementById('dark-mode-icon');

toggleButton.addEventListener('click', () => {
    // Toggle dark mode for body
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-light');

    // Toggle navbar background and text color
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('bg-dark');
    navbar.classList.toggle('navbar-dark');
    navbar.classList.toggle('navbar-light');
    navbar.classList.toggle('bg-light');
// Toggle dark mode with gradient for hero section
const heroSection = document.querySelector('.hero');
heroSection.classList.toggle('dark-mode');

    // Toggle card backgrounds and text
    document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle('bg-dark');
        card.classList.toggle('text-light');
        card.classList.toggle('border-light');
    });
    
    // Toggle accordion and dropdown styles
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.toggle('bg-dark');
        item.classList.toggle('text-light');
    });

    document.querySelectorAll('.form-select').forEach(select => {
        select.classList.toggle('bg-dark');
        select.classList.toggle('text-light');
    });

    // Change icon dynamically
    if (icon.classList.contains('fa-moon')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function (e) {
        e.preventDefault();
        const link = this.getAttribute('href');
        window.location.href = link; // Navigate to the target page
    });
});

function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardHTML = "";

    leaderboard.slice(0, 3).forEach((entry, index) => {
        let medal = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
        leaderboardHTML += `<p class="mb-1">${medal} ${entry.name} - ${entry.score} Points</p>`;
    });

    document.getElementById("leaderboard-preview").innerHTML = leaderboardHTML;
}

// Load leaderboard when the page is loaded
document.addEventListener("DOMContentLoaded", updateLeaderboard);

// Redirect to login if not logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    localStorage.setItem('redirectAfterLogin', 'quiz.html');
    window.location.href = 'login.html';
}
// Logout Logic
const logoutButton = document.querySelector('#logout-btn');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            // Clear login data
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('redirectAfterLogin');

            // Redirect to index.html after logout
            window.location.href = 'index.html';
        }
    });
}