require('dotenv').config();
const express = require('express');

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Add the JSON body parser middleware
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



