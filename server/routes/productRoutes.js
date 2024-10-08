import express from 'express';
import { createProduct } from '../controller/createProduct.js';
import { fetchAndInsertProducts } from '../controller/createProducts.js';
import { listTransactions } from '../controller/listTransactions.js';
import { getStatistics } from '../controller/statistics.js';
import { getPriceRangeBarChart } from '../controller/barChartStatistics.js';
import { getCategoryPieChart } from '../controller/pieChart.js';
import { combineData } from '../controller/combineData.js';

const router = express.Router();

router.post('/product/create', createProduct);
router.get('/product/insert',fetchAndInsertProducts);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barChart', getPriceRangeBarChart);
router.get('/pieChart', getCategoryPieChart);
router.get('/combineStatistics', combineData);

export default router;
