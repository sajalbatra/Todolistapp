// Import necessary modules and configure environment variables
//import express from 'express';
import database from "./src/db/db.js"
import {app} from "./app.js";
const port = process.env.PORT || 3000;

async function startServer() {
    try {
        await database(); // Await database connection
        app.listen(port, () => {
            console.log(`To do app listening on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
}

// Call the function to start the server
startServer();
