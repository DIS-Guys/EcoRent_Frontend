import './Support.css';

export const Support: React.FC = () => {
  return (
    <div className="gray-container">
      <div className="support-block">
        <div className="support-question-background">
          <p className="support-question">Виникли проблеми або питання?</p>
        </div>
        <form className="support-form">
          <label htmlFor="supportEmail" className="main-label">
            Ваш E-mail
          </label>
          <input
            type="email"
            id="supportEmail"
            className="support-email-input info-input"
            placeholder="example@gmail.com"
          />
          <label htmlFor="supportTextArea" className="main-label">
            Проблема або питання
          </label>
          <textarea
            id="supportTextArea"
            className="support-textarea info-input"
            placeholder="Опишіть свою проблему"
          ></textarea>
          <button className="support-send-button main-button">Відправити</button>
        </form>
      </div>
    </div>
  );
};
