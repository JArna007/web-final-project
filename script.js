console.log("script loaded");

const GenerateBtn = document.getElementById("generate");
const categorySelect = document.getElementById("category");
const jokeDisplay = document.getElementById("joke-display");

GenerateBtn.addEventListener("click", getJoke);

async function getJoke() {
  const category = categorySelect.value;
  const url = 'https://v2.jokeapi.dev/{category}/Any'

  try {
    jokeDisplay.textContent = "Loading...";

    const data = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);

    if (data.error) {
      jokeDisplay.textContent = "No joke found. Try another category.";
      return;
    }

    if (data.type === "single") {
      jokeDisplay.textContent = ___;
    } else {
      jokeDisplay.textContent = ___;
    }
  } catch (error) {
    jokeDisplay.textContent = " Could not load a joke. Check your connection and try again.";
    console.error(error);
  }
}
