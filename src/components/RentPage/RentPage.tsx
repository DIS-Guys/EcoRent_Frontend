import './RentPage.css';
import { DeviceCard } from '../DeviceCard/DeviceCard.tsx';

export const RentPage: React.FC = () => {
  return (
    <div className="rent-container">
      <div className="search">
        <div className="search-block rent-search-block">
          <input
            className="main-search"
            type="text"
            placeholder="Який зарядний пристрій шукаєте?"
          />
          <button className="search-button main-button">
            <p className="search-button-text">Пошук</p>
            <img src="/icons/white-search.svg" alt="Search" />
          </button>
        </div>
      </div>
      <div className="content-block">
        <div className="filter-block">
          <h1 className="filter-title">Фільтри</h1>
          <div className="filter-section">
            <h2 className="filter-subtitle">Виробник</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" id="EcoFlow" />
              <label htmlFor="EcoFlow" className="option-text">
                EcoFlow
              </label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" id="Bluetti" />
              <label htmlFor="Bluetti" className="option-text">
                Bluetti
              </label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" id="Jackery" />
              <label htmlFor="Jackery" className="option-text">
                Jackery
              </label>
            </div>
            <div className="filter-option">
              <input
                type="checkbox"
                className="filter-checkbox"
                id="Choetech"
              />
              <label htmlFor="Choetech" className="option-text">
                Choetech
              </label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" id="Anker" />
              <label htmlFor="Anker" className="option-text">
                Anker
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">Модель</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Модель 1</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Модель 2</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Модель 3</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Модель 4</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Модель 5</label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">Розмір</h2>
            <div className="size-fields">
              <input type="number" className="size-input" />
              <p className="cross">×</p>
              <input type="number" className="size-input" />
              <p className="cross">×</p>
              <input type="number" className="size-input" />
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">Стан</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Новий</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Б/в</label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">Кількість розеток</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">1 роз'єм</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">2 роз'єми</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">3 роз'єми</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Більше 4 роз'ємів</label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">USB-Type A</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">1 роз'єм</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">2 роз'єми</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">3 роз'єми</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Більше 4 роз'ємів</label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">USB-Type C</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">1 роз'єм</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">2 роз'єми</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">3 роз'єми</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Більше 4 роз'ємів</label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">Тип акумулятора</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">SLA</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">EFB</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">GEL</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">AGM</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Li-Ion</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Li-Pol</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">LiFePO4</label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">Віддалене користування</h2>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">WI-FI</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Bluetooth</label>
            </div>
            <div className="filter-option">
              <input type="checkbox" className="filter-checkbox" />
              <label className="option-text">Відсутнє</label>
            </div>
          </div>

          <div className="filter-section">
            <h2 className="filter-subtitle">Ціна</h2>
            <div className="price-filter">
              <label className="option-text" htmlFor="priceFrom">
                Від
              </label>
              <input type="number" className="price-field" id="priceFrom" />
              <label className="option-text" htmlFor="priceTo">
                До
              </label>
              <input type="number" className="price-field" id="priceTo" />
            </div>
          </div>

          <button className="filter-button main-button">Застосувати</button>
        </div>

        <div className="devices-block">
          <div className="cards-block">
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
            <DeviceCard />
          </div>
          <div className="navigation-block">
            <button className="arrow">
              <img src="./icons/leftarrow.svg" />
            </button>
            <div className="page-number">1</div>
            <div className="page-number">2</div>
            <div className="page-number">3</div>
            <div className="page-number">4</div>
            <div className="page-number">5</div>
            <div className="page-number">6</div>
            <div className="page-number">7</div>
            <div className="page-number">8</div>
            <div className="page-number">...</div>
            <div className="page-number">14</div>
            <button className="arrow">
              <img src="./icons/rightarrow.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
