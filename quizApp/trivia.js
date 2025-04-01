// Enable button only when the checkbox is checked
document.getElementById('agree-checkbox').addEventListener('change', function () {
    document.getElementById('start-quiz-btn').disabled = !this.checked;
});

// Redirect to the questionnaire/quiz page on button click
function startTrivia() {
    window.location.href = 'trivia-quiz.html'; // Redirect to the quiz page
}
if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert('Please log in to access the quiz.');
    window.location.href = 'login.html';
}
