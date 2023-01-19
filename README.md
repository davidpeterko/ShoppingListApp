# ShoppingListAPI
 Truxio Coding Project

# Database Setup

I used  SQL Server and SSMS locally working on this project as the datastore and interface. Please install SQL Server and SSMS.
Once you've installed SSMS, connect to your local instance database and create a database called Truxio.

> CREATE DATABASE Truxio

Currently the appsettings.json is set to work with my local instance of sql server. To make this compatible with yours please update the server, user id, and password to match that of yours so that you can connect to your local SQL Server instance. You will have to create a SQL Authentication log in within SSMS (or any configuration manager) and give it the proper permissions for the database Truxio. Please refer to this documentation for more information on how to add permissions to users [here](https://www.ibm.com/docs/en/sgfmw/5.3.1?topic=setup-adding-users-setting-permissions-sql-database).

> server=DESKTOP-SMVF0TQ;database=Truxio;User Id=testuser;password=tester;TrustServerCertificate=True;

The solution already contains an initial migration set up script created by using dotnet-ef tools. Run the following line in visual studio package manager console to run the migration set up to create the table.

>  dotnet ef database update
