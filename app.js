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

app.use('/api', userRoutes);
app.use('/api', notificationLogRoutes); 

// All other routes should serve the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/client/index.html'));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;