import { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/Userid';
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://chat-appln-jzc5.onrender.com/api/login', { email, password })
      .then(res => {
        console.log(res.data);
        const token = res.data.token;
        const user_id = res.data.user.user_id;
        console.log(res); 
        console.log(user_id);
        localStorage.setItem('token', token); 
        localStorage.setItem('user_id', user_id); 
        try {
          dispatch(setUser(email,user_id ));
        } catch (err) {
          console.error('Error dispatching or navigating:', err);
        }
        navigate('/');
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          setError('Invalid credentials');
        } else {
          setError('Login failed. Please try again.');
        }
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
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
        <NavLink to='/Signup' className="d-block text-center mt-3">
          Don't have an account? Sign up
        </NavLink>
      </div>
    </div>
  );
}

export default Login;
