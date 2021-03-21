// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const timer = document.getElementById("timer");
const gameTimer = document.getElementById("gameTimer");

// create our questions
let questions = [
    {
        question : "JavaScript is an ECMAScript.",
        choiceA : "True",
        choiceB : "False",
        choiceC : "Both",
        correct : "A"
    },{
        question : "JavaScript is written under which tag?",
        choiceA : "<javascript></javascript>",
        choiceB : "<script></script>",
        choiceC : "<code></code>",
        correct : "B"
    },{
        question : "JavaScript variable is declaired with which key word?",
        choiceA : "new",
        choiceB : "string",
        choiceC : "var",
        correct : "C"
    },{
        question : "Which of the following are primitive data types in JavaScript?",
        choiceA : "String",
        choiceB : "Boolean",
        choiceC : "All of the above",
        correct : "C"
    },{
        question : "What does null mean in JavaScript?",
        choiceA : "Null means empty string value.",
        choiceB : "Null means the absence of a value.",
        choiceC : "Null means unknown value.",
        correct : "C"
    },{
        question : "What is eval() in JavaScript?",
        choiceA : "It executes a specified string as JavaScript code.",
        choiceB : "Displays a pop-up message.",
        choiceC : "Executes server side code in JavaScript.",
        correct : "A"
    },{
        question : "A variable declaired without a var keyword inside a function will become ____?",
        choiceA : "local",
        choiceB : "global",
        choiceC : "undefined",
        correct : "B"
    }
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;

const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

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
    
