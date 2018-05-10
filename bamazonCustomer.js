var inquirer  = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(connection.threadId);
    displayProducts();
});

var displayProducts = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i=0; i<res.length; i++) {
            console.log(res[i].item_id+" || "+res[i].product_name+" || "+
            res[i].department_name+" || "+res[i].price+" || "+res[i].stock_quantity+"\n");
        }
    customerOrder(res);
    })
}

var customerOrder = function(res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like from Bamazon?"
    }]) .then(function(answer) {
        var correct = false;
        for (var i=0; i<res.length; i++) {
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product=answer.choice;
                var id=i;
                inquirer.prompt({
                    type: "input",
                    name: "quant",
                    message: "How many do you want?",
                    validate: function(value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }) .then(function(answer) {
                    if ((res[id].stock_quantity-answer.quant)>0) {
                        connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.quant)+"' WHERE product_name='"+product+"'", function(err,res2){
                            console.log("You purchased an item!");
                            displayProducts();

                            // need to display purchased items and total cost
                            var saleTotal = res[0].price * product[0].quantity;
                            console.log(saleTotal);
                        })
                    } else {
                        console.log("Insufficient quantity!");
                        customerOrder(res);
                    }
                })
            }
        }
        if (i == res.length && correct==false) {
            console.log("Insufficient quantity!");
            customerOrder();
        }
    })
}

