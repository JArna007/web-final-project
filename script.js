console.log("script loaded");

const GenerateBtn = document.getElementById("generate");
const categorySelect = document.getElementById("category");
const jokeDisplay = document.getElementById("joke-display");
const copyBtn = document.getElementById("copy");
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
const saveBtn = document.getElementById("save");
const favoritesList = document.getElementById("favorites-list");



let currentJoke = "";
let favorites = [];



if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});



GenerateBtn.addEventListener("click", getJoke);

async function getJoke() {
  const category = categorySelect.value;
  const url = `https://v2.jokeapi.dev/joke/${category}?safe-mode`;

  try {
    jokeDisplay.textContent = "Loading...";

    const response = await fetch(url);
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
      currentJoke = data.joke;
    } else {
      currentJoke = `${data.setup} ${data.delivery}`;
    }
    jokeDisplay.textContent = currentJoke;

    if (data.type === "single") {
      jokeDisplay.textContent = data.joke;
    } else {
      jokeDisplay.textContent = `${data.setup} ${data.delivery}`;
    }
  } catch (error) {
    jokeDisplay.textContent = " Could not load a joke. Check your connection and try again.";
    console.error(error);
  }
}



copyBtn.addEventListener("click", copyJoke);

async function copyJoke () {
  const text = jokeDisplay.textContent;

  if (text === "" || text === "Loading...") {
    alert("Generate a joke first!");
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy";
    }, 1500);
  } catch (error) {
    alert("Could not copy. Try selecting the text and pressing ctrl+C.");
    console.error(error);
  }
}



try {
  favorites = JSON.parse(localStorage.getItem("favorites")) ||[];
} catch (error) {
  favorites = [];
}



saveBtn.addEventListener("click", saveJoke);

function saveJoke() {
  if (currentJoke === "") {
    alert("Generate a joke first!");
    return;
  }

  if (favorites.includes(currentJoke)) {
    alert("That joke is already in your favorites.");
    return;
  }

  favorites.push(currentJoke);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}



function renderFavorites() {
  favoritesList.innerHTML = "";

  favorites.forEach((joke, index) => {
    const li = document.createElement("li");
    li.textContent = joke + " ";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    });

    li.appendChild(removeBtn);
    favoritesList.appendChild(li);
  });
}
