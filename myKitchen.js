// user need to click add item  button to save items 
// user selection will need to be save to local storage 
        // push data to an array for future use 
            // Once data is saved the local storage then the user will see indegrients on the client 
            var dairy = [["egg whites", "1124"],
            [""]
];
var dairyAlt = [ ["almond milk", "93607"],
               ["coconut milk", "12118"],
               ["dairy free milk", "10016223"],
               ["rice milk", "93761"],
               ["soy milk", "16223"],
               ["egg substitute", "1226"]
];
dairyItems = $("#dairyItems")
dairyAlt.forEach(item => {
   var li = $(`<li>${item[0]}</li>`)
   li.attr(`data-id`,item[1])
   var button = (`<button type = button class = "btn btn-secondary">Add Item</button>`);
   li.append(button);
   dairyItems.append(li);
});             

// create variables to stored dairy data ids
var addItem = document.querySelector(".btn");
   var savedDairyItems = [];
   console.log(savedDairyItems)

   var dairy = dairyAlt;

   savedDairyItems.push(dairyAlt);
   localStorage.setItem("dairyAlt",JSON.stringify(dairyAlt));
   var storedDairy = JSON.parse(localStorage.getItem("dairyAlt"));
   console.log(storedDairy)
  

// need a fuction for when user add an item we need to save it to the local storage 
   addItem.addEventListener("click", function(event){
      console.log(addItem)
      event.preventDefault();
     
     
      savedDairyItems.push(dairyAlt);
      localStorage.setItem("dairyAlt",JSON.stringify(dairyAlt));
      var storedDairy = JSON.parse(localStorage.getItem("dairyAlt"));
      console.log(storedDairy)
 
})


