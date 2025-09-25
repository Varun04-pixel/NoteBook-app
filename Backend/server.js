import express from 'express';
import connectDB from './DataBase/db.js';
import userRouter from './Routes/userRoutes.js';
import notesRouter from './Routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/auth', userRouter);
app.use('/notes', notesRouter);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Database connection
connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});