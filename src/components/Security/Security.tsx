import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser } from '../../api/users';
import './Security.css';
import { AuthContext, AuthContextProps } from '../../contexts/AuthContext';

export const Security: React.FC = () => {
  const { logout } = useContext(AuthContext) as AuthContextProps;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      logout();
      toast.success('User deleted successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to delete account', error);
      toast.error('Failed to delete account');
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <h2>Підтвердження видалення</h2>
            <p>
              Ви впевнені, що хочете видалити свій акаунт? Цю дію неможливо
              скасувати.
            </p>
            <div className="modal-buttons">
              <button
                className="cancel-button main-button"
                onClick={() => setIsModalOpen(false)}
              >
                Скасувати
              </button>
              <button
                className="delete-button secondary-button"
                onClick={handleDeleteUser}
              >
                Видалити
              </button>
            </div>
          </div>
        </div>
      )}
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
      <div className="cabinet-buttons-block">
        <button
          className="delete-user-button cancel-button secondary-button"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src="/icons/delete-user.svg"
            alt="Delete user icon"
            className="delete-user-icon"
          />
          Видалити акаунт
        </button>
        <div className="edit-buttons-block">
          <button className="cancel-button secondary-button">Скасувати</button>
          <button className="save-button main-button">Зберегти</button>
        </div>
      </div>
    </>
  );
};
