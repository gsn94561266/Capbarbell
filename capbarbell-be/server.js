const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./utils/db');

const cors = require('cors');
app.use(
  cors({
    origin: [process.env.ALLOWED_ORIGIN],
    credentials: true,
  })
);

app.use(express.json());

const customerRouter = require('./routers/customerRouter');
app.use('/customer', customerRouter);

const orderRouter = require('./routers/orderRouter');
app.use('/order', orderRouter);

app.use((req, res, next) => {
  console.log('這裡是 404');
  res.status(404).send('沒有這個網頁');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
