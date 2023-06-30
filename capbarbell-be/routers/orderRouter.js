const express = require('express');
const router = express();
const { format } = require('date-fns');
const pool = require('../utils/db');

router.get('/', async (req, res, next) => {
  try {
    let [data] = await pool.execute(
      'SELECT * FROM `order` WHERE Status IN (1, 2, 3)'
    );
    // 轉換日期格式
    data = data.map((item) => {
      const formattedDate = format(new Date(item.Order_Date), 'MM-dd-yyyy');
      return {
        ...item,
        Order_Date: formattedDate,
      };
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

router.post('/add', async (req, res) => {
  try {
    // 確認客戶是否存在
    let [customer] = await pool.execute('SELECT * FROM customer WHERE ID = ?', [
      req.body.Customer_ID,
    ]);
    if (customer.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: 'Customer not found' });
    }
    // 現在日期
    const currentDate = new Date();
    await pool.execute(
      'INSERT INTO `order` (Customer_ID, TotalAmount, Status, Order_Date, Sales_Name) VALUES (?,?,?,?,?)',
      [
        req.body.Customer_ID,
        req.body.TotalAmount,
        req.body.Status,
        currentDate,
        req.body.Sales_Name,
      ]
    );
    res
      .status(200)
      .json({ success: true, message: 'Order created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

router.put('/edit', async (req, res) => {
  try {
    // 確認客戶是否存在
    let [customer] = await pool.execute('SELECT * FROM customer WHERE ID = ?', [
      req.body.Customer_ID,
    ]);
    if (customer.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: 'Customer not found' });
    }
    // 轉換日期格式
    const formattedDate = format(new Date(req.body.Order_Date), 'yyyy-MM-dd');
    await pool.execute(
      'UPDATE `order` SET Customer_ID = ?, TotalAmount = ?, Status = ?, Order_Date = ?, Sales_Name = ? WHERE ID = ?',
      [
        req.body.Customer_ID,
        req.body.TotalAmount,
        req.body.Status,
        formattedDate,
        req.body.Sales_Name,
        req.body.ID,
      ]
    );
    res
      .status(200)
      .json({ success: true, message: 'Order updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

router.post('/delete', async (req, res) => {
  try {
    await pool.execute('DELETE FROM `order` WHERE ID=?', [req.body.ID]);
    res
      .status(200)
      .json({ success: true, message: 'Order deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

module.exports = router;
