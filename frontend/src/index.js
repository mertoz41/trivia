const category_url = 'http://localhost:3000/categories'
const question_url = 'http://localhost:3000/questions'
document.addEventListener('DOMContentLoaded', function(){
    // document.getElementById('login-form').addEventListener('submit', handleLogin
    fetchCategories()
})

function handleLogin(e){
    e.preventDefault()
    document.getElementById('login-form').hidden = true
    fetchCategories()
}




function fetchCategories(){

    let form = document.getElementById('category-form')
    fetch(category_url)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(category => { 
            renderCategory(category) 
        })
       
    })
    renderForms()
}

function renderCategory(category){
    let category_select = document.getElementById('category-select')
    let form = document.getElementById('forms')
    let category_option = document.createElement('option')
    category_option.value = category.id
    category_option.text = category.name
    category_select.add(category_option)
}

function renderForms(e){
    let forms = document.getElementById('forms')
    forms.hidden = false 
    forms.addEventListener('submit', getQuestions)
}

let globalQuestions 
let questionCounter 
function getQuestions(e){
    e.preventDefault()
    let category_id = parseInt(document.querySelector("#category-select").value)
    let difficulty = document.querySelector('#difficulty-select').value
    fetch(`${question_url}/${category_id}/${difficulty}`)
    .then(resp => resp.json())
    .then(questions => { 
        globalQuestions = questions
        questionCounter = 0
        renderQuestions(globalQuestions[0])
    })
    
    document.getElementById('forms').hidden = true
}

function renderQuestions(question){
    let questContainer = document.getElementById('questions-container')
    let questDiv = document.createElement('div')
    let oneQuestion = document.createElement('p')
    let tracker = document.createElement('div')
    let startQ = questionCounter + 1
    let lengthQ = globalQuestions.length
    tracker.innerText = `Question ${startQ} out of ${lengthQ}`
    oneQuestion.innerText = question.text.replace(/&quot;/g, '"').replace(/&#039;/g, "`").replace(/&amp;/g, '&')
    questDiv.append(tracker, oneQuestion)
    
    question.shuffle.forEach(choice => {
        let choiceButton = document.createElement('button')
        choiceButton.innerText = choice.text.replace(/&quot;/g, '"').replace(/&#039;/g, "`").replace(/&amp;/g, '&')
        choiceButton.value = choice.correct
        choiceButton.id = choice.id
        questDiv.append(choiceButton)
        //would be listening for the boolean true or false 
        //passes to the submit function (if true, then) (if false)
        choiceButton.addEventListener('click', userChoice)
        
    })
    let submitButton = document.createElement('button')
    submitButton.value = 'submit'
    submitButton.innerText = "Submit"
   
    let passButton = document.createElement('button')
    passButton.innerText = "Pass"
    passButton.value = 'pass'
    passButton.addEventListener('click', handlePass)

    questDiv.append(submitButton, passButton)

    questContainer.appendChild(questDiv)
    //if choice.correct == true
    //submit + 1 to the leader board else -1 a and go to the next question
    //go to the next question
    //(alert: you must choose an answer)
    
}


let currentChoice = 'unchosen'
let wrongQuestions = []
function userChoice(e) {
    if (e.target.value == 'true') {
        currentChoice = true
    } else {
        currentChoice = false
        question_title = document.querySelector("#questions-container > div > p:nth-child(2)")
        wrongQuestions.push(question_title.innerText)
    }
    let submitButton = document.querySelector("#questions-container > div > button:nth-child(6)")
    submitButton.addEventListener('click', handleSubmit)
}

let userPoints = 0
let correctAnswers = 0
function handleSubmit(e) {

    if (currentChoice === true) {
        userPoints++
        correctAnswers++
    } else {
        userPoints--
    }

    let questContainer = document.querySelector("#questions-container")
    while(questContainer.firstElementChild) {
            questContainer.firstElementChild.remove()
        }
        currentChoice = 'unchosen'
        nextQuestion()

    }
    
    
    function nextQuestion(e) {
        questionCounter = questionCounter + 1
        if (questionCounter === globalQuestions.length) {
            endOfGame()
        } else {
            renderQuestions(globalQuestions[questionCounter]) 
        }
    }

    function endOfGame(e) {
    
        let container = document.getElementById('all-pages')
        let endGameDiv = document.createElement('div')
        endGameDiv.id = 'game-result'
        endGameDiv.innerText = 'You\'ve reached the end of this game!'
        let text = document.createElement('p')
        let desc = document.createElement('p')
        desc.innerText = `You answered ${correctAnswers} out of ${globalQuestions.length} correctly.`
        text.innerText = `Your score is ${userPoints}`
        let returnButton = document.createElement('button')
        returnButton.innerText = 'Return to Start'

        let submitNameButton = document.createElement('button')
        submitNameButton.innerText = "Submit your score"
        submitNameButton.addEventListener('click', addScore)
        
        let wrongQuestionsList = document.createElement('ul')
        wrongQuestions.forEach(question => {
            // debugger
            let li = document.createElement('li')
            li.innerText = question
           
            wrongQuestionsList.appendChild(li)
        })
        let wrongQuestionText = document.createElement('p')
        wrongQuestionText.innerText = "These are the questions you answered incorrectly or passed on:"

        returnButton.addEventListener('click', function () {
            endGameDiv.remove()
            userPoints = 0
            correctAnswers = 0
            wrongQuestions = []
            renderForms()
        })

        endGameDiv.append(text, desc, wrongQuestionText, wrongQuestionsList, submitNameButton, returnButton)
        container.appendChild(endGameDiv)
    }

    function addScore() {
        document.getElementById('game-result').hidden = true
        let allPages = document.getElementById('all-pages') 
        let scoreBoardDiv = document.createElement('div')
        scoreBoardDiv.id = "user-score"
        let leaderboard = document.createElement('p')
        leaderboard.innerText = "Submit your score to the leaderboard:"
        let numbersForm = document.createElement('form')
        numbersForm.id = "number-form"
        let input = document.createElement('input')
        let submit = document.createElement('input')
        submit.type = "submit"
        submit.innerText = "Submit"
        input.type = "text"
        input.name = "name"
        input.placeholder = "Your Name"
        numbersForm.append(input, submit)
        scoreBoardDiv.append(leaderboard, numbersForm)
        allPages.appendChild(scoreBoardDiv)
        numbersForm.addEventListener('submit', postUserScore)
        renderLeaderBoard()
    }

    function renderLeaderBoard(){
        let userDiv = document.getElementById('user-score')
        let board = document.createElement('div')
        let statement = document.createElement('p')
        statement.innerText = "Leaderboard:"
        let returnButton = document.createElement('button')
        returnButton.innerText = "Return to Start"
        let ul = document.createElement('ul')
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(data => {
            data.forEach(user => {
                let li = document.createElement('li')
                li.innerText = `${user.name}- ${user.high_score}`
                ul.appendChild(li)
            })
        })
        returnButton.addEventListener('click', function(){
            document.getElementById('game-result').remove()
            document.getElementById('user-score').remove()
            renderForms()
        })
        board.append(statement, ul, returnButton)
        userDiv.appendChild(board)
    }

    function postUserScore(e){
        e.preventDefault()
        let user = e.target.firstElementChild.value
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: user,
                high_score: userPoints
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
        let user_score = document.getElementById('user-score')
        while(user_score.firstElementChild){
            user_score.firstElementChild.remove()
        }
        renderLeaderBoard()
    }

    
    function handlePass(e) {
        let passed = e.target.parentElement.querySelector('p')
       
        let questContainer = document.querySelector("#questions-container")
        wrongQuestions.push(passed.innerText)
        while(questContainer.firstElementChild) {
            questContainer.firstElementChild.remove()
        }
        
        if(currentChoice !== 'unchosen' ) {
           alert('Your answer won\'t count')
         } 
        currentChoice = 'unchosen'
        
        nextQuestion()
    }

    
