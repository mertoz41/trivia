const category_url = 'http://localhost:3000/categories'
const question_url = 'http://localhost:3000/questions'
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('login-form').addEventListener('submit', handleLogin)
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
    let selectCategory = document.getElementById('category-select')
    let selectDifficulty = document.getElementById('difficulty-select')
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
    let tracker = document.createElement('p')
    tracker.className = 'buffer_below'
    tracker.innerText = `Question ${questionCounter + 1} of ${globalQuestions.length}`
    let oneQuestion = document.createElement('p')
    oneQuestion.className = 'buffer_below'
    oneQuestion.innerText = question.text.replace(/&quot;/g, '"').replace(/&#039;/g, "`").replace(/&amp;/g, '&')
    questDiv.appendChild(tracker, oneQuestion)
    
    question.shuffle.forEach(choice => {
        let choiceButton = document.createElement('button')
        let br = document.createElement('br')
        choiceButton.className = 'ui toggle button'
        choiceButton.innerText = choice.text.replace(/&quot;/g, '"').replace(/&#039;/g, "`").replace(/&amp;/g, '&')
        choiceButton.value = choice.correct
        choiceButton.id = choice.id
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
function userChoice(e) {
    if (e.target.value == 'true') {
        currentChoice = true
    } else {
        currentChoice = false
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
        returnButton.className = 'ui black basic button'
        returnButton.addEventListener('click', function () {
            endGameDiv.remove()
            renderForms()
        })

        endGameDiv.append(text, desc, returnButton)
        container.appendChild(endGameDiv)
        // console.log('the end')


    }

    function handlePass(e) {
        let firstChoice = document.querySelector("#questions-container > div > p").nextSibling
        let questContainer = document.querySelector("#questions-container")
        while(questContainer.firstElementChild) {
            questContainer.firstElementChild.remove()
        }
        
        if(currentChoice != 'unchosen') {
           alert('Your answer won\'t count')
         }
        nextQuestion()
    }

    
