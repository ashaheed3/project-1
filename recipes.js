        var kitchenIngredients = [];
        var recipeIngredients= [];
        var favorites = [];
        var storedFavorites = JSON.parse(localStorage.getItem("favorites"));

        if (storedFavorites !== null) {
            favorites = storedFavorites;
        }

        //Get kitchen items from local storage
        function getKitchenItems(){
          var dairy =  JSON.parse(localStorage.getItem("dairyAlt"));
          var produce =  JSON.parse(localStorage.getItem("produceAlt"));
          var meat =  JSON.parse(localStorage.getItem("meatAlt"));
          var seafood =  JSON.parse(localStorage.getItem("seafoodAlt"));
          var pantry =  JSON.parse(localStorage.getItem("pantryAlt"));


          if ((dairy == null)||(produce == null)||(meat == null)||(seafood == null)||(pantry == null)){
            return;
          }else{

          dairy.push(...produce, ...meat, ...seafood,...pantry);

        }
          
          dairy.forEach(element => {
            kitchenIngredients.push(element[1]);
          });
        }
          
        getKitchenItems();

        var query = localStorage.getItem("keyword");
        var apiKey = "b42c4702dace43f3a8eab57371424152"
        // var apiKey = "8782d74ea56e448b8fbd7ab3bed941ad";
        var queryURL = `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${apiKey}`;


        // Build Recipe Cards for search results   
        function buildRecipeCard(recipe, i){
            var baseUri = "https://spoonacular.com/recipeImages/";
            var recipeContainer = $("#recipeContainer");
            var col = $(`<div class="col-md-4"></div>`);
            var card = $(`<div class="card mb-4 shadow-sm" style="background-color:  antiquewhite"></div>`);
            var img = $(`<img class = "recipeImg" src = "${baseUri+recipe.image}" alt = "${recipe.title}" width="100%" height="225"><h4>${recipe.title}</h4></img>`);
            var cardBody = $(`<div class="card-body"></div>`);
            var ingredientsDiv = $(`<div class = "card-text ingredients">
                            <h6>Ingredients</h6>
                            </div>`);
            var caloriesDiv = $(`<div id = caloriesDiv${i} style = "display:none;">
                            <h6>Calories</h6>
                            <p id = caloriesP${i}></p>
                            </div>`);
            var btnsDiv = $(`<div class="d-flex justify-content-between align-items-center"></div>`);
            var viewRecipe = $(`<button type="button" class="btn btn-md btn-outline-secondary viewRecipeBtn"></button>`);
            var viewCalories = $(`<button type="button" data-id = "${i}"class="btn btn-md btn-outline-secondary viewCaloriesBtn">Show Calories</button>`);
            var likeDiv = $(`<div></div>`)
            //debugger;
            var likeIcon = $(`<i data-recipeId = "${recipe.id}"style = "color:red"class="far fa-heart like fa-2x"></i>`)

            if (-1 < favorites.indexOf(recipe.id)){
                likeIcon.addClass("fa");
            }
            
            likeDiv.append(likeIcon);

            buildIngredientsDiv(recipe.id, ingredientsDiv,viewRecipe);

            btnsDiv.append(viewRecipe);
            btnsDiv.append(viewCalories);
            btnsDiv.append(likeDiv);

            cardBody.append(ingredientsDiv);
            cardBody.append(caloriesDiv);
            cardBody.append(btnsDiv);
            card.append(img);
            card.append(cardBody);
            col.append(card);
            recipeContainer.append(col);     
        }

        function getCalorieInfo(foodItem){
          var calories = 0;
          var appId = "0128df05"
          var apiKey = "a215072af971bfe8d1f356af70c5361d"
          var food = encodeURI(foodItem);
          var queryUrl = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${apiKey}&ingr=${food}`

          $.ajax({
            url: queryUrl,
            method: "GET"
          }).then(function(response){ 
            
            console.log(response);
            calories = parseInt(response.calories);

          })

          return calories;
        }

        // Get ingredient name and quanity from response and push to global array
        function pushRecipeIngredients(recipe){
          
          var ingredientArr = [];
          recipe.forEach(ingredient => {
            ingredientArr.push(ingredient.original)
          });
          recipeIngredients.push(ingredientArr);
        }
        

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){ 
            recipeResults = response.results;

            for (var i = 0; i < 10; i++){
                 buildRecipeCard(recipeResults[i], i);
            }

          });
        
        // Build ingredient portion of recipe card
        function buildIngredientsDiv(recipeId, cardText, btn){
         
          var apiKey = "b42c4702dace43f3a8eab57371424152"
          // var apiKey = "8782d74ea56e448b8fbd7ab3bed941ad";
          var queryURL = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){ 

            var source = response.sourceUrl;
            var sourceLink =$(`<a href="${source}">View Recipe</a>`)
            btn.append(sourceLink);

            recipeIngredients = response.extendedIngredients;
           
            pushRecipeIngredients(recipeIngredients);
            
            recipeIngredients.forEach(ingredient => {
               var ingredientTxt = $(`<div data-id = "${ingredient.id}">${ingredient.name}</div>`);

               if ((-1 == kitchenIngredients.indexOf(`${ingredient.id}`))){
                  ingredientTxt.addClass("text-muted")
               }

               cardText.append(ingredientTxt);
                    
            });
            
          });

        }

        

          
          // Toggle like button on click

        $("body").delegate(".like", "click", function(){
            
            var recipe = parseInt($(this).attr("data-recipeid"));
            $(this).toggleClass("fa");

            if($(this).hasClass("fa")){
              favorites.push(recipe);
            }else{
                if (-1 < favorites.indexOf(recipe)){
                    favorites.splice(favorites.indexOf(recipe),1);
                }
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));

        });

        $("#search").on("click",function(){

          debugger;

            // event.preventDefault();
            query = $("#keyword").val();
            localStorage.setItem("keyword",query);
        })

        $("body").delegate(".viewCaloriesBtn", "click", function(){
          // debugger;
            var recipe = parseInt($(this).attr("data-id"));

            $(`#caloriesDiv${recipe}`).toggle("slow");

            var calories= 0;

            for(var i = 0; i < recipeIngredients[recipe].length; i++){
            
              calories += getCalorieInfo(recipeIngredients[recipe][i]);
              
            }

            $(`#caloriesP${recipe}`).text(calories);



        });
