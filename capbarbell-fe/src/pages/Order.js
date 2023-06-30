import React, { useMemo, useState, useEffect } from 'react';
import { Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
// 圖示
import { AiOutlineSearch } from 'react-icons/ai';
// 表格
import Table from '../components/Table';
// 彈跳視窗
import AddModal from '../components/AddModal';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';

const Order = ({ data, setReloadData }) => {
  const [filteredData, setFilteredData] = useState([]); // 搜尋後的資料
  const [searchColumn, setSearchColumn] = useState(''); // 搜尋選項
  const [searchKeyword, setSearchKeyword] = useState(''); // 搜尋內容
  const [message, setMessage] = useState(''); // 訊息
  const [success, setSuccess] = useState(false); // 訊息
  const [showMsgModal, setShowMsgModal] = useState(false);
  // 初始化
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  // 搜尋
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredResults = data.filter((item) => {
      if (searchColumn === '' && searchKeyword === '') {
        return true;
      } else if (searchColumn === '') {
        return Object.values(item).some((value) => {
          if (typeof value === 'string' || typeof value === 'number') {
            return value
              .toString()
              .toLowerCase()
              .includes(searchKeyword.toLowerCase());
          }
          return false;
        });
      } else {
        const columnValue = item[searchColumn];
        if (
          typeof columnValue === 'string' ||
          typeof columnValue === 'number'
        ) {
          return columnValue
            .toString()
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
        }
        return false;
      }
    });
    setFilteredData(filteredResults);
  };
  // 新增
  const handleAdd = async (formData) => {
    setShowMsgModal(true);
    try {
      const res = await axios.post('http://localhost:5000/order/add', formData);
      setReloadData(true);
      setMessage(res.data.message);
      setSuccess(res.data.success);
    } catch (e) {
      if (e.response) {
        setMessage(e.response.data.message);
        setSuccess(e.response.data.success);
      } else {
        console.error(e);
      }
    }
  };
  // 修改
  const handleEdit = async (formData) => {
    setShowMsgModal(true);
    try {
      const res = await axios.put('http://localhost:5000/order/edit', formData);
      setReloadData(true);
      setMessage(res.data.message);
      setSuccess(res.data.success);
    } catch (e) {
      if (e.response) {
        setMessage(e.response.data.message);
        setSuccess(e.response.data.success);
      } else {
        console.error(e);
      }
    }
  };
  // 刪除
  const handleDelete = async (item) => {
    setShowMsgModal(true);
    try {
      const res = await axios.post('http://localhost:5000/order/delete', {
        ID: item,
      });
      setReloadData(true);
      setMessage(res.data.message);
      setSuccess(res.data.success);
    } catch (e) {
      if (e.response) {
        setMessage(e.response.data.message);
        setSuccess(e.response.data.success);
      } else {
        console.error(e);
      }
    }
  };
  const handleCloseModal = () => {
    setShowMsgModal(false);
  };
  // 表格欄位內容
  const columns = useMemo(
    () => [
      {
        id: 'actions',
        accessor: (value) => (
          <div className="d-flex mx-3">
            <div className="mx-1">
              <EditModal
                data={value}
                onEdit={handleEdit}
                fields={fields}
                tableType={'order'}
              />
            </div>
            <div className="mx-1">
              <DeleteModal
                item={value.ID}
                onDelete={handleDelete}
                tableType={'order'}
              />
            </div>
          </div>
        ),
        className: 'sticky-column col-1 p-0',
      },
      {
        Header: 'Order ID',
        accessor: 'ID',
        className: 'pe-4',
      },
      {
        Header: 'Customer',
        accessor: 'Customer_ID',
        className: 'pe-4',
      },
      {
        Header: 'Amount',
        accessor: 'TotalAmount',
        className: 'pe-4',
      },
      {
        Header: 'Status',
        accessor: 'Status',
        className: 'pe-4',
        Cell: ({ value }) => {
          let statusText;
          let statusClass;
          switch (value) {
            case 1:
              statusText = 'Open';
              statusClass = 'bg-warning p-2 rounded text-black';
              break;
            case 2:
              statusText = 'Completed';
              statusClass = 'bg-success p-2 rounded text-white';
              break;
            case 3:
              statusText = 'Invoiced';
              statusClass = 'bg-purple p-2 rounded text-white';
              break;
            default:
              statusText = '';
              statusClass = '';
              break;
          }
          return <span className={`status ${statusClass}`}>{statusText}</span>;
        },
      },
      {
        Header: 'Date',
        accessor: 'Order_Date',
        className: 'pe-4',
      },
      {
        Header: 'Sales',
        accessor: 'Sales_Name',
        className: 'pe-4',
      },
    ],
    []
  );
  // 新增修改彈跳視窗內容
  const fields = [
    { label: 'Customer', name: 'Customer_ID' },
    { label: 'Amount', name: 'TotalAmount' },
    { label: 'Status', name: 'Status' },
    { label: 'Sales', name: 'Sales_Name' },
  ];
  return (
    <div className="d-flex flex-column w-100">
      <nav className="navbar bg-light shadow-sm p-4 w-100">
        <div className="w-100">
          <div className="row justify-content-between">
            <div className="col-12 col-md-4">
              <form
                className="input-group"
                role="search"
                onSubmit={handleSubmit}>
                <select
                  className="form-select"
                  onChange={(e) => setSearchColumn(e.target.value)}>
                  <option value="">All</option>
                  <option value="ID">Order ID</option>
                  <option value="Customer_ID">Customer</option>
                  <option value="TotalAmount">Amount</option>
                  <option value="Status">Status</option>
                  <option value="Order_Date">Date</option>
                  <option value="Sales_Name">Sales</option>
                </select>
                <input
                  className="form-control w-25"
                  type="search"
                  placeholder="Search"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="btn btn-primary text-white" type="submit">
                  <AiOutlineSearch className="fs-4" />
                </button>
              </form>
            </div>
            <div className="col-12 col-md-auto mt-2 d-flex justify-content-between">
              <AddModal fields={fields} onAdd={handleAdd} tableType={'order'} />
              <div className="text-secondary fw-bold m-2 d-md-none d-block">
                {filteredData.length} Orders
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div style={{ height: 'calc(100vh - 16rem)' }}>
        {filteredData.length === 0 ? (
          <div className="text-center p-5 fs-4">Not Found</div>
        ) : (
          <Table columns={columns} data={filteredData} tableType={'order'} />
        )}
      </div>
      <Modal show={showMsgModal} onHide={handleCloseModal}>
        <Modal.Body>
          <Alert variant={success ? 'success' : 'danger'}>{message}</Alert>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Order;
