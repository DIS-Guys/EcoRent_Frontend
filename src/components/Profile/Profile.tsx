import React, { useContext, useEffect, useRef, useState } from 'react';
import './Profile.css';
import { AuthContext, AuthContextProps } from '../../contexts/AuthContext';
import { getUser, updateUser } from '../../api/users';
import { User } from '../../types/User';

export const Profile: React.FC = () => {
  const { logout } = useContext(AuthContext) as AuthContextProps;

  const [userProfile, setUserProfile] = useState<User>({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [initialProfile, setInitialProfile] = useState<User>({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [editableFields, setEditableFields] = useState<{
    [key in keyof Omit<User, 'password'>]: boolean;
  }>({
    name: false,
    surname: false,
    email: false,
    phoneNumber: false,
  });

  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    surname: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phoneNumber: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUser();
        const fetchedProfile = {
          ...response,
          phoneNumber: response.phoneNumber || '',
        };
        setUserProfile(fetchedProfile);
        setInitialProfile(fetchedProfile);
      } catch (error) {
        console.error('Помилка при завантаженні профілю:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleEditable = (field: keyof Omit<User, 'password'>) => {
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

  const handleBlur = (field: keyof Omit<User, 'password'>) => {
    setEditableFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: keyof Omit<User, 'password'>, value: string) => {
    setUserProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
  };

  const handleCancel = () => {
    setUserProfile(initialProfile);
    setEditableFields({
      name: false,
      surname: false,
      email: false,
      phoneNumber: false,
    });
  };

  const handleSave = async () => {
    try {
      const response = await updateUser(userProfile);
      setInitialProfile(userProfile);
      setEditableFields({
        name: false,
        surname: false,
        email: false,
        phoneNumber: false,
      });
      console.log('Профіль успішно оновлено:', response);
    } catch (error) {
      console.error('Помилка при оновленні профілю:', error);
    }
  };

  return (
    <>
      <div className="profile-fullname-block">
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('name')}
          />
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
            ref={inputRefs.name}
            value={userProfile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            disabled={!editableFields.name}
            onBlur={() => handleBlur('name')}
          />
        </div>
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('surname')}
          />
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
            ref={inputRefs.surname}
            value={userProfile.surname}
            onChange={(e) => handleChange('surname', e.target.value)}
            disabled={!editableFields.surname}
            onBlur={() => handleBlur('surname')}
          />
        </div>
      </div>
      <div className="profile-edit-block">
        <img
          src="/icons/edit.svg"
          alt="Edit icon"
          className="edit-icon"
          onClick={() => toggleEditable('email')}
        />
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
          ref={inputRefs.email}
          value={userProfile.email}
          onChange={(e) => handleChange('email', e.target.value)}
          disabled={!editableFields.email}
          onBlur={() => handleBlur('email')}
        />
      </div>
      <div className="profile-edit-block">
        <img
          src="/icons/edit.svg"
          alt="Edit icon"
          className="edit-icon"
          onClick={() => toggleEditable('phoneNumber')}
        />
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
          ref={inputRefs.phoneNumber}
          value={userProfile.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          disabled={!editableFields.phoneNumber}
          onBlur={() => handleBlur('phoneNumber')}
        />
      </div>
      <div className="cabinet-buttons-block">
        <button
          className="logout-button cancel-button secondary-button"
          onClick={logout}
        >
          <img
            src="/icons/logout.svg"
            alt="Logout icon"
            className="logout-icon"
          />
          Вийти
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
