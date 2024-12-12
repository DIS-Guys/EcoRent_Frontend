import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUser } from '../../api/users';
import './Security.css';

export const Security: React.FC = () => {
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      toast.success('User deleted successfully');
      navigate('/login');
    } catch (error) {
      console.error('Failed to delete account', error);
      toast.error('Failed to delete account');
    }
  };

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
      <div className="cabinet-buttons-block">
        <button
          className="delete-user-button cancel-button secondary-button"
          onClick={handleDeleteUser}
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
      <ToastContainer />
    </>
  );
};
