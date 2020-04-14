// debugger;

        var kitchenIngredients = [];
        var favorites = [];
        var storedFavorites = JSON.parse(localStorage.getItem("favorites"));

        if (storedFavorites !== null) {
            favorites = storedFavorites;
        }

        //Building my query
          var query = localStorage.getItem("keyword");
          var apiKey = ""
          var queryURL = `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${apiKey}`;
          
        function buildRecipeCard(recipe){

            var baseUri = "https://spoonacular.com/recipeImages/";
            var recipeContainer = $("#recipeContainer");
            var col = $(`<div class="col-md-4"></div>`);
            var card = $(`<div class="card mb-4 shadow-sm"></div>`);
            var img = $(`<img class = "recipeImg" src = "${baseUri+recipe.image}" width="100%" height="225"><h4>${recipe.title}</h4></img>`);
            var cardBody = $(`<div class="card-body"></div>`);
            var cardText = $(`<div class = "card-text ingredients">
                            <h6>Ingredients</h6>
                            </div>`);
            var btnsDiv = $(`<div class="d-flex justify-content-between align-items-center"></div>`);
            var btn = $(`<button type="button" class="btn btn-md btn-outline-secondary viewRecipeBtn"></button>`);
            var likeDiv = $(`<div></div>`)
            //debugger;
            var likeIcon = $(`<i data-recipeId = "${recipe.id}"style = "color:red"class="far fa-heart like fa-2x"></i>`)

            if (-1 < favorites.indexOf(`${recipe.id}`)){
                likeIcon.addClass("fa");
            }
            
            likeDiv.append(likeIcon);

            buildIngredientsDiv(recipe.id, cardText,btn);

           btnsDiv.append(btn);
           btnsDiv.append(likeDiv);

            cardBody.append(cardText);
            cardBody.append(btnsDiv);
            card.append(img);
            card.append(cardBody);
            col.append(card);
            recipeContainer.append(col);

            
        }
        
        function buildIngredientsDiv(recipeId, cardText, btn){
         
          var apiKey = ""
          var queryURL = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){ 

            var source = response.sourceUrl;

            var sourceLink =$(`<a href="${source}">View Recipe</a>`)
            btn.append(sourceLink);
            recipeIngredients = response.extendedIngredients;
            
                recipeIngredients.forEach(ingredient => {
                    // debugger;
                    var ingredientTxt = $(`<div data-id = "${ingredient.id}">${ingredient.name}</div>`);

                    if (-1 == kitchenIngredients.indexOf(`${ingredient.id}`)){
                        ingredientTxt.addClass("notInKitchen")
                    }

                    cardText.append(ingredientTxt);
                });
            

          });

        }

        

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){ 
            recipeResults = response.results;
            for (var i = 0; i < 10; i++){
                 buildRecipeCard(recipeResults[i]);
            }

          });

          
          // Toggle like button on click

        $("body").delegate(".like", "click", function(){
            
            var recipe = $(this).attr("data-recipeid");
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

            // event.preventDefault();
            query = $("#keyword").val();
            localStorage.setItem("keyword",query);
        })