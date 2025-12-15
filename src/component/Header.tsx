import { Menu } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import Logo from '../image/Logo.png';
import ProfileIconUrl from '../image/Profile.svg';

type HeaderProps = {
  onMenuClick: () => void;
};
export default function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/mypage');
  };
  return (
    <header className="bg-beige3 fixed top-0 right-0 left-0 z-50 mx-auto flex h-14 w-full max-w-[430px] items-center justify-between">
      <div className="flex w-full flex-row items-center justify-between px-4 py-3">
        <Menu className="text-green2 h-7 w-7 cursor-pointer" onClick={onMenuClick} />
        <div className="flex flex-1 justify-center">
          <img
            src={Logo}
            alt="logo"
            className="h-8 cursor-pointer object-contain"
            onClick={() => navigate('/')}
          />
        </div>
        <img
          src={ProfileIconUrl}
          alt="profile"
          className="h-7 w-7 cursor-pointer"
          onClick={handleUserClick}
        />
      </div>
    </header>
  );
}
