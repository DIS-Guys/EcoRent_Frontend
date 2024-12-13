import './Profile.css';

export const Profile: React.FC = () => {
  return (
    <>
      <div className="profile-fullname-block">
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label
            htmlFor="profileNameInput"
            className="profile-edit-label main-label"
          >
            Ім'я
          </label>
          <input
            type="text"
            id="profileNameInput"
            className="profile-edit-input info-input"
            placeholder="Станіслав"
          />
        </div>
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label
            htmlFor="profileSurnameInput"
            className="profile-edit-label main-label"
          >
            Прізвище
          </label>
          <input
            type="text"
            id="profileSurnameInput"
            className="profile-edit-input info-input"
            placeholder="Юхименко"
          />
        </div>
      </div>
      <div className="profile-edit-block">
        <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
        <label
          htmlFor="profileEmailInput"
          className="profile-edit-label main-label"
        >
          Ваш E-mail
        </label>
        <input
          type="email"
          id="profileEmailInput"
          className="profile-edit-input info-input"
          placeholder="example@gmail.com"
        />
      </div>
      <div className="profile-edit-block">
        <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
        <label
          htmlFor="profilePhoneInput"
          className="profile-edit-label main-label"
        >
          Телефон
        </label>
        <input
          type="tel"
          id="profilePhoneInput"
          className="profile-edit-input info-input"
          placeholder="380951083747"
        />
      </div>
      <div className="edit-buttons-block">
        <button className="cancel-button secondary-button">Скасувати</button>
        <button className="save-button main-button">Зберегти</button>
      </div>
    </>
  );
};
