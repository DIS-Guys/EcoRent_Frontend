import { useNavigate } from 'react-router-dom';
import './AddCardPage.css';
import { toast } from 'react-toastify';
import { createPaymentCard } from '../../api/paymentCards.ts';

export const AddCardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    alert("Була зроблена спроба зберегти картку")
    try {
      await createPaymentCard({ cardNumber, expiryDate, ownerName });
      toast.success('Запит відправлено.', {
        position: 'bottom-right',
      });
    } catch (error) {
      toast.error('Помилка при відправленні запиту.', {
        position: 'bottom-right',
      });
    }
  }

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
                  placeholder="09/26"
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
              placeholder="328"
              disabled
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
        <button
          className="save-button main-button"
          onClick={handleSave}
        >
          Зберегти
        </button>
      </div>
    </>
  );
};
