import express, { Application } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './Routes/UserRoutes';
import petRoutes from './Routes/PetRoutes';
import serviceRoutes from './Routes/ServiceRoutes';
import medicalRoutes from './Routes/MedicalRecordRoutes';
import cors from 'cors';

const app: Application = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/', userRoutes);
app.use('/', petRoutes);
app.use('/', serviceRoutes);
app.use('/', medicalRoutes);


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} http://localhost:3000/`);
});