var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "bAmazon_DB"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    //   afterConnection();
    menuOptions()
});
function menuOptions() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    showProducts();
                    break;

                case "View Low Inventory":
                    showLowInventory();
                    break;

                case "Add to Inventory":
                    addInventory();
                    break;

                case "Add New Product":
                    addNewProduct();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}
function showProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT id,product_name,price,stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        menuOptions();
    });
}
function showLowInventory() {
    var query = "SELECT stock_quantity,product_name FROM products GROUP BY stock_quantity < 5";
    connection.query(query, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("The product that has low inventory is ", res[i].product_name+ " The level of inventory is " + res[i].stock_quantity);
        }
        menuOptions()
    });
}
function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "What product would you like to add inventory too?"
                },
                {
                    name: "newUnits",
                    type: "input",
                    message: "How many would you like to add?"
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }
          
                stockQuantity = parseInt(chosenItem.stock_quantity);
                stockToAdd = parseInt(answer.newUnits);
                newStock = (stockQuantity + stockToAdd);
                console.log("Current stock is  ", stockQuantity);
                console.log("Stock to add is  ", stockToAdd);
                console.log("New stock levels are  ", newStock);
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{
                            stock_quantity: newStock
                        },
                        {
                            id: chosenItem.id
                        }
                    ],
                    function (err, answe) {
                        if (err) throw err;
                        console.log(answer.product_name + " products updated!\n");
                        // Call deleteProduct AFTER the UPDATE completes
                        menuOptions()
                    }
                );

            })
    })
}
function addNewProduct() {
    //This handles the prompt for adding new products
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the name of the item?"
        },
        {
            type: "input",
            name: "department",
            message: "What department is the item in?"
        },
        {
            type: "number",
            name: "cost",
            message: "What is the cost of each item?"
        },
        {
            type: "number",
            name: "units",
            message: "How many do you want in inventory?"
        }
    ]).then(function (answer) {
        console.log("Inserting a new product...\n");
        var query = connection.query(
            "INSERT INTO products SET ?", {
                product_name: answer.name,
                department_name: answer.department,
                price: answer.cost,
                stock_quantity: answer.units
            },
            function (err) {
                if (err) throw err;
                console.log("Product created!\n");
                // Call updateProduct AFTER the INSERT completes
                menuOptions();
            }
        );
       
    })
}