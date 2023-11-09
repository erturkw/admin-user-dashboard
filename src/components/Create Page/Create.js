import axios from 'axios';
import {useState} from 'react'
import React from 'react';
import { Modal } from 'react-bootstrap';


function Create({onClose, show}) {

  const [values, setValues] = useState ({
    email: '',
    first_name: '',
    last_name: '',
    age: '',
    role: '',
    password: ''
  })

  
  const handleNumericInput = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
  };

  const handleAlphaInput = (event) => {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8089/users/me', values)
      .then(res => {
        console.log(res);
        onClose();
      })
      .catch(err => console.log(err));
  }


  
  return (
    <Modal show={show} onHide={onClose} className=' '>
      <Modal.Header closeButton className='bg-dark text-white'>
        <h1 className=''>Create User</h1>
      </Modal.Header>
        <Modal.Body className=' bg-dark text-white rounded-1'>
          <form className='bg-dark text-white' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name" className='mb-2 fs-4 name'>First Name</label>
              <input type="text" name='first_name' className='form-control mb-2'  minLength="2" maxLength="15"  onChange={e => setValues({...values, first_name: e.target.value})} required onKeyUp={handleAlphaInput}/>
            </div>
            <div>
              <label className='mb-2 fs-4 name' htmlFor="last_name">Last Name</label>
              <input type="text" name='last_name' className='form-control  mb-2 '  minLength="2" maxLength="15" onChange={e => setValues({...values, last_name: e.target.value})} required onKeyUp={handleAlphaInput}/>
            </div>
            <div>
              <label className='mb-2 fs-4' htmlFor="age"> Age</label>
              <input type="text" name='age' className='form-control age mb-2 '
              onChange={e => setValues({...values, age: e.target.value})} minLength="1" maxLength="2" pattern='\d{2}' onKeyUp={handleNumericInput} required />
            </div>
            <div>
              <label htmlFor="email" className='mb-2 fs-4'> Email</label>
              <input type="text" name='email' className='form-control  mb-2'  minLength="5" maxLength="30" pattern='.+@.+' required onChange={e => setValues({...values, email: e.target.value})}/>
            </div>
            <div>
              <label htmlFor="role" className='mb-2 fs-4 name'> Role</label>
              <input type="text" name='role' className='form-control  mb-2'  minLength="2" maxLength="10" onChange={e => setValues({...values, role: e.target.value})} required onKeyUp={handleAlphaInput}/>
            </div>
            <div>
              <label htmlFor="password" className='mb-2 fs-4 name'>Password</label>
              <input type="text" name='password' className='form-control  mb-2'  minLength="2" maxLength="10" onChange={e => setValues({...values, password: e.target.value})} required/>
            </div>
            <div className='d-grid gap-2'>
            <button className='btn btn-primary mt-3 fs-4'>Create</button>
            </div>
          </form>
          </Modal.Body>
    </Modal>
  )
}


export default Create
