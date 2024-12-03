import './Payment.css';

export const Payment: React.FC = () => {
  return (
    <div className="extra-container">
      <div className="external-container">
        <div className="cards-block">
        <div className="gray-card">
          <div className="yellow-chip"></div>
          <div className="card-info-block">
            <div className="left-block">
              <div className="card-number-block">
                <p className="card-info-text big-input-label">Номер картки</p>
                <input className="big-input" placeholder="4441 8034 1488 2167" />
              </div>
              <div className="owner-name-block">
                <p className="card-info-text big-input-label owner-label">Ім'я власника</p>
                <input className="big-input" placeholder="Stanislav Yukhymenko" />
              </div>
            </div>
            <div className="right-block">

              <div className="expiration-date-block">
                <p className="card-info-text">Місяць/Рік</p>
                <input className="small-input expiration-date" placeholder="09/26" />
              </div>
            </div>
          </div>
        </div>
        <div className="red-card">
          <div className="black-line"></div>
          <div className="cvv-block">
            <p className="cvv-label card-info-text">CVV</p>
            <input className="small-input cvv-input" type="text" placeholder="328" />
          </div>
        </div>
        </div>
        <div className="button-block">
          <button className="cancel-button">Скасувати</button>
          <button className="apply-button">Зберегти</button>
        </div>
      </div>
    </div>
  );
};