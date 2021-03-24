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

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;

// const gaugeWidth = 150; // 150px
// const gaugeUnit = gaugeWidth / questionTime;
// let TIMER;
// let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
