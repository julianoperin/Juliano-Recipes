import Search from "./models/Search";
import Recipe from "./models/recipe";
import Likes from "./models/Likes";
import * as likesView from "./views/likesView";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";

//! On Load run this function
window.onload = () => {
  controlSearch();
  window.location.hash = 735437;
  const id = window.location.hash;
  setTimeout(controlRecipe, 500);
};

//! Global State
const state = {};

//! Search Controller

const controlSearch = async () => {
  // 1) Get the query from the view
  let query = searchView.getInput();

  if (query) {
    // 2) New Search object and add to state
    state.search = new Search(query);
    //  3) Prepare Ui for results
    searchView.clearInput(); // Clear the search the input
    searchView.clearResults(); // Clear the search view
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
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
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
// const test = new Recipe(603414);
// test.getRecipe();
// console.log(test);

const controlRecipe = async () => {
  //! Every anchor tag displays the hash symbol which is the ID in this case
  const id = window.location.hash.replace("#", "");
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
      // console.log(state.recipe);
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      alert(error);
    }
  }
};

//! window.addEventListener("hashchange", controlRecipe);
//! window.addEventListener('load', controlRecipe);
//! Calling two at the same time
["hashchange", "load"].forEach((e) =>
  window.addEventListener(e, controlRecipe)
);

//! Likes controller
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.image
    );
    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to UI list
    likesView.renderLike(newLike);

    // User HAS liked current recipe
  } else {
    // Remove like from the state
    state.likes.deleteLike(currentID);

    // Toggle the like button
    likesView.toggleLikeBtn(false);

    // Remove like from UI list
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Restore liked recipes on page load
window.addEventListener("load", () => {
  state.likes = new Likes();

  // Restore likes
  state.likes.readStorage();

  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // Render the existing likes
  state.likes.likes.forEach((like) => likesView.renderLike(like));
});

// Handling recipe button clicks
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".recipe__love, .recipe__love *")) {
    // Like controller
    controlLike();
  }
});

//! Quotes Functionality
let quotes = [
  {
    quote: "All happiness depends on a leisurely breakfast.",
    source: "John Gunther",
  },
  {
    quote: "You don't need a silver fork to eat good food.",
    source: "Paul Prudhomme",
  },
  {
    quote:
      "I only drink Champagne on two occasions, when I am in love and when I am not.",
    source: "Coco Chanel",
  },
  {
    quote: "A balanced diet is a cookie in each hand.",
    source: "Barbara Johnson",
  },
  {
    quote: "Life is a combination of magic and pasta.",
    source: "Federico Fellini",
  },
  {
    quote:
      "One cannot think well, love well, sleep well, if not has not dined well.",
    source: "Virginia Woolf",
  },
  {
    quote: "First we eat, then we do everything else.",
    source: "M.F.K. Fisher",
  },
  {
    quote: "I cook with wine. Sometimes I even add it to the food.",
    source: "W.C. Fields",
  },
  {
    quote: "There is no sincerer love than the love of food.",
    source: "George Bernard Shaw",
  },
  {
    quote:
      "A bone to the dog is not charity. Charity is the bone shared with the dog, when you are just as hungry as the dog.",
    source: "Jack London",
  },
];

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const fade = document.getElementById("fade");

// event listener

// btn.addEventListener("click", getQuote);

function getQuote() {
  let number = Math.floor(Math.random() * quotes.length);
  quote.innerHTML = '<span>"</span>' + quotes[number].quote + '<span>"</span>';
  author.innerHTML = "<span>-</span>" + quotes[number].source;
  addFade();
  setTimeout(removeFade, 3000);
}

setInterval(getQuote, 10000);

function addFade() {
  fade.classList.add("fade");
}

function removeFade() {
  fade.classList.remove("fade");
}
