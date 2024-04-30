const v=document.querySelector(".js-btn-search"),m=document.querySelector(".js-input"),r=document.querySelector(".js-ul"),a=document.querySelector(".js-ul-fav"),k=document.querySelector(".js-btn-reset");let l=[],n=[];const g=()=>{fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita").then(e=>e.json()).then(e=>{l=e.drinks,i(r,l,!1)})};function p(e,t){let c="";const o=n.findIndex(f=>f.idDrink===e.idDrink);let s=o===-1?"":"fav",u=o===-1?"":'  <div class="close hidden js-close"> x </div>';return c=`    <li class="card ${t===!0?"":"js-item"} ${s} mini" id="${e.idDrink}">
  ${u}
      <p class="title">${e.strDrink}</p>
      <div class="divImg">
      <img class="card--img"
        src="${e.strDrinkThumb}"
        alt="${e.strDrink}"
      />
      </div>
    </li>`,c}function i(e,t,c){e.innerHTML="";for(const s of t)e.innerHTML+=p(s,c);const o=document.querySelectorAll(".js-item");for(const s of o)s.addEventListener("click",L)}function S(e){r.innerHTML="",fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e}`).then(t=>t.json()).then(t=>{l=t.drinks,i(r,l,!1)})}function h(){const e=localStorage.getItem("favourites");e!==null&&(n=JSON.parse(e)),i(a,n,!0)}function j(e){if(e.classList.contains("close")){const t=e.parentElement;console.log("es su parentElement?"),console.log(t.id);const c=t.id,o=n.findIndex(s=>s.idDrink===c);o!==-1&&n.splice(o,1)}}function d(){const e=document.querySelectorAll(".js-close");for(const t of e)t.addEventListener("click",D)}function D(e){console.log("tengo el close?"),console.log(e.target),j(e.target),i(a,n,!0),i(r,l,!1),d()}function L(e){const t=e.currentTarget.id,c=l.find(s=>s.idDrink===t);console.log("selectedCocktail: "),console.log(c);const o=n.findIndex(s=>s.idDrink===t);o===-1?n.push(c):n.splice(o,1),console.log("cocktailsFav: "),console.log(n),i(r,l,!1),i(a,n,!0),d(),localStorage.setItem("favourites",JSON.stringify(n))}const F=e=>{e.preventDefault();const t=m.value;S(t)};v.addEventListener("click",F);const I=e=>{r.innerHTML="",a.innerHTML="",n=[],localStorage.removeItem("favourites")};k.addEventListener("click",I);g();h();
//# sourceMappingURL=main.js.map
