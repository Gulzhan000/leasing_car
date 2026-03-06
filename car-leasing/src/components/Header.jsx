import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useSelector(state => state.user);

  return (
    <header>
      <nav>
        <Link to="/">CAR LEASING</Link>
        <div>
          <Link to="/">Главная</Link>
          {user && (
            <>
              <Link to="/my-leasings">Мои оформления</Link>
              {user.role === 'admin' && (
                <Link to="/admin">Админ</Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;