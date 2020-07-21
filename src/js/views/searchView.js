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
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.recipe.label}</h4>
                <p class="results__author">${recipe.recipe.source}</p>
            </div>
        </a>
    </li>
    `;
  elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe);
};
