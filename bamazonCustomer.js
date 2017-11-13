var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "Calamigos2015",
  database: "bamazon"
});

var totalCost = "";

connection.connect(function(err) {
  if (err) throw err;
  listProducts();
});

function listProducts () {
  var query = "SELECT * FROM products;"
    connection.query(query, function(err, res) {
  for (var i = 0; i < res.length; i++) {
    console.log(
          "Id: " + res[i].id + " " +
          "Product: " + res[i].product_name +" " +
          "Department: " + res[i].department_name + " " +
          "Price: $" + res[i].price + ".00 " +" " +
          "Stock Quantity: " + res[i].stock_quantity
    );
    }
    purchasePrompts();
    });
}

function purchasePrompts() {
    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "What is the product ID that you want to purchase?",
            validate: function(value) {
              if (isNaN(value) === false) {
                  return true;
                }
                return ("input must be a number. Try again.");
              }
        },

        {
            name: "quantity",
            type: "input",
            message: "How many do you want to buy?",
            validate: function(value) {
              if (isNaN(value) === false) {
                  return true;
                }
                return ("input must be a number. Try again.");
              }
        },

        {
            name: "purchase",
            type: "rawlist",
            message: "Confirm purchase?",
            choices: ["YES", "NO"]
        }

    ])
    .then(function(user) {
  
        if (user.purchase === "NO"){
          return(purchasePrompts()); 
        } else {
        var quantityCheck = connection.query("SELECT stock_quantity, product_name, price FROM products WHERE id=" + user.id +";", function(err, res) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].stock_quantity < user.quantity){
                  console.log("\nINSUFFICIENT QUANTITY IN STOCK" + "\nPlease select another item.");
                  purchasePrompts();
                } else {
    
                  var updateStock = res[i].stock_quantity - user.quantity;
                  totalCost = user.quantity * res[i].price;
                  var queryStock = connection.query("UPDATE products SET stock_quantity=" + updateStock + " WHERE id=" + user.id,
                    function(err, res) {
                    }
                  );
                  console.log( 
                  "\nYou purchased: " + user.quantity + " of " + "Product Id #" + user.id + "||" + res[i].product_name + 
                  "\nTotal cost: $" + totalCost +
                  "\nThank you for your purchase."
                  );
                
                  console.log(
                  "\nConfirm purchase: " + user.purchase +
                  "\nItem: " + res[i].product_name + 
                  "\nOriginal stock quantity: " + res[i].stock_quantity +
                  "\nRemaining stock quantity: " + updateStock
                  );

                  connection.end();

                }
            }
          })
        }
    })
 }
