import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCardPage.css';
import { toast } from 'react-toastify';
import { createPaymentCard } from '../../api/paymentCards.ts';

export const AddCardPage: React.FC = () => {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [ownerName, setOwnerName] = useState('');

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    alert('Була зроблена спроба зберегти картку');

    // Розділення expiryDate на масив [місяць, рік]
    const expiryParts = expiryDate.split('/');
    if (
      expiryParts.length !== 2 ||
      !/^\d{2}$/.test(expiryParts[0]) ||
      !/^\d{2}$/.test(expiryParts[1])
    ) {
      toast.error('Неправильний формат дати. Використовуйте MM/YY.', {
        position: 'bottom-right',
      });
      return;
    }

    try {
      const [month, year] = expiryParts.map(Number); // Перетворюємо в числа
      await createPaymentCard({ ownerId: '', cardNumber, expiryDate: [month, year], ownerName });
      toast.success('Запит відправлено.', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Помилка при відправленні запиту.', {
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
                  onChange={(e) => setCardNumber(e.target.value)} // Оновлення state
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
                  onChange={(e) => setOwnerName(e.target.value)} // Оновлення state
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
