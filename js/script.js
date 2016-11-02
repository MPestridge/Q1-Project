"use strict";
$(document).ready(function() {
  $('select').material_select();

  var ingredientArr =[];
  function grabIngredients() {
    var checkedIngredients = $('select').material_select();
    ingredientArr.push(checkedIngredients);
  }
  grabIngredients();
  console.log(ingredientArr);

var edamamAPI = "https://g-edamam-matt-pestridge.herokuapp.com/search?q=";

function recipeSearch() {
  var newURL = "";
  for (var i=0; i<ingredientArr.length; i++) {
    if (ingredientArr.length < 1) {
      newURL = edamamAPI + ingredientArr[i];
    } else {
      newURL = edamamAPI + ingredientArr.join("+");
    }
  }
var objResults = $.getJSON(newURL, {
    contentType: "application/json",
    format: "json"
  });
  console.log(objResults);
}
recipeSearch();

}); // end for document ready //
