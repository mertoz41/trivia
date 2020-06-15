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
    console.log("working")
    let category_id = parseInt(document.querySelector("#category-select").value)
    let difficulty = document.querySelector('#difficulty-select').value
    fetch(`${question_url}/${category_id}/${difficulty}`)
    .then(resp => resp.json())
    .then(questions => { 
        globalQuestions = questions
        renderQuestions(questions[0])
    })
        
        // questions.forEach(question => {
        //     renderQuestions(question)
        //     debugger 
            
    
        // questions.forEach(question =>{
        //     renderQuestions(question)
        // })
    
    document.getElementById('forms').hidden = true
}

function renderQuestions(question){
    let container = document.getElementById('questions-container')
    let quest = document.createElement('div')
    let oneQuestion = document.createElement('p')
    oneQuestion.innerText = question.text
    quest.appendChild(oneQuestion)
    question.choices.forEach(choice => {
        let button = document.createElement('button')
        button.innerText = choice.text
        quest.append(button)

    })
    let submitButton = document.createElement('button')
    submitButton.innerText = "Submit"
    // submitButton.addEventListener('click', )
    let passButton = document.createElement('button')
    passButton.innerText = "Pass"

    // passButton.addEventListener('click',)
    quest.append(submitButton, passButton)

    container.appendChild(quest)
    
}





