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
    let select = document.getElementById('category-select')
    let form = document.getElementById('category-form')
    let option = document.createElement('option')
    option.value = category.id
    option.text = category.name
    select.add(option)
    form.appendChild(select)
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
             renderDifficulty(questions)
        })  
    })
}

function renderDifficulty(questions){
    console.log(questions)
    
    
    let form = document.getElementById('difficulty-form')
    form.hidden = false 
    let select = document.getElementById('difficulty-select')
    let option = document.createElement('option')
    
    option.text = questions.difficulty
    select.add(option)
    form.appendChild(select)
    
}



