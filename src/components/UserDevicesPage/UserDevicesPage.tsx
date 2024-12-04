import { Link } from 'react-router-dom';
import './UserDevicesPage.css';

export const UserDevicesPage: React.FC = () => {
  return (
    <div className="user-devices-block main-block">
      <Link to="/rent-out" className="add-button add-device-button">
        <img alt="Add device icon" src="/icons/plus-circle.svg" />
        Додати пристрій
      </Link>
    </div>
  );
};
