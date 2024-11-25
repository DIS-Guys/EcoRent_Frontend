import { Outlet } from 'react-router-dom';
import { CabinetLink } from '../../utils/CabinetLink';
import './Cabinet.css';

export const Cabinet: React.FC = () => {
  return (
    <div className="gray-container">
      <div className="profile-section-buttons">
        <button className="profile-section-button main-button">
          Особистий кабінет
        </button>
        <button className="profile-section-button secondary-button">
          Мої пристрої
        </button>
      </div>
      <div className="profile-container">
        <div className="profile-menu main-block">
          <CabinetLink path="profile" name="Профіль" />
          <CabinetLink path="security" name="Безпека" />
          <CabinetLink path="address" name="Адреса" />
          <CabinetLink path="payment" name="Оплата" />
        </div>
        <div className="profile-info-block main-block">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
