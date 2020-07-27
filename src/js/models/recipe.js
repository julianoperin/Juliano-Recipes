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
      this.title = res.data.title; //
      this.time = res.data.readyInMinutes; //
      this.image = res.data.image; //
      this.servings = res.data.servings; //
      this.pricePerServing = res.data.pricePerServing; //
      this.sourceName = res.data.sourceName; //
      this.instructions = res.data.instructions; //
      this.summary = res.data.summary; //!
      this.sourceUrl = res.data.sourceUrl; //
      this.ingredients = res.data.extendedIngredients; //?
      this.wine = res.data.winePairing.pairingText; //!

      console.log(res);
    } catch (error) {
      alert("This recipe is no longer available :(");
    }
  }
}
