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
          </section>
          <section className="rent"></section>
        </div>
      </main>
    </>
  );
};

export default App;
