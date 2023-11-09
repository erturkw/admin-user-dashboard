import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import querystring from 'querystring';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = querystring.stringify({
        username: username,
        password: password,
      });

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      };

      const response = await axios.post('http://127.0.0.1:8089/token/', data, config);

      const token = response.data.access_token;

      console.log(token)
      if (token) {

        localStorage.setItem('jwt', token);

        const userResponse = await axios.get('http://127.0.0.1:8089/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(userResponse)
        
        const user = userResponse.data;

        const userRole = user.role;
        
        localStorage.setItem('role', userRole);
        
        if (userRole === 'admin') {
          setIsLoggedIn(true);
          navigate('/Home');
        } else {
          setIsLoggedIn(true);
          navigate('/UserPage');
        }
      } else {
        console.log('Geçersiz giriş.');
        setError('Kullanıcı adı veya şifre yanlış.');
      }
    } catch (error) {
      console.error('API hatası:', error);
      setError('Lütfen bilgileri doğru giriniz');
    }
  }



  return (
    <div className=" container login-c align-items-center">
      <div className="row justify-content-center container ">
        <div className="col-md-6">

          <div className="card login-cc text-white">
            <div className="card-body m-3">
              <h1 className="card-title mb-3">Login User</h1>
              <div className="form-group">
                <label className='mb-2 fs-4'>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className='mb-2 fs-4 mt-3'>Password :</label>
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='d-grid gap-2 mt-4 '>
                <button className="btn btn-light fs-5 text-dark" onClick={handleLogin}>
                  Giriş Yap
                </button>
              </div>
              {error && <p className="text-danger mt-3">{error}</p>}
            </div>
          </div>
          )
        </div>
      </div>
    </div>
  );
}
export default Login
