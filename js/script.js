"use strict";
$(document).ready(function() {
  $('select').material_select();

var edamamAPI = "https://g-edamam-matt-pestridge.herokuapp.com/search?q=";

$("#submit").click(function() {
  var proteinsArr = $("#proteins").val();
  var veggiesArr = $("#veggies").val();
  var grainsArr = $("#grains").val();
  var saucesArr = $("#sauces").val();
  var dairyArr = $("#dairy").val();
  var ingredientArr =[proteinsArr+"+"+veggiesArr+"+"+grainsArr+"+"+saucesArr+"+"+dairyArr];
  function joinedArr(arr) {
    return arr.join();
}
  // NOTE: joinedArr(ingredientArr) returns a single array of checked ingredients //
  var ingrString = joinedArr(ingredientArr);
  function recipeSearch() {
    function urlUpdate() {
      var newURL = "";
    for (var i=0; i<ingrString.length; i++) {
      if (ingrString.length < 1) {
        newURL = edamamAPI + ingrString[i];
      } else {
        newURL = edamamAPI + ingrString.replace(/,/g , "+");
      }
    }
    return newURL;
  }
  // NOTE: adds selected ingredients to the end of the website url //
  $.getJSON(urlUpdate(), {
      contentType: "application/json",
      format: "json"
    }, function(data) {
      var recipeObjs = data.hits;
        $("#left-column").append($("<img class='inner' src=" + recipeObjs[0].recipe.image + ">"));
        $("#right-column").append($("<span class='card-title inner'>" +recipeObjs[0].recipe.label + "</span>"));
        $(".inner").wrapAll("<div class='row'><div class='col s12'><div class='card medium'><div class='card-image'></div></div></div></div>");
        $(".card-image").after(("<div class='card-content'><p>" + recipeObjs[0].recipe.healthLabels + "</p></div>"));
        $(".card-content").after("<div class='card-action'><a href='" + recipeObjs[0].recipe.shareAs + "' target='_blankd'>View Recipe</a></div>")
    });
    // NOTE: pulling a list of 10 recipes based on input ingredients and creating cards filled with the JSON object data //
  }
  recipeSearch();
  });
}); // end for document ready //
