import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import './RegisterPage.css';
import { AuthContext, AuthContextProps } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export const RegisterPage: React.FC = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { login, register } = useContext(AuthContext) as AuthContextProps;

  const validateRegisterFields = () => {
    const errors = [];

    if (!isSignedUp && !name.trim()) errors.push("Ім'я обов'язкове.");
    if (!isSignedUp && !surname.trim()) errors.push("Прізвище обов'язкове.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push('Невірний формат e-mail.');

    if (password.length < 6) {
      errors.push('Пароль має містити щонайменше 6 символів.');
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      errors.push('Пароль має містити щонайменше одну літеру та одну цифру.');
    }

    if (!isSignedUp && password !== repeatPassword) {
      errors.push('Паролі не співпадають.');
    }

    if (errors.length > 0) {
      toast.error(`Поля заповнені невірно: ${errors.join('\n')}`, {
        position: 'bottom-right',
      });
      return false;
    }

    toast.success('Валідація пройшла успішно!', {
      position: 'bottom-right',
    });
    return true;
  };

  const validateLoginFields = () => {
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push('Невірний формат e-mail.');

    if (errors.length > 0) {
      toast.error(`Поля заповнені невірно: ${errors.join('\n')}`, {
        position: 'bottom-right',
      });
      return false;
    }

    toast.success('Валідація пройшла успішно!', {
      position: 'bottom-right',
    });
    return true;
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateLoginFields()) return;
    login(email, password);
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateRegisterFields()) return;
    register(name, surname, email, password);
  };

  return (
    <div className="register-block gray-container">
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
        <form
          className="register-form"
          onSubmit={!isSignedUp ? handleRegister : handleLogin}
        >
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
              <button type="submit" className="register-button main-button">
                Зареєструватись
              </button>
            </>
          )}
          {isSignedUp && (
            <button type="submit" className="register-button main-button">
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
