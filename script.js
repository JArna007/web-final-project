console.log("script loaded");

const GenerateBtn = document.getElementById("generate");
const categorySelect = document.getElementById("category");
const jokeDisplay = document.getElementById("joke-display");

GenerateBtn.addEventListener("click", getJoke);

async function getJoke() {
  console.log("clicked");
}
