import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

//! Clear the search field
export const clearInput = () => {
  elements.searchInput.value = "";
};

//! Clear the results from the last search
export const clearResults = () => {
  elements.searchResList.innerHTML = "";
};

const renderRecipe = (recipe) => {
  const markup = `
    <li>
        <a class="results__link" href="#23456">
            <figure class="results__fig">
                <img src="${recipe.image}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author"></p>
            </div>
        </a>
    </li>
    `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);

  if (page === 1 && pages > 1) {
    // Only button to go to next page
  } else if (page < pages) {
    //Both buttons
  } else if (page === pages && pages > 1) {
    // Only button to go to prev page
  }
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
};
