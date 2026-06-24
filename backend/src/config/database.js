import 'dotenv/config';
import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDb connected');
  })
  .catch(err => console.log(err));
