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

const allowedOrigins = ['https://bantu-listen.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

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