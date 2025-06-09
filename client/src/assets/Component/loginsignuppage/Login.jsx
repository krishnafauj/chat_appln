import { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('/api/login', { email, password })  // <- Add leading slash!
      .then(res => {
        if (res.status === 401) {
          setError('User already exists');
          return;
        }
        
        const token = res.data.token;
        localStorage.setItem('authToken', token);
        navigate('/');  
        console.log('Login Success:');
      })
      .catch(err => {
        console.error('Login Failed:', err);
      });
  };


  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <NavLink to='/Signup'>
        <p>
          Signup
          </p>
        </NavLink>
      </div>
    
    </div>
  );
}

export default Login;
