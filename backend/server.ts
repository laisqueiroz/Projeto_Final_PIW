import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './Routes/UserRoutes';
import cors from 'cors';

const app: Application = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});