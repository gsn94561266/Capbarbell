import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// 元件
import Navbar from './components/Navbar';
// 頁面
import Customer from './pages/Customer';
import Order from './pages/Order';

const App = () => {
  const [orderData, setOrderData] = useState([]); // 訂單資料
  const [customerData, setCustomerData] = useState([]); // 客戶資料
  const [salesTotal, setSalesTotal] = useState({}); // 近三年各年度銷售總金額
  const [reloadData, setReloadData] = useState(false); // 更新資料
  // 抓資料
  useEffect(() => {
    try {
      (async () => {
        const customerRes = await axios.get('http://localhost:5000/customer');
        const orderRes = await axios.get('http://localhost:5000/order');
        setCustomerData(customerRes.data);
        setOrderData(orderRes.data);
        const sales = {};
        const currentYear = new Date().getFullYear();
        const orderInvoiced = orderRes.data.filter((v) => v.Status === 3);
        for (const customer of customerRes.data) {
          sales[customer.ID] = {};
          for (let i = currentYear - 2; i <= currentYear; i++) {
            sales[customer.ID][i] = 0;
          }
        }
        for (const order of orderInvoiced) {
          const customerID = order.Customer_ID;
          const year = new Date(order.Order_Date).getFullYear();
          if (
            year >= currentYear - 2 &&
            sales[customerID][year] !== undefined
          ) {
            sales[customerID][year] += Number(order.TotalAmount);
          }
        }
        // 修正總和值為兩位小數
        for (const customerID in sales) {
          for (const year in sales[customerID]) {
            sales[customerID][year] = Number(
              sales[customerID][year].toFixed(2)
            );
          }
        }
        setSalesTotal(sales);
      })();
    } catch (e) {
      console.error(e);
    } finally {
      setReloadData(false);
    }
  }, [reloadData]);

  return (
    <BrowserRouter>
      <div className="vh-100">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Customer
                data={customerData}
                setData={setCustomerData}
                salesTotal={salesTotal}
                setReloadData={setReloadData}
              />
            }
          />
          <Route
            path="order"
            element={
              <Order
                data={orderData}
                setData={setOrderData}
                setReloadData={setReloadData}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
