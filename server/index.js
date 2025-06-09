// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import connectDB from './models/db.js';
import router from './routes/Routes.js';
import initSocketServer from './controller/socketserver.js';

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initSocketServer(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
