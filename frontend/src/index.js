const category_url = 'http://localhost:3000/categories'

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('login-form').addEventListener('submit', handleLogin)
})

function handleLogin(e){
    e.preventDefault()
    document.getElementById('login-form').hidden = true

    fetchCategories()
    renderDifficulty()
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
}

function renderCategory(category){
    let select = document.getElementById('category-select')
    let form = document.getElementById('category-form')
    let option = document.createElement('option')
    option.id = category.id
    option.text = category.name
    select.add(option)
    form.appendChild(select)
    form.hidden = false 
    
    
    
}

function postCategory(e, id){
    console.log("Working")
    debugger 
}

function renderDifficulty(){
    let form = document.getElementById('difficulty-form')
}



