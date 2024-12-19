import React, { useState, useContext, useRef } from 'react';
import './Security.css';
import { AuthContext, AuthContextProps } from '../../contexts/AuthContext';
import { deleteUser, updatePassword } from '../../api/users';
import { toast } from 'react-toastify';

export const Security: React.FC = () => {
  const { logout } = useContext(AuthContext) as AuthContextProps;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const [editableFields, setEditableFields] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  const inputRefs = {
    oldPassword: useRef<HTMLInputElement>(null),
    newPassword: useRef<HTMLInputElement>(null),
    repeatPassword: useRef<HTMLInputElement>(null),
  };

  const toggleEditable = (field: keyof typeof passwords) => {
    setEditableFields((prev) => {
      const updatedFields = { ...prev, [field]: true };

      if (inputRefs[field].current) {
        setTimeout(() => {
          const input = inputRefs[field].current;
          input?.focus();
          input?.setSelectionRange(input.value.length, input.value.length);
        }, 0);
      }

      return updatedFields;
    });
  };

  const handleBlur = (field: keyof typeof passwords) => {
    setEditableFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: keyof typeof passwords, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const { oldPassword, newPassword, repeatPassword } = passwords;

    if (newPassword.length < 6) {
      toast.error('Пароль повинен містити від 6 символів.', {
        position: 'bottom-right',
      });
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).*$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error('Пароль має містити щонайменше одну літеру та одну цифру.', {
        position: 'bottom-right',
      });
      return;
    }

    if (newPassword !== repeatPassword) {
      toast.error('Паролі не збігаються.', {
        position: 'bottom-right',
      });
      return;
    }

    try {
      await updatePassword({ oldPassword, newPassword });
      toast.success('Пароль успішно оновлено.', {
        position: 'bottom-right',
      });
      setPasswords({ oldPassword: '', newPassword: '', repeatPassword: '' });
    } catch {
      toast.error('Помилка при оновленні паролю.', {
        position: 'bottom-right',
      });
    }
  };

  const handleCancel = () => {
    setPasswords({ oldPassword: '', newPassword: '', repeatPassword: '' });
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      logout();
      toast.success('Акаунт видалено успішно.', {
        position: 'bottom-right',
      });
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Помилка при видаленні акаунту.', {
        position: 'bottom-right',
      });
      console.error('Помилка при видаленні акаунту.', error);
    }
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).classList.contains('modal-overlay')) {
      setIsModalOpen(false);
    }
  };

  const labels: { [key in keyof typeof passwords]: string } = {
    oldPassword: 'Старий пароль',
    newPassword: 'Новий пароль',
    repeatPassword: 'Повторіть новий пароль',
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

      {Object.keys(passwords).map((field) => (
        <div className="profile-edit-block" key={field}>
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable(field as keyof typeof passwords)}
          />
          <label
            htmlFor={`${field}Input`}
            className="profile-edit-label main-label"
          >
            {labels[field as keyof typeof passwords]}
          </label>
          <input
            type="password"
            id={`${field}Input`}
            className="profile-edit-input info-input"
            ref={inputRefs[field as keyof typeof passwords]}
            value={passwords[field as keyof typeof passwords]}
            onChange={(e) =>
              handleChange(field as keyof typeof passwords, e.target.value)
            }
            disabled={!editableFields[field as keyof typeof passwords]}
            onBlur={() => handleBlur(field as keyof typeof passwords)}
            placeholder="..."
          />
        </div>
      ))}

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
          <button
            className="cancel-button secondary-button"
            onClick={handleCancel}
          >
            Скасувати
          </button>
          <button className="save-button main-button" onClick={handleSave}>
            Зберегти
          </button>
        </div>
      </div>
    </>
  );
};
