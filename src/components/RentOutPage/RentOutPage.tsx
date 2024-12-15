import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';
import { useEffect, useState } from 'react';
import './RentOutPage.css';
import '../../App.css';
import { UploadedImage } from '../../types/UploadedImage';
import brands from '../../data/brands.json';
import { postDevice } from '../../api/devices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const RentOutPage: React.FC = () => {
  const navigate = useNavigate();
  const [deviceInfo, setDeviceInfo] = useState({
    title: '',
    description: '',
    manufacturer: '',
    deviceModel: '',
    condition: '',
    batteryCapacity: '',
    weight: '',
    typeC: '',
    typeA: '',
    sockets: '',
    remoteUse: '',
    dimensions: { length: '', width: '', height: '' },
    batteryType: '',
    signalShape: '',
    additional: '',
    images: [] as UploadedImage[],
    price: '',
    minRentTerm: '',
    maxRentTerm: '',
    policyAgreement: false,
  });
  const [chosenManufacturer, setChosenManufacturer] = useState(
    deviceInfo.manufacturer
  );

  useEffect(() => {
    setChosenManufacturer(deviceInfo.manufacturer);
  }, [deviceInfo]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setDeviceInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).filter((file) =>
        file.type.startsWith('image/')
      );
      const uniqueImages = newImages.filter(
        (image) =>
          !deviceInfo.images.some(
            (uploaded) =>
              uploaded.file.name === image.name &&
              uploaded.file.size === image.size
          )
      );

      const totalImages = deviceInfo.images.length + uniqueImages.length;

      if (totalImages > 10) {
        alert('You can only upload up to 10 images.');
        return;
      }

      const imagesWithDimensions = await Promise.all(
        uniqueImages.map(async (file) => {
          const imageDimensions = await getImageDimensions(file);
          return { file, ...imageDimensions };
        })
      );

      setDeviceInfo((prev) => ({
        ...prev,
        images: [...prev.images, ...imagesWithDimensions],
      }));
    }

    e.target.value = '';
  };

  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = reject;
    });
  };

  const handleDimensionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dimension: string
  ) => {
    setDeviceInfo((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: e.target.value,
      },
    }));
  };

  const handleRemoveImage = (index: number) => {
    setDeviceInfo((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (deviceInfo.images.length === 0) {
      errors.push('Додайте принаймні одне зображення.');
    }

    if (!deviceInfo.title.trim()) {
      errors.push('Введіть назву оголошення.');
    }

    const requiredSelectors = [
      { field: 'manufacturer', message: 'Оберіть виробника.' },
      { field: 'condition', message: 'Оберіть стан пристрою.' },
      { field: 'deviceModel', message: 'Оберіть модель.' },
      { field: 'typeA', message: 'Оберіть кількість USB Type-A.' },
      { field: 'typeC', message: 'Оберіть кількість USB Type-C.' },
      { field: 'sockets', message: 'Оберіть кількість розеток.' },
      { field: 'signalShape', message: 'Оберіть форму вихідного сигналу.' },
      { field: 'batteryType', message: 'Оберіть тип акумулятора.' },
      { field: 'remoteUse', message: 'Оберіть спосіб віддаленого керування.' },
    ];

    requiredSelectors.forEach((selector) => {
      if (!deviceInfo[selector.field as keyof typeof deviceInfo]) {
        errors.push(selector.message);
      }
    });

    const numericFields = [
      {
        field: 'batteryCapacity',
        message: 'Введіть коректну ємність батареї.',
      },
      { field: 'weight', message: 'Введіть коректну вагу.' },
      { field: 'price', message: 'Введіть ціну за добу.' },
      {
        field: 'minRentTerm',
        message: 'Введіть мінімальну тривалість оренди.',
      },
      {
        field: 'maxRentTerm',
        message: 'Введіть максимальну тривалість оренди.',
      },
    ];

    numericFields.forEach((field) => {
      const value = deviceInfo[field.field as keyof typeof deviceInfo];
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        errors.push(field.message);
      }
    });

    const dimensionFields = ['length', 'width', 'height'];
    if (
      dimensionFields.some(
        (dim) =>
          !deviceInfo.dimensions[dim as keyof typeof deviceInfo.dimensions] ||
          isNaN(
            Number(
              deviceInfo.dimensions[dim as keyof typeof deviceInfo.dimensions]
            )
          ) ||
          Number(
            deviceInfo.dimensions[dim as keyof typeof deviceInfo.dimensions]
          ) <= 0
      )
    ) {
      errors.push('Введіть коректні розміри.');
    }

    if (Number(deviceInfo.minRentTerm) > Number(deviceInfo.maxRentTerm)) {
      errors.push(
        'Мінімальна тривалість оренди не може бути більшою за максимальну.'
      );
    }

    if (!deviceInfo.policyAgreement) {
      errors.push('Необхідно погодитися з умовами надання послуг.');
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (validationErrors.length > 9) {
      toast.error("Заповніть обов'язкові поля!", {
        position: 'bottom-right',
      });
      return;
    }
    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        toast.error(error, {
          position: 'bottom-right',
        });
      });
      return;
    }

    toast.success('Валідація пройшла успішно!', {
      position: 'bottom-right',
    });

    const formData = new FormData();

    for (const [key, value] of Object.entries(deviceInfo)) {
      if (value instanceof Array) {
        value.map((image) => formData.append('images', image.file));
        formData.append(
          'imageDimensions',
          JSON.stringify(
            value.map((image) => ({ width: image.width, height: image.height }))
          )
        );
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }

    try {
      await postDevice(formData);
      navigate('/personal-page/my-devices', { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'Unauthorized') {
          navigate('/login', { replace: true });
        }
        alert(e.message);
      }
    }
  };

  return (
    <>
      <div className="add-announcement-block">
        <div className="add-announcement-polygon"></div>
        <h1 className="add-announcement-text">Додати оголошення</h1>
      </div>
      <form onSubmit={handleSubmit} className="rent-out-page-form">
        <div className="rent-out-page-main-block">
          <div className="step-block">
            <div className="step-number-block">
              <span className="step-number">1</span>
            </div>
            <p className="step-title">Додайте фотографії пристрою</p>
          </div>
          <div className="choose-image-block rent-out-page-secondary-block">
            <label
              htmlFor="fileInput"
              className="choose-image-button main-button"
            >
              Обрати фото
            </label>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              placeholder="Обрати фото"
              className="file-input"
              onChange={handleFileChange}
            />
            <Gallery>
              <div className="rent-out-page-images-block">
                {deviceInfo.images.map((image, index) => (
                  <div className="rent-out-page-image-placeholder" key={index}>
                    <Item
                      key={index}
                      original={URL.createObjectURL(image.file)}
                      thumbnail={URL.createObjectURL(image.file)}
                      width={image.width}
                      height={image.height}
                    >
                      {({ ref, open }) => (
                        <>
                          <img
                            className="rent-out-page-image"
                            ref={ref}
                            onClick={open}
                            src={URL.createObjectURL(image.file)}
                            alt={`Device image ${index + 1}`}
                          />
                          <div className="overlay" onClick={open}>
                            <img src="/icons/zoom-in.svg" alt="Zoom in" />
                          </div>
                        </>
                      )}
                    </Item>
                    <button
                      className="remove-image-button"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <img
                        src="/icons/delete-image.svg"
                        alt="Delete image button"
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Gallery>
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
                name="title"
                value={deviceInfo.title}
                onChange={handleInputChange}
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
                name="description"
                value={deviceInfo.description}
                onChange={handleInputChange}
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
                      name="manufacturer"
                      value={deviceInfo.manufacturer}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть виробника
                      </option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand.name}>
                          {brand.name}
                        </option>
                      ))}
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
                      name="condition"
                      value={deviceInfo.condition}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть стан
                      </option>
                      <option value="Новий">Новий</option>
                      <option value="Вживаний">Вживаний</option>
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
                    name="weight"
                    value={deviceInfo.weight}
                    onChange={handleInputChange}
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
                      name="typeA"
                      value={deviceInfo.typeA}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть кількість роз'ємів
                      </option>
                      {Array.from({ length: 6 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
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
                      name="sockets"
                      value={deviceInfo.sockets}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть кількість розеток
                      </option>
                      {Array.from({ length: 6 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
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
                      name="signalShape"
                      value={deviceInfo.signalShape}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть форму сигналу
                      </option>
                      <option value="Чиста синусоїда">Чиста синусоїда</option>
                      <option value="Модифікована синусоїда">
                        Модифікована синусоїда
                      </option>
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
                    <select
                      id="modelSelect"
                      name="deviceModel"
                      value={deviceInfo.deviceModel}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть модель
                      </option>
                      {brands
                        .find((brand) => brand.name === chosenManufacturer)
                        ?.models.map((model, index) => (
                          <option key={index} value={model}>
                            {model}
                          </option>
                        ))}
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
                    name="batteryCapacity"
                    value={deviceInfo.batteryCapacity}
                    onChange={handleInputChange}
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
                  <div className="rent-out-size-inputs">
                    <input
                      type="number"
                      id="dimensionsInput"
                      value={deviceInfo.dimensions.length}
                      onChange={(event) =>
                        handleDimensionChange(event, 'length')
                      }
                      className="rent-out-size-input info-input"
                      placeholder="Д"
                    />
                    <p className="cross">×</p>
                    <input
                      type="number"
                      id="dimensionsInput2"
                      value={deviceInfo.dimensions.width}
                      onChange={(event) =>
                        handleDimensionChange(event, 'width')
                      }
                      className="rent-out-size-input info-input"
                      placeholder="Ш"
                    />
                    <p className="cross">×</p>
                    <input
                      type="number"
                      id="dimensionsInput3"
                      value={deviceInfo.dimensions.height}
                      onChange={(event) =>
                        handleDimensionChange(event, 'height')
                      }
                      className="rent-out-size-input info-input"
                      placeholder="В"
                    />
                    <p className="rent-out-price-section-units">см</p>
                  </div>
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
                      name="typeC"
                      value={deviceInfo.typeC}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть кількість роз'ємів
                      </option>
                      {Array.from({ length: 6 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
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
                      name="batteryType"
                      value={deviceInfo.batteryType}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
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
                      name="remoteUse"
                      value={deviceInfo.remoteUse}
                      onChange={handleInputChange}
                      className="char-select info-input"
                    >
                      <option value="" disabled>
                        Оберіть спосіб
                      </option>
                      <option value="Немає">Немає</option>
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
                  name="additional"
                  value={deviceInfo.additional}
                  onChange={handleInputChange}
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
                  name="price"
                  value={deviceInfo.price}
                  onChange={handleInputChange}
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
                  name="minRentTerm"
                  value={deviceInfo.minRentTerm}
                  onChange={handleInputChange}
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
                  name="maxRentTerm"
                  value={deviceInfo.maxRentTerm}
                  onChange={handleInputChange}
                  className="rent-out-price-section-input info-input"
                />
                <p className="rent-out-price-section-units">діб</p>
              </div>
            </div>
          </div>
          <div className="rent-out-submit-block rent-out-page-secondary-block">
            <div className="policy-agreement-block">
              <input
                type="checkbox"
                name="policyAgreement"
                checked={deviceInfo.policyAgreement}
                onChange={handleInputChange}
                className="policy-agreement-checkbox"
              />
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
