import Search from "./models/Search";

//! Global State
const state = {};

const controlSearch = async () => {
  // 1) Get the query from the view
  const query = "chicken";

  if (query) {
    // 2) New Search object and add to state
    state.search = new Search(query);

    //  3) Prepare Ui for results

    //  4) Search for recipes
    await state.search.getResults();

    //  5) render results
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
  console.log("clicked");
});

// const search = new Search("pizza");
// console.log(search);
// search.getResults();
