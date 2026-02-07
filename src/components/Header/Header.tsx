import { Link, NavLink } from 'react-router';
import classNames from 'classnames';
import './Header.css';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav-link', { 'is-active': isActive });

export const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="logo-link">
              <img className="logo" src="/icons/logo.svg" alt="Logo" />
            </Link>
          </li>
          <li className="nav-item">
            <NavLink to="/" className={getLinkClass}>
              Головна
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/rent" className={getLinkClass}>
              Орендувати
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/personal-page/my-devices" className={getLinkClass}>
              Для власників
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/support" className={getLinkClass}>
              Підтримка
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="icon-block">
        <Link to="/rent" className="icon-link search-icon-link">
          <img src="/icons/search.svg" alt="Search" />
        </Link>
        <Link to="/personal-page" className="icon-link profile-icon-link">
          <img src="/icons/profile.svg" alt="Profile" />
        </Link>
      </div>
    </header>
  );
};
