import "./RentPage.css"
import {DeviceCard} from "../DeviceCard/DeviceCard.tsx";

export const RentPage: React.FC = () => {
    return (
        <div className="centering-div">
        <div className="external-container">
            <div className="filter-block">
                <div className="filters-title">Фільтри</div>
                <div className="filters-content">
                    <div className="filter-subtitle">Виробник</div>
                    <div className="manufacturer-content">
                        <div className="manufacturer-option">
                            <input type="checkbox" className="filter-checkbox"/>
                            <div className="option-text">EcoFlow</div>
                        </div>
                        <div className="manufacturer-option">
                            <input type="checkbox" className="filter-checkbox"/>
                            <div className="option-text">Bluetti</div>
                        </div>
                        <div className="manufacturer-option">
                            <input type="checkbox" className="filter-checkbox"/>
                            <div className="option-text">Jackery</div>
                        </div>
                        <div className="manufacturer-option">
                            <input type="checkbox" className="filter-checkbox"/>
                            <div className="option-text">Choetech</div>
                        </div>
                        <div className="manufacturer-option">
                            <input type="checkbox" className="filter-checkbox"/>
                            <div className="option-text">Anker</div>
                        </div>
                    </div>
                </div>

                <div className="filter-subtitle">Модель</div>
                <div className="model-content">
                    <div className="model-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Модель 1</div>
                    </div>
                    <div className="model-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Модель 2</div>
                    </div>
                    <div className="model-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Модель 3</div>
                    </div>
                    <div className="model-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Модель 4</div>
                    </div>
                    <div className="model-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Модель 5</div>
                    </div>
                </div>

                <div className="filter-subtitle">Розмір</div>
                <div className="size-content">
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Малий</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Середній</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Великий</div>
                    </div>
                </div>

                <div className="filter-subtitle">Стан</div>
                <div className="state-content">
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Новий</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Б/в</div>
                    </div>
                </div>

                <div className="filter-subtitle">Кількість розеток</div>
                <div className="sockets-content">
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">1 роз'єм</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">2 роз'єми</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">3 роз'єми</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Більше 4 роз'ємів</div>
                    </div>
                </div>

                <div className="filter-subtitle">USB-Type A</div>
                <div className="usba-content">
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">1 роз'єм</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">2 роз'єми</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">3 роз'єми</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Більше 4 роз'ємів</div>
                    </div>
                </div>

                <div className="filter-subtitle">USB-Type C</div>
                <div className="usbc-content">
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">1 роз'єм</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">2 роз'єми</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">3 роз'єми</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Більше 4 роз'ємів</div>
                    </div>
                </div>

                <div className="filter-subtitle">Тип акумулятора</div>
                <div className="bat-type-content">
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">SLA</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">EFB</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">GEL</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">AGM</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Li-Ion</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Li-Pol</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">LiFePO4</div>
                    </div>
                </div>

                <div className="filter-subtitle">Віддалене користування</div>
                <div className="remote-content">
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">WI-FI</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Bluetooth</div>
                    </div>
                    <div className="filter-checkbox-option">
                        <input type="checkbox" className="filter-checkbox"/>
                        <div className="option-text">Відсутнє</div>
                    </div>
                </div>

                <div className="filter-subtitle">Ціна</div>
                <div className="price-content">
                    <div className="filter-field-option">
                        <input placeholder="Від" className="input-field"/>
                        <input placeholder="До" className="input-field"/>
                    </div>
                </div>

                <button className="apply-button">Підтвердити</button>


            </div>
            <div className="content-block">
                <div className="cards-block">
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                    <DeviceCard/>
                </div>
                <div className="navigation-block">
                    <div className="left-arrow"><img src="./icons/leftarrow.svg"/></div>
                    <div className="page-number">1</div>
                    <div className="page-number">2</div>
                    <div className="page-number">3</div>
                    <div className="page-number">4</div>
                    <div className="page-number">5</div>
                    <div className="page-number">6</div>
                    <div className="page-number">7</div>
                    <div className="page-number">8</div>
                    <div className="page-number">...</div>
                    <div className="page-number">148</div>
                    <div className="right-arrow"><img src="./icons/rightarrow.svg"/></div>
                </div>
            </div>
        </div>
        </div>
    );
};