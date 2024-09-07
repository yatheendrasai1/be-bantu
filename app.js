const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const notificationLogRoutes = require('./routes/notificationLogRoutes');
const authRoutes = require('./routes/auth');
const workLogRoutes = require('./routes/workLogRoutes.js');
const authMiddleware = require('./middlewares/auth');
const internalAuthMiddleware = require('./middlewares/internal');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors');
const logger = require('./logger');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const allowedOrigins = ['https://bantu-listen.vercel.app','http://localhost:3001', 'http://localhost:4200'];

const corsOptions = {
  origin: (origin, callback) => {
    logger.info(`%% ~ origin: ${origin}`)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, true);
      // callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

app.use('/api/v1', authMiddleware, notificationLogRoutes);
app.use('/api/internal', internalAuthMiddleware, notificationLogRoutes);
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/public", internalAuthMiddleware, workLogRoutes)
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send({ message: 'This is a protected route' });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;