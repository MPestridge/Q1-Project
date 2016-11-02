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
  // joinedArr(ingredientArr) returns a single array of checked ingredients //
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
    console.log(newURL);
    return newURL;
  }
  // adds selected ingredients to the end of the website url //

  var objResults = $.getJSON(urlUpdate(), {
      contentType: "application/json",
      format: "json"
    }, function(data) {
      var recipeObjs = data.hits;
      return recipeObjs;
    });

    // pulling a list of 10 recipes based on input ingredients //
  }

  recipeSearch();
  });
}); // end for document ready //
