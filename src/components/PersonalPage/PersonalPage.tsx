import { NavLink, Outlet } from 'react-router-dom';
import './PersonalPage.css';

export const PersonalPage: React.FC = () => {
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
