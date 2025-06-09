import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';       // ✅ Needed
import store from './assets/Component/redux/Store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>                {/* ✅ Provide the store here */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
