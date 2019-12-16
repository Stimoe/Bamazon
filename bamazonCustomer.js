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
    start()
});

function start(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "Exit"
        ]
    })
    .then(function (answer) {
        switch (answer.action) {
            case "View Products for Sale":
                displayProducts();
                break;

            case "Exit":
                connection.end();
                break;
        }
    });
}
function displayProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT id,product_name,price,stock_quantity  FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        buyItem();
    });
}

function buyItem() {
    inquirer.prompt([{
            type: "text",
            name: "id",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            type: "number",
            name: "quantity",
            message: "How many units would you like to buy?"
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", {
            id: answer.id
        }, function (err, res) {
            if (err) throw err;
            if (res[0].stock_quantity >= parseInt(answer.quantity)) {
                console.log("there are enough");
                console.log("Updating  " + res[0].product_name + "  quantities...\n");
                answerQuantity = parseInt(answer.quantity)
                stockQuantity = res[0].stock_quantity
                answerId = answer.id
                answerCost = (answer.quantity * res[0].price)
                console.log("total cost of purchase", answerCost);
                updateProduct(answerQuantity, stockQuantity, answerId)
            } else {
                console.log("Insufficient quantity!");
                start();
            }
        });
    });
}
function updateProduct(answer, stock, answerId) {
    newStock = (stock - answer)
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
                stock_quantity: newStock
            },
            {
                id: answerId
            }
        ],
        function (err, stock) {
            if (err) throw err;
            console.log("Products updated!\n");
            // Call deleteProduct AFTER the UPDATE completes
            start();
        }
    );
}

