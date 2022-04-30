import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/students.js';
import professorRoutes from './routes/professors.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/professors', professorRoutes)

app.listen(3000, () =>
  console.log('Listening on port 3000!'),
);