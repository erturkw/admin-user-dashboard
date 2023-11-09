import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';



function UserUpdate({ show, onClose, onUpdate}) {
  
  const token = localStorage.getItem('jwt');

  const [xd, setXd] = useState(token);
  useEffect(() => {
    if (token) {
      setXd(token); 
    }
  }, [token]);

  
  const handleNumericInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  const handleAlphaInput = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(xd))
    axios
      .put(`http://127.0.0.1:8089/users/me`, xd ,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    
      .then(res => {
        console.log(res);
        onUpdate(xd);
        onClose('/');
        alert('Şifre değişikliği başarılı! ')
      })
      .catch(err => console.log(err));
  }

  return (
    <Modal show={show} onHide={onClose} className=''>
      <Modal.Header closeButton className='text-white bg-dark'>
        <h3>Update User</h3>
      </Modal.Header>
      <Modal.Body className=' bg-dark text-white rounded-1'>
        <form onSubmit={handleUpdate} >
          <div>
            <label htmlFor="first_name" className='mb-2 fs-4'>First Name</label>
            <input type="text" name='first_name' className='form-control mb-2 '  minLength="2" maxLength="15" value={token.first_name} onChange={e => setXd({ ...xd, first_name: e.target.value })} required onKeyUp={handleAlphaInput} />
          </div>
          <div>
            <label className='mb-2 fs-4' htmlFor="last_name">Last Name</label>
            <input type="text" name='last_name' className='form-control  mb-2 ' minLength="2" maxLength="15" value={xd.last_name} onChange={e => setXd({ ...xd, last_name: e.target.value })} required onKeyUp={handleAlphaInput} />
          </div>
          <div>
            <label className='mb-2 fs-4' htmlFor="age"> Age</label>
            <input type="text" name='age' className='form-control  mb-2 '
              value={xd.age} onChange={e => setXd({ ...xd, age: e.target.value })} pattern='\d{2}' minLength="1" maxLength="2" onKeyUp={handleNumericInput} />
          </div>
          <div>
            <label htmlFor="email" className='mb-2 fs-4'> Email</label>
            <input type="text" name='email' className='form-control mb-2' value={xd.email}  minLength="2" maxLength="30" onChange={e => setXd({ ...xd, email: e.target.value })} required pattern='.+@.+' />
          </div>
          <div className='d-grid gap-2 text-center' type='submit' >
            <button className='btn btn-success mt-4 fs-5'  >
            Update
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>

  )
}

export default UserUpdate