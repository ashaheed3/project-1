var dairyAlt = [
    {name: "almond milk", id: "93607"},
    {name: "coconut milk", id: "12118"}, 
    {name: "dairy free milk", id: "10016223"},
    {name: "soy milk", id: "16223"},
    {name: "egg substitute", id: "1226"},
 ];
 dairyItems = $("#dairyItems")
 dairyAlt.forEach(item => {
    dairyItems.append(`
    <li data-id="${item.id}">${item.name}<button type="button" data-type="dairy" data-id="${item.id}"  class="btn btn-secondary">Add Item</button></li> 
    `)
 })  
 
 var produceAlt = [
    {name: "asparagus spears", id: "11011"},
    {name: "avocado", id: "9037"}, 
    {name: "broccoli", id: "11090"},
    {name: "brussel sprouts", id: "11098"},
    {name: "carrots", id: "11124"},
 ];
 produceItems = $("#produceItems")
 produceAlt.forEach(item => {
    produceItems.append(`
    <li data-id="${item.id}">${item.name}<button type="button" data-type="produce" data-id="${item.id}"  class="btn btn-secondary">Add Item</button></li> 
    `)
 })
 
 
 var meatAlt = [
    {name: "beef chuck roast", id: "13786"},
    {name: "beef brisket", id: "13023"}, 
    {name: "boneless skinless chicken breast", id: "1055062"},
    {name: "lean pork tenderloins", id: "10060"},
    {name: "pork chops", id: "10010062"},
 ];
 meatItems = $("#meatItems")
 meatAlt.forEach(item => {
    meatItems.append(`
    <li data-id="${item.id}">${item.name}<button type="button" data-type="meat" data-id="${item.id}"  class="btn btn-secondary">Add Item</button></li> 
    `)
 })
 
 
 var seafoodAlt = [
    {name: "cat fish filets", id: "15010"},
    {name: "clams", id: "15157"}, 
    {name: "crabmeat", id: "10015136"},
    {name: "salmon fillet", id: "15076"},
    {name: "sea scallops", id: "10015172"},
 ];
 seafoodItems = $("#seafoodItems")
 seafoodAlt.forEach(item => {
    seafoodItems.append(`
    <li data-id="${item.id}">${item.name}<button type="button" data-type="seafood" data-id="${item.id}"  class="btn btn-secondary">Add Item</button></li> 
    `)
 })
 
 var pantryAlt = [
    {name: "fettuccine", id: "100204092"},
    {name: "spaghetti", id: "11420420"}, 
    {name: "rotini pasta", id: "11320420"},
    {name: "short grain rice", id: "10120052"},
    {name: "extra virgin olive oil", id: "1034053"},
 ];
 pantryItems = $("#pantryItems")
 pantryAlt.forEach(item => {
    pantryItems.append(`
    <li data-id="${item.id}">${item.name}<button type="button" data-type="pantry" data-id="${item.id}"  class="btn btn-secondary">Add Item</button></li> 
    `)
 })
 
 // create variables to stored ingredients' data and ids in local storage 
 var savedItems = [];
    console.log(savedItems)
 
   
    function getUserIngredients (type) {
    
       var userItems = localStorage.getItem(type);
       return userItems === null ? [] : JSON.parse(userItems);	
    }
 
 
    function renderUserIngredients (view, items) {
       $(view).text(items.map(item => item.name + ' '))
       
    }
 
 
    function updateUserIngredients(selectedItem, sourceIngredients,userIngredients,storageItem) {
       var saveItem = sourceIngredients.find(item => item.id == selectedItem.data("id"));
       userIngredients.push(saveItem);
       localStorage.setItem(storageItem,JSON.stringify(userIngredients));
    }
 
 var addItem = $(".btn");
    
     $(addItem).on("click", function(event){
         console.log($(event.target))
         var selectedItem = $(event.target);
         console.log(selectedItem.data("id"))
        event.preventDefault();
        switch (selectedItem.data("type")) {
          case 'dairy':
             updateUserIngredients(selectedItem, dairyAlt, getUserIngredients("dairyAlt"), "dairyAlt")
             renderUserIngredients("#dairy-ingredients", getUserIngredients("dairyAlt"))
            break;
          case 'produce':
             updateUserIngredients(selectedItem, produceAlt, getUserIngredients("produceAlt"), "produceAlt")
             renderUserIngredients("#produce-ingredients", getUserIngredients("produceAlt"))
            break;
          case 'meat':
             updateUserIngredients(selectedItem, meatAlt, getUserIngredients("meatAlt"), "meatAlt")
             renderUserIngredients("#meat-ingredients", getUserIngredients("meatAlt"))
             break;
          case 'seafood':
                updateUserIngredients(selectedItem, seafoodAlt, getUserIngredients("seafoodAlt"), "seafoodAlt")
                renderUserIngredients("#seafood-ingredients", getUserIngredients("seafoodAlt"))
                break;
          case 'pantry':
                   updateUserIngredients(selectedItem, pantryAlt, getUserIngredients("pantryAlt"), "pantryAlt")
                   renderUserIngredients("#pantry-ingredients", getUserIngredients("pantryAlt"))
                   break;
          
          default:
        }
     });
 
          //    saveDairyItem = dairyAlt.find(item => item.id == selectedItem.data("id"));
          //           savedItems.push(saveDairyItem);
          //          localStorage.setItem("dairyAlt",JSON.stringify(savedItems)); 