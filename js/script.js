"use strict";
$(document).ready(function() {
  $('select').material_select();

var edamamAPI = "https:api.edamam.com/api/nutrition-details?app_id=8ec7dafd&app_key=10eb87abcfa912a8ad8daef79698acb8";

function test() {
var testResults = $.getJSON(edamamAPI, {
    contentType: "application/json",
    title: JSON.stringify("ham"),
    ingr: JSON.stringify(["ham"]),
    format: "json"
  });
  console.log(testResults);
  console.log("This function is running");
};
test();

}); // end for document ready //
