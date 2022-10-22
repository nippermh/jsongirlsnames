const url = 'http://localhost:3000/girls';

const form = document.getElementById('addDataForm');
const dataArea = document.getElementById('dataOutput');
let output = '';
const nameValue = document.querySelector('.name');
const btnSubmit = document.querySelector('.btn-submit');
//Get
fetch(url) 
  .then((resp) => resp.json())
  //.then((data) => console.log(data))
  .then(data => renderData(data));
  
const renderData = (girls) => {
  girls.forEach(girl => {
    output += `
   <div class="outer-box" data-id=${girl.id}>
      <div class="box name">${girl.name}</div>
      <button class="delete-btn">Delete</button>
      <button class="edit-btn">Edit</button>
  </div>
  `;
})
  dataArea.innerHTML = output;
}


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
    //reset the input field to empty
    girlName.value = '';
});

//DELETE
dataOutput.addEventListener('click', function(event) {
  let deleteIsPressed = event.target.className === "delete-btn"
  let editIsPressed = event.target.className === "edit-btn"
  let id = event.target.parentElement.dataset.id;
  if(deleteIsPressed) {
   
    console.log('delete is pressed')
    console.log(id)
    fetch(url + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(() => {
     id.remove();
     })
     window.location.reload();
  } else if(editIsPressed) {

    console.log('edit is pressed');
    const parent = event.target.parentElement;
    //capture the value
    let girlName = parent.querySelector('.name').textContent;
    console.log(girlName);

    nameValue.value = girlName;
  }
  //update the existing name
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(url + '/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue.value
      })
    })
  .then(res => res.json())
  .then(() => location.reload())
  })
})
