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

const Customer = ({ data, salesTotal, setReloadData }) => {
  const [filteredData, setFilteredData] = useState([]); // 搜尋後的資料
  const [searchColumn, setSearchColumn] = useState(''); // 搜尋選項
  const [searchKeyword, setSearchKeyword] = useState(''); // 搜尋內容
  const [message, setMessage] = useState(''); // 訊息
  const [success, setSuccess] = useState(false); // 訊息
  const [showMsgModal, setShowMsgModal] = useState(false);
  const currentYear = new Date().getFullYear(); // 現在年份

  // 初始化
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  // 搜尋
  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredResults = data.filter((item) => {
      if (searchColumn === '') {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(searchKeyword.toLowerCase());
          }
          return false;
        });
      } else {
        const value = item[searchColumn];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchKeyword.toLowerCase());
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
      const res = await axios.post(
        'http://localhost:5000/customer/add',
        formData
      );
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
      const res = await axios.put(
        'http://localhost:5000/customer/edit',
        formData
      );
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
      const res = await axios.post('http://localhost:5000/customer/delete', {
        ID: item.ID,
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
                tableType={'customer'}
              />
            </div>
            <div className="mx-1">
              <DeleteModal
                item={value}
                onDelete={handleDelete}
                tableType={'customer'}
              />
            </div>
          </div>
        ),
        sticky: 'left',
        className: 'sticky-column col-1 p-0',
      },
      {
        Header: 'Cust ID',
        accessor: 'ID',
        className: 'pe-4',
      },
      {
        Header: 'Name',
        accessor: 'Name',
        className: 'pe-4',
      },
      {
        Header: 'Country',
        accessor: 'Country',
        className: 'pe-4',
      },
      {
        Header: 'State',
        accessor: 'State',
        className: 'pe-4',
      },
      {
        Header: 'Zip',
        accessor: 'Zip',
        className: 'pe-4',
      },
      {
        Header: 'City',
        accessor: 'City',
        className: 'pe-4',
      },
      {
        Header: 'Address',
        accessor: 'Address',
        className: 'pe-4',
      },
      {
        Header: 'Total Sales',
        accessor: 'TotalSales',
        Cell: ({ row }) => (
          <>
            {salesTotal[row.original.ID] && (
              <div>
                <span className="me-1">{currentYear - 2}:</span>
                <span>{salesTotal[row.original.ID][currentYear - 2]}</span>
              </div>
            )}
            {salesTotal[row.original.ID] && (
              <div>
                <span className="me-1">{currentYear - 1}:</span>
                <span>{salesTotal[row.original.ID][currentYear - 1]}</span>
              </div>
            )}
            {salesTotal[row.original.ID] && (
              <div>
                <span className="me-1">{currentYear}:</span>
                <span>{salesTotal[row.original.ID][currentYear]}</span>
              </div>
            )}
          </>
        ),
        className: 'pe-4',
      },
    ],
    [salesTotal]
  );
  // 新增修改彈跳視窗內容
  const fields = [
    { label: 'Cust ID', name: 'ID', disabled: true },
    { label: 'Name', name: 'Name' },
    { label: 'Country', name: 'Country' },
    { label: 'State', name: 'State' },
    { label: 'Zip', name: 'Zip' },
    { label: 'City', name: 'City' },
    { label: 'Address', name: 'Address' },
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
                  <option value="ID">Cust ID</option>
                  <option value="Name">Name</option>
                  <option value="Country">Country</option>
                  <option value="State">State</option>
                  <option value="Zip">Zip</option>
                  <option value="City">City</option>
                  <option value="Address">Address</option>
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
              <AddModal
                fields={fields}
                onAdd={handleAdd}
                tableType={'customer'}
              />
              <div className="text-secondary fw-bold m-2 d-md-none d-block">
                {filteredData.length} Customers
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div style={{ height: 'calc(100vh - 16rem)' }}>
        {filteredData.length === 0 ? (
          <div className="text-center p-5 fs-4">Not Found</div>
        ) : (
          <Table columns={columns} data={filteredData} tableType={'customer'} />
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
export default Customer;
