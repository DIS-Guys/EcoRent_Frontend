import './Support.css';

export const Support: React.FC = () => {
  return (
    <div className="support-background">
      <div className="support-back">
        <div className="question-background">
          <p className="question">Виникли проблеми або питання?</p>
        </div>
        <form action="" className="input-form">
          <label htmlFor="email" className="email-label">
            Ваш E-mail
          </label>
          <input
            type="email"
            id="email"
            className="email-input"
            placeholder="example@email.com"
          />
          <label htmlFor="problem-textarea" className="problem-label">
            Проблема або питання
          </label>
          <textarea
            id="problem-textarea"
            className="problem-textarea"
            placeholder="Опишіть свою проблему"
          ></textarea>
          <button className="send-button">Відправити</button>
        </form>
      </div>
    </div>
  );
};
