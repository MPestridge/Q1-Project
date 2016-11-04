"use strict";
$(document).ready(function() {
  $('select').material_select();

var edamamAPI = "https://g-edamam-matt-pestridge.herokuapp.com/search?q=";

var select = $('select');

$("#clr-button").click(function() {
  $("form input").val("");
  select.prop('selectedIndex', 0); //Sets the first option as selected
  select.material_select();        //Update material select
});

select.material_select();

$(".input-field").mouseleave(function() {
  $("input .select-dropdown").removeClass(".active");
  console.log("the mouse left the box");
});

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
    }, function createCards(data) {
      $(".filler-text").remove();
      $(".outer-container").remove();
      var recipeObjs = data.hits;
      if (recipeObjs.length === 0) {
        Materialize.toast('You have selected items that do not return any results! Please select different ingredients.', 6000, "rounded");
      } else {
      for (var i=0; i<recipeObjs.length; i++) {
        if(i % 2 === 0) {
        $("#left-column").append($("<img class='inner" + i + "' src=" + recipeObjs[i].recipe.image + ">"));
        $("#left-column").append($("<span style='text-shadow: 2px 2px #212121;' class='card-title inner" + i + "'>" +recipeObjs[i].recipe.label + "</span>"));
        $(".inner" + i).wrapAll("<div class='row outer-container card" + i + "'><div class='col s12 crdcol" + i + "'><div class='card medium mcrd" + i + "'><div class='card-image crdimg" + i + "'></div></div></div></div>");
        $(".crdimg" + i).after(("<div class='card-content crdcont" + i + "'><p>" + recipeObjs[i].recipe.healthLabels + "</p></div>"));
        $(".crdcont" + i).after("<div class='card-action crdact" + i + "'><a href='" + recipeObjs[i].recipe.shareAs + "' target='_blankd'>View Recipe</a></div>");
      } else if (i % 2 !== 0) {
        $("#right-column").append($("<img class='inner" + i + "' src=" + recipeObjs[i].recipe.image + ">"));
        $("#right-column").append($("<span style='text-shadow: 2px 2px #212121;' class='card-title inner" + i + "'>" +recipeObjs[i].recipe.label + "</span>"));
        $(".inner" + i).wrapAll("<div class='row outer-container card" + i + "'><div class='col s12 crdcol" + i + "'><div class='card medium mcrd" + i + "'><div class='card-image crdimg" + i + "'></div></div></div></div>");
        $(".crdimg" + i).after(("<div class='card-content crdcont" + i + "'><p>" + recipeObjs[i].recipe.healthLabels + "</p></div>"));
        $(".crdcont" + i).after("<div class='card-action crdact" + i + "'><a href='" + recipeObjs[i].recipe.shareAs + "' target='_blankd'>View Recipe</a></div>");
      }
      }
    }
    });
    // NOTE: pulling a list of 10 recipes based on input ingredients and creating cards filled with the JSON object data //
  }
  recipeSearch();
  });
}); // end for document ready //
