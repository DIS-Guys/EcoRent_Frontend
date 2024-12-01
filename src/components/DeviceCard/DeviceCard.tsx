import './DeviceCard.css';

export const DeviceCard: React.FC = () => {
  return (
    <div className="device-card">
      <img
        className="device-card-image"
        src="https://avatars.akamai.steamstatic.com/adeb470d4165233694b0640595999b5764a7f4d1_full.jpg"
      />
      <div className="device-card-description-block">
        <h2 className="device-card-title">Екофлоу від квадробера</h2>
        <div className="device-info-block">
          <p className="device-location">м. Полтава</p>
          <p className="device-rent-price">500 грн/день</p>
        </div>
      </div>
    </div>
  );
};
