import { NavLink, Outlet } from 'react-router';
import './PersonalPage.css';
import { useEffect } from 'react';

export const PersonalPage: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="gray-container">
      <div className="personal-page-section-buttons">
        <NavLink
          to="cabinet"
          className={({ isActive }) =>
            `personal-page-section-button cabinet-button ${
              isActive ? 'main-button' : 'secondary-button'
            }`
          }
        >
          Особистий кабінет
        </NavLink>
        <NavLink
          to="my-devices"
          className={({ isActive }) =>
            `personal-page-section-button my-devices-button ${
              isActive ? 'main-button' : 'secondary-button'
            }`
          }
        >
          Мої пристрої
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};
