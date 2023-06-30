import React, { useState } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
// 圖示
import { FaEdit } from 'react-icons/fa';

const EditModal = ({ onEdit, data, fields, tableType }) => {
  const [showModal, setShowModal] = useState(false); // 視窗開關狀態
  const [formData, setFormData] = useState({}); // 要寫入資料庫的新物件
  const [error, setError] = useState(''); // 錯誤訊息
  // 關閉視窗按鈕
  const handleCloseEdit = () => {
    setShowModal(false);
    // 還原成預設值
    setError('');
  };
  // 開啟視窗按鈕
  const handleEditClick = () => {
    setShowModal(true);
    // 帶入原始值
    setFormData(data);
  };
  // 建構新物件
  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };
  // 送出按鈕
  const handleEdit = (e) => {
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
    // 觸發父元件函式並帶值過去
    onEdit(formData);
    // 關閉視窗
    handleCloseEdit();
  };

  return (
    <>
      <Button variant="info text-light" onClick={handleEditClick}>
        <FaEdit />
      </Button>
      <Modal show={showModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {tableType}</Modal.Title>
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
                    disabled={field.disabled}
                  />
                )}
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
