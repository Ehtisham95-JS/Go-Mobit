require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const path = require('path');


app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, './public')));

// Connect DB
const connectDB = require('./db/connect');

// Routes
const userRoute = require('./routes/register');

// Error HandlerMiddleWare 
const notFound = require('./middleware/notFound');
const errorHandlerMiddleWare = require('./middleware/errorHandlerMiddleWare');




// Middleware
app.use(express.json());

app.use('/api/v1', userRoute);


app.use(notFound);
app.use(errorHandlerMiddleWare);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
       await connectDB(process.env.MONGO_URI);
        app.listen(PORT, ()=> console.log(`Server Listening On ${PORT}`));
    } catch (error) {
        console.log((error));
    }
}


start();