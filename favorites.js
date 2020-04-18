/// debugger;

$(document).ready(function() {

    var favorites = JSON.parse(localStorage.getItem("favorites")) 
 //var favorites = [215435,323420,116679,121545,485365,74172,74202,94640,107878,]; //this will be array from local Storage in real life
 //console.log(favorites.join());
 

 showFavorites() 
    
 
    function showFavorites() {
         var recipeId = favorites.join()
 
         var apiKey = "638079db0422474e9dbb911fde92a215"
         var queryURL = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeId}&apiKey=${apiKey}`;
               
          $.ajax({
           url: queryURL,
            method: "GET"
        
          }).then(function(response) {
             console.log(response)
             console.log(queryURL)
             
 
             //display response data in html

             var titleIds = ["title1", "title2", "title3", "title4","title5","title6","title7","title8","title9"];
             var imageIds = ["image1", "image2","image3","image4","image5","image6","image7","image8","image9"];
             var btnIds = ["btn1","btn2","btn3","btn4","btn5","btn6","btn7","btn8","btn9"];
          
             var recipeResults = response;
             

                 for(i=0; i < recipeResults.length; i++) {
                     
                     for(i=0; i < titleIds.length; i++) {

                         var titleSelector = '#' + titleIds[i];
             
                         $(titleSelector).text(recipeResults[i].title);
                     }
                     
                     for(i=0; i < imageIds.length; i++) {

                         var imageSelector = '#' + imageIds[i];

                         $(imageSelector).attr("src", recipeResults[i].image);
                     }

                     for(i=0; i < btnIds.length; i++) {

                         var btnSelector = '#' + btnIds[i];

                         $(btnSelector).attr("href", recipeResults[i].sourceUrl);
                     };

                         
                 }
            
                 })

             
 
         }
         
 })