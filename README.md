# ShoppingListAPI
Truxio Coding Project
 
 # About
 
This is a shopping list application created in Angular version 15.1.1 with node 18.13.0. It uses a .NET Core 6 backend with SQL server datastore with Entity framework using a code first migration to set up the database. It uses a repository design pattern for CRUD operations. Current operations implemented are a get, add and remove. There is a second project within the solution called ShoppingListAPI.Test for running unit tests with xUnit. The xUnit test project uses an in-memory database to test these repository functions.

The front end contains a container component which contains just a singular component for the shopping list itself and handles all the input for add and removal of shopping items. Angular material was used for element styling. The application makes an initial call to the API to get a current list of shopping items. There are two functions: add item and remove item. The add item makes a service call back to the controller then returns an updated list. The remove item does the same as well. There is very basic validation on the add item input: you cannot add a duplicate item to the list. A small will appear under the mat-input to notify the user that a duplicate item was attempted to be added.

# Database Setup

I used  SQL Server and SSMS locally working on this project as the datastore and interface. Please install SQL Server and SSMS.
Once you've installed SSMS, connect to your local instance database and create a database called Truxio.

> CREATE DATABASE Truxio

Currently the appsettings.json is set to work with my local instance of sql server. To make this compatible with yours please update the server, user id, and password to match that of yours so that you can connect to your local SQL Server instance. You will have to create a SQL Authentication log in within SSMS (or any configuration manager) and give it the proper permissions for the database Truxio. Please refer to this documentation for more information on how to add permissions to users [here](https://www.ibm.com/docs/en/sgfmw/5.3.1?topic=setup-adding-users-setting-permissions-sql-database). This is the default connection set for running it on my machine. Make appropriate changes to connect to your local instance.

> server=DESKTOP-SMVF0TQ;database=Truxio;User Id=testuser;password=tester;TrustServerCertificate=True;

The solution uses a code first migration. It already contains an initial migration set up script created by using dotnet-ef tools. Run the following line in visual studio package manager console to run the migration set up to create the table.

>  dotnet ef database update

# Running the application

The ShoppingListAPI applicationUrl is set in the launchsettings file and runs at the follow url. The angular application also has a reference to this within the environment.ts file for referencing within the angular service class.

> http://localhost:5157

Build the solution and run the API. A swagger doc will launch as well showing the endpoint definitions.

Open up the angular application within VSCode. If node_modules has not been updated; run

> npm install

After dependencies have been updated, you can run the application with

> ng serve

It should be default hosted at

> http://localhost:4200
