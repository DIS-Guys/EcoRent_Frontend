import { Outlet } from 'react-router-dom';
import { CabinetLink } from '../../utils/CabinetLink';
import './Cabinet.css';

export const Cabinet: React.FC = () => {
  return (
    <div className="cabinet-container">
      <div className="cabinet-menu main-block">
        <CabinetLink path="profile" name="Профіль" />
        <CabinetLink path="security" name="Безпека" />
        <CabinetLink path="address" name="Адреса" />
        <CabinetLink path="payment" name="Оплата" />
      </div>
      <div className="cabinet-info-block main-block">
        <Outlet />
      </div>
    </div>
  );
};
