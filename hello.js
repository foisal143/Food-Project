let subData = [];
const loadData = async neUrl => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${neUrl}`;
  const res = await fetch(url);
  const data = await res.json();
  showData(data);
};

const showData = datas => {
  const data = datas.meals;
  data.forEach(element => {
    subData.push(element);
  });

  for (let i = 0; i < 6; i++) {
    const newData = data[i];

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
     <div class=" card mb-3 overflow-hidden" style="max-width: 380px; ">
            <div class="row g-0">
            <div class="col-md-5">
                <img src="${newData.strMealThumb}" class=" w-100 h-100 rounded-start" alt="...">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">${newData.strMeal}</h5>
                  <p class="card-text">There are many variations of passages of available, but the majority have suffered</p>
                  <p class="card-text">
                  <button onclick="showDetails(${newData.idMeal})" class=" btn text-warning"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Vew Details </button></p>
                </div>
              </div>
            </div>
          </div>
    `;

    document.getElementById('cardContainer').appendChild(div);
  }
};
// input fields
document.getElementById('searchBtn').addEventListener('click', () => {
  const searchInput = document.querySelector('#searchInput').value;
  document.getElementById('cardContainer').innerHTML = '';
  loadData(`${searchInput}`);
  console.log(searchInput);
});

// show details
const showDetails = data => {
  const newApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`;
  fetch(newApi)
    .then(res => res.json())
    .then(value => showInnerModel(value));
};
const showInnerModel = values => {
  const value = values.meals[0];

  document.getElementById('staticBackdropLabel').innerText = value.strMeal;
  const div = document.getElementById('modalBody');
  div.innerHTML = `
  <div class="overflow-auto" style="height:60vh">
    <img class="img-fluid img-height w-100" src="${value.strMealThumb}" alt="">
  <p><strong>Category:</strong> ${value.strCategory}</p>
  <p><strong>Area: </strong> ${value.strArea}</p>
  <p><strong>Instructions: </strong> ${value.strInstructions.slice(0, 160)}</p>
  <p><strong>Youtube:</strong><a href="${value.strYoutube}"> ${
    value.strYoutube
  } </a></p>
  </div>
  `;
};
loadData('chicken');
document.getElementById('showAll').addEventListener('click', () => {
  for (const data of subData) {
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
     <div class=" card mb-3 overflow-hidden" style="max-width: 380px; ">
            <div class="row g-0">
            <div class="col-md-5">
                <img src="${data.strMealThumb}" class=" w-100 h-100 rounded-start" alt="...">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">${data.strMeal}</h5>
                  <p class="card-text">There are many variations of passages of available, but the majority have suffered</p>
                  <p class="card-text">
                  <button onclick="showDetails(${data.idMeal})" class=" btn text-warning"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">Vew Details </button></p>
                </div>
              </div>
            </div>
          </div>
    `;
    if (searchInput == '') {
      loadData('chicken');
    } else {
      const searchInput = document.querySelector('#searchInput').value;
      loadData(`${searchInput}`);
    }
    document.getElementById('cardContainer').appendChild(div);
  }
});

console.log(subData);
