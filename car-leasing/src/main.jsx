import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store.js';
import App from './App.jsx';

// Импорт стилей
import './styles/variables.css';
import './styles/global.css';
import './styles/header.css';
import './styles/footer.css';
import './styles/home.css';
import './styles/cars.css';
import './styles/forms.css';
import './styles/admin.css';

// Подключение шрифтов
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);