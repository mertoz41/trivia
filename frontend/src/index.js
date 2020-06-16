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
    // selectCategory.addEventListener('change')
    // selectDifficulty.addEventListener('change')
    // debugger 
    forms.addEventListener('submit', getQuestions)
}

let globalQuestions 
function getQuestions(e){
    e.preventDefault()
    let category_id = parseInt(document.querySelector("#category-select").value)
    let difficulty = document.querySelector('#difficulty-select').value
    fetch(`${question_url}/${category_id}/${difficulty}`)
    .then(resp => resp.json())
    .then(questions => { 
        globalQuestions = questions
        renderQuestions(globalQuestions[0])
    })
    
    document.getElementById('forms').hidden = true
}

function renderQuestions(question){
    let questContainer = document.getElementById('questions-container')
    let questDiv = document.createElement('div')
    let oneQuestion = document.createElement('p')
    oneQuestion.innerText = question.text
    questDiv.appendChild(oneQuestion)
    
    question.choices.forEach(choice => {
        let choiceButton = document.createElement('button')
        choiceButton.innerText = choice.text
        choiceButton.value = choice.correct
        choiceButton.id = choice.id
        questDiv.append(choiceButton)
        //would be listening for the boolean true or false 
        //passes to the submit function (if true, then) (if false)
        choiceButton.addEventListener('click', pointSystem)
        
    })
    let submitButton = document.createElement('button')
    submitButton.value = 'submit'
    submitButton.innerText = "Submit"
   
    let passButton = document.createElement('button')
    passButton.innerText = "Pass"
    passButton.value = 'pass'

    questDiv.append(submitButton, passButton)

    questContainer.appendChild(questDiv)
    //if choice.correct == true
    //submit + 1 to the leader board else -1 a and go to the next question
    //go to the next question
    //(alert: you must choose an answer)
    
}

let userPoints = 0
function pointSystem(e) {
    if (e.target.value === "true") {
        userPoints++
    } else {
        userPoints--
    }
    let submitButton = document.querySelector("#questions-container > div > button:nth-child(6)")
    submitButton.addEventListener('click', handleSubmit)
}

function handleSubmit(e) {
    debugger
    let questContainer = document.querySelector("#questions-container")
    while(questContainer.firstElementChild) {
            questContainer.firstElementChild.remove()
        }
        for(let i = 1; i <= globalQuestions.length; i++) {
        renderQuestions(globalQuestions[i]) 
    }
}