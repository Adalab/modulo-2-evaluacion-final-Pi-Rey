"use strict";
//Variables
const btnSearch = document.querySelector(".js-btn-search");
const inputForm = document.querySelector(".js-input");
const ul = document.querySelector(".js-ul");
const ulFav = document.querySelector(".js-ul-fav");
const btnReset = document.querySelector(".js-btn-reset");
const btnCloseDiv = document.querySelectorAll(".js-close");
// ev. local
let cocktailsData = [];
let cocktailsFav = [];

//FUNCIÓN INICIAL
const init = () => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then((response) => response.json())
    .then((data) => {
      cocktailsData = data.drinks;
      //console.log(cocktailsData);
      renderAllCocktails(ul, cocktailsData);
    });
};

//USAR EL BUSCADOR
//render
function renderOneCocktail(eachCocktail) {
  let oneCocktail = "";

  const indexOfFav = cocktailsFav.findIndex(
    //para encontrar si un elemento está en ambos arrays
    (item) => item.idDrink === eachCocktail.idDrink
  );
  let classScss = indexOfFav === -1 ? "" : "fav";

  oneCocktail = `    <li class="card js-item ${classScss} mini" id="${eachCocktail.idDrink}">
  <div class="close js-close"> x </div>
      <p>${eachCocktail.strDrink}</p>
      <img class="card--img"
        src="${eachCocktail.strDrinkThumb}"
        alt="${eachCocktail.strDrink}"
      />
    </li>`;
  return oneCocktail;
}

function renderAllCocktails(html, arr) {
  html.innerHTML = "";
  for (const drink of arr) {
    html.innerHTML += renderOneCocktail(drink);
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
      //console.log(cocktailsData);
      renderAllCocktails(ul, cocktailsData);
    });
}
//function cargar favoritos
function getStoredFavs() {
  const localCocktailsFav = localStorage.getItem("favourites");
  if (localCocktailsFav !== null) {
    cocktailsFav = JSON.parse(localCocktailsFav);
  }
  renderAllCocktails(ulFav, cocktailsFav);
}

//Borrar favorito individual
function getClose(target) {
  console.log("tengo el close?");
  console.log(target);
  if (target.classList.contains("close")) {
    const parentElement = target.parentElement;
    console.log("es su parentElement?");
    console.log(parentElement.id);

    // Obtener el ID del cocktail a eliminar
    const idToRemove = parentElement.id;
    const indexToRemove = cocktailsFav.findIndex(
      (item) => item.idDrink === idToRemove
    );
    // Si se encuentra el cocktail en el array de favoritos, eliminarlo
    if (indexToRemove !== -1) {
      cocktailsFav.splice(indexToRemove, 1);
    }
    renderAllCocktails(ulFav, cocktailsFav);
  }
}

//FAVORITOS
function handleFav(ev) {
  const idSelectedCocktail = ev.currentTarget.id;

  //console.log(idSelectedCocktail);
  const selectedCocktail = cocktailsData.find(
    (item) => item.idDrink === idSelectedCocktail
  );
  //console.log("selectedCocktail: ");
  //console.log(selectedCocktail);
  //verificar si la bebida clickada existe ya como fav
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
  getClose(ev.target);
  renderAllCocktails(ul, cocktailsData);
  renderAllCocktails(ulFav, cocktailsFav);

  //ejecutar el borrado individual

  //Guardar en el localStorage
  localStorage.setItem("favourites", JSON.stringify(cocktailsFav));
}


const handleSearch = (ev) => {
  ev.preventDefault();
  const inputValue = inputForm.value;
  //console.log(inputValue);
  getApi(inputValue);
};

btnSearch.addEventListener("click", handleSearch);

const handleReset = (ev) => {
  ul.innerHTML = "";
  ulFav.innerHTML = "";
  cocktailsFav = [];
  localStorage.removeItem("favourites");
};

btnReset.addEventListener("click", handleReset);
//Cuando se carga la página

//init(); //Preguntar si esto hace falta?
getStoredFavs();
