import 'dotenv/config';    // ✅ Loads env vars before anything else

import express from 'express';
import cors from 'cors';
import connectDB from './models/db.js';
import router from './routes/Routes.js';

// Now process.env.* is ready
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
