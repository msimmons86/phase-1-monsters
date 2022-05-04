// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.

// fetch data from this url fetch('http://localhost:3000/monsters/?_limit=50_page=0')
  // for each
     // show data

document.addEventListener("DOMContentLoaded", () => {
  fetchMonster()
  createForm()
  document.querySelector("#monster-form").addEventListener('submit', (event) => {
    event.preventDefault()
    //debugger

    let name = document.querySelector('#monster-name').value
    let age = document.querySelector('#monster-age').value
    let description = document.querySelector('#monster-description').value
    monsterObj = {
        name,
        age,
        description 
    }
    //console.log(monsterObj)
    postNewMonster(monsterObj)
  })

})

let monsterContainer = document.querySelector('#monster-container')
let form = document.querySelector('#monster-form')

const fetchMonster = () => {
fetch('http://localhost:3000/monsters/?_limit=02_page=1')
  .then(resp => resp.json())
  .then(monsterData => {
    console.log(monsterData)
    monsterData.forEach((monster) => {
      // we need to show each monster (name, age description)      
      addOneMonster(monster)
    })
  })   
}

const addOneMonster = (monster) => {
  let card = document.createElement('div')
  let name = document.createElement('h2')
  let description = document.createElement('p')
  let age = document.createElement('h4')
  name.innerText = `Name: ${monster.name}`
  age.innerText = `Age: ${monster.age}`
  description.innerText = `Bio: ${monster.description}`

  card.append(name, age, description)
  monsterContainer.append(card)   
}



// Above your list of monsters, you should have a form to create a new monster. You should have fields for name, age, and description, and a 'Create Monster Button'. When you click the button, the monster should be added to the list and saved in the API.
const createForm = () => {
  let formContainer = document.querySelector("#create-monster")
  //console.log("form container", formContainer)
  let form = document.createElement('form')
  form.id = 'monster-form'
  let nameInput = document.createElement('input')
  let nameLabel = document.createElement('label')
  let ageInput = document.createElement('input')
  let ageLabel = document.createElement('label')
  let descriptionInput = document.createElement('input')
  let descriptionLabel = document.createElement('label')
  let h2 = document.createElement('h2')
  let button = document.createElement('button')
  nameInput.id = 'monster-name'
  ageInput.id = 'monster-age'
  descriptionInput.id = 'monster-description'

  nameLabel.innerText = 'name'
  ageLabel.innerText = 'age'
  descriptionLabel.innerText = 'description'
  h2.innerText = 'Create Monster'
  button.innerText = "Submit Monster"

  form.append(nameLabel, nameInput, ageLabel, ageInput, descriptionLabel, descriptionInput, button)
  formContainer.append(h2, form)
}


const postNewMonster = ({name, age, description}) => {
  fetch('http://localhost:3000/monsters', {
    method: "POST" ,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify({name, age, description})
      })
      .then(resp => resp.json())
      .then(monster => {
        addOneMonster(monster)
        form.reset()
      })
    }





// At the end of the list of monsters, show a button. When clicked, the button should load the next 50 monsters and show them.