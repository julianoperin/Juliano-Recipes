import Search from "./models/Search";
import Recipe from "./models/recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";

//! Global State
const state = {};

//! Search Controller

const controlSearch = async () => {
  // 1) Get the query from the view
  const query = searchView.getInput();

  if (query) {
    // 2) New Search object and add to state
    state.search = new Search(query);
    console.log(query);

    //  3) Prepare Ui for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //  4) Search for recipes
      await state.search.getResults();

      //  5) render results
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert("Something went wrong!");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
  console.log("clicked");
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  console.log(btn);
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// const search = new Search("pizza");
// console.log(search);
// search.getResults();

//! Recipe Controller

// const r = new Recipe(603414);
// r.getRecipe();
// console.log(r);

const controlRecipe = async () => {
  //! Every anchor tag displays the hash symbol which is the ID in this case
  const id = window.location.hash.replace("#", "");
  console.log(id);
  if (id) {
    //! Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    //! Create new recipe object
    state.recipe = new Recipe(id);

    try {
      //! Get recipe data
      await state.recipe.getRecipe();
      // state.recipe.parseIngredients();

      //! Calculate servings and time

      //! Render recipe
      console.log(state.recipe);
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert(error);
    }
  }
};

//! Likes Controller
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike;
    //Toggle the like button

    //Add like to UI list
  } else {
    // Remove like from the state
    // Toggle the like button
    // Remove like from UI list
  }
};

//! Handling the likes button
elements.recipe
  .addEventListener("click", (e) => {
    if (e.target.matches(".recipe__love, .recipe__love *")) {
      controlLike();
    }
  })

  [
    // window.addEventListener("hashchange", controlRecipe);
    // window.addEventListener('load', controlRecipe);
    //! Calling two at the same time
    ("hashchange", "load")
  ].forEach((e) => window.addEventListener(e, controlRecipe));
