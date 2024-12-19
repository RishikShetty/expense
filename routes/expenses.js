const express = require('express');
const { addExpense, getExpenses, analyzeSpending } = require('../services/expenseService');

const router = express.Router();


router.post('/', (req, res) => {
  try {
    const expense = addExpense(req.body);
    res.json({ status: 'success', data: expense, error: null });
  } catch (error) {
    res.status(400).json({ status: 'error', data: null, error: error.message });
  }
});


router.get('/', (req, res) => {
  try {
    const { category, start_date, end_date } = req.query;
    const expenses = getExpenses(category, start_date, end_date);
    res.json({ status: 'success', data: expenses, error: null });
  } catch (error) {
    res.status(400).json({ status: 'error', data: null, error: error.message });
  }
});


router.get('/analysis', (req, res) => {
  try {
    const analysis = analyzeSpending();
    res.json({ status: 'success', data: analysis, error: null });
  } catch (error) {
    res.status(400).json({ status: 'error', data: null, error: error.message });
  }
});

module.exports = router;
