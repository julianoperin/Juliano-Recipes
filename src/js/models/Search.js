import axios from "axios";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  // Simple Search
  // https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=10d488cf49f141da98241c0cf1c12cfc&number=30

  async getResults() {
    const KEY = "10d488cf49f141da98241c0cf1c12cfc";

    // const URL = `https://api.edamam.com/search?q=${this.query}&app_id=${APP_ID}&app_key=${KEY}&from=0&to=30`;

    const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${KEY}&number=30`;

    //   "https://api.edamam.com/search?q=chicken&app_id=13231e53&app_key=7e1a99ec4243020ada15269bce85b86b&from=0&to=30"

    try {
      const res = await axios(URL);
      // console.log(res);
      this.result = res.data.results;
      console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }
}

// getResults("chicken");
