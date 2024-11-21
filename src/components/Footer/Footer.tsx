import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="contact-us">
        <h2 className="contact-us-header">Зв'яжіться з нами</h2>
        <p className="contact-us-text">
          Якщо у вас є питання, пропозиції або вам потрібна додаткова
          інформація, будь ласка, звертайтеся до нас. Ми прагнемо забезпечити
          найкращий сервіс для вас!
        </p>
      </div>
      <div className="our-contacts">
        <div className="contact-block email-block">
          <p className="contact-option">E-mail</p>
          <p className="contact-value">example@gmail.com</p>
        </div>
        <div className="contact-block phone-block">
          <p className="contact-option">Телефон</p>
          <p className="contact-value">+38 095 228 1337</p>
        </div>
        <div className="contact-block address-block">
          <p className="contact-option">Адреса</p>
          <p className="contact-value">м. Київ, вул. Червоних ліхтарів, 52</p>
        </div>
        <div className="socials">
          <a className="socials-link" href="/">
            <img src="/icons/youtube.svg" alt="YouTube" />
          </a>
          <a className="socials-link" href="/">
            <img src="/icons/instagram.svg" alt="Instagram" />
          </a>
          <a className="socials-link" href="/">
            <img src="/icons/facebook.svg" alt="Facebook" />
          </a>
          <a className="socials-link" href="/">
            <img src="/icons/twitter.svg" alt="Twitter" />
          </a>
          <a className="socials-link" href="/">
            <img src="/icons/linkedin.svg" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};
