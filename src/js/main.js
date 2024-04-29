"use strict";
//Variables
const btnSearch = document.querySelector(".js-btn-search");
const inputForm = document.querySelector(".js-input");
const ul = document.querySelector(".js-ul");
const ulFav = document.querySelector(".js-ul-fav");
// ev. local
let cocktailsData = [];
let cocktailsFav = [];

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

  const indexOfFav = cocktailsFav.findIndex( //para encontrar si un elemento está en ambos arrays
    (item) => item.idDrink === eachCocktail.idDrink
  ); 
  let classScss = indexOfFav === -1 ? '' : 'fav';

  oneCocktail = `    <li class="card js-item ${classScss}" id="${eachCocktail.idDrink}">
      <p>${eachCocktail.strDrink}</p>
      <img class="card--img"
        src="${eachCocktail.strDrinkThumb}"
        alt="${eachCocktail.strDrink}"
      />
    </li>`;
  return oneCocktail;
}

function renderAllCocktails(arr) {
  ul.innerHTML = "";
  for (const drink of arr) {
    ul.innerHTML += renderOneCocktail(drink);
  }
  const allCocktailsLi = document.querySelectorAll(".js-item"); //Crear el array de items
  for (const item of allCocktailsLi) {
    item.addEventListener("click", handleFav); //Escuchar el evento
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

//FAVORITOS
function handleFav(ev) {
  const idSelectedCocktail = ev.currentTarget.id;
  console.log(idSelectedCocktail);
  const selectedCocktail = cocktailsData.find(
    (item) => item.idDrink === idSelectedCocktail
  );
  console.log("selectedCocktail: ");
  console.log(selectedCocktail);
  //verificar si la paleta clickada existe ya como fav
  const favoriteIndex = cocktailsFav.findIndex(
    (item) => item.idDrink === idSelectedCocktail
  );
  if (favoriteIndex === -1) {
    cocktailsFav.push(selectedCocktail);
  } else {
    cocktailsFav.splice(favoriteIndex, 1);
  }

  console.log("cocktailsFav: ");
  console.log(cocktailsFav);

  renderAllCocktails(cocktailsData);
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
