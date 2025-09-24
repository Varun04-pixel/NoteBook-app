import express from 'express';
import connectDB from './DataBase/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Database connection
connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});