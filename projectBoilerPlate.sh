#!/bin/bash

# Create directories
mkdir -p bantu/config
mkdir -p bantu/controllers
mkdir -p bantu/models
mkdir -p bantu/routes
mkdir -p bantu/middlewares
mkdir -p bantu/utils
# Create files with sample content

# config/db.js
cat <<EOL > bantu/config/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
EOL

# models/userModel.js
cat <<EOL > bantu/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
EOL

# controllers/userController.js
cat <<EOL > bantu/controllers/userController.js
const User = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers };
EOL

# routes/userRoutes.js
cat <<EOL > bantu/routes/userRoutes.js
const express = require('express');
const { getUsers } = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);

module.exports = router;
EOL

# middlewares/authMiddleware.js
cat <<EOL > bantu/middlewares/authMiddleware.js
const authMiddleware = (req, res, next) => {
    // Placeholder for authentication logic
    next();
};

module.exports = authMiddleware;
EOL

# utils/logger.js
cat <<EOL > bantu/utils/logger.js
const logger = (message) => {
    console.log(\`[\${new Date().toISOString()}] \${message}\`);
};

module.exports = logger;
EOL

# .env
cat <<EOL > bantu/.env
MONGO_URI=mongodb://localhost:27017/bantudb
PORT=3000
EOL

# .gitignore
cat <<EOL > bantu/.gitignore
node_modules/
.env
EOL

# app.js
cat <<EOL > bantu/app.js
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});
EOL

# package.json
cat <<EOL > bantu/package.json
{
  "name": "bantu",
  "version": "1.0.0",
  "description": "A Node.js project with MongoDB connection",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.18.2",
    "mongoose": "^6.5.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  },
  "author": "Your Name",
  "license": "ISC"
}
EOL

# README.md
cat <<EOL > bantu/README.md
# My Node.js App

A Node.js project with MongoDB connection.
EOL

echo "Node.js project structure created successfully."

echo "Adding Angular to the project inside the client folder at root level of node project"

mkdir client

# Create an Angular project inside the Node.js project
ng new client --skip-install

# Navigate to the Angular project directory
cd client

# Install Angular dependencies
npm install

Build the Angular application for production
ng build --configuration production

# Navigate back to the Node.js project directory
cd ..

# Create a .gitignore entry for Angular node_modules and dist
echo "client/node_modules/" >> .gitignore
echo "client/dist/" >> .gitignore

# Update app.js to serve Angular static files
cat <<EOL > app.js
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'client/dist/client')));

app.use('/api', userRoutes);

// All other routes should serve the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/client/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(\`Server is running on port \${PORT}\`);
});
EOL

echo "Angular project added and configured successfully within the Node.js project."

