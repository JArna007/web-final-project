console.log("script loaded");

const generateBtn = document.getElementById("generate");
const categorySelect = documetn.getElementById("category");
const jokeDisplay = document.getElementById("joke-display");

generateBtn.addEventListener("click", getJoke);

async function getJoke() {
  console.log("clicked");
}
