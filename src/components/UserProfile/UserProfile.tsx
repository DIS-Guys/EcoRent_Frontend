import './UserProfile.css';

export const UserProfile: React.FC = () => {
  return (
    <div className="profile-background">
      <div className="profile-buttons">
        <button className="account-button">Особистий кабінет</button>
        <button className="devices-button">Мої пристрої</button>
      </div>
      <div className="profile-menu">
        <div className="profile-left">
          <button className="profile">
            <img src="/icons/user-white.svg" alt="User icon" />
            Профіль
          </button>
          <button className="security">
            <img src="/icons/lock-black.svg" alt="Lock icon" />
            Безпека
          </button>
          <button className="address">
            <img src="/icons/home-black.svg" alt="Home icon" />
            Адреса
          </button>
          <button className="payment">
            <img src="/icons/card-black.svg" alt="Card icon" />
            Оплата
          </button>
        </div>
        <div className="profile-right">
          <div className="name-surname">
            <div className="name-block">
              <label htmlFor="profile-name" className="profile-name-label">
                Ім'я
              </label>
              <img
                src="/icons/edit.svg"
                alt="Edit icon"
                className="edit-icon"
              />
              <input
                type="text"
                id="profile-name"
                className="profile-name-input"
                placeholder="Станіслав"
              />
            </div>
            <div className="surname-block">
              <label
                htmlFor="profile-surname"
                className="profile-surname-label"
              >
                Прізвище
              </label>
              <img
                src="/icons/edit.svg"
                alt="Edit icon"
                className="edit-icon"
              />
              <input
                type="text"
                id="profile-surname"
                className="profile-surname-input"
                placeholder="Юхименко"
              />
            </div>
          </div>
          <div className="profile-email-block">
            <label htmlFor="profile-email" className="profile-email-label">
              Ваш E-mail
            </label>
            <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
            <input
              type="email"
              id="profile-email"
              className="profile-email-input"
              placeholder="example@email.com"
            />
          </div>
          <div className="profile-phone-block">
            <label htmlFor="profile-phone" className="profile-phone-label">
              Телефон
            </label>
            <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
            <input
              type="tel"
              id="profile-phone"
              className="profile-phone-input"
              placeholder="380951083747"
            />
          </div>
          <div className="buttons-block">
            <button className="cancel-button">Скасувати</button>
            <button className="save-button">Зберегти</button>
          </div>
        </div>
      </div>
    </div>
  );
};
