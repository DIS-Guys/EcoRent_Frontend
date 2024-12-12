import './Address.css';

export const Address: React.FC = () => {
  return (
    <>
      <div className="address-page-block">
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label
            htmlFor="regionInput"
            className="profile-edit-label main-label"
          >
            Область
          </label>
          <input
            type="text"
            id="regionInput"
            className="profile-edit-input info-input"
            placeholder="Полтавська"
          />
        </div>
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label htmlFor="cityInput" className="profile-edit-label main-label">
            Місто
          </label>
          <input
            type="text"
            id="cityInput"
            className="profile-edit-input info-input"
            placeholder="Полтава"
          />
        </div>
      </div>
      <div className="address-page-block">
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label
            htmlFor="streetInput"
            className="profile-edit-label main-label"
          >
            Вулиця
          </label>
          <input
            type="text"
            id="streetInput"
            className="profile-edit-input info-input"
            placeholder="Соборності"
          />
        </div>
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label
            htmlFor="houseNumberInput"
            className="profile-edit-label main-label"
          >
            Номер будинку
          </label>
          <input
            type="text"
            id="houseNumberInput"
            className="profile-edit-input info-input"
            placeholder="15"
          />
        </div>
      </div>
      <div className="address-page-block">
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label
            htmlFor="apartmentNumberInput"
            className="profile-edit-label main-label"
          >
            Номер квартири
          </label>
          <input
            type="text"
            id="apartmentNumberInput"
            className="profile-edit-input info-input"
            placeholder="228"
          />
        </div>
        <div className="profile-edit-block">
          <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
          <label htmlFor="floorInput" className="profile-edit-label main-label">
            Поверх
          </label>
          <input
            type="text"
            id="floorInput"
            className="profile-edit-input info-input"
            placeholder="1"
          />
        </div>
      </div>
      <div className="edit-buttons-block">
        <button className="cancel-button secondary-button">Скасувати</button>
        <button className="save-button main-button">Зберегти</button>
      </div>
    </>
  );
};
