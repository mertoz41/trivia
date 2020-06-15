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

function getQuestions(e){
    e.preventDefault()
    console.log("working")
    let category_id = parseInt(document.querySelector("#category-select").value)
    let difficulty = document.querySelector('#difficulty-select').value
    fetch(`${question_url}/${category_id}/${difficulty}`)
    .then(resp => resp.json())
    .then(questions => {
        questions.forEach(question => {
            renderQuestions(question)
        })
        // questions.forEach(question =>{
        //     renderQuestions(question)
        // })
    })
    document.getElementById('forms').hidden = true
}

function renderQuestions(question){
    console.log(question)
}





