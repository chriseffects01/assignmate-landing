import './config/database.js';
import dotenv from 'dotenv';
import app from './App.js';
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
