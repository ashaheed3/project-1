// debugger;
//$("#pic1").attr("src", searchPic.src);
$(document).ready(function() {


    var favorites = [215435,323420,116679,121545];
    console.log(favorites.join());
    
    
    $('#button').on('click', function() {
    
        //var recipe = {
           // "id1" :123, "id2" : 345, "id3" : 678
         //}
         
         //favorites.push(recipe.id3);
    
         //localStorage.setItem("favorites", JSON.stringify(favorites));
        //apiCall()
    
    })
    
    //$('#button2').on('click', function() {
        //var storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        //$("#display").text(storedFavorites); })
    
    
    
       //function apiCall() {
            var recipeId = favorites.join()
            
    
             var apiKey = "08f60c4364f74e17b4143c40fa0cff70"
             var queryURL = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeId}&apiKey=${apiKey}`;
             //var queryURL = `https://api.spoonacular.com/recipes/search?query=cheese&number=4&apiKey=${apiKey}`;
          
             $.ajax({
              url: queryURL,
               method: "GET"
           
             }).then(function(response) {
    
                console.log(response)
                console.log(queryURL)
    
                //display response data in html
                //var image = response.image
                //$('#recipeImg').src(image)
                //var title = response.title
               // $('#title').text(title)
    
             })
    
            }
            
    })
    
