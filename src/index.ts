import cors from 'cors';
import express from 'express';
import mainRouter from './routes/index';

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());

// Use the main router for all routes
app.use('/', mainRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
