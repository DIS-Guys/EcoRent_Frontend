import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './RentPage.css';
import { DeviceCard } from '../DeviceCard';
import brands from '../../data/brands.json';
import sockets from '../../data/sockets.json';
import { Device } from '../../types/Device';
import { getAllDevices } from '../../api/devices';

export const RentPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchedDevices, setSearchedDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(state?.searchQuery || '');
  const [chosenBrands, setChosenBrands] = useState<string[]>([]);
  const [isBrandsChosen, setIsBrandsChosen] = useState(false);
  const [chosenModels, setChosenModels] = useState<string[]>([]);
  const [sizeRange, setSizeRange] = useState({
    length: 0,
    width: 0,
    height: 0,
  });
  const [chosenConditions, setChosenConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ from: 0, to: Infinity });
  const [chosenBatteryCapacity, setChosenBatteryCapacity] = useState<string[]>(
    []
  );
  const [chosenTypeA, setChosenTypeA] = useState<string[]>([]);
  const [chosenTypeC, setChosenTypeC] = useState<string[]>([]);
  const [chosenSockets, setChosenSockets] = useState<string[]>([]);
  const [chosenBatteryType, setChosenBatteryType] = useState<string[]>([]);
  const [chosenRemoteUse, setChosenRemoteUse] = useState<string[]>([]);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    const getDevices = async () => {
      try {
        const devs = await getAllDevices();
        if (searchQuery) {
          const searchedDevs = devs.filter(({ manufacturer, deviceModel }) =>
            `${manufacturer} ${deviceModel}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase().trim())
          );
          setSearchedDevices(searchedDevs);
        } else {
          setSearchedDevices(devs);
        }
        setDevices(devs);
      } catch (error) {
        console.error(error);
      }
    };
    getDevices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsBrandsChosen(chosenBrands.length !== 0);
  }, [chosenBrands]);

  const handleSearch = useCallback(
    (query: string) => {
      if (!query.trim()) return;
      navigate('.', { replace: true, state: {} });

      const searchedDevs = devices.filter(({ manufacturer, deviceModel }) =>
        `${manufacturer} ${deviceModel}`
          .toLowerCase()
          .includes(query.toLowerCase().trim())
      );
      setSearchedDevices(searchedDevs);
    },
    [devices, navigate]
  );

  useEffect(() => {
    if (!searchQuery.trim()) {
      navigate('.', { replace: true, state: {} });
      setSearchedDevices(devices);
    }
  }, [devices, navigate, searchQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCheckboxChange = (
    filterValue: string,
    setValue: (value: React.SetStateAction<string[]>) => void
  ) => {
    setValue((prev) =>
      prev.includes(filterValue)
        ? prev.filter((b) => b !== filterValue)
        : [...prev, filterValue]
    );
  };

  const handleSizeChange = (
    dimension: 'length' | 'width' | 'height',
    value: number
  ) => {
    setSizeRange((prev) => ({ ...prev, [dimension]: value }));
  };

  const checkBatteryCapacity = (capacity: number, range: string) => {
    if (range === '500-') return capacity < 500;
    if (range === '500-1000') return capacity >= 500 && capacity <= 1000;
    if (range === '1001-2000') return capacity >= 1001 && capacity <= 2000;
    if (range === '2001-3000') return capacity >= 2001 && capacity <= 3000;
    if (range === '3000+') return capacity > 3000;
  };

  const checkSockets = (amount: number, number: string) => {
    if (number === '1') return amount === 1;
    if (number === '2') return amount === 2;
    if (number === '3') return amount === 3;
    if (number === '4') return amount >= 4;
  };

  const handlePriceChange = (from: number, to: number) => {
    setPriceRange({ from, to });
  };

  const updateChosenModels = () => {
    const currentBrands = chosenBrands.map((brand) =>
      brands.find((b) => b.name === brand)
    );

    setChosenModels((prev) =>
      prev.filter((model) =>
        currentBrands.some((brand) => brand?.models.includes(model))
      )
    );
  };

  useEffect(updateChosenModels, [chosenBrands]);

  const applyFilters = () => {
    const filtered = searchedDevices.filter((device) => {
      const matchesBrand =
        chosenBrands.length === 0 || chosenBrands.includes(device.manufacturer);
      const matchesModel =
        chosenModels.length === 0 || chosenModels.includes(device.deviceModel);
      const matchesCondition =
        chosenConditions.length === 0 ||
        chosenConditions.includes(device.condition);
      const matchesPrice =
        device.price >= priceRange.from && device.price <= priceRange.to;
      const matchesBatteryCapacity =
        chosenBatteryCapacity.length === 0 ||
        chosenBatteryCapacity.some((range) =>
          checkBatteryCapacity(device.batteryCapacity, range)
        );
      const matchesSocket =
        chosenSockets.length === 0 ||
        chosenSockets.some((socket) => checkSockets(device.sockets, socket));
      const matchesTypeA =
        chosenTypeA.length === 0 ||
        chosenTypeA.some((usb) => checkSockets(device.typeA, usb));
      const matchesTypeC =
        chosenTypeC.length === 0 ||
        chosenTypeC.some((usb) => checkSockets(device.typeC, usb));
      const matchesBatteryType =
        chosenBatteryType.length === 0 ||
        chosenBatteryType.includes(device.batteryType);
      const matchesRemoteUse =
        chosenRemoteUse.length === 0 ||
        chosenRemoteUse.includes(device.remoteUse);
      const matchesSize =
        (!sizeRange.length || +device.dimensions.length === sizeRange.length) &&
        (!sizeRange.width || +device.dimensions.width === sizeRange.width) &&
        (!sizeRange.height || +device.dimensions.height === sizeRange.height);

      return (
        matchesBrand &&
        matchesModel &&
        matchesCondition &&
        matchesPrice &&
        matchesBatteryCapacity &&
        matchesSocket &&
        matchesTypeA &&
        matchesTypeC &&
        matchesBatteryType &&
        matchesRemoteUse &&
        matchesSize
      );
    });
    setFilteredDevices(filtered);
  };

  useEffect(applyFilters, [
    chosenBatteryCapacity,
    chosenBatteryType,
    chosenBrands,
    chosenConditions,
    chosenModels,
    chosenRemoteUse,
    chosenSockets,
    chosenTypeA,
    chosenTypeC,
    devices,
    priceRange.from,
    priceRange.to,
    searchedDevices,
    sizeRange.height,
    sizeRange.length,
    sizeRange.width,
  ]);

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
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="search-button main-button"
              onClick={() => handleSearch(searchQuery)}
            >
              <span className="search-button-text">Пошук</span>
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
                    id={brand.name.split(' ').join('-')}
                    className="filter-checkbox"
                    checked={chosenBrands.includes(brand.name)}
                    onChange={() =>
                      handleCheckboxChange(brand.name, setChosenBrands)
                    }
                  />
                  <label
                    htmlFor={brand.name.split(' ').join('-')}
                    className="option-text"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Модель</h2>
              {isBrandsChosen ? (
                brands
                  .filter((brand) => chosenBrands.includes(brand.name))
                  .map((brand) =>
                    brand.models.map((model) => (
                      <div className="filter-option" key={model}>
                        <input
                          id={model.split(' ').join('-')}
                          type="checkbox"
                          className="filter-checkbox"
                          checked={chosenModels.includes(model)}
                          onChange={() =>
                            handleCheckboxChange(model, setChosenModels)
                          }
                        />
                        <label
                          htmlFor={model.split(' ').join('-')}
                          className="option-text"
                        >
                          {model}
                        </label>
                      </div>
                    ))
                  )
              ) : (
                <p className="option-text">Оберіть виробника</p>
              )}
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Розмір</h2>
              <div className="size-fields">
                <input
                  type="number"
                  className="size-input"
                  onChange={(e) =>
                    handleSizeChange('length', Number(e.target.value))
                  }
                />
                <p className="cross">×</p>
                <input
                  type="number"
                  className="size-input"
                  onChange={(e) =>
                    handleSizeChange('width', Number(e.target.value))
                  }
                />
                <p className="cross">×</p>
                <input
                  type="number"
                  className="size-input"
                  onChange={(e) =>
                    handleSizeChange('height', Number(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Стан</h2>
              <div className="filter-option">
                <input
                  id="new"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenConditions.includes('Новий')}
                  onChange={() =>
                    handleCheckboxChange('Новий', setChosenConditions)
                  }
                />
                <label htmlFor="new" className="option-text">
                  Новий
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="used"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenConditions.includes('Вживаний')}
                  onChange={() =>
                    handleCheckboxChange('Вживаний', setChosenConditions)
                  }
                />
                <label htmlFor="used" className="option-text">
                  Вживаний
                </label>
              </div>
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Ємність батареї</h2>
              <div className="filter-option">
                <input
                  id="500-"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryCapacity.includes('500-')}
                  onChange={() =>
                    handleCheckboxChange('500-', setChosenBatteryCapacity)
                  }
                />
                <label htmlFor="500-" className="option-text">
                  Менше 500 Вт·год
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="500-1000"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryCapacity.includes('500-1000')}
                  onChange={() =>
                    handleCheckboxChange('500-1000', setChosenBatteryCapacity)
                  }
                />
                <label htmlFor="500-1000" className="option-text">
                  500 - 1000 Вт·год
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="1001-2000"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryCapacity.includes('1001-2000')}
                  onChange={() =>
                    handleCheckboxChange('1001-2000', setChosenBatteryCapacity)
                  }
                />
                <label htmlFor="1001-2000" className="option-text">
                  1001 - 2000 Вт·год
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="2001-3000"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryCapacity.includes('2001-3000')}
                  onChange={() =>
                    handleCheckboxChange('2001-3000', setChosenBatteryCapacity)
                  }
                />
                <label htmlFor="2001-3000" className="option-text">
                  2001 - 3000 Вт·год
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="3000+"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryCapacity.includes('3000+')}
                  onChange={() =>
                    handleCheckboxChange('3000+', setChosenBatteryCapacity)
                  }
                />
                <label htmlFor="3000+" className="option-text">
                  Більше 3000 Вт·год
                </label>
              </div>
            </div>
            {sockets.map((socket) => (
              <div className="filter-section" key={socket.title}>
                <h2 className="filter-subtitle">{socket.title}</h2>
                {socket.amounts.map((amount) => (
                  <div className="filter-option" key={amount.id}>
                    <input
                      id={`${amount.id}`}
                      type="checkbox"
                      className="filter-checkbox"
                      checked={
                        (socket.title === 'Кількість розеток' &&
                          chosenSockets.includes(`${amount.number}`)) ||
                        (socket.title === 'USB-Type A' &&
                          chosenTypeA.includes(`${amount.number}`)) ||
                        (socket.title === 'USB-Type C' &&
                          chosenTypeC.includes(`${amount.number}`))
                      }
                      onChange={() => {
                        if (socket.title === 'Кількість розеток') {
                          return handleCheckboxChange(
                            `${amount.number}`,
                            setChosenSockets
                          );
                        }
                        if (socket.title === 'USB-Type A') {
                          return handleCheckboxChange(
                            `${amount.number}`,
                            setChosenTypeA
                          );
                        }
                        return handleCheckboxChange(
                          `${amount.number}`,
                          setChosenTypeC
                        );
                      }}
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
                  id="LiFePO4"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryType.includes('LiFePO4')}
                  onChange={() =>
                    handleCheckboxChange('LiFePO4', setChosenBatteryType)
                  }
                />
                <label htmlFor="LiFePO4" className="option-text">
                  LiFePO4
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="Li-ion"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryType.includes('Li-ion')}
                  onChange={() =>
                    handleCheckboxChange('Li-ion', setChosenBatteryType)
                  }
                />
                <label htmlFor="Li-ion" className="option-text">
                  Li-ion
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="Li-pol"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenBatteryType.includes('Li-pol')}
                  onChange={() =>
                    handleCheckboxChange('Li-pol', setChosenBatteryType)
                  }
                />
                <label htmlFor="Li-pol" className="option-text">
                  Li-pol
                </label>
              </div>
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Віддалене користування</h2>
              <div className="filter-option">
                <input
                  id="Wi-Fi"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenRemoteUse.includes('Wi-Fi')}
                  onChange={() =>
                    handleCheckboxChange('Wi-Fi', setChosenRemoteUse)
                  }
                />
                <label htmlFor="Wi-Fi" className="option-text">
                  Wi-Fi
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="Bluetooth"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenRemoteUse.includes('Bluetooth')}
                  onChange={() =>
                    handleCheckboxChange('Bluetooth', setChosenRemoteUse)
                  }
                />
                <label htmlFor="Bluetooth" className="option-text">
                  Bluetooth
                </label>
              </div>
              <div className="filter-option">
                <input
                  id="Немає"
                  type="checkbox"
                  className="filter-checkbox"
                  checked={chosenRemoteUse.includes('Немає')}
                  onChange={() =>
                    handleCheckboxChange('Немає', setChosenRemoteUse)
                  }
                />
                <label htmlFor="Немає" className="option-text">
                  Немає
                </label>
              </div>
            </div>
            <div className="filter-section">
              <h2 className="filter-subtitle">Ціна</h2>
              <div className="price-filter">
                <label className="option-text" htmlFor="priceFrom">
                  Від
                </label>
                <input
                  type="number"
                  className="price-field"
                  id="priceFrom"
                  onChange={(e) =>
                    handlePriceChange(Number(e.target.value), priceRange.to)
                  }
                />
                <label className="option-text" htmlFor="priceTo">
                  До
                </label>
                <input
                  type="number"
                  className="price-field"
                  id="priceTo"
                  onChange={(e) =>
                    handlePriceChange(priceRange.from, Number(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="devices-block">
          <div className="cards-block">
            {filteredDevices.map((device) => (
              <DeviceCard
                key={device._id}
                id={device._id}
                mainImage={device.images[0].url}
                brand={device.manufacturer}
                model={device.deviceModel}
                price={device.price}
                location={device.ownerId.town || 'Без локації'}
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
