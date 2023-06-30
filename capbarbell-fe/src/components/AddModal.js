import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';

const AddModal = ({ fields, onAdd, tableType }) => {
  const [showModal, setShowModal] = useState(false); // 視窗開關狀態
  const [formData, setFormData] = useState({}); // 要寫入資料庫的物件
  const [error, setError] = useState(''); // 錯誤訊息
  // 關閉視窗按鈕
  const handleCloseModal = () => {
    setShowModal(false);
    // 還原成預設值
    setError('');
  };
  // 開啟視窗按鈕
  const handleShowModal = () => {
    setShowModal(true);
  };
  // 建構新物件
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  // 送出按鈕
  const handleAdd = (e) => {
    e.preventDefault();
    // 前端驗證
    const hasErrors = fields.some((field) => {
      if (field.name !== 'Status' && !formData[field.name]) {
        setError(`Please enter ${field.label}.`);
        return true;
      }
      return false;
    });
    if (hasErrors) {
      return;
    }

    // 在沒有更動選項時，預設值為 1
    const mergedData = {
      ...formData,
      Status: formData.Status || '1',
    };
    // 觸發父元件函式並帶值過去
    onAdd(mergedData);
    // 還原成預設值
    setFormData({});
    // 關閉視窗
    handleCloseModal();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShowModal}>
        + Add
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add {tableType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* 錯誤訊息 */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            {fields.map((field) => (
              <Form.Group
                controlId={`form${field.name}`}
                key={field.name}
                className="py-2">
                <Form.Label>{field.label}</Form.Label>
                {/* 如果是Status用選單 */}
                {field.name === 'Status' ? (
                  <Form.Select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}>
                    <option value="1">Open</option>
                    <option value="2">Completed</option>
                    <option value="3">Invoiced</option>
                  </Form.Select>
                ) : (
                  <Form.Control
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleInputChange}
                  />
                )}
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModal;
