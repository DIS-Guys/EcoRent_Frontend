import { useEffect, useState } from 'react';
import './RentPage.css';
import { DeviceCard } from '../DeviceCard';
import brands from '../../data/brands.json';
import sockets from '../../data/sockets.json';
import { Device } from '../../types/Device';
import { getAllDevices } from '../../api/devices';

export const RentPage: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [chosenBrands, setChosenBrands] = useState(['EcoFlow']);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devs = await getAllDevices();
        setDevices(devs);
      } catch (error) {
        console.error(error);
      }
    };
    getDevices();
  }, []);

  return (
    <div className="rent-container">
      <div className="sticky-block">
        <h1 className="filter-title">Фільтри</h1>
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
      </div>

      <div className="content-block">
        <div className="filter-block">
          <div className="filter-content">
            <div className="filter-section">
              <h2 className="filter-subtitle">Виробник</h2>
              {brands.map((brand) => (
                <div className="filter-option" key={brand.name}>
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    id={`${brand.name}`}
                  />
                  <label htmlFor={`${brand.name}`} className="option-text">
                    {`${brand.name}`}
                  </label>
                </div>
              ))}
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Модель</h2>
              {brands
                .filter((brand) => chosenBrands.includes(brand.name))
                .map((brand) =>
                  brand.models.map((model) => (
                    <div className="filter-option" key={model}>
                      <input
                        id={`${model}`}
                        type="checkbox"
                        className="filter-checkbox"
                      />
                      <label htmlFor={`${model}`} className="option-text">
                        {model}
                      </label>
                    </div>
                  ))
                )}
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
                <input id="new" type="checkbox" className="filter-checkbox" />
                <label htmlFor="new" className="option-text">
                  Новий
                </label>
              </div>
              <div className="filter-option">
                <input id="used" type="checkbox" className="filter-checkbox" />
                <label htmlFor="used" className="option-text">
                  Б/в
                </label>
              </div>
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Ємність батареї</h2>
              <div className="filter-option">
                <input id="500-" type="checkbox" className="filter-checkbox" />
                <label htmlFor="500-" className="option-text">
                  Менше 500 кВт·год
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="500-1000"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="500-1000" className="option-text">
                  500 - 1000 кВт·год
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="1001-2000"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="1001-2000" className="option-text">
                  1001 - 2000 кВт·год
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="2001 - 3000"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="2001 - 3000" className="option-text">
                  2001 - 3000 кВт·год
                </label>
              </div>
              <div className="filter-option">
                <input id="3000+" type="checkbox" className="filter-checkbox" />
                <label htmlFor="3000+" className="option-text">
                  Більше 3000 кВт·год
                </label>
              </div>
            </div>
            {sockets.map((socket) => (
              <div className="filter-section" key={socket.title}>
                <h2 className="filter-subtitle">{socket.title}</h2>
                {socket.amounts.map((amount) => (
                  <div className="filter-option" key={`${amount.id}`}>
                    <input
                      id={`${amount.id}`}
                      type="checkbox"
                      className="filter-checkbox"
                    />
                    <label htmlFor={`${amount.id}`} className="option-text">
                      {amount.title}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <div className="filter-section">
              <h2 className="filter-subtitle">Тип акумулятора</h2>
              <div className="filter-option">
                <input
                  id="lifepo4"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="lifepo4" className="option-text">
                  LiFePO4
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="li-ion"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="li-ion" className="option-text">
                  Li-Ion
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="li-pol"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="li-pol" className="option-text">
                  Li-Pol
                </label>
              </div>
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Віддалене користування</h2>
              <div className="filter-option">
                <input id="wi-fi" type="checkbox" className="filter-checkbox" />
                <label htmlFor="wi-fi" className="option-text">
                  WI-FI
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="bluetooth"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="bluetooth" className="option-text">
                  Bluetooth
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="missing"
                  type="checkbox"
                  className="filter-checkbox"
                />
                <label htmlFor="missing" className="option-text">
                  Відсутнє
                </label>
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
          </div>

          <div className="filter-button-wrapper">
            <button className="filter-button main-button">Застосувати</button>
          </div>
        </div>

        <div className="devices-block">
          <div className="cards-block">
            {devices.map((device) => (
              <DeviceCard
                key={device._id}
                id={device._id}
                mainImage={device.images[0]}
                brand={device.manufacturer}
                model={device.deviceModel}
                price={device.price}
                location={device.ownerId.town}
              />
            ))}
          </div>
          <div className="navigation-block">
            <button className="arrow">
              <img src="./icons/leftarrow.svg" alt="Previous page" />
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
              <img src="./icons/rightarrow.svg" alt="Next page" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
