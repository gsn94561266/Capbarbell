import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
// 圖示
import { MdOutlinePeopleAlt, MdOutlineDescription } from 'react-icons/md';

const Navbar = () => {
  // 當前路由地址
  const location = useLocation();
  return (
    <div className="bg-white p-2 z-3 d-flex">
      <div>
        <Link
          to={'/'}
          className={`text-decoration-none px-2 fw-bold ${
            location.pathname === '/' ? 'text-primary' : 'text-body-tertiary'
          }`}>
          <MdOutlinePeopleAlt className="fs-3 m-2" />
          Customers
        </Link>
      </div>
      <div>
        <Link
          to={'order'}
          className={`text-decoration-none px-2 fw-bold ${
            location.pathname === '/order' ? 'text-primary' : 'text-body-tertiary'
          }`}>
          <MdOutlineDescription className="fs-3 m-2" />
          Orders
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
