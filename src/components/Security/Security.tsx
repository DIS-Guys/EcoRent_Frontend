export const Security: React.FC = () => {
  return (
    <>
      <div className="profile-edit-block">
        <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
        <label
          htmlFor="oldPasswordInput"
          className="profile-edit-label main-label"
        >
          Введіть старий пароль
        </label>
        <input
          type="password"
          id="oldPasswordInput"
          className="profile-edit-input info-input"
          placeholder="..."
        />
      </div>
      <div className="profile-edit-block">
        <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
        <label
          htmlFor="newPasswordInput"
          className="profile-edit-label main-label"
        >
          Введіть новий пароль
        </label>
        <input
          type="password"
          id="newPasswordInput"
          className="profile-edit-input info-input"
          placeholder="..."
        />
      </div>
      <div className="profile-edit-block">
        <img src="/icons/edit.svg" alt="Edit icon" className="edit-icon" />
        <label
          htmlFor="repeatPasswordInput"
          className="profile-edit-label main-label"
        >
          Повторіть новий пароль
        </label>
        <input
          type="password"
          id="repeatPasswordInput"
          className="profile-edit-input info-input"
          placeholder="..."
        />
      </div>
      <div className="edit-buttons-block">
        <button className="cancel-button secondary-button">Скасувати</button>
        <button className="save-button main-button">Зберегти</button>
      </div>
    </>
  );
};
