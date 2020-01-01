const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Connect to database
connectDB();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route files
const bootcamps = require('./routes/bootcamps');

const app = express();

// dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app.use(logger);

// Mout routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
