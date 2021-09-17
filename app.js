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

let triceratops = new Dino(
  "Triceratops",
  13000,
  114,
  "herbavor",
  "North America",
  "Late Cretaceous",
  "First discovered in 1889 by Othniel Charles Marsh"
);

let tyrannosaurusRex = new Dino(
  "Tyrannosaurus Rex",
  11905,
  144,
  "carnivor",
  "North America",
  "Late Cretaceous",
  "The largest known skull measures in at 5 feet long."
);

let anklyosaurus = new Dino(
  "Anklyosaurus",
  10500,
  55,
  "herbavor",
  "North America",
  "Late Cretaceous",
  "Anklyosaurus survived for approximately 135 million years."
);

let brachiosaurus = new Dino(
  "Brachiosaurus",
  7000,
  372,
  "herbavor",
  "North America",
  "Late Jurasic",
  "An asteroid was named 9954 Brachiosaurus in 1991"
);

let stegosaurus = new Dino(
  "Stegosaurus",
  11600,
  79,
  "herbavor",
  "North America, Europe, Asia",
  "Late Jurasic to Early Cretaceous",
  "The Stegosaurus had between 17 and 22 seperate places and flat spines"
);

let elasmosaurus = new Dino(
  "Elasmosaurus",
  16000,
  59,
  "carnivor",
  "North America",
  "Late Cretaceous",
  "Elasmosaurus was a marine reptile first discovered in Kansas"
);

let pteranodon = new Dino(
  "Pteranodon",
  44,
  20,
  "carnivor",
  "North America",
  "Late Cretaceous",
  "Actually a flying reptile, the Pteranodon is not a dinosaur"
);

const dinos = [
  triceratops,
  tyrannosaurusRex,
  anklyosaurus,
  brachiosaurus,
  stegosaurus,
  elasmosaurus,
  pteranodon,
];

// Create Human Object

function Human(name, feet, inches, weight, diet) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.diet = diet;
}

const human = new Human();
// Use IIFE to get human data from form

const getHumanData = function () {
  return (function (human) {
    human.name = document.getElementById("name").value;
    human.feet = document.getElementById("feet").value;
    human.inches = document.getElementById("inches").value;
    human.weight = document.getElementById("weight").value;
    human.diet = document.getElementById("diet").value;
  })(human);
};
getHumanData();
console.log(human.diet);
// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

Dino.prototype.compareWeight = function () {};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function () {};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function () {};
// Generate Tiles for each Dino in Array

// Add tiles to DOM
const grid = document.getElementById("grid");

dinos.forEach(function (dino, i) {
  // console.log(dino.species);
  let gridItem = document.createElement("div");
  gridItem.className = "grid-item";
  let species = document.createElement("h3");
  species.innerHTML = dino.species;
  let img = document.createElement("img");
  img.src = `images/${dino.species.toLowerCase()}.png`;
  let fact = document.createElement("p");
  fact.innerHTML = dino.fact;
  gridItem.appendChild(species);
  gridItem.appendChild(img);
  gridItem.appendChild(fact);
  grid.appendChild(gridItem);
});
grid.style.display = "none";
// Remove form from screen
const form = document.getElementById("dino-compare");
// On button click, prepare and display infographic

document.querySelector("#btn").addEventListener("click", function () {
  form.className = "remove-form";
  grid.style.display = "flex";
});
