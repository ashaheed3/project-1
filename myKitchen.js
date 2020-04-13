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
    var button = (`<button class = "btn btn-secondary">Add Item</button>`);
    li.append(button);
    dairyItems.append(li);
    
});