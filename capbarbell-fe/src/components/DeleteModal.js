import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
// 圖示
import { FaTrash } from 'react-icons/fa';

const DeleteModal = ({ item, onDelete, tableType }) => {
  const [showModal, setShowModal] = useState(false); // 視窗開關狀態
  // 關閉視窗按鈕
  const handleCloseModal = () => {
    setShowModal(false);
  };
  // 開啟視窗按鈕
  const handleShowModal = () => {
    setShowModal(true);
  };
  // 刪除按鈕
  const handleDelete = (e) => {
    e.preventDefault();
    // 觸發父元件函式並帶值過去
    onDelete(item);
    // 關閉視窗
    handleCloseModal();
  };

  return (
    <>
      <Button variant="danger" onClick={handleShowModal}>
        <FaTrash />
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {tableType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this item "{item.Name || item}" ？
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancle
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteModal;
