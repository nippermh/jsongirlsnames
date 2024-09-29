const url = 'http://localhost:3000/girls/';

const form = document.getElementById('addDataForm');
const dataArea = document.getElementById('dataOutput');
let output = '';
const nameValue = document.querySelector('.name');
const btnSubmit = document.querySelector('.btn-submit');

// GET
fetch(url)
  .then(resp => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw new Error(`HTTP error: ${resp.status} ${resp.statusText}`);
    }
  })
  .then(data => renderData(data))
  .catch(error => console.log('Fetch error: ', error));

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

// POST - Add a girl name
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const girlName = document.querySelector('.name');
  
  if (!girlName.value) {
    alert("Please enter a name");
    return;
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: girlName.value
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
    }
  })
  .then(data => {
    const dataArr = [];
    dataArr.push(data);
    renderData(dataArr);
  })
  .catch(error => console.log('POST error: ', error));

  // Reset the input field
  girlName.value = '';
});

// DELETE
dataOutput.addEventListener('click', function(event) {
  let deleteIsPressed = event.target.className === "delete-btn";
  let editIsPressed = event.target.className === "edit-btn";
  let id = event.target.parentElement.dataset.id;

  if (deleteIsPressed) {
    console.log('delete is pressed', id);
    fetch(`${url}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then(() => {
      event.target.parentElement.remove();
    })
    .catch(error => console.log('DELETE error: ', error));
  }

  // EDIT
  else if (editIsPressed) {
    const parent = event.target.parentElement;
    let girlName = parent.querySelector('.name').textContent;
    nameValue.value = girlName;

    // Update the name
    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      fetch(`${url}${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameValue.value
        })
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then(() => location.reload())
      .catch(error => console.log('PATCH error: ', error));
    });
  }
});
