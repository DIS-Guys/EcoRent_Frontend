import { Link } from 'react-router-dom';
import './Main.css';
import { useEffect, useState } from 'react';

export const Main: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className="main">
      <div className="container">
        <section className="search">
          <div className="search-block">
            <input
              className="main-search"
              type="text"
              placeholder="Який зарядний пристрій шукаєте?"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <Link
              to={searchQuery.trim() ? '/rent' : '.'}
              className="search-button main-button"
              state={{ searchQuery: searchQuery.trim() }}
            >
              <p className="search-button-text">Пошук</p>
              <img src="/icons/white-search.svg" alt="Search" />
            </Link>
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
              безпосередньо у власників за системою peer-to-peer. Це означає, що
              ви можете швидко знайти EcoFlow у вашому районі, домовитися про
              вигідні умови та отримати доступ до чистої енергії, коли це
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
              рішення. Додавайте свої пристрої для оренди або знайдіть EcoFlow,
              який вам підійде.
            </p>
          </article>
        </section>
        <section className="rent">
          <Link
            to="/personal-page/my-devices"
            className="rent-button"
            state={{ from: '/' }}
          >
            Здати в оренду!
          </Link>
          <Link to="/rent" className="rent-button" state={{ from: '/' }}>
            Хочу орендувати!
          </Link>
        </section>
      </div>
    </main>
  );
};
