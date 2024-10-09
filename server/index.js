import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { config } from 'dotenv';
config();
import productRoutes from './routes/productRoutes.js';


const app = express();
app.use(express.json()); 
connectDB();

app.use(cors({
  origin: '*'
}));

app.use('/api/v1', productRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('initialize server');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});