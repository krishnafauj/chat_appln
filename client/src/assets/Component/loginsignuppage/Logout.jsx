import { useDispatch } from 'react-redux';
import { removeUser } from '../redux/Userid'; // adjust path if needed
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');

    // Clear from Redux
    dispatch(removeUser());

    // Redirect to login
    navigate('/Login');
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}

export default LogoutButton;
