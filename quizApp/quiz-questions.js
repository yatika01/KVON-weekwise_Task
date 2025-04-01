let currentQuestionIndex = 0;
let questions = [];
let timer;
let timeLeft = 30;

// Fetch questions from JSON
fetch('questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data;
        loadQuestion();
    });

// Load question and options
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    let questionObj = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = questionObj.question;

    let optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";

    questionObj.options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.classList.add("list-group-item", "list-group-item-action", "option-btn");
        
        // Add click event to validate answer
        button.onclick = () => checkAnswer(option, questionObj.answer);
        optionsContainer.appendChild(button);
    });

    updateProgressBar();
    resetTimer();
}

// Check answer and show Bootstrap alert with sound
function checkAnswer(selectedOption, correctAnswer) {
    clearInterval(timer);
    
    if (selectedOption === correctAnswer) {
        document.getElementById("correct-sound").play(); // Play correct sound
        showAlert('✅ Correct Answer!', 'success');
    } else {
        document.getElementById("wrong-sound").play(); // Play wrong sound
        showAlert('❌ Wrong Answer. Try Again!', 'danger');
    }
}
// Show Bootstrap alert without OK button
function showAlert(message, type) {
    const alertBox = document.getElementById("answer-alert");
    alertBox.className = `alert alert-${type} mt-3`;
    alertBox.innerHTML = message;
    alertBox.classList.remove("d-none");

    // Hide alert after 2 seconds
    setTimeout(() => {
        alertBox.classList.add("d-none");
    }, 2000);
}

// Update progress bar
function updateProgressBar() {
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
}
// Reset and start the timer correctly ⏰
function resetTimer() {
    clearInterval(timer);
    timeLeft = 30; // Reset timer for each question
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timer);
            showAlert('⏰ Time Up! Moving to Next Question.', 'warning');
            currentQuestionIndex++;
            loadQuestion();
        }
    }, 1000);
}

// Update the timer display dynamically
function updateTimerDisplay() {
    document.getElementById("timer-text").innerText = `${timeLeft}s remaining`;
}
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
}
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}
function launchConfetti() {
    var duration = 3 * 1000; // 3 seconds
    var animationEnd = Date.now() + duration;

    var interval = setInterval(function () {
        if (Date.now() > animationEnd) {
            clearInterval(interval);
            return;
        }
        confetti({
            particleCount: 30,
            spread: 100,
            startVelocity: 30,
            colors: ['#ff7f50', '#ff6347', '#4caf50', '#2196f3', '#ffeb3b'],
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    }, 200);
}
// Show results at the end
function showResults() {
    document.getElementById("quiz-container").innerHTML = `
        <div class="text-center">
            <h3>🎉 Quiz Completed!</h3>
            <p>Check your score and try again!</p>
            
            <!-- Check Scores Button -->
            <button class="btn btn-success me-2" onclick="goToLeaderboard()">Check Scores</button>
            
            <!-- Restart Quiz Button -->
            <button class="btn btn-primary" onclick="restartQuiz()">Restart Quiz</button>
        </div>
    `;
    launchConfetti();
}
// Navigate to Leaderboard Section on Home Page
function goToLeaderboard() {
    window.location.href = "index.html#leaderboard";
}
// Restart the Quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    timeLeft = 30;

    document.getElementById("quiz-container").innerHTML = `
        <!-- Progress Bar -->
        <div class="progress mb-3">
            <div id="progress-bar" class="progress-bar progress-bar-striped bg-info" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>

        <!-- Timer -->
        <div class="text-end text-danger fw-bold" id="timer-text">00:30</div>

        <h3 id="question-text" class="mb-4 text-center">Loading Question...</h3>
        <div id="options" class="list-group"></div>
        <div class="d-flex justify-content-between mt-4">
            <button id="prev-btn" class="btn btn-outline-secondary" onclick="prevQuestion()">Previous</button>
            <button id="next-btn" class="btn btn-primary" onclick="nextQuestion()">Next</button>
        </div>
    `;
    loadQuestion(); // Load the first question again
}
function toggleDarkMode() {
    // Toggle dark mode on the body
    document.body.classList.toggle("dark-mode");

    // Toggle dark mode on the card
    const card = document.querySelector(".card");
    card.classList.toggle("bg-dark");
    card.classList.toggle("text-light");
  }
