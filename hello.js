const loadData = async neUrl => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${neUrl}`;
  const res = await fetch(url);
  const data = await res.json();
  showData(data.meals.slice(0, 6));

  console.log(data.meals.slice(0, 6));
};

const showData = datas => {
  for (const newData of datas) {
    // console.log(newData);

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
  // console.log(searchInput);
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
  document.getElementById('cardContainer').innerHTML = '';
  const inputvalue = document.querySelector('#searchInput').value;

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${
    inputvalue === '' ? 'chicken' : inputvalue
  }`;
  fetch(url)
    .then(response => response.json())
    .then(result => showData(result.meals));
});

// console.log(subData);
