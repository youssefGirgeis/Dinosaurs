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

const pigeon = new Dino(
  "Pigeon",
  0.5,
  9,
  "herbavor",
  "World Wide",
  "Holocene",
  "All birds are living dinosaurs."
);

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
getHumanData();

const dinos = [
  triceratops,
  tyrannosaurusRex,
  anklyosaurus,
  brachiosaurus,
  stegosaurus,
  elasmosaurus,
  pteranodon,
  pigeon,
  human,
];
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
    dietFact = `${this.species} was a ${this.diet}. You are safe, they eat plants only 😎`;
  else if (this.diet === "ominvor")
    dietFact = `${this.species} was a ${this.diet}. They eat plants and animals 😒`;
  else
    dietFact = `${this.species} was a ${this.diet}. Be carful, they eat animals only 😲`;
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

  dinos.forEach(function (dino, i) {
    let gridItem = document.createElement("div");
    gridItem.className = "grid-item";
    gridItem.style.order =
      dino instanceof Dino ? i + 1 : Math.floor(dinos.length / 2); // refactor: create separete function
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
};

// Remove form from screen
const form = document.getElementById("dino-compare");
// On button click, prepare and display infographic

document.querySelector("#btn").addEventListener("click", function () {
  getHumanData();
  form.className = "remove-form";
  createTiles();
});
