// Global Variables

let dinos = [];
let tilesOrder = [];
const form = document.getElementById("dino-compare");
const button = document.querySelector("#btn");

// Create Dino Constructor
function Dino(species, weight, height, diet, where, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.where = where;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects

fetch("dino.json")
  .then((response) => response.json())
  .then((data) => {
    data.Dinos.map(function (dino, i) {
      dinos.push(
        new Dino(
          dino.species,
          dino.weight,
          dino.height,
          dino.diet,
          dino.where,
          dino.when,
          dino.fact
        )
      );
      return dinos;
    });
  });

// Create Human Object

function Human(name, feet, inches, weight, diet) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.height = 12 * this.feet + inches;
  this.diet = diet;
}

const human = new Human();
// Use IIFE to get human data from form

const getHumanData = function () {
  return (function (human) {
    human.name = document.getElementById("name").value;
    human.feet = document.getElementById("feet").value;
    human.inches = Number(document.getElementById("inches").value);
    human.weight = Number(document.getElementById("weight").value);
    human.height = 12 * human.feet + human.inches;
    human.diet = document.getElementById("diet").value;
  })(human);
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

Dino.prototype.compareWeight = function (human) {
  if (this.weight > human.weight)
    return `${this.species} is heavier than you. There is a chance you can escape`;
  else return `${this.species} is less in weight than you.`;
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function (human) {
  if (this.height > human.height)
    return `${this.species} is ${this.height} inches. It is taller than you`;
  else
    return `${this.species} is ${this.height} inches. It is shorter than you`;
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function (human) {
  let dietFact = "";
  if (this.diet === "herbavor")
    dietFact = `${this.species} was a ${this.diet} and you are ${human.diet}. You are safe, they eat plants only 😎`;
  else if (this.diet === "ominvor")
    dietFact = `${this.species} was a ${this.diet} and you are ${human.diet}. They eat plants and animals 😒`;
  else
    dietFact = `${this.species} was a ${this.diet} and you are ${human.diet}. Be carful, they eat animals only 😲`;
  return dietFact;
};
// Generate Tiles for each Dino in Array

function generateFact(dino) {
  const facts = [
    dino.fact,
    dino.compareDiet(human),
    dino.compareHeight(human),
    dino.compareWeight(human),
  ];
  return dino.species === "Pigeon"
    ? dino.fact
    : facts[Math.floor(Math.random() * facts.length)];
}

// Add tiles to DOM

const createTiles = function () {
  const grid = document.getElementById("grid");
  dinos.push(human);
  dinos.forEach(function (dino, i) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.style.order = randomizeTiles(dino);
    let species = document.createElement("h3");
    species.innerHTML = dino instanceof Dino ? dino.species : dino.name;
    let img = document.createElement("img");
    img.src =
      dino instanceof Dino
        ? `images/${dino.species.toLowerCase()}.png`
        : `images/human.png`;
    let fact = document.createElement("p");
    fact.innerHTML = dino instanceof Dino ? generateFact(dino) : "";
    gridItem.appendChild(species);
    gridItem.appendChild(img);
    gridItem.appendChild(fact);
    grid.appendChild(gridItem);
  });
  paintTiles();
};

// On button click, prepare and display infographic
const name = document.getElementById("name");
const feet = document.getElementById("feet");
const inches = document.getElementById("inches");
const weight = document.getElementById("weight");

button.addEventListener("click", function (e) {
  if (validateForm(name, feet, inches, weight)) {
    getHumanData();
    form.style.display = "none";
    createTiles();
  }
});

const randomizeTiles = function (dino) {
  let tileOrder = Math.floor(Math.random() * dinos.length);
  // console.log(tileOrder);
  if (dino instanceof Dino) {
    tilesOrder.push(Math.floor(dinos.length / 2)); //refactor here!
    while (tilesOrder.includes(tileOrder)) {
      tileOrder = Math.floor(Math.random() * dinos.length);
    }
    tilesOrder.push(tileOrder);
    return tileOrder;
  } else {
    return Math.floor(dinos.length / 2);
  }
};

const paintTiles = () => {
  const grids = document.querySelectorAll(".grid-item");
  const colors = [
    "#009687f5",
    "#dc7657f5",
    "#4bb3c1fa",
    "#fac069f9",
    "#67a866f9",
    "#b94169fa",
    "#7f62b3fa",
    "#9fc376f9",
    "#677bcbfa",
  ];
  for (const [i, grid] of grids.entries()) {
    grid.style.background = colors[i];
  }
};

const validateForm = function (...inputs) {
  let isValid = true;
  const divError = document.querySelectorAll(".error");

  inputs.forEach((input, i) => {
    if (input.value === "") {
      validateInput(input, "red", divError[i], `Please enter ${input.name} 😒`);
      isValid = false;
    } else {
      validateInput(input, "green", divError[i], "", "none");
    }
  });
  return isValid;
};

const validateInput = function (input, color, divError, msg, display = "") {
  input.style.border = `2px solid ${color}`;
  divError.textContent = msg;
  divError.style.display = display;
};
