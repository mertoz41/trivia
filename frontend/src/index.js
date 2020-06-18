const category_url = 'http://localhost:3000/categories'
const question_url = 'http://localhost:3000/questions'
document.addEventListener('DOMContentLoaded', function(){
    let triviaLink = document.getElementById('trivia_title')
    let leaderBoardLink = document.querySelector("#leader_title")
    triviaLink.addEventListener('click', function() {
        let div = document.getElementById('questions-container')
        if (div.firstElementChild) {
            div.firstElementChild.remove()
        }
        let leader = document.getElementById('leader-board')
        if (leader){
            leader.remove()
        }
        renderForms()
         
   
        
        userPoints = 0
        correctAnswers = 0
        wrongQuestions = []
    })

    leaderBoardLink.addEventListener('click', function(){
        let leaders = document.getElementById('leader-board')
        if(leaders) {
            leaders.remove()
        }
        let questions = document.querySelector("#questions-container")
        if(questions) {
            questions.remove()
        }

        leaderBoardOnly()})
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
    oneQuestion.className = 'buffer_below'
    let tracker = document.createElement('div')
    tracker.className = 'buffer_below'
    let startQ = questionCounter + 1
    let lengthQ = globalQuestions.length
    tracker.innerText = `Question ${startQ} out of ${lengthQ}`
    oneQuestion.innerText = question.text.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&').replace(/&rsquo;/g,"'")
    oneQuestion.className = 'questions_font buffer_below_question'
    questDiv.append(tracker, oneQuestion)
    
    question.shuffle.forEach(choice => {
        let choiceButton = document.createElement('button')
        let br = document.createElement('br')
        choiceButton.className = 'ui toggle button'
        choiceButton.innerText = choice.text.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&')
        choiceButton.value = choice.correct
        choiceButton.id = "choice-button"
        questDiv.append(choiceButton, br)
        //would be listening for the boolean true or false 
        //passes to the submit function (if true, then) (if false)
        choiceButton.addEventListener('click', userChoice)
    })
    let divSubPass = document.createElement('div')
    divSubPass.className = 'ui buttons button_buffer'
    let divOr = document.createElement('div')
    divOr.className = 'or'
    let submitButton = document.createElement('button')
    submitButton.value = 'submit'
    submitButton.innerText = "Submit"
    submitButton.className = 'ui positive button'
    let br = document.createElement('br')
    let passButton = document.createElement('button')
    passButton.innerText = "Pass"
    passButton.value = 'pass'
    passButton.className = 'ui button'
    passButton.addEventListener('click', handlePass)

    divSubPass.append(passButton, divOr, submitButton)

    questDiv.append(br, divSubPass)

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
        
    }
    let submitButton = document.querySelector("#questions-container > div > div.ui.buttons.button_buffer > button.ui.positive.button")
    submitButton.addEventListener('click', handleSubmit)
}

let userPoints = 0
let correctAnswers = 0
function handleSubmit(e) {
    question_title = document.querySelector("#questions-container > div > p:nth-child(2)")
    
    if (currentChoice === true) {
        userPoints++
        correctAnswers++
    } else {
        userPoints--
        wrongQuestions.push(question_title.innerText)
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
        let uReachedTheEnd = document.createElement('p')
        uReachedTheEnd.innerText = 'You\'ve reached the end of this game!'
        uReachedTheEnd.className = "questions_font"
        
        
        let text = document.createElement('p')
        let desc = document.createElement('p')
        desc.innerText = `You answered ${correctAnswers} out of ${globalQuestions.length} correctly.`
        desc.className = "questions_font"
        text.innerText = `Your score is ${userPoints}`
        text.className = "questions_font"
        text.style.color = "rgb(131, 11, 11)"
        
        let returnButton = document.createElement('button')
        returnButton.innerText = 'Return to Start'
        returnButton.className = "ui black basic button"

        let submitNameButton = document.createElement('button')
        submitNameButton.innerText = "Submit Your Score"
        submitNameButton.className = "ui black basic button"
        submitNameButton.addEventListener('click', addScore)
        
        let wrongQuestionsList = document.createElement('div')
        wrongQuestionsList.className = 'ui divided list'
        
        
        wrongQuestions.forEach(question => {
            // debugger
            let br = document.createElement('br')
            let questionDiv = document.createElement('div')
            let icon = document.createElement('i')
            icon.className = 'help icon'
            questionDiv.className = 'item'
            questionDiv.innerText = question

            wrongQuestionsList.append(icon, questionDiv, br)
        })
        let wrongQuestionText = document.createElement('p')
        wrongQuestionText.innerText = "Questions you answered incorrectly or passed:"
        wrongQuestionText.className = "questions_font buffer_below_question"

        returnButton.addEventListener('click', function () {
            endGameDiv.remove()
            userPoints = 0
            correctAnswers = 0
            wrongQuestions = []
            renderForms()
        })

        endGameDiv.append(uReachedTheEnd, text, desc, wrongQuestionText, wrongQuestionsList, submitNameButton, returnButton)
        container.appendChild(endGameDiv)
    }

    function addScore() {
        document.getElementById('game-result').hidden = true
        let allPages = document.getElementById('all-pages') 
        let scoreBoardDiv = document.createElement('div')
        scoreBoardDiv.id = "user-score"
        let leaderboard = document.createElement('p')
        leaderboard.innerText = "Add your name to the leaderboard:"
        leaderboard.className = 'questions_font'
        let numbersForm = document.createElement('form')
        numbersForm.className = 'ui form'
        numbersForm.id = "number-form"
        let input = document.createElement('input')
        let submit = document.createElement('input')
        submit.type = "submit"
        submit.innerText = "Submit"
        submit.className = "ui black basic button"
        input.id = 'input_padding'
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
        board.id = 'leader-board'
        let statement = document.createElement('p')
        statement.innerText = "Leaderboard:"
        statement.className = 'questions_font leader_top_buffer'
        let returnButton = document.createElement('button')
        returnButton.innerText = "Return to Start"
        returnButton.className = "ui black basic button button_buffer"
        let divList = document.createElement('div')
        divList.className = 'ui ordered divided list'
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(data => {
            data.forEach(user => {
                let item = document.createElement('div')
                item.className = 'item left'
                item.innerText = `${user.name}:  ${user.high_score} points`
                divList.appendChild(item)
            })
        })
        returnButton.addEventListener('click', function(){
            document.getElementById('game-result').remove()
            document.getElementById('user-score').remove()
            userPoints = 0
            correctAnswers = 0
            wrongQuestions = []
            renderForms()
        })
        board.append(statement, divList, returnButton)
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
        .then(data => renderLeaderBoard())
        let user_score = document.getElementById('user-score')

        while(user_score.firstElementChild){
            user_score.firstElementChild.remove()
        }
        // renderLeaderBoard()
        // leaderBoardOnly()
    }

    
    function handlePass(e) {
        let passed = e.target.parentElement.parentElement.querySelector('p')
        wrongQuestions.push(passed.innerText)
        
         
        let questContainer = document.querySelector("#questions-container")
        while(questContainer.firstElementChild) {
            questContainer.firstElementChild.remove()
        }
        
        if(currentChoice !== 'unchosen' ) {
            alert('Your answer won\'t count')
         } 
        currentChoice = 'unchosen'
        
        nextQuestion()
    }

    function leaderBoardOnly(){
        let forms = document.getElementById('forms')
        forms.hidden = true
        let allPages = document.getElementById('all-pages')
    
    
        let board = document.createElement('div')
        board.id = 'leader-board'
        let statement = document.createElement('p')
        statement.innerText = "Leaderboard:"
        statement.className = 'questions_font leader_top_buffer'
        let divList = document.createElement('div')
        divList.className = 'ui ordered divided list'
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(data => {
            data.forEach(user => {
                let item = document.createElement('div')
                item.className = 'item left'
                item.innerText = `${user.name}:  ${user.high_score} points`
                divList.appendChild(item)

            })

        })
        board.append(statement, divList)

        allPages.appendChild(board)
    
    }

    
