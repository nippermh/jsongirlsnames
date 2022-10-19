const url = 'http://localhost:3000/girls';

const form = document.getElementById('addDataForm');
const dataArea = document.getElementById('dataOutput');
let output = '';
const deleteBtn = document.querySelector('delete-btn');

//Get
fetch(url) 
  .then((resp) => resp.json())
  //.then((data) => console.log(data))
  .then(data => renderData(data));

const renderData = (girls) => {
  girls.forEach(girl => {
    output += `
   <div class="outer-box" data-id=${girl.id}>
      <div class="box">${girl.name}</div>
      <button class="delete-btn">Delete</button>
      <button class="edit-btn">Edit</button>
  </div>
  `;
})
  dataArea.innerHTML = output;
}

document.addEventListener("DOMContentLoaded", () => {
//Add a girl name
//POST
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
        
    fetch(url, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: girlName.value
      })
    })
    .then(res => res.json())
    .then(data => {
      const dataArr = [];
      dataArr.push(data);
      renderData(dataArr);
    })
});


dataOutput.addEventListener('click', function(event) {
  let deleteIsPressed = event.target.className === "delete-btn"
  let editIsPressed = event.target.className === "edit-btn"
  if(deleteIsPressed) {
    let id = event.target.parentElement.parentElement.dataset.id
    console.log('delete is pressed')
    fetch(URL/id, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then()



   
  } else if (editIsPressed) {
    let id = event.target.parentElement.dataset.id
    console.log('edit is pressed')
    
  }
});


//close of domcontentloaded
});
