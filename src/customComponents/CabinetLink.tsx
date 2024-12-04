import { NavLink } from 'react-router-dom';

const getButtonClass = ({ isActive }: { isActive: boolean }) =>
  `cabinet-menu-button ${isActive ? 'main-button' : 'secondary-button'}`;

type Props = {
  path: string;
  name: string;
};

export const CabinetLink: React.FC<Props> = ({ path, name }) => {
  return (
    <NavLink to={path} className={getButtonClass}>
      {({ isActive }) => (
        <>
          <img
            src={
              isActive ? `/icons/${path}-white.svg` : `/icons/${path}-black.svg`
            }
            alt={`${path} icon`}
          />
          {`${name}`}
        </>
      )}
    </NavLink>
  );
};
