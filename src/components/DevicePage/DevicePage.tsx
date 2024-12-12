import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Device } from '../../types/Device';
import { getDevice } from '../../api/devices';
import './DevicePage.css';

export const DevicePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [device, setDevice] = useState<Device | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { deviceId } = useParams();

  useEffect(() => {
    if (!deviceId) return;

    const getDeviceData = async () => {
      try {
        const data = await getDevice(deviceId);
        setDevice(data.device); // Парсим устройство из JSON
      } catch (error) {
        setError('Не удалось загрузить устройство');
      }
    };

    getDeviceData();
  }, [deviceId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!device) {
    return <div className="loading-message">Загрузка...</div>;
  }

  const {
    title,
    manufacturer,
    deviceModel,
    condition,
    batteryCapacity,
    weight,
    typeC,
    typeA,
    sockets,
    remoteUse,
    batteryType,
    signalShape,
    additional,
    images,
    price,
    ownerId,
    dimensions,
  } = device;

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
              {images.map((image, index) => (
                <img
                  key={image._id}
                  className="device-side-picture"
                  src={image.url}
                  alt={`Device picture ${index + 1}`}
                />
              ))}
              <div className="view-all-pictures">
                {images.length > 4 && `+${images.length - 4}`}
              </div>
            </div>
            <img
              className="main-device-picture"
              src={images[0]?.url || '/images/default.jpg'}
              alt="Main device picture"
            />
          </div>
          <div className="device-short-info">
            <div className="device-page-name">
              <h1 className="device-page-name-title">{title}</h1>
              <button className="lessor-info-button main-button">
                <span className="lessor-info-button-title">Орендувати</span>
                <span className="lessor-info-button-price">
                  {price} грн/міс
                </span>
              </button>
            </div>
            <div className="device-page-location">
              <h1 className="device-page-location-title">Місцезнаходження</h1>
              <div className="device-page-location-info">
                <p className="settlement location-info">Не вказано</p>
                <p className="district location-info">Не вказано</p>
                <p className="region location-info">Не вказано</p>
              </div>
            </div>
            <div className="device-page-owner">
              <h1 className="device-page-owner-title">Власник пристрою</h1>
              <div className="device-page-owner-info">
                <h2 className="device-page-owner-fullname">
                  {ownerId.name} {ownerId.surname}
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
              <p className="char-value">{manufacturer}</p>
              <p className="char-value">{deviceModel}</p>
              <p className="char-value">
                {dimensions.length}x{dimensions.width}x{dimensions.height} см
              </p>
              <p className="char-value">{condition}</p>
              <p className="char-value">{batteryCapacity} кВт/год</p>
              <p className="char-value">{weight} грамів</p>
              <p className="char-value">{sockets} розеток</p>
              <p className="char-value">{typeA} роз’єми</p>
              <p className="char-value">{typeC} роз’єми</p>
              <p className="char-value">{batteryType}</p>
              <p className="char-value">{remoteUse}</p>
              <p className="char-value">{signalShape}</p>
            </div>
          </div>
        </div>
        <div className="device-additional-info">
          <h2 className="additional-info-title">Додатково</h2>
          <p className="additional-info-text">{additional}</p>
        </div>
      </div>
    </div>
  );
};
