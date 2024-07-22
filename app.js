const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const notificationLogRoutes = require('./routes/notificationLogRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'client/dist/client')));

const corsOptions = {
    origin: 'https://bantu-listen.vercel.app', // Allow requests from localhost:4200
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));

// Add headers before the routes are defined
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://bantu-listen.vercel.app');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/api', userRoutes);
app.use('/api', notificationLogRoutes); 

// // All other routes should serve the Angular app
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/dist/client/index.html'));
// });

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;