let currentQuestionIndex = 0;
let questions = [];
let score = 0;
let timeLeft = 30;
let timer;
let draggedItem = null;

fetch('trivia-quiz-questions.json')
    .then(response => response.json())
    .then(data => {
        questions = data.questions;
        loadQuestion();
    })
    .catch(error => console.error("Error loading questions:", error));

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showResults();
            return;
        }
    
        let questionObj = questions[currentQuestionIndex];
        document.getElementById("question-text").innerText = questionObj.question;
    
        let optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";
    
        if (questionObj.type === "drag-drop") {
            loadDragDropQuestion(questionObj);
        } else {
            questionObj.options.forEach(option => {
                let button = document.createElement("button");
                button.innerText = option;
                button.classList.add("list-group-item", "list-group-item-action", "option-btn");
                button.onclick = () => checkAnswer(option, questionObj.correctAnswer); // Fixed correctAnswer reference
                optionsContainer.appendChild(button);
            });
        }
    
        updateProgressBar();
        resetTimer();
    }
    

// ✅ Load Drag & Drop Question
function loadDragDropQuestion(questionObj) {
    let dragContainer = document.createElement("div");
    dragContainer.classList.add("drag-container", "mb-3", "d-flex", "gap-2");

    questionObj.options.forEach((option, index) => {
        let dragItem = document.createElement("div");
        dragItem.innerText = option;
        dragItem.classList.add("drag-item", "list-group-item", "list-group-item-action");
        dragItem.setAttribute("draggable", true);
        dragItem.setAttribute("id", `drag-${index}`);
        dragItem.addEventListener("dragstart", dragStart);
        dragContainer.appendChild(dragItem);
    });

    let dropZone = document.createElement("div");
    dropZone.classList.add("drop-zone", "border", "p-3", "mt-3", "w-100");
    dropZone.setAttribute("id", "drop-zone");
    dropZone.innerText = "Drop here to arrange correctly";

    dropZone.addEventListener("dragover", dragOver);
    dropZone.addEventListener("drop", drop);

    document.getElementById("options").appendChild(dragContainer);
    document.getElementById("options").appendChild(dropZone);
}

// Drag Start
function dragStart(event) {
    draggedItem = event.target;
    console.log("Dragging item:", draggedItem.innerText);
    event.dataTransfer?.setData("text/plain", event.target.id);
}

// Allow Drop
function dragOver(event) {
    event.preventDefault();
    console.log("Dragging over drop zone...");
}

// Drop the Dragged Item
function drop(event) {
    event.preventDefault();
    if (draggedItem && event.target.classList.contains("drop-zone")) {
        event.target.appendChild(draggedItem);
        console.log("Dropped item:", draggedItem.innerText);
        draggedItem = null;
    }else {
        console.log("Drop failed or invalid drop zone!"); // ❌ Debug drop failure
    }
}

// ✅ Check Normal MCQ Answer
function checkAnswer(selected, correct) {
    if (selected.trim().toLowerCase() === correct.trim().toLowerCase()) {
        score += 10;
    }
    nextQuestion();
}

// ✅ Check Drag & Drop Answer
function checkDragDropAnswer(correctOrder) {
    let dropZone = document.querySelector("#drop-zone");
    let droppedItems = Array.from(dropZone.children).map(item => item.innerText.trim());

    if (JSON.stringify(droppedItems) === JSON.stringify(correctOrder)) 
        score += 10;    
    nextQuestion();
}

// Trigger this when done arranging drag-drop answers
function submitDragDropAnswer() {
    let questionObj = questions[currentQuestionIndex];
    checkDragDropAnswer(questionObj.correctOrder);
}

// Move to Next Question
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

// Move to Previous Question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// Progress Bar
function updateProgressBar() {
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
}

// Reset Timer
function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("timer-text").innerText = `00:30`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer-text").innerText = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function saveToLeaderboard(newScore) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [
        { name: "Jonathan Doe", score: 100 },
        { name: "Mahmud Saimon", score: 90 },
        { name: "Sarah Parker", score: 100}
    ];

    let playerName = prompt("Enter your name for the leaderboard:") || "Anonymous";
    leaderboard.push({ name: playerName, score: newScore });

    // Sort leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // Save updated leaderboard
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
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
            particleCount: 150,
            spread: 200,
            startVelocity: 40,
            colors: ['#ff7f50', '#ff6347', '#4caf50', '#2196f3', '#ffeb3b'],
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    }, 200);
}
// Call this when quiz ends
function showResults() {
    document.getElementById("quiz-container").classList.add("d-none");
    document.getElementById("scoreboard").classList.remove("d-none");

    let finalScoreText = `Your score: ${score * 10} points`; // Each correct answer gives 10 points
    document.getElementById("final-score").innerText = finalScoreText;

    saveToLeaderboard(score * 10); // Save score to leaderboard
    launchConfetti();
}

// Speech Recognition
function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript.toLowerCase();
        let matchedOption = questions[currentQuestionIndex].options.find(option => option.toLowerCase() === voiceInput);
        if (matchedOption) {
            checkAnswer(matchedOption, questions[currentQuestionIndex].answer);
        } else {
            showAlert("❌ No matching answer found!", "danger");
        }
    };
}

function toggleDarkMode() {
    // Toggle dark mode on the body
    document.body.classList.toggle("dark-mode");

    // Toggle dark mode on the card
    const card = document.querySelector(".card");
    card.classList.toggle("bg-dark");
    card.classList.toggle("text-light");
  }
