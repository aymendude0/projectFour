// namespace
const cocktailApp = {};
let variable = [];

// listen to a click event- user choice- that will return a value. create a variable to store the result
$(".button").on('click', function() {
    $('html, body').animate({scrollTop:1050},'slow');
    cocktailApp.userChoice = this.id;
    cocktailApp.getIngredient(cocktailApp.userChoice);
});

// first API call: filter API by type of alcohol selected (user choice) 
cocktailApp.getIngredient = (userInput) => {
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${userInput}`,
        method: 'GET',
        dataType: 'json',
    }).then((res) => {
      //  display 3 cocktails containing the selected type of alcohol
        for (let i = 0; i <= (res.drinks.length); i++) {
            // console.log(res.drinks[i]);
            cocktailApp.firstDrink = res.drinks[i].idDrink;
            cocktailApp.secondApiCall(cocktailApp.firstDrink);
        } 
    })
}

// second API call: filter API by drink Id) 
cocktailApp.secondApiCall = (drinkId) => {
    $.ajax({
        url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
        method: 'GET',
        dataType: 'json',
    }).then((res) => {
        console.log(res);
        const drinkResults = res.drinks;
        cocktailApp.showResults(drinkResults);
    })
}
// iterate over anything that includes string ingredient
// make an array filled with those attributes
// for loop length, if null skip it, else add to the array
cocktailApp.showResults = (drinkObj) => {
    // add a remove
        console.log(drinkObj);
        $('.showHere').empty();
        let ingredient = ''; 
        for (let i = 1; i <= 15; i++) {
            const strIngrdient = 'strIngredient' + i;
            if (drinkObj[0][strIngrdient] != null && drinkObj[0][strIngrdient] !='') {
                ingredient += `<li>
                ${drinkObj[0][strIngrdient]}
                </li>`
            } else {
                break;
            } 
        }

        let measurement = '';
        for (let i = 1; i <= 15; i++) {
            const strMeasure = 'strMeasure' + i;
            if (drinkObj[0][strMeasure] != null && drinkObj[0][strMeasure] !='') {
                measurement += `<li>
                ${drinkObj[0][strMeasure]}
                </li>`
            } else {
                break;
            }
        }

        $('.showHere').append(`
        <div class= "cocktailName">
            <h2>${drinkObj[0].strDrink}</h2>
        </div>
        <div class="gridContainer">
            <div class="gridItem gridItem3 imageDrink">
                    <img src=${drinkObj[0].strDrinkThumb} />
            </div>
            <div class= "gridItem gridItem3">
                <h3>This is how you'll make it:</h2>
                <p>${drinkObj[0].strInstructions}</p>
            </div>
            <div class= "gridItem gridItem5">
                <h3>What you will need:</h3>
                <ul>
                    ${ingredient}
                </ul>
            </div>
            <div class= "gridItem gridItem6">
                <h3>Measurements?</h2>
                <ul>
                    ${measurement}
                </ul>
            </div>
            <div class="gridItem gridItem2 button" tabindex="1" id="pressMe">
                <p>Shuffle this booze category</p>
            </div>
            <div class= "gridItem gridItem1 button" tabindex="1" id="return">
                <p>Try a different booze</p> 
            </div>  
        </div>  
    `);
}


$('body').on('click', '#pressMe', function(event) {
    event.preventDefault();
    cocktailApp.getIngredient(cocktailApp.userChoice);
    $('html, body').animate({scrollTop:1000},'slow');
})

$('body').on('click', '#return', function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop:1},'slow');
})




$(function() {
})
// init function to start everything
cocktailApp.init = function(){
    cocktailApp.getIngredient();


}
// doc ready
$(function(){
    cocktailApp.init();

})


