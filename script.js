//URL to fetch data
const url = "http://localhost:3000/girls/";
//input to enter data
const form = document.getElementById("addDataForm");
//area to render data
const dataArea = document.getElementById("dataOutput");
//name of the input
const nameValue = document.querySelector(".name");
const btnSubmit = document.querySelector(".btn-submit");

const sortDescendingtBtn = document.getElementById("sortDescendingtBtn");
const sortAscendingtBtn = document.getElementById("sortAscendingtBtn");

let output = "";

fetch(url)
  .then((response) => response.json())
  .then((data) => renderData(data));

const renderData = (girls) => {
  let output = "";
  //console.log(girls);
  if (girls) {
    console.log("sort clicked");
    girls.forEach((girl) => {
      output += `
 <div class="outer-box" data-id=${girl.id}>
    <div class="box name" style="text-transform: capitalize;"}>${girl.name}</div>
    <button class="delete-btn">Delete</button>
    <button class="edit-btn">Edit</button>
</div>`;
    });
  }

  dataArea.innerHTML = output;
};

customSort = (a, b) => {
  // If you do not ignore the cases, sort will misbehave
  const nameA = a.name.toLowerCase(); // You need to ignore the casings
  const nameB = b.name.toLowerCase(); // You need to ignore the casings
  if (nameA < nameB) return 1;
  else if (nameA > nameB) return -1;
  return 0;
};

sortDescendingtBtn.addEventListener("click", (girls) => {
  getData(url).then((data) => {
    let a = data.sort(customSort);
    console.log(a);
    renderData(a);
  });
});

sortAscendingtBtn.addEventListener("click", (girls) => {
  getData(url).then((data) => {
    let d = data.sort(customSort).reverse();
    renderData(d);
  });
});

const getData = async (url) => {
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    console.log(error);
  }
  return data;
};
renderData();

//Add a girl name
//POST
form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: girlName.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const dataArr = [];
      dataArr.push(data);
      renderData(dataArr);
    });

  //reset the input field to empty
  girlName.value = "";
});

//DELETE
dataOutput.addEventListener("click", function (event) {
  event.preventDefault();
  let deleteIsPressed = event.target.className === "delete-btn";
  let editIsPressed = event.target.className === "edit-btn";
  let id = event.target.parentElement.dataset.id;
  if (deleteIsPressed) {
    console.log("delete is pressed");
    console.log(id);
    fetch(`${url}${id}`, {
      method: "DELETE",
    }).then((res) => {
      alert(res);
      if (res.json().ok) {
        alert("Record deleted successfuly!");
      } else {
        alert(res);
      }
    });

    window.location.reload();
  } else if (editIsPressed) {
    console.log("edit is pressed");
    const parent = event.target.parentElement;
    //capture the value
    let girlName = parent.querySelector(".name").textContent;
    console.log(girlName);

    nameValue.value = girlName;
  }
  //update the existing name
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(url + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameValue.value,
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
});
