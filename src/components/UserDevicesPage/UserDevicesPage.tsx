import { Link } from 'react-router-dom';
import './UserDevicesPage.css';
import { useEffect, useState } from 'react';
import { Device } from '../../types/Device';
import { getUserDevices, deleteDeviceById } from '../../api/devices';
import { PersonalPageDeviceCard } from '../PersonalPageDeviceCard';
import { toast } from 'react-toastify';

export const UserDevicesPage: React.FC = () => {
  const [userDevices, setUserDevices] = useState<Device[]>([]);

  useEffect(() => {
    const getDevices = async () => {
      const devices = await getUserDevices();
      setUserDevices(devices);
    };
    getDevices();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setUserDevices((prevDevices) =>
        prevDevices.filter((device) => device._id !== id)
      );
      await deleteDeviceById(id);
      toast.success('Пристрій видалено успішно.', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Помилка при видаленні пристрою.', {
        position: 'bottom-right',
      });
      console.error('Помилка при видаленні пристрою:', error);
    }
  };

  return (
    <div className="user-devices-block main-block">
      <Link to="/rent-out" className="add-button add-device-button" replace>
        <img alt="Add device icon" src="/icons/plus-circle.svg" />
        Додати пристрій
      </Link>
      {userDevices.map((device) => (
        <PersonalPageDeviceCard
          key={device._id}
          id={device._id}
          mainImage={device.images[0].url}
          brand={device.manufacturer}
          model={device.deviceModel}
          isInRent={device.isInRent}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
