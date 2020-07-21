import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";

//! Global State
const state = {};

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

    //  4) Search for recipes
    await state.search.getResults();

    //  5) render results
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
  console.log("clicked");
});

// const search = new Search("pizza");
// console.log(search);
// search.getResults();
