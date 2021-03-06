// Variables selection for elements
// Time and score
let time = document.querySelector(".gameTimer");
let secondsLeft = 75;
let score = document.querySelector("#score");

// Element Sections
// Intro
const intro = document.querySelector("#intro");

// Questions
// const questionSection = document.querySelector("#questionSection");
const questionSection = document.querySelector("#q");
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
const answerButton = document.querySelector(".ans");
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
        answers: ["A. True", "B. False", "C. Both"],
        correctAnswer: "A. True"
    },
    {
        // Question 1
        question: "JavaScript is written under which tag?",
        answers: [ "A. <javascript></javascript>", "B. <script></script>", "C. <code></code>"],
        correctAnswer: "B. <script></script>"
    },
    {
        // Question 2
        question : "JavaScript variable is declaired with which key word?",
        answers: [ "A. new", "B. string", "C. var"],
        correctAnswer: "C. var"
    },
    {
        // Question 3
        question : "Which of the following are primitive data types in JavaScript?",
        answers: [ "A. String", "B. Boolean", "C. All of the above"],
        correctAnswer: "C. All of the above"
    },
    {
        // Question 4  
        question : "What is eval() in JavaScript?",
        answers: [ "A. It executes a specified string as JavaScript code.", "B. Displays a pop-up message.", "C. Executes server side code in JavaScript."],
        correctAnswer: "A. It executes a specified string as JavaScript code."
    },
    {
        // Question 5
        question : "A variable declaired without a var keyword inside a function will become ____?",
        answers: [ "A. local", "B. global", "C. undefined"],
        correctAnswer: "B. global"
    }
];

// Functions

// Timer
function setTime() {
    let timeInterval = setInterval(function() {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}`;
        console.log(secondsLeft)

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timeInterval);
            questionSection.style.display = "none";
            inputName.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

function clearcontent() {
    document.getElementById("questionSection").innerHTML = "";
}

// Quiz Start: Timer and Questions
function startQuiz() {
    clearcontent;
    sessionStorage.clear();
    intro.style.display = "none";
    questionSection.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Function for Multiple choice queastions
function setQuestion(id) {
    if (id < questions.length) {
        var p = document.createElement("p");
        p.textContent = questions[id].question;
        document.getElementById("q").appendChild(p);
        for(var i=0;i<questions[id].answers.length;i++)
        {
            var btn = document.createElement("button");
            btn.textContent = questions[id].answers[i];
            btn.classList.add("answers");
            btn.addEventListener("click", checkAnswer);
            document.getElementById("q").appendChild(btn);
        }
        
        /*answerA.textContent = questions[id].answers[0];
        answerB.textContent = questions[id].answers[1];
        answerC.textContent = questions[id].answers[2];*/
    }
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
    if (questions[questionCount].correctAnswer === event.target.innerHTML) {
        p.textContent = "Correct";
    } else if (questions[questionCount].correctAnswer !== event.target.innerHTML) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Incorrect";
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
            return 1;
        } else {
            result -1;
        }
    });

    scoreList.innerHTML="";
    for (let i = 0; i < listOfScores.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${listOfScores[i].initials}: ${listOfScores[i].score}`
        scoreList.append(li);
    }

    // Add scores to local storage
    storeScores();
    displayScores();
}

// Get scores from local storage

function storeScores() {
    localStorage.setItem("listOfScores", JSON.stringify(listOfScores));
}

function displayScores() {
    let storeScoredList = JSON.parse(localStorage.getItem("listOfScores"));

    if (storeScoredList !== null) {
        listOfScores = storeScoredList;
    }
}

// Clear Scores


// EventListeners
// Start timer and display first question
startButton.addEventListener("click", startQuiz);

// // Answer loop
// answerButton.forEach(item => {
//     item.addEventListener('click', checkAnswer);
// });

// Add Score
submitScore.addEventListener("click", addScore);

// Return Button
returnMainPage.addEventListener("click", function() {
    highScores.style.display = "none";
    intro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}`;
});

// Clear scores
// clearScores.addEventListener("click", clearScores);


// View High Scores
viewHighscores.addEventListener("click", function() {
    if (highScores.style.display === "none") {
        highScores.style.display = "block";
    } else if (highScores.style.display === "block") {
        highScores.style.display = "none";
    } else {
        return alert("No scores have been recorded.");
    }
});




