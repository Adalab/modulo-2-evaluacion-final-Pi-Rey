"use strict";
//Variables
const btnSearch = document.querySelector(".js-btn-search");
const inputForm = document.querySelector(".js-input");
const ul = document.querySelector(".js-ul");
// ev. local
let cocktailsData = "";

//FUNCIÓN INICIAL
const init = () => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then((response) => response.json())
    .then((data) => {
      cocktailsData = data.drinks;
      console.log(cocktailsData);
      renderAllCocktails(cocktailsData);
    });
};

//USAR EL BUSCADOR

//render
function renderOneCocktail(eachCocktail) {
  let oneCocktail = "";
  oneCocktail = `    <li class="card js-item">
      <p>${eachCocktail.strDrink}</p>
      <img class="card--img"
        src="${eachCocktail.strDrinkThumb}"
        alt="${eachCocktail.strDrink}"
      />
    </li>`;
    return oneCocktail;
  // const nameDrink = drink.strDrink;
  // const nameImg = drink.strDrinkThumb;
}


function renderAllCocktails(arr) {
  ul.innerHTML = "";
  for (const drink of arr) {
    ul.innerHTML += renderOneCocktail(drink);
  }
}

//función fetch
function getApi(input) {
  ul.innerHTML = "";
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`)
    .then((response) => response.json())
    .then((data) => {
        cocktailsData = data.drinks;
        console.log(cocktailsData);
        renderAllCocktails(cocktailsData);
    });
}

const handleSearch = (ev) => {
  ev.preventDefault();
  const inputValue = inputForm.value;
  console.log(inputValue);
  getApi(inputValue);
};

btnSearch.addEventListener("click", handleSearch);

//Cuando se carga la página
init();
