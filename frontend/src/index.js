const category_url = 'http://localhost:3000/categories'

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
    let select = document.getElementById('category-select')
    select.addEventListener('change', getCategory)
}

function renderCategory(category){
    let category_select = document.getElementById('category-select')
    let form = document.getElementById('forms')
    let category_option = document.createElement('option')
    category_option.value = category.id
    category_option.text = category.name
    category_select.add(category_option)

    let difficulty_select = document.getElementById('difficulty_select')
    form.append(category_select, difficulty_select)
    form.hidden = false 
    // select.addEventListener('change', postCategory)
    // debugger
    
}

function getCategory(e){
    category_id = parseInt(e.target.value)
    fetch(`${category_url}/${category_id}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            'Accepts': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
         
        data.questions.forEach(questions => {
             renderDifficulty()
        })  
    })
}

function renderDifficulty(e){
    form = document.getElementById('difficulty-form')
    form.hidden = false
    
    form.addEventListener('change', renderQuestions)
   
    
}

function renderQuestions(e) {


}



