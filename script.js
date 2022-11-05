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
let dataOut;
/* fetch(url)
  .then(res => res.json() )
  .then(data => {
    renderData(data)
    dataOut = data
    
  }) */

const renderData = (girls) => {
  console.log(girls);
  if (girls) { 
    alert(1);
    girls.forEach((girl) => {
        output += `
 <div class="outer-box" data-id=${girl.id}>
    <div class="box name">${girl.name}</div>
    <button class="delete-btn">Delete</button>
    <button class="edit-btn">Edit</button>
</div>
`;
      })
  } else {
/*     getData(url).then((data) =>
      data.forEach((girl) => {
        output += `
   <div class="outer-box" data-id=${girl.id}>
      <div class="box name">${girl.name}</div>
      <button class="delete-btn">Delete</button>
      <button class="edit-btn">Edit</button>
  </div>
  `;
      })
    ); */
  }
  dataArea.innerHTML = output;
};

customSort = (a, b) => {
  const nameA = a.name;
  const nameB = b.name;
  if (nameA < nameB) return 1;
  else if (nameA > nameB) return -1;
  return 0;
};

sortDescendingtBtn.addEventListener("click", (girls) => {
  let sortedDes = (girls) => {
    girls.sort(customSort);
  };
  console.log(sortedDes);
});

sortAscendingtBtn.addEventListener("click", (girls) => {
  getData(url).then((data) => {
    let d = data.sort(customSort).reverse();
    renderData(d);
  });
  /*     const sortedAsc = (girls) => {
      girls.reverse(customSort)
    }; */
  //console.log(sortedAsc);
});

const getData = async (url) => {
  let data;
  try {
    const response = await fetch(url);
    data = await response.json();
    //renderData(data)
  } catch (error) {
    console.log(error);
  }
  return data;
};
//getData(url);
renderData();
