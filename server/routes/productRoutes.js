import express from 'express';
import { createProduct } from '../controller/createProduct.js';
import { fetchAndInsertProducts } from '../controller/createProducts.js';
import { listTransactions } from '../controller/listTransactions.js';

const router = express.Router();

router.post('/product/create', createProduct);
router.get('/product/insert',fetchAndInsertProducts);
router.get('/transactions', listTransactions);

export default router;
