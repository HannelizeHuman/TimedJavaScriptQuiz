// Variables selection for elements
// Time and score
let time = document.querySelector("p.time");
let secondsLeft = 75;
let score = document.querySelector("#score");

// Sections
// Intro
const intro = document.querySelector("#intro");

// Questions
const questions = document.querySelector("#questions");
// Placement of question
let question = document.querySelector("#question");
// Question count
let questionCount = 0;
// Question result (wrong/correct)
const result = document.querySelector("#result");

// Scores and Inputs
const inputName = document.querySelector("#inputName");
// Player Name Input
let nameInput = document.querySelector("#name");

// High Scores
const highScores = document.querySelector("#highScores");
// List of Scores
const scoreList = document.querySelector("#scoreList");
// Convert scores into array
let listOfScores = [];

// Buttons
//Start
const startButton = document.querySelector("#start");
// Answer button class
const answerButton = document.querySelector("ans");
// Answer A
const answerA = document.querySelector("#A");
// Answer B
const answerB = document.querySelector("#B");
// Answer C
const answerC = document.querySelector("#C");

// Score Submit
const submitScore = document.querySelector("#submitScore");
// Return
const returnMainPage = document.querySelector("#return");
// View High Scores
const viewHighscores = document.querySelector("#highScores");


// Object for Questions & Answers

const questions = [
    {
        // Question 0
        question: "JavaScript is an ECMAScript.",
        answers: [ "A. True", "B. False", "C. Both"],
        correctAnswer: "A"
    },
    {
        // Question 1
        question: "JavaScript is written under which tag?",
        answers: [ "A. <javascript></javascript>", "B. <script></script>", "C. <code></code>"],
        correctAnswer: "B"
    },
    {
        // Question 2
        question : "JavaScript variable is declaired with which key word?",
        answers: [ "A. new", "B. string", "C. var"],
        correctAnswer: "C"
    },
    {
        // Question 3
        question : "Which of the following are primitive data types in JavaScript?",
        answers: [ "A. String", "B. Boolean", "C. All of the above"],
        correctAnswer: "C"
    },
    {
        // Question 4  
        question : "What is eval() in JavaScript?",
        answers: [ "A. It executes a specified string as JavaScript code.", "B. Displays a pop-up message.", "C. Executes server side code in JavaScript."],
        correctAnswer: "A"
    },
    {
        // Question 5
        question : "A variable declaired without a var keyword inside a function will become ____?",
        answers: [ "A. local", "B. global", "C. undefined"],
        correctAnswer: "B"
    }
];

// Functions

// Timer
function setTime() {
    let timeInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = `Time:$(secondsLeft}`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questions.style.display = "none";
            inputName.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// Quiz Start: Timer and Questions
function startQuiz() {
    intro.style.display = "none";
    questions.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Answer check
function checkAnswer (event) {
    event.preventDefault();

    // Result message
    result.style.display = "block";
    let p = document.createElement("p");
    result.appendChild(p);

    // Message time out
    setTimeout(function() {
        p.style.display = 'none';
    },1000);

    // Answer Check
    if (question[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Incorrect":
    }

    // Increse question index with increment
    if (questionCount < questions.length) {
        questionCount++;
    }

    // Call to bring in next question when answer button is clicked
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    inputName.style.display = "none";
    highScores.style.display = "block";

    let init = nameInput.value.toUpperCase();
    listOfScores.push({initials: init, score: secondsLeft});

    // Sort Scores
    listOfScores = listOfScores.sort((a, b) => {
        if (a.score < b.score) {
            return 1:
        } else {
            result -1;
        }
    });

    scoreList.innerHTML="";
    for (let i = 0; i < listOfScores.length; i++) {
        let li = document.createElement("li");
        li.textContent = `&{listOfScores[i].initials}: ${listOfScores[i].score}`
        scoreList.append(li);
    }

    // Add scores to local storage
    storeScores();
    displayScores();
}


