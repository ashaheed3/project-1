// debugger;

        //Building my query
          var query = "cheese";
          var apiKey = "8a284d0b537542f3a8e3f69359834a53"
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
            var likeIcon = $(`<div><i style = "color:red"class="far fa-heart like fa-2x"></i></div>`)
            
            buildIngredientsDiv(recipe.id, cardText,btn);

           btnsDiv.append(btn);
           btnsDiv.append(likeIcon);

            cardBody.append(cardText);
            cardBody.append(btnsDiv);
            card.append(img);
            card.append(cardBody);
            col.append(card);
            recipeContainer.append(col);
        }
        
        function buildIngredientsDiv(recipeId, cardText, btn){
         
          var apiKey = "8a284d0b537542f3a8e3f69359834a53"
          var queryURL = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`;

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){ 

            console.log(response);
            var source = response.sourceUrl;
            console.log(source);

            var sourceLink =$(`<a href="${source}">View Recipe</a>`)
            btn.append(sourceLink);
            recipeIngredients = response.extendedIngredients;
            
                recipeIngredients.forEach(ingredient => {
                    // debugger;
                    var ingredientTxt = $(`<div>${ingredient.name}</div>`);
                    cardText.append(ingredientTxt);
                });
            

          });

        }

        

          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response){ 
            recipeResults = response.results;
            console.log(recipeResults);
            for (var i = 0; i < 10; i++){
                 buildRecipeCard(recipeResults[i]);
            }

          });

          
          // Toggle like button on click

        $("body").delegate(".like", "click", function(){
        

              $(this).toggleClass("fa");

          });