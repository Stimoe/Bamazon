Bamazon

This application show the begining of how mysql works.  In combination with the requirer npm module. This app creates a table of products that the user can intereact with, get cost and quantities and interact through prompts to see different results.

To run the app, start with cloning the code from Github.

Then right click on the bamazonCustomer.js file, and click on open in terminal. From here we need to install the NPM files, type "npm install" this will install all the node modules we need.

The next steps are to get the .sql file running in terminal.
1st type "mysql -u root -p".  It will then prompt you to enter your password.  What you type will not show up.
2nd step is to type "source ./bamazon.sql"
3rd step is to type "exit"




There are 2 different javascript files.  The bamazonCustomer.js file can be run through the terminal to be used by a customer to interact with the products.
The bamazonManager.js file can be run through the terminal by the manager to interact with inventory levels.