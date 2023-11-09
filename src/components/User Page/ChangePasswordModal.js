import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';


function ChangePasswordModal({ show, onClose, oldPassword, newPassword, onOldPasswordChange, onNewPasswordChange,token }){

  const [errorMessage, setErrorMessage] = useState('');

  const onPasswordChange = (e) => {
    e.preventDefault();

    axios
      .patch(
        'http://127.0.0.1:8089/users/me/change-password',
        {
          "old_password": oldPassword,
          "new_password": newPassword,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Şifre değişikliği başarılı.');
        onClose();
      })
      .catch((error) => {
        console.error('Şifre değişikliği başarısız oldu:', error);
        setErrorMessage('Eski Şifrenizi doğru giriniz.');
      });
  };
  return (
    <Modal show={show} onHide={onClose} className=''>
      <Modal.Header closeButton className='bg-dark text-white'>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-white'>
        <form onSubmit={onPasswordChange}>
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              value={oldPassword}
              onChange={onOldPasswordChange}
              required
              autoComplete="newPassword"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              value={newPassword}
              onChange={onNewPasswordChange}
              required
              autoComplete="oldPassword"
            />
          </div>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="d-grid gap-2">
            <Button variant="light" type="submit" className='d-grid gap-2'>
              Change Password
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ChangePasswordModal;
