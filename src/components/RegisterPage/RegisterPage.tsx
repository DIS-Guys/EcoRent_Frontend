import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './RegisterPage.css';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (login(email, password)) {
      navigate(state?.pathname || '/', { replace: true })
    }
  };

  return (
    <div className="register-block">
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
        <form className="register-form" onSubmit={handleSubmit}>
          {!isSignedUp && (
            <div className="fullname-block">
              <input
                type="text"
                placeholder="Ім'я"
                className="name auth-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <input
                type="text"
                placeholder="Прізвище"
                className="surname auth-input"
                value={surname}
                onChange={(event) => setSurname(event.target.value)}
              />
            </div>
          )}
          <input
            type="email"
            placeholder="E-mail"
            className="email auth-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="password auth-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {!isSignedUp && (
            <>
              <input
                type="password"
                placeholder="Підтвердити пароль"
                className="repeat-password auth-input"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
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
      <img
        className={`register-block-image ${
          isSignedUp
            ? 'register-block-image-left'
            : 'register-block-image-right'
        }`}
        src="/images/ecoflow.png"
        alt="EcoFlow"
      />
    </div>
  );
};
