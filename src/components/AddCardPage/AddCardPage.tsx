import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddCardPage.css';
import { toast } from 'react-toastify';
import { addPaymentCard } from '../../api/paymentCards.ts';

export const AddCardPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ownerName, setOwnerName] = useState('');

  const handleCancel = () => {
    navigate(-1);
  };

  const validateCardNumber = (cardNumber: string) => {
    const cardNumberRegex = /^\d{16}$/;
    const cleanedCardNumber = cardNumber.replace(/\s+/g, '');
    return cardNumberRegex.test(cleanedCardNumber);
  };

  const validateExpiryDate = (expiryDate: string) => {
    const expiryParts = expiryDate.split('/');
    if (expiryParts.length !== 2) return;

    const [month, year] = expiryParts.map(Number);
    const currentYear = new Date().getFullYear() % 100;
    return month >= 1 && month <= 12 && year >= currentYear;
  };

  const validateOwnerName = (ownerName: string) => {
    return ownerName.trim().length > 0;
  };

  const handleSave = async () => {
    if (state.cardAmount === 9) {
      toast.error('Не можна додати більше 9 карток.', {
        position: 'bottom-right',
      });
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      toast.error('Номер картки повинен містити 16 цифр.', {
        position: 'bottom-right',
      });
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      toast.error('Неправильний формат дати або термін картки минув.', {
        position: 'bottom-right',
      });
      return;
    }

    if (!validateOwnerName(ownerName)) {
      toast.error("Ім'я власника не може бути порожнім.", {
        position: 'bottom-right',
      });
      return;
    }

    try {
      const expiryParts = expiryDate.split('/');
      const [month, year] = expiryParts.map(Number);
      await addPaymentCard({
        _id: '',
        ownerId: '',
        cardNumber,
        expiryDate: [month, year],
        ownerName,
      });
      navigate('/personal-page/cabinet/payment', { replace: true });
    } catch {
      toast.error('Не вдалося додати картку.', {
        position: 'bottom-right',
      });
    }
  };

  return (
    <>
      <div className="payment-cards-block">
        <div className="gray-card">
          <div className="yellow-chip"></div>
          <div className="payment-card-info-block">
            <div className="payment-card-left-block">
              <div className="payment-card-input-block">
                <label
                  htmlFor="cardNumberInput"
                  className="payment-card-label main-label"
                >
                  Номер картки
                </label>
                <input
                  id="cardNumberInput"
                  className="payment-card-input payment-card-big-input info-input"
                  placeholder="4441 8034 1488 2167"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div className="payment-card-input-block">
                <label
                  htmlFor="ownerNameInput"
                  className="payment-card-label main-label"
                >
                  Ім'я власника
                </label>
                <input
                  id="ownerNameInput"
                  className="payment-card-input payment-card-big-input info-input"
                  placeholder="Taras Shevchenko"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
            </div>
            <div className="payment-card-right-block">
              <div className="payment-card-input-block">
                <label
                  htmlFor="expirationDateInput"
                  className="payment-card-label main-label"
                >
                  Місяць/Рік
                </label>
                <input
                  id="expirationDateInput"
                  className="payment-card-input payment-card-small-input info-input"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="red-card">
          <div className="black-line"></div>
          <div className="payment-card-input-block cvv-block">
            <label htmlFor="cvvInput" className="payment-card-label main-label">
              CVV
            </label>
            <input
              id="cvvInput"
              className="payment-card-input payment-card-small-input info-input"
              type="text"
              placeholder="***"
            />
          </div>
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
