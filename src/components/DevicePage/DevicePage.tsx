import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Device } from '../../types/Device';
import { getDevice } from '../../api/devices';
import './DevicePage.css';

export const DevicePage: React.FC = () => {
  const navigate = useNavigate();
  const { deviceId } = useParams();
  const [device, setDevice] = useState<Device | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!deviceId) return;

    const getDeviceData = async () => {
      try {
        const device = await getDevice(deviceId);
        setDevice(device);
      } catch {
        toast.error('Помилка при завантаженні пристрою.', {
          position: 'bottom-right',
        });
      }
    };

    getDeviceData();
  }, [deviceId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleRentClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div className="device-page-container">
      <div className="device-main-section">
        <button onClick={handleGoBack} className="back-to-rent-page-button">
          <img src="/icons/back-arrow.svg" alt="Back arrow" />
          Повернутись до інших пристроїв
        </button>
        <div className="device-main-info-block">
          <div className="device-picture-block">
            <div className="device-side-pictures">
              {device.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  className="device-side-picture"
                  src={image.url}
                  alt={`Device picture ${index + 1}`}
                />
              ))}
              <div className="view-all-pictures">
                {device.images.length > 4
                  ? `+${device.images.length - 5}`
                  : `+0`}
              </div>
            </div>
            <img
              className="main-device-picture"
              src={device.images[0].url}
              alt="Main device picture"
            />
          </div>
          <div className="device-short-info">
            <div className="device-page-name">
              <h1 className="device-page-name-title">{device.title}</h1>
              <button
                className="lessor-info-button main-button"
                onClick={handleRentClick}
              >
                <span className="lessor-info-button-title">Орендувати</span>
                <span className="lessor-info-button-price">
                  {device.price} грн/міс
                </span>
              </button>
            </div>
            <div className="device-page-description">
              <h1 className="device-page-description-title">Короткий опис</h1>
              <p className="device-page-description-info">
                {device.description || 'Опису від власника немає'}
              </p>
            </div>
            <div className="device-page-location">
              <h1 className="device-page-location-title">Місцезнаходження</h1>
              <div className="device-page-location-info">
                <p className="settlement location-info">
                  {device.ownerId.town || 'Місто не вказане'}
                </p>
                <p className="district location-info">
                  {device.ownerId.street || 'Вулиця не вказана'}
                </p>
                <p className="region location-info">
                  {device.ownerId.region || 'Область не вказана'}
                </p>
              </div>
            </div>
            <div className="device-page-owner">
              <h1 className="device-page-owner-title">Власник пристрою</h1>
              <div className="device-page-owner-info">
                <h2 className="device-page-owner-fullname">
                  {device.ownerId.name} {device.ownerId.surname}
                </h2>
                <p className="owner-registration-date">Користується сервісом</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="device-extended-info-block">
        <div className="device-characteristics">
          <h2 className="characteristics-title">Характеристики</h2>
          <div className="device-page-characteristics-block">
            <div className="char-name-block">
              <p className="char-name">Виробник:</p>
              <p className="char-name">Модель:</p>
              <p className="char-name">Розмір:</p>
              <p className="char-name">Стан:</p>
              <p className="char-name">Ємність батареї:</p>
              <p className="char-name">Вага:</p>
              <p className="char-name">Кількість розеток:</p>
              <p className="char-name">USB-Type A:</p>
              <p className="char-name">USB-Type C:</p>
              <p className="char-name">Тип акумулятора:</p>
              <p className="char-name">Віддалене користування:</p>
              <p className="char-name">Форма вихідного сигналу:</p>
            </div>
            <div className="char-value-block">
              <p className="char-value">{device.manufacturer}</p>
              <p className="char-value">{device.deviceModel}</p>
              <p className="char-value">
                {device.dimensions.length}x{device.dimensions.width}x
                {device.dimensions.height} см
              </p>
              <p className="char-value">{device.condition}</p>
              <p className="char-value">{device.batteryCapacity} кВт/год</p>
              <p className="char-value">{device.weight} кг</p>
              <p className="char-value">{device.sockets} розеток</p>
              <p className="char-value">{device.typeA} роз’єми</p>
              <p className="char-value">{device.typeC} роз’єми</p>
              <p className="char-value">{device.batteryType}</p>
              <p className="char-value">{device.remoteUse}</p>
              <p className="char-value">{device.signalShape}</p>
            </div>
          </div>
        </div>
        <div className="device-additional-info">
          <h2 className="additional-info-title">Додатково</h2>
          <p className="additional-info-text">
            {device.additional || 'Без додаткових характеристик'}
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content-sections">
              <div className="modal-section">
                <h2>Дані про пристрій</h2>
                <p>
                  <strong>Назва:</strong> {device.title}
                </p>
                <p>
                  <strong>Ціна:</strong> {device.price} грн/міс
                </p>
                <p>
                  <strong>Мінімальний термін оренди:</strong>{' '}
                  {device.minRentTerm || 'Не вказано'} міс.
                </p>
                <p>
                  <strong>Максимальний термін оренди:</strong>{' '}
                  {device.maxRentTerm || 'Не вказано'} міс.
                </p>
              </div>
              <div className="modal-section">
                <h2>Дані про власника</h2>
                <p>
                  <strong>Ім'я:</strong> {device.ownerId.name}{' '}
                  {device.ownerId.surname}
                </p>
                <p>
                  <strong>Телефон:</strong>{' '}
                  {device.ownerId.phoneNumber || 'Не вказано'}
                </p>
                <p>
                  <strong>Область:</strong>{' '}
                  {device.ownerId.region || 'Не вказано'}
                </p>
                <p>
                  <strong>Місто:</strong> {device.ownerId.town || 'Не вказано'}
                </p>
                <p>
                  <strong>Вулиця:</strong>{' '}
                  {device.ownerId.street || 'Не вказано'}
                </p>
              </div>
            </div>
            <button
              className="close-modal-button main-button"
              onClick={closeModal}
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
