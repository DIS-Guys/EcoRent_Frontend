import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <a className="logo-link" href="/">
                <img className="logo" src="/icons/logo.svg" alt="Logo" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Головна
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Орендувати
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Для власників
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                Підтримка
              </a>
            </li>
          </ul>
        </nav>
        <div className="icon-block">
          <a href="/" className="icon-link search-icon-link">
            <img src="/icons/search.svg" alt="Search" />
          </a>
          <a href="/" className="icon-link profile-icon-link">
            <img src="/icons/profile.svg" alt="Profile" />
          </a>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <section className="search">
            <div className="search-block">
              <input
                className="main-search"
                type="text"
                placeholder="Який зарядний пристрій шукаєте?"
              />
              <button className="search-button">
                <p className="search-button-text">Пошук</p>
                <img src="/icons/white-search.svg" alt="Search" />
              </button>
            </div>
          </section>
          <section className="about-us">
            <article className="about-us-header">
              <p className="about-us-header-text">
                Орендуйте EcoFlow швидко та вигідно за системою peer-to-peer
              </p>
              <img src="/images/ecoflows-1.png" alt="Charging stations" />
            </article>
            <article className="about-us-detailed">
              <p className="about-us-detailed-text">
                Ми надаємо можливість орендувати портативні зарядні станції
                безпосередньо у власників за системою peer-to-peer. Це означає,
                що ви можете швидко знайти EcoFlow у вашому районі, домовитися
                про вигідні умови та отримати доступ до чистої енергії, коли це
                потрібно найбільше.
              </p>
              <div className="blue-triangle"></div>
              <img src="/images/rent.png" alt="Rent picture" />
            </article>
            <article className="about-us-service">
              <img src="/images/ecoflows-2.png" alt="Charging stations" />
              <div className="white-triangle"></div>
              <p className="about-us-service-text">
                Наш сервіс допомагає економити кошти, зберігати довкілля та
                підтримувати спільноту, яка використовує інноваційні енергетичні
                рішення. Додавайте свої пристрої для оренди або знайдіть
                EcoFlow, який вам підійде.
              </p>
            </article>
          </section>
          <section className="rent">
            <button className="rent-button">Хочу орендувати!</button>
            <button className="rent-button">Здати в оренду!</button>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="contact-us">
          <h2 className="contact-us-header">Зв'яжіться з нами</h2>
          <p className="contact-us-text">
            Якщо у вас є питання, пропозиції або вам потрібна додаткова
            інформація, будь ласка, звертайтеся до нас. Ми прагнемо забезпечити
            найкращий сервіс для вас!
          </p>
        </div>
        <div className="our-contacts">
          <div className="contact-block email-block">
            <p className="contact-option">E-mail</p>
            <p className="contact-value">example@gmail.com</p>
          </div>
          <div className="contact-block phone-block">
            <p className="contact-option">Телефон</p>
            <p className="contact-value">+38 095 228 1337</p>
          </div>
          <div className="contact-block address-block">
            <p className="contact-option">Адреса</p>
            <p className="contact-value">м. Київ, вул. Червоних ліхтарів, 52</p>
          </div>
          <div className="socials">
            <a className="socials-link" href="/">
              <img src="/icons/youtube.svg" alt="YouTube" />
            </a>
            <a className="socials-link" href="/">
              <img src="/icons/instagram.svg" alt="Instagram" />
            </a>
            <a className="socials-link" href="/">
              <img src="/icons/facebook.svg" alt="Facebook" />
            </a>
            <a className="socials-link" href="/">
              <img src="/icons/twitter.svg" alt="Twitter" />
            </a>
            <a className="socials-link" href="/">
              <img src="/icons/linkedin.svg" alt="LinkedIn" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
