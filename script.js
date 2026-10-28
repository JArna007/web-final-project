console.log("script loaded");

const Generate = document.getElementById("generate");
const category = document.getElementById("category");
const jokeDisplay = document.getElementById("joke-display");

Generate.addEventListener("click", getJoke);

async function getJoke() {
  console.log("clicked");
}
