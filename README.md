# Expense Tracker
A web application for recording your daily expenses.

![14 06 2022_11 07 18_REC](https://user-images.githubusercontent.com/87403901/173485283-14a59d36-4a37-40b7-bdca-4b64d8630864.gif)

***
# Start to use Expense Tracker
*   Make sure that you have already installed [Node.js](https://nodejs.org/en/)

1.   Clone this project to your local place from github.

          git clone https://github.com/jameshoo123/Expense_Tracker.git
    
2.   Move into the project directory on your local place.

          cd Expense_Tracker
          
3.   Install NPM packages are nescessary for this service.

          npm install
    
4.   Create .env and add environment variables. (* Notice: The environment variables that need to be used are listed in .env.example !)

          touch .env
          
5.   Create seed data. (* Notice: Don't forget to apply [MongoDB Atlas](https://www.mongodb.com/) account and setting .env for directly using online noSQL database)

          npm run seed
          
6.   Now you can start the service on your local device.

          npm run start
          
          or
          
          node app.js
          
9.   Start exploring >>> [Expense Tracker](http://localhost:3000/) <<< on your browser.

# Continue to develop Expense Tracker
*   Make sure that you have already installed [Node.js](https://nodejs.org/en/)
1.   Don't forget to install [nodemon](https://www.npmjs.com/package/nodemon) to make your development process smoother.
        
          npm install -g nodemon
    
2.   Now you can start the service on your local device.

          npm run dev
          
          or
          
          nodemon app.js
          
3.   Start exploring >>> [Expense Tracker](http://localhost:3000/) <<< on your browser.

***
# Seed user accounts
> Account: user1  
> Email: user1@example.com  
> Password: 12345678  

> Account: user2  
> Email: user2@example.com  
> Password: 12345678  

***
# Features
1. Register your own account or using your facebook/google account directly to start create your expense list
2. All expenses will be summaried on the main page, you can edit or delete them.
3. Search the expenses by categories or months.
          
***
# Web interface
## Register page
![image](https://user-images.githubusercontent.com/87403901/173330784-69130dee-2603-47dc-b5e0-6ce9458ef322.png)

## Login page
![image](https://user-images.githubusercontent.com/87403901/173330961-6e982a15-70d1-4872-b931-b91b584b3077.png)

## Main page
![image](https://user-images.githubusercontent.com/87403901/173331247-8a2e7825-2654-4594-8fb4-df07d4d947e3.png)

## Add expense
![image](https://user-images.githubusercontent.com/87403901/173331863-9eb979b6-b5de-4eca-8e8f-c51efdf4a767.png)

## Edit expense
![image](https://user-images.githubusercontent.com/87403901/173331800-078ff25e-81ed-4699-8a32-a3c0c70464df.png)

## Delete reminder
![image](https://user-images.githubusercontent.com/87403901/173331413-3d17924a-9ca0-488e-8585-32b3614b1f36.png)

    
***
# Development tools
* Node.js 14.16.0
* Bootstrap 5.1.3
* popperjs 2.10.2
* Font-awesome 6.1.1

***
# Contributor
[jameshoo123](https://github.com/Azure/azure-content/blob/master/contributor-guide/contributor-guide-index.md)

