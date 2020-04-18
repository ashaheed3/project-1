$(document).ready(function () {
    $(".btn-small").on("click", function () {
        console.log("I was clicked");
        var userPreference = $(this).val();
        console.log(userPreference);
        localStorage.setItem("preference", userPreference);
        console.log(localStorage)
        var queryURL = `https://api.spoonacular.com/recipes/search?q=chicken&diet=${userPreference}&number=9&apiKey=496787d7b33d43a48e3924e2e30430f9`
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var titleIds = ["title1", "title2", "title3", "title4","title5","title6","title7","title8","title9"];
            var imageIds = ["image1", "image2","image3","image4","image5","image6","image7","image8","image9"];
            var btnIds = ["btn1","btn2","btn3","btn4","btn5","btn6","btn7","btn8","btn9"];
           for(var i = 0; i < response.results.length; i++) {
               //var foodImage = $("<img>").attr("src", "data:image/png;base64,"+image_base64+response.results[i].image + response.results[i].imageUrls[0]);
                console.log(queryURL)
                //debugger
                for(i=0; i < titleIds.length; i++) {
                    var titleSelector = '#' + titleIds[i];
                    $(titleSelector).text(response.results[i].title);
                } 
                for(i=0; i < imageIds.length; i++) {
                    var imageSelector = '#' + imageIds[i];
                    var foodPic = response.results[i].image;
                    $(imageSelector).attr("src",`https://spoonacular.com/recipeImages/${foodPic}`);
                }
            };
               //var foodPic = response.results[i].image;
               //var picture = $("<img>").attr("src",`https://spoonacular.com/recipeImages/${foodPic}`);
               //console.log(foodPic)
               //$("#results").append(picture);
               //("#results").append(foodImage);
               //var foodTitle = $("<h2>").text(response.results[i].title);
               //$("#results").append(foodTitle);
            //console.log(response.results[i]);
            //var foodId = response.results[i].id;
            //console.log(foodId)
            //console.log(foodImage);
            //$(picture).on("click", ()=>{
                var recipeURL = `https://api.spoonacular.com/recipes/${foodId}/information?includeNutrition=false&apiKey=496787d7b33d43a48e3924e2e30430f9`;
                $.ajax({
                    url: recipeURL,
                    method: "GET"
                }
                ).then(function (response){
                    for(var i = 0; i < response.results.length; i++) {
                    for(i=0; i < btnIds.length; i++) {
                        debugger
                        var btnSelector = '#' + btnIds[i];
                        console.log("something random")
                        $(btnSelector).attr("href", response.results[i].sourceURL);
                    };
                }
                    //var sourceURL = response.results[i].sourceURL;
                    //var listed = $("<link>").text(sourceURL);
                    //console.log(response.results)
                    //$("#results").append(listed);
              //  })
            })
        });
    });
});
