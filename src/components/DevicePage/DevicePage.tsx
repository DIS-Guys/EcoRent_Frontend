import { useNavigate } from 'react-router-dom';
import './DevicePage.css';

export const DevicePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

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
              <img
                className="device-side-picture"
                src="https://avatars.akamai.steamstatic.com/adeb470d4165233694b0640595999b5764a7f4d1_full.jpg"
                alt="Device picture 1"
              />
              <img
                className="device-side-picture"
                src="https://avatars.akamai.steamstatic.com/adeb470d4165233694b0640595999b5764a7f4d1_full.jpg"
                alt="Device picture 2"
              />
              <img
                className="device-side-picture"
                src="https://avatars.akamai.steamstatic.com/adeb470d4165233694b0640595999b5764a7f4d1_full.jpg"
                alt="Device picture 3"
              />
              <img
                className="device-side-picture"
                src="https://avatars.akamai.steamstatic.com/adeb470d4165233694b0640595999b5764a7f4d1_full.jpg"
                alt="Device picture 4"
              />
              <div className="view-all-pictures">+3</div>
            </div>
            <img
              className="main-device-picture"
              src="https://avatars.akamai.steamstatic.com/adeb470d4165233694b0640595999b5764a7f4d1_full.jpg"
              alt="Device picture 1"
            />
          </div>
          <div className="device-short-info">
            <div className="device-page-name">
              <h1 className="device-page-name-title">Назва пристрою</h1>
              <button className="lessor-info-button main-button">
                <span className="lessor-info-button-title">Орендувати</span>
                <span className="lessor-info-button-price">1500 грн/міс</span>
              </button>
            </div>
            <div className="device-page-location">
              <h1 className="device-page-location-title">Місцезнаходження</h1>
              <div className="device-page-location-info">
                <p className="settlement location-info">м. Полтава,</p>
                <p className="district location-info">Полтавський район,</p>
                <p className="region location-info">Полтавська область</p>
              </div>
            </div>
            <div className="device-page-owner">
              <h1 className="device-page-owner-title">Власник пристрою</h1>
              <div className="device-page-owner-info">
                <h2 className="device-page-owner-fullname">
                  Абобус Абобусович
                </h2>
                <p className="owner-registration-date">
                  Користується сервісом з жовтня 1488 року
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="device-extended-info-block">
        <div className="device-characteristics">
          <h2 className="characteristics-title">Характеристики</h2>
          <div className="characteristics-block">
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
              <p className="char-value">EcoFlow</p>
              <p className="char-value">River 2</p>
              <p className="char-value">100x100x300 см</p>
              <p className="char-value">Вживаний</p>
              <p className="char-value">1500 квт/год</p>
              <p className="char-value">2200 грамів</p>
              <p className="char-value">2 розетки</p>
              <p className="char-value">1 роз’єм</p>
              <p className="char-value">2 роз’єми</p>
              <p className="char-value">Літієвий</p>
              <p className="char-value">Wi-Fi</p>
              <p className="char-value">Постійний</p>
            </div>
          </div>
        </div>
        <div className="device-additional-info">
          <h2 className="additional-info-title">Додатково</h2>
          <p className="additional-info-text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
            cupiditate accusamus ex? Porro harum laboriosam, similique cum,
            voluptas, doloremque fugiat dignissimos in ratione esse id placeat
            aliquid sit iste maiores!
          </p>
        </div>
      </div>
    </div>
  );
};
