import { elements } from "./base";

export const clearRecipe = () => {
  elements.recipe.innerHTML = "";
  elements.shopping.innerHTML = "";
};

const createIngredient = (ingredient) => `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count"></div>
        <div class="recipe__ingredient">
            <span class="recipe__unit"></span>
            ${ingredient.original}
        </div>
    </li>
`;

export const renderRecipe = (recipe, isLiked) => {
  let price = Math.trunc(recipe.pricePerServing / 4);
  const markup = `
        <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.time
            }</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text"> servings</span>
        </div>

        <div class="recipe__info">
            <i class="fas fa-dollar-sign"></i>
            <span class="recipe__info-data recipe__info-data--people">&nbsp;${price}</span>
            <span class="recipe__info-text"> per servings</span>
        </div>

            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart${
                      isLiked ? "" : "-outlined"
                    }"></use>
                </svg>
            </button>
        </div>

    <div class="recipe__directions">
        <h2 class="heading-2">Instructions</h2>
        <p class="recipe__directions-text">
            ${
              recipe.instructions
                ? recipe.instructions
                : "There are no instructions for this recipe, try the button bellow for more information."
            }
        </p>

    </div>
    <div class="recipe__directions">
<h2 class="heading-2">Summary</h2>
    <p class="recipe__directions-text">
        ${
          recipe.summary
            ? recipe.summary
            : "There is no results for this recipe."
        }
    </p>
    <h2 class="heading-2">Wine Pairing</h2>
    <p class="recipe__directions-text">
        ${
          recipe.wine
            ? recipe.wine
            : "There is no wine pairing for this recipe."
        }
    </p>
    <a class="btn-small recipe__btn" href="${recipe.sourceUrl}" target="_blank">
          <span>Check more from ${recipe.sourceName}</span>
      </a>
</div> 
    `;
  elements.recipe.insertAdjacentHTML("afterbegin", markup);

  const markup2 = `
        <div class="recipe__ingredients">
        <h2 class="heading-2">Ingredients</h2>
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map((el) => createIngredient(el)).join("")}
            </ul>
        </div>
  `;
  elements.shopping.insertAdjacentHTML("afterbegin", markup2);
};
