import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from './loginsignuppage/Logout';

function Navbar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (keyword) => {
    try {
      const response = await axios.post('https://chat-appln-jzc5.onrender.com/api/search', {
        keyword: keyword.trim(),
      });

      navigate('/results', { state: { results: response.data, keyword } });
    } catch (error) {
      console.error('Search error:', error);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') return;

    // Debounce
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => handleSubmit(value), 500);
  };

  return (
    <div className='flex w-full items-center px-4 py-5 '>
      <div className='w-1/3'>
        <input
          type="text"
          placeholder="Search account..."
          value={query}
          onChange={handleChange}
          className='border border-amber-200 px-3 py-2 w-full rounded'
        />
      </div>
      <LogoutButton />
    </div>
  );
}

export default Navbar;
