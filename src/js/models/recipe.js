import axios from "axios";
import { KEY } from "../config";

export default class Search {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    const URL = `https://api.spoonacular.com/recipes/${this.id}/information?apiKey=${KEY}`;

    try {
      const res = await axios(URL);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
