// Add your code for ingredient.html and ingredient.css
var userFormEl = document.querySelector('#user-form');
var meatEl = document.querySelector('#meat');
var vegEl = document.querySelector('#veg');
var fruitEl = document.querySelector('#fruit');

var fullfoodInfo = [];
var linkInfo = [];
var linkRequestUrls = []

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var meatname = meatEl.value.trim();
    var vegname = vegEl.value.trim();
    var fruitname = fruitEl.value.trim();

    //test data
    //lamb,lettuce,banana
    //fish,lettuce, apple

    console.log("meatname ", meatname);
    console.log("vegname ", vegname);
    console.log("fruitname ", fruitname);

    meatEl.value = "";
    vegEl.value = "";
    fruitEl.value = "";

    //var fullString = getFullGredientName(meatname, vegname, fruitname);
    //console.log("fullString ", fullString);
    getIngredientInfo(meatname, vegname, fruitname);
};

function getFullGredientName(meatname, vegname, fruitname)
{
    var fullString = "";
    var searchStr = [];

    searchStr.push(meatname);
    searchStr.push(vegname);
    searchStr.push(fruitname);

    for (var index = 0; index < searchStr.length; index++)
    {
        if (searchStr[index] != "")
        {
            if (index == (searchStr.length-1))
            {
                fullString = fullString + searchStr[index];
            }
            else
            {
                fullString = fullString + searchStr[index] + ",";
            }
        }
    }

    var lastCharacter = fullString.charAt(fullString.length - 1);

    if (lastCharacter == ",")
    {
        fullString = fullString.substring(0, fullString.length - 1);
    }

    console.log("fullString parameters is ", fullString);

    return fullString;
}

var getIngredientInfo = function (meatname, vegname, fruitname) {

    var wholeIngredient = getFullGredientName(meatname, vegname, fruitname);
    ////https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=2&apiKey=b1e7b82b834f4b2484d0dff5de53914d
    //var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + meatname + ",+" + vegname + ",+" + fruitname +
    //    "&number=6&apiKey=6a4ed5a689094fa39622fdcb00dca025";
    var apiUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + wholeIngredient +
        "&number=6&apiKey=b1e7b82b834f4b2484d0dff5de53914d";

    clearHtmlPictureElement();

    console.log(apiUrl);
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            console.log(data);
            linkInfo = getFoodInfo(data);
            getLinkUrls(linkInfo);
            getFoodPictureLinkAsync();
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to API Server');
      });
}

function getLinkUrls(linkInfo)
{
    for (index = 0; index < linkInfo.length; index++)
    {
        var apiUrl = "https://api.spoonacular.com/recipes/" + linkInfo[index].id + "/information?includeNutrition=false&apiKey=b1e7b82b834f4b2484d0dff5de53914d";
        linkRequestUrls.push(apiUrl);
    }

    console.log(linkRequestUrls);
}

function getFoodInfo(data)
{
    var foodInfo = [];

    if (data.length != 0)
    {
        for (var index = 0 ; index < Math.min(data.length, 6); index++)
        {
            var currentFoodObj = {
                title:  data[index].title,
                picture_src: data[index].image,
                id: data[index].id
            };

            foodInfo.push(currentFoodObj);

            console.log("Title " + data[index].title);
            console.log("picture_src " + data[index].image);
            console.log("data[i].id " + data[index].id);
        }
    }

    console.log(foodInfo);

    return foodInfo;
}

async function getFoodPictureLinkAsync() {
    try {
        const response = await Promise.all(
            linkRequestUrls.map(url => fetch(url).then(res => res.json()))
        )

        for (var index = 0; index < response.length; index++)
        {
            console.log(response[index].sourceUrl);

            var currentFullFoodObj = {
                title:  linkInfo[index].title,
                picture_src: linkInfo[index].picture_src,
                id: linkInfo[index].id,
                link: response[index].sourceUrl
            };

            fullfoodInfo.push(currentFullFoodObj);
            console.log(fullfoodInfo);
        }

        DrawHtml();

        //clear storage
        fullfoodInfo = [];
        linkInfo = [];
        linkRequestUrls = []
    } catch (error) {
        console.log("Error", error)
    }
}

function clearHtmlPictureElement()
{
    for (var index = 0; index < 6; index++)
    {
        var imageId = "#picture_" + index;
        var imageElement = document.querySelector(imageId);

        imageElement.innerHTML = "";
    }
}

function DrawHtml()
{
    for (var index = 0; index < Math.min(fullfoodInfo.length, 6); index++)
    {
        //construct innerhtml
        var imageId = "#picture_" + index;
        var imageElement = document.querySelector(imageId);

        console.log(imageElement);
        
        var figcaption = document.createElement('figcaption');
        figcaption.textContent = fullfoodInfo[index].title;

        imageElement.appendChild(figcaption);

        var innerHtml = "<a href='" + fullfoodInfo[index].link + "'" + "target='_blank'" + "'>" + 
            "<img src='" + fullfoodInfo[index].picture_src + "'></a>";
        imageElement.innerHTML += innerHtml;
    }
}

userFormEl.addEventListener('submit', formSubmitHandler);