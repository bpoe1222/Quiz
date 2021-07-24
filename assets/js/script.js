const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
const startingMinutes = 1;
let time = startingMinutes * 60;
// var progressBarFull = document.querySelector("#progressBarFull");

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

const countDownEl = document.getElementById("timer");

setInterval(timerCountdown, 1000);

function timerCountdown () {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countDownEl.innerHTML = `${minutes}:${seconds}`;
    time--;
    time = time < 1 ? 0 : time;

    if(time === 0) {
        return window.location.assign("../end/end.html")
    }
    
};

const questions = [
    {
        question: "What tag is used to define an interactive field where users can enter data?",
        choice1: "<interact></interact>",
        choice2: "<input></input>",
        choice3: "<embed></embed>",
        choice4: "<code></code>",
        answer: 2,
    },
    {
        question: "What tag is used to define an unordered list?",
        choice1: "<unordered-list></unordered-list>",
        choice2: "<ol></ol>",
        choice3: "<li></li>",
        choice4: "<ul></ul>",
        answer: 4,
    },
    {
        question: "What declaration must be included at the very beginning of an HTML document?",
        choice1: "<!DOCTYPE html>",
        choice2: "<html lang='en'>",
        choice3: "<begin></begin>",
        choice4: "<start></start>",
        answer: 1,
    },
    {
        question: "What tag is used to define the title?",
        choice1: "<title></title>",
        choice2: "<header></header>",
        choice3: "<begin-title></begin-title>",
        choice4: "<main></main>",
        answer: 1,
    }
];

var SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

 getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign("../end/end.html")
    }

    

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    // progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        if(classToApply === 'incorrect') {
            time -= 10
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);

        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};



startGame();