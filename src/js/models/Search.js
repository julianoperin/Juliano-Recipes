import axios from "axios";
import { KEYH } from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  // Simple Search
  // https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=10d488cf49f141da98241c0cf1c12cfc&number=30

  // "https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${KEY}"

  async getResults() {
    const URL = `https://api.spoonacular.com/recipes/complexSearch?query=${this.query}&apiKey=${KEYH}&number=30`;

    try {
      const res = await axios(URL);
      this.result = res.data.results;
      console.log(this.result);
    } catch (error) {
      console.log(error);
    }
  }
}

// getResults("chicken");

// const uniqueTitles = () => {
//   const array = [];
// }

// console.log(this.result);
