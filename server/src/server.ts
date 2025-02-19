const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
//import cors from 'cors';
import path from 'path';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
//app.use(cors());

// Serves static files from the client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

// Serve the index.html file for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
