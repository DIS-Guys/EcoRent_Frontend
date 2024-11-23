import './RegisterPage.css';

export const RegisterPage: React.FC = () => {
  return (
    <div className="register-block">
      <div className="authentication-block">
        <div className="authentication-buttons">
          <button className="sign-up-button auth-button is-btn-active">
            Sign-up
          </button>
          <button className="log-in-button auth-button">Log-in</button>
        </div>
        <form className="register-form">
          <div className="fullname-block">
            <input type="text" placeholder="Ім'я" className="name auth-input" />
            <input
              type="text"
              placeholder="Прізвище"
              className="surname auth-input"
            />
          </div>
          <input
            type="email"
            placeholder="E-mail"
            className="email auth-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="password auth-input"
          />
          <input
            type="password"
            placeholder="Підтвердити пароль"
            className="repeat-password auth-input"
          />
          <button type="submit" className="register-button">
            Зареєструватись
          </button>
        </form>
      </div>
      <img src="/images/ecoflow.png" alt="EcoFlow" />
    </div>
  );
};
