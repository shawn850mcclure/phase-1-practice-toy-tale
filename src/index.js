// let addToy = false;
// //grabs toy form
// let form = document.querySelector(".add-toy-form")
// //grabbing like button

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
//   addBtn.addEventListener("click", () => {
//     // hide & seek with the form
//     addToy = !addToy;
//     if (addToy) {
//       toyFormContainer.style.display = "block";
//     } else {
//       toyFormContainer.style.display = "none";
//     }
//   });
// });

// //get fetch requests
// function getAllToys(){
//   fetch("http://localhost:3000/toys")
//   .then(resp => resp.json())
//   .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
// }


// //DOM render FUNctions
// function renderOneToy(toy){
//   //building toy
//   let card = document.createElement("div")
//   card.className = "card"
//   card.innerHTML = `
//   <h2>${toy.name}</h2>
//   <img src="${toy.image}" class="toy-avatar" />
//   <p>${toy.likes}</p>
//   <button class="like-btn" id="${toy.id}">Like ❤️</button>
//   </div>
//   `
//   card.querySelector('.like-btn').addEventListener('click', updateLikes)
//   // card.querySelector('.like-btn').addEventListener('click',() => {
//   //   toy.likes++
//   //   card.querySelector('p').textContent = toy.likes
//   //   updateLikes(toy)
//  // })
//   //adding toy card to DOM
//   document.querySelector('#toy-collection').appendChild(card)
// }
// //like button event listener
// //likeButton.addEventListener("click", onLike)

// //new toy event listener
// form.addEventListener("submit",(e)=>{
//   e.preventDefault()
//   handleSubmit(e)
//   form.reset()
// })

// //event handler
// function handleSubmit(e){
//   let toyObj = {
//     name:e.target.name.value,
//     image:e.target.image.value,
//     id:e.target.id.value,
//     likes: 0,
//   }
//   renderOneToy(toyObj)
//   newToy(toyObj)
// }


// //post request
// function newToy(toyObj){
//   fetch("http://localhost:3000/toys",{
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: "application/json",
//     },
//     body:JSON.stringify(toyObj)
//   })
//   .then(resp => resp.json())
//   .then(toy => console.log(toy))
//   .catch(error => console.log('ERROR'))
// }

// // //patch request 1st try
// // function updateLikes(toyObj){
// //   fetch(`http://localhost:3000/toys/${toyObj.id}`,{
// //     method:'PATCH',
// //     headers:{
// //       'Content-Type': 'application/json',
// //       Accept: 'application/json',
// //     },
// //     body: JSON.stringify(toyObj)
// //   })
// //   .then(resp => resp.json())
// //   .then(toy => console.log(toy))
// // }

// //initializer

// function updateLikes(toyObj){
//   let toy = document.querySelector('p')
//   toy.likes++;
//   fetch(`http://localhost:3000/toys/${toyObj.id}`,{
//     method: "PATCH",
//     headers: {
//       "Content-Type" : "application/json",
//       Accept: "application/json"
//     },
//     body:JSON.stringify({
//       "likes": toy.likes
//     })
//     .then(resp => resp.json)
//     .then(json => {
//       toy.innerText = `${json.likes} likes`;
//     })
//   })
// }

// function start(){
//   getAllToys()
// }

// start()


// with respone the way they wanted it


let addToy = false;
let form = document.querySelector(".add-toy-form")



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});




function getAllToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy)))
}

 form.addEventListener("submit",(e)=>{
  e.preventDefault()
  handleSubmit(e)
  form.reset()
})


function handleSubmit(e){
  let toyObject = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0,
    id:e.target.id.value
  }
  newToy(toyObject)

}

function renderOneToy(toy){
    likesCount = toy.likes
    let card = document.createElement("div")
    let likeBtn = document.createElement("button")
    likeBtn.addEventListener("click",(e)=>{
    let payload = {
      id: e.target.id,
      likes: toy.likes+=1
    }
    updateLikes(payload)

    })
    likeBtn.id = `${toy.id}`
    likeBtn.textContent = "Like "
    card.className = "card"
    card.innerHTML = `    
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes}</p>
    `

    card.appendChild(likeBtn)
    document.querySelector("#toy-collection").appendChild(card)
}


function newToy(toyObject){
  fetch("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObject)
  })
  .then(res=>res.json())
  .then(toy=>renderOneToy(toy))
}

function updateLikes(toyObject){
  fetch(`http://localhost:3000/toys/${toyObject.id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify(toyObject)
  })
  .then(res=>res.json())
  .then(toy=>updateCardByID(toy))
}

function updateCardByID(toy){
 let tar = document.getElementById(toy.id)
 tar.parentNode.querySelector("p").textContent = toy.likes;
}

function start(){
  getAllToys()
}

start()