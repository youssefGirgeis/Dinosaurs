// Global Variables

// to hold all nine objects
let dinos = [];
// the order of the tiles on the screen: 1 to 9
let tilesOrder = [];
const form = document.getElementById('dino-compare');
const button = document.querySelector('#btn');
const name = document.getElementById('name');
const feet = document.getElementById('feet');
const inches = document.getElementById('inches');
const weight = document.getElementById('weight');
const diet = document.getElementById('diet');

/* 
Helper Functions
*/

/**
 * @description generates a radom fact
 * @param {Dino} dino - A Dino instance
 * @returns {string} fact - A fact for each dino instance
 */
function generateFact(dino) {
  const facts = [
    dino.fact,
    dino.compareDiet(human),
    dino.compareHeight(human),
    dino.compareWeight(human),
  ];
  return dino.species === 'Pigeon'
    ? dino.fact
    : facts[Math.floor(Math.random() * facts.length)];
}

/**
 * @description Displays the tiles in random order
 * @param {Dino} dino - a Dino instance
 * @returns {number} - the order of the tile
 */
const randomizeTiles = function (dino) {
  // a random number from 1 to 9
  let tileOrder = Math.floor(Math.random() * dinos.length);
  if (dino instanceof Dino) {
    // the order of the human tile
    tilesOrder.push(Math.floor(dinos.length / 2)); // I need to refacto this line!
    while (tilesOrder.includes(tileOrder)) {
      // generate a new random varible from 1 to 9 if it was generated before
      tileOrder = Math.floor(Math.random() * dinos.length);
    }
    // add the random number to the tiles order o keep track of the tiles order
    tilesOrder.push(tileOrder);
    return tileOrder;
  } else {
    // human tile order
    return Math.floor(dinos.length / 2);
  }
};

/**
 * @description Adds background color to each grid/tile
 */
const paintTiles = () => {
  const grids = document.querySelectorAll('.grid-item');
  const colors = [
    '#009687f5',
    '#dc7657f5',
    '#4bb3c1fa',
    '#fac069f9',
    '#67a866f9',
    '#b94169fa',
    '#7f62b3fa',
    '#9fc376f9',
    '#677bcbfa',
  ];
  // trying a new the for of loop
  for (const [i, grid] of grids.entries()) {
    grid.style.background = colors[i];
  }
};

/**
 * @description Validates data entered by user
 * @param  {...any} inputs - forms data
 * @returns {boolean} isValid - true if the form is good to be submitted
 */
const validateForm = function (...inputs) {
  let isValid = true;
  // a div to display error messages
  const divError = document.querySelectorAll('.error');

  inputs.forEach((input, i) => {
    if (input.value === '') {
      input.style.border = '2px solid red';
      divError[i].textContent = `Please enter ${input.name} 😒`;
      isValid = false;
    } else {
      input.style.border = '2px solid green';
      divError[i].style.display = 'none';
    }
  });
  return isValid;
};
/* End of Helper functions */

/**
 * @description Represents a dinasour/dino
 * @constructor
 * @param {string} species - dinasour's species
 * @param {*} weight - dinaosour's weight
 * @param {*} height - dinasour's height
 * @param {*} diet - dinasour's type of food they eat
 * @param {*} where - dinasour's origin
 * @param {*} when - dinasour's era
 * @param {*} fact - a fact about the species
 */
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
fetch('dino.json')
  .then(response => response.json())
  .then(data => {
    data.Dinos.map(function (dino) {
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

/**
 *@description Represents a human
 @constructor
 * @param {*} name - a person name
 * @param {*} feet - person's height in feet
 * @param {*} inches - person's height inches
 * @param {*} weight - person's weight
 * @param {*} diet - person's diet
 */
function Human(name, feet, inches, weight, diet) {
  this.name = name;
  this.feet = feet;
  this.inches = inches;
  this.weight = weight;
  this.height = 12 * this.feet + inches;
  this.diet = diet;
}
const human = new Human();

/**
 * @description Retrieves human's data from the form
 * @returns {Human} - a human instance
 */
const getHumanData = function () {
  return (function (human) {
    human.name = name.value;
    human.feet = feet.value;
    human.inches = Number(inches.value);
    human.weight = parseInt(weight.value); // trying a new function instead of Number()
    human.height = 12 * human.feet + human.inches;
    human.diet = diet.value;
  })(human);
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

/**
 * @description Compares a human weight with dinasours
 * @param {Human} human - human instance
 * @returns {string} - a weight comaprison fact
 */
Dino.prototype.compareWeight = function (human) {
  if (this.weight > human.weight)
    return `${this.species} is heavier than you. There is a chance you can escape`;
  else return `${this.species} is less in weight than you.`;
};

/**
 * @description Compares a human height with dinasours
 * @param {Human} human - human instance
 * @returns {string} - a height comaprison fact
 */
Dino.prototype.compareHeight = function (human) {
  if (this.height > human.height)
    return `${this.species} is ${this.height} inches. It is taller than you`;
  else
    return `${this.species} is ${this.height} inches. It is shorter than you`;
};

/**
 * @description Compares a human diet with dinasours
 * @param {Human} human - human instance
 * @returns {string} - a diet comaprison fact
 */
Dino.prototype.compareDiet = function (human) {
  let dietFact = '';
  if (this.diet === 'herbavor')
    dietFact = `${this.species} was a ${this.diet} and you are ${human.diet}. You are safe, they eat plants only 😎`;
  else if (this.diet === 'ominvor')
    dietFact = `${this.species} was a ${this.diet} and you are ${human.diet}. They eat plants and animals 😒`;
  else
    dietFact = `${this.species} was a ${this.diet} and you are ${human.diet}. Be carful, they eat animals only 😲`;
  return dietFact;
};

/**
 * @description Creates tiles amd renders them to the page
 */
const createTiles = function () {
  const grid = document.getElementById('grid');
  dinos.push(human);
  dinos.forEach(function (dino) {
    let gridItem = document.createElement('div');
    gridItem.className = 'grid-item';
    gridItem.style.order = randomizeTiles(dino);
    let species = document.createElement('h3');
    species.innerHTML = dino instanceof Dino ? dino.species : dino.name;
    let img = document.createElement('img');
    img.src =
      dino instanceof Dino
        ? `images/${dino.species.toLowerCase()}.png`
        : `images/human.png`;
    let fact = document.createElement('p');
    fact.innerHTML = dino instanceof Dino ? generateFact(dino) : '';
    gridItem.appendChild(species);
    gridItem.appendChild(img);
    gridItem.appendChild(fact);
    grid.appendChild(gridItem);
  });
  paintTiles();
};

/**
 * @description Starts the application
 */
function start() {
  button.addEventListener('click', function () {
    if (validateForm(name, feet, inches, weight)) {
      getHumanData();
      form.style.display = 'none';
      createTiles();
    }
  });
}

start();
