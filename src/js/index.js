import axios from "axios";

async function getResults(query) {
  const APP_ID = "13231e53";

  const KEY = "7e1a99ec4243020ada15269bce85b86b";

  const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${KEY}&from=0&to=30`;

  //   "https://api.edamam.com/search?q=chicken&app_id=13231e53&app_key=7e1a99ec4243020ada15269bce85b86b&from=0&to=30"

  try {
    const res = await axios(URL);
    const recipes = res.data;
    console.log(recipes);
  } catch (error) {
    console.log(error);
  }
}

getResults("chicken");
