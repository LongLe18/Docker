import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error(err);
  }

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  });
};

start();
