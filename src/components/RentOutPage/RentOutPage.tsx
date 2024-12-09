import './RentOutPage.css';
import '../../App.css';

export const RentOutPage: React.FC = () => {
  return (
    <>
      <div className="add-announcement-block">
        <div className="add-announcement-polygon"></div>
        <h1 className="add-announcement-text">Додати оголошення</h1>
      </div>
      <form className="rent-out-page-form">
        <div className="rent-out-page-main-block">
          <div className="step-block">
            <div className="step-number-block">
              <span className="step-number">1</span>
            </div>
            <p className="step-title">Додайте фотографії пристрою</p>
          </div>
          <div className="choose-image-block rent-out-page-secondary-block">
            <button className="choose-image-button main-button">
              Обрати фото
            </button>
            <div className="rent-out-page-images-block">
              {Array.from({ length: 3 }, (_, i) => (
                <div className="rent-out-page-image-placeholder" key={i}>
                  <img
                    src="/icons/device-placeholder.svg"
                    alt="Device image placeholder"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rent-out-page-main-block">
          <div className="step-block step-block-with-tip">
            <div className="step-number-block">
              <span className="step-number">2</span>
            </div>
            <div className="step-title-block">
              <p className="step-title">Опис пристрою від власника</p>
              <p className="step-tip">
                Додайте заголовок і короткий опис пристрою
              </p>
            </div>
          </div>
          <div className="rent-out-page-description rent-out-page-secondary-block">
            <div className="rent-out-page-device-info">
              <label htmlFor="deviceTitleInput" className="rent-out-page-label">
                Заголовок оголошення
              </label>
              <input
                id="deviceTitleInput"
                type="text"
                placeholder="Введіть назву оголошення"
                className="rent-out-page-title-input info-input"
              />
            </div>
            <div className="rent-out-page-device-info">
              <label
                htmlFor="deviceDescriptionTextarea"
                className="rent-out-page-label"
              >
                Опис від власника
              </label>
              <textarea
                id="deviceDescriptionTextarea"
                placeholder="Опишіть пристрій (Опціонально)"
                className="rent-out-description-textarea rent-out-textarea info-input"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="rent-out-page-main-block">
          <div className="step-block step-block-with-tip">
            <div className="step-number-block">
              <span className="step-number">3</span>
            </div>
            <div className="step-title-block">
              <p className="step-title">Характеристики пристрою</p>
              <p className="step-tip">
                Додайте фактичні характеристики пристрою
              </p>
            </div>
          </div>
          <div className="rent-out-page-characteristics rent-out-page-secondary-block">
            <div className="rent-out-chars-main-section">
              <div className="rent-out-chars">
                <div className="rent-out-char-block">
                  <label
                    htmlFor="manufacturerSelect"
                    className="rent-out-char-label"
                  >
                    Виробник
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="manufacturerSelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть виробника
                      </option>
                      <option value="manufacturer1">Виробник 1</option>
                      <option value="manufacturer2">Виробник 2</option>
                      <option value="manufacturer3">Виробник 3</option>
                    </select>
                  </div>
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="conditionSelect"
                    className="rent-out-char-label"
                  >
                    Стан
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="conditionSelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть стан
                      </option>
                      <option value="new">Новий</option>
                      <option value="used">Вживаний</option>
                    </select>
                  </div>
                </div>
                <div className="rent-out-char-block">
                  <label htmlFor="weightInput" className="rent-out-char-label">
                    Вага
                  </label>
                  <input
                    type="number"
                    id="weightInput"
                    className="char-input info-input"
                    placeholder="Вкажіть вагу (кг)"
                  />
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="usbTypeASelect"
                    className="rent-out-char-label"
                  >
                    USB-Type A
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="usbTypeASelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть кількість роз'ємів
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="socketCountSelect"
                    className="rent-out-char-label"
                  >
                    Кількість розеток
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="socketCountSelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть кількість розеток
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="signalShapeSelect"
                    className="rent-out-char-label"
                  >
                    Форма вихідного сигналу
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="signalShapeSelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть форму сигналу
                      </option>
                      <option value="sine">Чиста синусоїда</option>
                      <option value="modified">Модифікована синусоїда</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="rent-out-chars">
                <div className="rent-out-char-block">
                  <label htmlFor="modelSelect" className="rent-out-char-label">
                    Модель
                  </label>
                  <div className="custom-select-container">
                    <select id="modelSelect" className="char-select info-input">
                      <option value="" disabled selected>
                        Оберіть модель
                      </option>
                      <option value="model1">Модель 1</option>
                      <option value="model2">Модель 2</option>
                      <option value="model3">Модель 3</option>
                    </select>
                  </div>
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="batteryCapacityInput"
                    className="rent-out-char-label"
                  >
                    Ємність батареї
                  </label>
                  <input
                    type="number"
                    id="batteryCapacityInput"
                    className="char-input info-input"
                    placeholder="Вкажіть ємність (кВт·год)"
                  />
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="dimensionsInput"
                    className="rent-out-char-label"
                  >
                    Розміри
                  </label>
                  <input
                    type="number"
                    id="dimensionsInput"
                    className="char-input info-input"
                    placeholder="Вкажіть розміри"
                  />
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="usbTypeCSelect"
                    className="rent-out-char-label"
                  >
                    USB-Type C
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="usbTypeCSelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть кількість роз'ємів
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="batteryTypeSelect"
                    className="rent-out-char-label"
                  >
                    Тип акумулятора
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="batteryTypeSelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть тип акумулятора
                      </option>
                      <option value="LiFePO4">LiFePO4</option>
                      <option value="Li-ion">Li-ion</option>
                      <option value="Li-pol">Li-pol</option>
                    </select>
                  </div>
                </div>
                <div className="rent-out-char-block">
                  <label
                    htmlFor="remoteControlSelect"
                    className="rent-out-char-label"
                  >
                    Віддалене користування
                  </label>
                  <div className="custom-select-container">
                    <select
                      id="remoteControlSelect"
                      className="char-select info-input"
                    >
                      <option value="" disabled selected>
                        Оберіть спосіб
                      </option>
                      <option value="None">Немає</option>
                      <option value="Wi-Fi">Wi-Fi</option>
                      <option value="Bluetooth">Bluetooth</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="rent-out-additional-characteristics">
              <div className="rent-out-char-block">
                <label
                  htmlFor="additionalCharsField"
                  className="rent-out-char-label"
                >
                  Додатково
                </label>
                <textarea
                  id="additionalCharsField"
                  placeholder="Поле для додаткової інформації про характеристики"
                  className="rent-out-additional-info-textarea rent-out-textarea info-input"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="rent-out-page-main-block">
          <div className="step-block">
            <div className="step-number-block">
              <span className="step-number">4</span>
            </div>
            <p className="step-title">Вартість</p>
          </div>
          <div className="rent-out-price-section rent-out-page-secondary-block">
            <div className="rent-out-price-section-block">
              <label htmlFor="priceInput" className="rent-out-page-label">
                Ціна
              </label>
              <div className="rent-out-price-section-box">
                <input
                  id="priceInput"
                  type="number"
                  className="rent-out-price-section-input info-input"
                />
                <p className="rent-out-price-section-units">грн/добу</p>
              </div>
            </div>
            <div className="rent-out-price-section-block">
              <label htmlFor="minRentTermInput" className="rent-out-page-label">
                Мінімальна тривалість оренди
              </label>
              <div className="rent-out-price-section-box">
                <input
                  id="minRentTermInput"
                  type="number"
                  className="rent-out-price-section-input info-input"
                />
                <p className="rent-out-price-section-units">діб</p>
              </div>
            </div>
            <div className="rent-out-price-section-block">
              <label htmlFor="maxRentTermInput" className="rent-out-page-label">
                Максимальна тривалість оренди
              </label>
              <div className="rent-out-price-section-box">
                <input
                  id="maxRentTermInput"
                  type="number"
                  className="rent-out-price-section-input info-input"
                />
                <p className="rent-out-price-section-units">діб</p>
              </div>
            </div>
          </div>
          <div className="rent-out-submit-block rent-out-page-secondary-block">
            <div className="policy-agreement-block">
              <input type="checkbox" className="policy-agreement-checkbox" />
              <p className="policy-agreement-text">
                Я згоден з умовами надання послуг
              </p>
            </div>
            <button type="submit" className="put-on-rent-button main-button">
              Розмістити оголошення
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
