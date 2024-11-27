import React from 'react';
import "./DeviceCard.css"

export const DeviceCard: React.FC = () => {
    return (
        <div className="device-card">
            <img className="device-card-image" src="https://avatars.akamai.steamstatic.com/adeb470d4165233694b0640595999b5764a7f4d1_full.jpg"/>
            <div className="device-card-description-block">
                <div className="device-card-title">Екофлоу від квадробера</div>
                <div className="bottom-block">
                    <div className="city-name">м. Полтава</div>
                    <div className="price-value">500 грн/день</div>
                </div>
            </div>
        </div>
    );
}