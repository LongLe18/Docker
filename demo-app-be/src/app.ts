require('dotenv').config();
import express from 'express';
require('express-async-errors');
import cors from 'cors';
import cookieSession from 'cookie-session';
import { errorHandler } from './common/middlewares/error-handler';
import { NotFoundError } from './common/errors/not-found-error';
const path = require('path');
import {
  createBookRouter,
  deleteBookRouter,
  updateBookRouter,
  listBookRouter,
  getBookRouter,
} from './routes/book';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(cors());
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

app.use(createBookRouter);
app.use(deleteBookRouter);
app.use(updateBookRouter);
app.use(listBookRouter);
app.use(getBookRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
