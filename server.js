// Mongoose modely
require('./models/User');

// Premenne prostredia pocas dostupne developmentu
require('dotenv').config();

// Importovanie potrebnych packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

// Prihlasovacie udaje do MongoDB databazy
const mongodbUser = process.env.MONGODB_USER;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbDatabase = process.env.MONGODB_DATABASE;

// Definovanie pripojenia k MongoDB databaze
const mongoUri = `mongodb+srv://${mongodbUser}:${mongodbPassword}@cluster0-qwrjd.mongodb.net/${mongodbDatabase}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Vytvorenie spojenia
mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB instance.');
});

mongoose.connection.on('error', (error) => {
  console.error('Connection to mongoDB instance failed: ' + error);
});

// Vytvorenie Express aplikacie
const app = express();
// Nastavenie portu, na ktorom bude server pocuvat
const port = process.env.PORT || 5000;

// Routes
const authRoutes = require('./routes/authRoutes');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use('/auth', authRoutes);

// V pripade ze sa jedna o production, tak sa nastavuju jednotlive sluzby, kvoli optimalizacii a bezpecnosti servera
if (process.env.NODE_ENV === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Presmerovanie vsetkych requestov na index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Pocuvanie servera na porte: `port`
app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ', port);
});
