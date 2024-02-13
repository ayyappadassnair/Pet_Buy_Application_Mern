import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import petRouter from './routes/petRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.use('/', userRoute);
app.use('/', petRouter);

app.use(express.static('uploads'));

mongoose.connect(process.env.MONGODB).then(async () => {
  console.log('The Database is connected successfully...!');

  try {
    console.log('All users updated successfully.');
  } catch (err) {
    console.error('Error updating users:', err);
  }
}).catch((err) => {
  console.log('Error connecting to the database:', err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
