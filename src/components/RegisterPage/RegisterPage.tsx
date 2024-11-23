import { useState } from 'react';
import classNames from 'classnames';
import './RegisterPage.css';

export const RegisterPage: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);

  return (
    <div className="register-block">
      {isSignedUp && <img src="/images/ecoflow.png" alt="EcoFlow" />}
      <div
        className={`authentication-block ${
          isSignedUp ? 'log-in-block' : 'sign-up-block'
        }`}
      >
        <div className="authentication-buttons">
          <button
            className={classNames('sign-up-button', 'auth-button', {
              'is-btn-active': !isSignedUp,
            })}
            onClick={() => setIsSignedUp(false)}
          >
            Sign-up
          </button>
          <button
            className={classNames('log-in-button', 'auth-button', {
              'is-btn-active': isSignedUp,
            })}
            onClick={() => setIsSignedUp(true)}
          >
            Log-in
          </button>
        </div>
        <form className="register-form">
          {!isSignedUp && (
            <div className="fullname-block">
              <input
                type="text"
                placeholder="Ім'я"
                className="name auth-input"
              />
              <input
                type="text"
                placeholder="Прізвище"
                className="surname auth-input"
              />
            </div>
          )}
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
          {!isSignedUp && (
            <>
              <input
                type="password"
                placeholder="Підтвердити пароль"
                className="repeat-password auth-input"
              />
              <button type="submit" className="register-button">
                Зареєструватись
              </button>
            </>
          )}
          {isSignedUp && (
            <button type="submit" className="register-button">
              Увійти
            </button>
          )}
        </form>
      </div>
      {!isSignedUp && <img src="/images/ecoflow.png" alt="EcoFlow" />}
    </div>
  );
};
