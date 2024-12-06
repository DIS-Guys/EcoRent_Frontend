import './RentOutPage.css';
import '../../App.css';

export const RentOutPage: React.FC = () => {
  return (
    <>
      <div className="add-advert">
        <div className="rectangle"></div>
        <div className="polygon"></div>
        <h1 className="add-par">Додати оголошення</h1>
      </div>
      <div className="page-container">
        <div className="image-block">
          <div className="step-title">
            <div className="circle-block">
              <h1 className="number-text">1</h1>
            </div>
            <div className="step-title-box">
              <h1 className="step-title-text">Додайте фотографії пристрою</h1>
            </div>
          </div>
          <div className="choose-image-block">
            <div className="step-button">
              <button className="step-button-click main-button">
                Обрати фото
              </button>
            </div>
            <div className="step-images">
              <div className="step-images-array">
                <img src="/icons/device-placeholder.svg" alt="" />
              </div>
              <div className="step-images-array">
                <img src="/icons/device-placeholder.svg" alt="" />
              </div>
              <div className="step-images-array">
                <img src="/icons/device-placeholder.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="description-block">
          <div className="step-title">
            <div className="circle-block">
              <h1 className="number-text">2</h1>
            </div>
            <div className="step-title-box">
              <h1 className="step-title-text">Опис пристрою від власника</h1>
              <h3 className="step-title-text">
                Додайте заголовок і короткий опис пристрою
              </h3>
            </div>
          </div>
          <div className="description-input">
            <div className="title-input">
              <h2 className="title-header">Заголовок оголошення</h2>
              <input
                type="text"
                placeholder="Введіть назву оголошення"
                className="title-form info-input"
              />
            </div>
            <div className="title-input">
              <h2 className="title-header">Опис від власника</h2>
              <textarea
                placeholder="Опишіть пристрій (Опціонально)"
                className="description-form info-input"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="characteristics-block">
          <div className="step-title">
            <div className="circle-block">
              <h1 className="number-text">3</h1>
            </div>
            <div className="step-title-box">
              <h1 className="step-title-text">Характеристики пристрою</h1>
              <h3 className="step-title-text">
                Додайте фактичні характеристики пристрою
              </h3>
            </div>
          </div>

          <div className="charact-array-box">
            <div className="charact-array">
              <div className="charact-array-form">
                <h2 className="title-header">Виробник</h2>
                <input
                  type="text"
                  placeholder="Назва виробника"
                  className="char-form info-input "
                />
              </div>
              <div className="charact-array-form">
                <h2 className="title-header">Стан</h2>
                <input
                  type="text"
                  placeholder="Новий/вживаний"
                  className="char-form info-input "
                />
              </div>
            </div>

            <div className="charact-array">
              <div className="charact-array-form">
                <h2 className="title-header">Модель</h2>
                <input
                  type="text"
                  placeholder="Модель пристрою"
                  className="char-form info-input "
                />
              </div>
              <div className="charact-array-form">
                <h2 className="title-header">Ємність батареї</h2>
                <input
                  type="text"
                  placeholder="Вт/год"
                  className="char-form info-input"
                />
              </div>
            </div>

            <div className="charact-array">
              <div className="charact-array-form">
                <h2 className="title-header">Розміри</h2>
                <input
                  type="text"
                  placeholder="Д × Ш × В, в сантиметрах"
                  className="char-form info-input"
                />
              </div>
              <div className="charact-array-form">
                <h2 className="title-header">Вага</h2>
                <input
                  type="text"
                  placeholder="В грамах"
                  className="char-form info-input"
                />
              </div>
            </div>

            <div className="charact-array">
              <div className="charact-array-form">
                <h2 className="title-header">USB-Type A</h2>
                <input
                  type="text"
                  placeholder="Кількість роз'ємів"
                  className="char-form info-input"
                />
              </div>
              <div className="charact-array-form">
                <h2 className="title-header">USB-Type C</h2>
                <input
                  type="text"
                  placeholder="Кількість роз'ємів"
                  className="char-form info-input"
                />
              </div>
            </div>

            <div className="charact-array">
              <div className="charact-array-form">
                <h2 className="title-header">Тип акумулятора</h2>
                <input
                  type="text"
                  placeholder="Наприклад: LiFePO4"
                  className="char-form info-input"
                />
              </div>
              <div className="charact-array-form">
                <h2 className="title-header">Кількість розеток</h2>
                <input
                  type="text"
                  placeholder="Кількість розеток"
                  className="char-form info-input"
                />
              </div>
            </div>

            <div className="charact-array">
              <div className="charact-array-form">
                <h2 className="title-header">Форма вихідного сигналу</h2>
                <input
                  type="text"
                  placeholder="Наприклад: чиста синусоїда"
                  className="char-form info-input "
                />
              </div>
              <div className="charact-array-form">
                <h2 className="title-header">Віддалене користування</h2>
                <input
                  type="text"
                  placeholder="Наприклад: Wi-Fi"
                  className="char-form info-input "
                />
              </div>
            </div>

            <div className="charact">
              <div className="charact-array-form">
                <h2 className="title-header">Додатково</h2>
                <textarea
                  placeholder="Поле для додаткової інформації про характеристики"
                  className="char-text info-input "
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="price-block">
          <div className="step-title">
            <div className="circle-block">
              <h1 className="number-text">4</h1>
            </div>
            <div className="step-title-box">
              <h1 className="step-title-text">Вартість</h1>
            </div>
          </div>
          <div className="price-input-block">
            <div className="title-input">
              <h2 className="title-header">Ціна</h2>
              <div className="price-box">
                <input type="text" className="price-form info-input " />
                <h2 className="four-title-header">грн/добу</h2>
              </div>
            </div>
            <div className="title-input">
              <h2 className="title-header">Мінімальна тривалість оренди</h2>
              <div className="price-box">
                <input type="text" className="price-form info-input " />
                <h2 className="four-title-header">діб</h2>
              </div>
            </div>
            <div className="title-input">
              <h2 className="title-header">Максимальна тривалість оренди</h2>
              <div className="price-box">
                <input type="text" className="price-form info-input " />
                <h2 className="four-title-header">діб</h2>
              </div>
            </div>
            <div className="submit-form-box">
              <label className="price-header">
                <input type="checkbox" className="submit-checkbox" />Я згоден з
                умовами надання послуг
              </label>
            </div>
            <button className="submit-step-button-click main-button">
              Розмістити оголошення
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
