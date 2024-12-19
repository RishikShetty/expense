const express = require('express');
const cron = require('node-cron');
const expensesRoutes = require('./routes/expenses');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/expenses', expensesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

cron.schedule('0 0 * * 0', () => {
  console.log('Generating weekly summary...');

  const { generateSummary } = require('./services/summaryService');
  generateSummary('weekly');
});

cron.schedule('0 0 1 * *', () => {
  console.log('Generating monthly summary...');
  const { generateSummary } = require('./services/summaryService');
  generateSummary('monthly');
});
