// Linking the id's of these div's to the chosen variables
var cocktailButton = document.getElementById("cocktail-button");
var beerButton = document.getElementById("beer-button");

var savedIndexBeer
var savedIndexCocktail
var chosenRandomBeer

// STEP 1
 
// Find a random cocktail
function getRandomCocktail () {

    var findRandomCocktail = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

    fetch(findRandomCocktail)
     .then(function (response) {
        return response.json();
     })
     .then (function (randomCocktailData) {
        // check that it has found a random cocktail
        console.log(randomCocktailData)

        localStorage.setItem ("cocktail-data", JSON.stringify(randomCocktailData))
        console.log(randomCocktailData)
        
        // Start the function to show our random cocktail on the page
        createRandomCocktail(randomCocktailData);
     })}


     // Find a random beer
function getRandomBeer () {
     var findRandomBeer = `https://uk.openfoodfacts.org/cgi/search.pl?action=process&tagtype_0=categories&tag_contains_0=contains&tag_0=beers&json=true`

     fetch(findRandomBeer)
     .then(function (response) {
        return response.json();
     })
     .then (function (randomBeerData) {
        // check that it has found a random cocktail
        console.log(randomBeerData)

        //Start the function to show our random cocktail on the page
        createRandomBeer(randomBeerData, null);
 })}


// STEP 2 for Beer

 // Finds the random beer name and img
 function createRandomBeer (randomBeerData, index) {

  var beer = randomBeerData.products
  console.log(beer)

  if (index != null) {
   chosenRandomBeer = index;
   console.log("Saved beer index", chosenRandomBeer);
  } else {
   chosenRandomBeer = Math.floor(Math.random() * beer.length);
   localStorage.setItem("saved-index-beer", JSON.stringify(chosenRandomBeer));
   console.log("Random generated beer index", chosenRandomBeer);
   localStorage.setItem("beer-data", JSON.stringify(randomBeerData));
  }

  // Grab that array now and set it as a var
  var randomBeer = beer[chosenRandomBeer]
  console.log(randomBeer)
  
  // find the beers name
  var beerName = `${randomBeer.product_name}`
  console.log(beerName)

  // find the beers image
  var beerPic = `${randomBeer.image_url}`
  console.log(beerPic)

  // Generate the divs for the beer
  createBeerDiv (beerName, beerPic);
}

//This function will create the div to show the data we have got
function createBeerDiv (name, picture) {

  //Grabs the div id=beer-creation and clears it, ready to add new data inside
  var beerCreation = document.getElementById("beer-creation")
   beerCreation.innerHTML = "";

  var newBeer = document.createElement("div");
   newBeer.classList.add("new-beer")
   newBeer.innerHTML = 

    `<div>${name}</div>
   <img src=${picture}>`;

  beerCreation.appendChild(newBeer); 
}

// STEP 2 for cocktail

// Finds the random cocktail name and img
function createRandomCocktail (randomCocktailData) {


    // Grabs the name and sets its var
    var cocktailName = `${randomCocktailData.drinks[0].strDrink}`
    console.log(cocktailName)

    // Grabs the picture and sets its var
    var cocktailPic = `${randomCocktailData.drinks[0].strDrinkThumb}`
    console.log(cocktailPic)

    createCocktailDiv (cocktailName, cocktailPic);
}

// This function will create the div to show the data we have got
function createCocktailDiv (name, picture) {

    // Grabs the div id=cocktail-creation and clears it, ready to add new data inside
    var cocktailCreation = document.getElementById("cocktail-creation")
    cocktailCreation.innerHTML = "";

    var newCocktail = document.createElement("div");
    newCocktail.classList.add("new-cocktail")
    newCocktail.innerHTML = 

    `<div> ${name}  </div>
    <img src=${picture} width="600px" height="600px">`;

    cocktailCreation.appendChild(newCocktail); 
}

function startCocktailRandomHistory () {
   var  localrandomCocktailData = JSON.parse(localStorage.getItem ("cocktail-data"))
   console.log(localrandomCocktailData)
   
   if (localrandomCocktailData != null) { 
      createRandomCocktail(localrandomCocktailData);
    } else {
      
     }
}

function startBeerRandomHistory () {
   var  localrandomBeerData = localStorage.getItem ("beer-data");
   var  localrandomBeerDataIndex = localStorage.getItem ("saved-index-beer");
   
   if ((localrandomBeerData != null) && (localrandomBeerDataIndex != null))
   {
      var localrandomBeerDataJson = JSON.parse(localrandomBeerData);
      var localrandomBeerDataIndexJson = JSON.parse(localrandomBeerDataIndex);
      createRandomBeer(localrandomBeerDataJson, localrandomBeerDataIndexJson);
   }
}

//localStorage.clear();

startCocktailRandomHistory ();
startBeerRandomHistory ();

// Adding an event listener so that when the id'd button is pressed, the specific function starts:
cocktailButton.addEventListener("click", getRandomCocktail) 
beerButton.addEventListener("click", getRandomBeer) 

 