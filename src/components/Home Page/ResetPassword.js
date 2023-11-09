import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ResetPasswordModal({ show, onClose, onResetPassword }) {
  const handleReset = (e) => {
    onResetPassword();
    onClose();
  };

  
  return (
    <Modal show={show} onHide={onClose} className=''>
      <Modal.Header closeButton className='bg-dark text-white'>
        <Modal.Title>Password Reset</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-white fs-4'>
        <p>Are you sure you want to reset your password?</p>
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleReset}>
          Reset Password
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


export default ResetPasswordModal;
