import { Link } from 'react-router-dom';
import './UserDevicesPage.css';
import { useEffect, useState } from 'react';
import { Device } from '../../types/Device';
import { getUserDevices } from '../../api/devices';
import { PersonalPageDeviceCard } from '../PersonalPageDeviceCard';

export const UserDevicesPage: React.FC = () => {
  const [userDevices, setUserDevices] = useState<Device[]>([]);

  useEffect(() => {
    const getDevices = async () => {
      const devices = await getUserDevices();
      setUserDevices(devices);
    };
    getDevices();
  }, []);

  return (
    <div className="user-devices-block main-block">
      <Link to="/rent-out" className="add-button add-device-button" replace>
        <img alt="Add device icon" src="/icons/plus-circle.svg" />
        Додати пристрій
      </Link>
      {userDevices.map((device) => (
        <PersonalPageDeviceCard
          key={device._id}
          mainImage={device.images[0].url}
          brand={device.manufacturer}
          model={device.deviceModel}
          isInRent={device.isInRent}
        />
      ))}
    </div>
  );
};
