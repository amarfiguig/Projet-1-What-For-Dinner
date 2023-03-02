# Project 1

## What's For Dinner?

### User Story

As a user, I want to type in a meat, vegetable, and fruit to generate a random recipe, so that I can save my time or try new recipes.
As a user, I want to generate a random cocktail or beer, so that I can save my time in deciding which drink I want.

### Acceptance Criteria

GIVEN a dinner recipe creator with form inputs

WHEN I enter a meat and/or vegetable and/or fruit
THEN I am presented with up to six different recipie choices

WHEN I click on the chosen recipe
THEN I am taken to a page showing further ingredients needed to the ones I selected and are given instructions

WHEN I click on the random beer button
THEN I am presented with a random beer choice that could compliment my recipe choice

WHEN I click on the random cocktail button
THEN I am presented with a random cocktail choice that could compliment my recipe choice

WHEN I revisit the page
THEN I am presented with my most recent cocktail and beer choice

## Issues identified and corrected


Error when requesting to retrieve the last known cocktail from the local storage:
- During the build of the webpage, the saved value for the cocktail data from the API was saving as [OBJECt, object] which on start-up, did not represent the local storage data correctly. After searching on a fix, I rememebered that I needed to JSON stringify + parse my data so that it could be read correctly by the JavaScript. 

- During the request of mulitple URL links for each ingredient picture, the javascript requires to use async(promise) to wait for all the Remote API calls being returned. 

## API's Used:

1. Spoonacular API - Finding recipes by ingredients

![spoonacular com_food-api](https://user-images.githubusercontent.com/113479774/202567641-ef9d8cf0-42e9-413f-8359-13878ded6946.png)

2. The Cocktail DB - Finding random cocktails

![www thecocktaildb com_](https://user-images.githubusercontent.com/113479774/202567917-8b34dd39-afb0-405b-b00c-1a5365e11951.png)

3. Open Food Facts API - Finding random beers

![world openfoodfacts org_data](https://user-images.githubusercontent.com/113479774/202568099-fa20b8a3-0ec9-48e6-9886-fd7ea04634f9.png)

## Future work

Clicking on the cocktail image sends you to the page showing you how to create the cocktail and what ingredients you will need:
 - Looking into the API for the cocktail section, There is some additional data on what ingredients are used in the cocktail and how to make the drink. For future work, we may be able to add a link to the cocktail image to take the user to this additional information on another HTML page.

We have added HTML <!--notes-->, CSS /*notes*/ and Javascript //notes to help any future edits by making it easier to see what the different elements are in the code so that if any more collaboration work will be done in the future, it will be easiser to track and change.

## Screenshot of completed product

![gibbo3433 github io_Project-1_ (1)](https://user-images.githubusercontent.com/113479774/201734437-04edccb7-4133-4aac-8f83-87978f78d7f5.png)

## Link to deployed application

https://gibbo3433.github.io/What-s-For-Dinner-/

## Authors and acknowledgment

Jordan Gibbs, Jihong Lu, Mikaaeel Boksh, Ahmed Amar,

## License

N/A
