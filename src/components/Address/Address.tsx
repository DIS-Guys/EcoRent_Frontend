import React, { useEffect, useState, useRef } from 'react';
import './Address.css';
import { getUser, updateUserAddress } from '../../api/users';
import { toast } from 'react-toastify';

export const Address: React.FC = () => {
  const [userAddress, setUserAddress] = useState({
    region: '',
    town: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    floorNumber: '',
  });

  const [initialAddress, setInitialAddress] = useState({
    region: '',
    town: '',
    street: '',
    houseNumber: '',
    apartmentNumber: '',
    floorNumber: '',
  });

  const [editableFields, setEditableFields] = useState({
    region: false,
    town: false,
    street: false,
    houseNumber: false,
    apartmentNumber: false,
    floorNumber: false,
  });

  const inputRefs = {
    region: useRef<HTMLInputElement>(null),
    town: useRef<HTMLInputElement>(null),
    street: useRef<HTMLInputElement>(null),
    houseNumber: useRef<HTMLInputElement>(null),
    apartmentNumber: useRef<HTMLInputElement>(null),
    floorNumber: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const user = await getUser();
        const {
          region,
          town,
          street,
          houseNumber,
          apartmentNumber,
          floorNumber,
        } = user;
        const fetchedAddress = {
          region: region || '',
          town: town || '',
          street: street || '',
          houseNumber: houseNumber?.toString() || '',
          apartmentNumber: apartmentNumber?.toString() || '',
          floorNumber: floorNumber?.toString() || '',
        };
        setUserAddress(fetchedAddress);
        setInitialAddress(fetchedAddress);
      } catch {
        toast.error('Помилка при завантаженні адреси', {
          position: 'bottom-right',
        });
      }
    };

    fetchUserAddress();
  }, []);

  const toggleEditable = (field: keyof typeof userAddress) => {
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

  const handleBlur = (field: keyof typeof userAddress) => {
    setEditableFields((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (field: keyof typeof userAddress, value: string) => {
    setUserAddress((prevAddress) => ({ ...prevAddress, [field]: value }));
  };

  const handleCancel = () => {
    setUserAddress(initialAddress);
    setEditableFields({
      region: false,
      town: false,
      street: false,
      houseNumber: false,
      apartmentNumber: false,
      floorNumber: false,
    });
  };

  const validateAddress = () => {
    const errors: string[] = [];


    const startsWithNumber = (value: string) => /^[0-9]/.test(value);
    const containsNumbers = (value: string) => /\d/.test(value);

    if (userAddress.region && containsNumbers(userAddress.region)) {
      errors.push('Поле "Область" не може містити чисел.');
    }

    if (userAddress.region && startsWithNumber(userAddress.region)) {
      errors.push('Поле "Область" не може починатися з цифри.');
    }

    if (userAddress.town && startsWithNumber(userAddress.town)) {
      errors.push('Поле "Місто" не може починатися з цифри.');
    }

    if (userAddress.street && startsWithNumber(userAddress.street)) {
      errors.push('Поле "Вулиця" не може починатися з цифри.');
    }

    if (userAddress.houseNumber && !startsWithNumber(userAddress.houseNumber)) {
      errors.push('Поле "Номер будинку" повинно починатися з цифри.');
    }

    if (userAddress.apartmentNumber && !startsWithNumber(userAddress.apartmentNumber)) {
      errors.push('Поле "Номер квартири" повинно починатися з цифри.');
    }

    return errors;
  };

  const handleSave = async () => {
    const errors = validateAddress();
    if (errors.length > 0) {
      toast.error(`Помилка при завантаженні адреси: ${errors.join('\n- ')}`, {
        position: 'bottom-right',
      });
      return;
    }

    try {
      await updateUserAddress({
        region: userAddress.region,
        town: userAddress.town,
        street: userAddress.street,
        houseNumber: userAddress.houseNumber
          ? parseInt(userAddress.houseNumber, 10)
          : undefined,
        apartmentNumber: userAddress.apartmentNumber
          ? parseInt(userAddress.apartmentNumber, 10)
          : undefined,
        floorNumber: userAddress.floorNumber
          ? parseInt(userAddress.floorNumber, 10)
          : undefined,
      });
      setInitialAddress(userAddress);
      setEditableFields({
        region: false,
        town: false,
        street: false,
        houseNumber: false,
        apartmentNumber: false,
        floorNumber: false,
      });
      toast.success('Адреса успішно оновлена.', {
        position: 'bottom-right',
      });
    } catch {
      toast.error('Помилка при оновленні адреси.', {
        position: 'bottom-right',
      });
    }
  };

  const labels: { [key in keyof typeof userAddress]: string } = {
    region: 'Область',
    town: 'Місто',
    street: 'Вулиця',
    houseNumber: 'Номер будинку',
    apartmentNumber: 'Номер квартири',
    floorNumber: 'Поверх',
  };

  return (
    <>
      <div className="address-page-block">
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('region')}
          />
          <label
            htmlFor="regionInput"
            className="profile-edit-label main-label"
          >
            {labels.region}
          </label>
          <input
            type="text"
            id="regionInput"
            className="profile-edit-input info-input"
            ref={inputRefs.region}
            value={userAddress.region}
            onChange={(e) => handleChange('region', e.target.value)}
            disabled={!editableFields.region}
            onBlur={() => handleBlur('region')}
          />
        </div>
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('town')}
          />
          <label htmlFor="townInput" className="profile-edit-label main-label">
            {labels.town}
          </label>
          <input
            type="text"
            id="townInput"
            className="profile-edit-input info-input"
            ref={inputRefs.town}
            value={userAddress.town}
            onChange={(e) => handleChange('town', e.target.value)}
            disabled={!editableFields.town}
            onBlur={() => handleBlur('town')}
          />
        </div>
      </div>
      <div className="address-page-block">
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('street')}
          />
          <label
            htmlFor="streetInput"
            className="profile-edit-label main-label"
          >
            {labels.street}
          </label>
          <input
            type="text"
            id="streetInput"
            className="profile-edit-input info-input"
            ref={inputRefs.street}
            value={userAddress.street}
            onChange={(e) => handleChange('street', e.target.value)}
            disabled={!editableFields.street}
            onBlur={() => handleBlur('street')}
          />
        </div>
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('houseNumber')}
          />
          <label
            htmlFor="houseNumberInput"
            className="profile-edit-label main-label"
          >
            {labels.houseNumber}
          </label>
          <input
            type="text"
            id="houseNumberInput"
            className="profile-edit-input info-input"
            ref={inputRefs.houseNumber}
            value={userAddress.houseNumber}
            onChange={(e) => handleChange('houseNumber', e.target.value)}
            disabled={!editableFields.houseNumber}
            onBlur={() => handleBlur('houseNumber')}
          />
        </div>
      </div>
      <div className="address-page-block">
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('apartmentNumber')}
          />
          <label
            htmlFor="apartmentNumberInput"
            className="profile-edit-label main-label"
          >
            {labels.apartmentNumber}
          </label>
          <input
            type="text"
            id="apartmentNumberInput"
            className="profile-edit-input info-input"
            ref={inputRefs.apartmentNumber}
            value={userAddress.apartmentNumber}
            onChange={(e) => handleChange('apartmentNumber', e.target.value)}
            disabled={!editableFields.apartmentNumber}
            onBlur={() => handleBlur('apartmentNumber')}
          />
        </div>
        <div className="profile-edit-block">
          <img
            src="/icons/edit.svg"
            alt="Edit icon"
            className="edit-icon"
            onClick={() => toggleEditable('floorNumber')}
          />
          <label htmlFor="floorInput" className="profile-edit-label main-label">
            {labels.floorNumber}
          </label>
          <input
            type="text"
            id="floorInput"
            className="profile-edit-input info-input"
            ref={inputRefs.floorNumber}
            value={userAddress.floorNumber}
            onChange={(e) => handleChange('floorNumber', e.target.value)}
            disabled={!editableFields.floorNumber}
            onBlur={() => handleBlur('floorNumber')}
          />
        </div>
      </div>
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
    </>
  );
};
