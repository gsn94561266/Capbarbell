const express = require('express');
const router = express();
const pool = require('../utils/db');

router.get('/', async (req, res, next) => {
  try {
    let [data] = await pool.execute('SELECT * FROM customer WHERE Status = 1');
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

router.post('/add', async (req, res) => {
  try {
    // 檢查客戶是否存在
    let [customer] = await pool.execute('SELECT * FROM customer WHERE ID = ?', [
      req.body.ID,
    ]);
    if (customer.length > 0) {
      return res
        .status(401)
        .json({ success: false, message: 'Customer already exists.' });
    }
    await pool.execute(
      'INSERT INTO customer (ID, Name, Country, City, State, Address, Zip, Status) VALUES (?,?,?,?,?,?,?,?)',
      [
        req.body.ID,
        req.body.Name,
        req.body.Country,
        req.body.City,
        req.body.State,
        req.body.Address,
        req.body.Zip,
        1,
      ]
    );
    res
      .status(200)
      .json({ success: true, message: 'Customer created successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

router.put('/edit', async (req, res) => {
  try {
    await pool.execute(
      'UPDATE customer SET Name = ?, Country = ?, City = ?, State = ?, Address = ?, Zip = ? WHERE ID = ?',
      [
        req.body.Name,
        req.body.Country,
        req.body.City,
        req.body.State,
        req.body.Address,
        req.body.Zip,
        req.body.ID,
      ]
    );
    res
      .status(200)
      .json({ success: true, message: 'Customer updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

router.put('/delete', async (req, res) => {
  try {
    await pool.execute('UPDATE customer SET Status = ? WHERE ID = ?', [
      0,
      req.body.ID,
    ]);
    res
      .status(200)
      .json({ success: true, message: 'Customer deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

module.exports = router;
