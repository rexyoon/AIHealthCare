import React, { useCallback } from 'react';
import { X } from 'react-feather';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
};
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, position = 'right' }) => {
  const isLeft = position === 'left';
  const navigate = useNavigate();

  const go = useCallback(
    (path: string) => {
      navigate(path);
      onClose();
    },
    [navigate, onClose],
  );

  return (
    <>
      <div
        className={`fixed top-0 left-[max(0px,calc(50vw-223px))] z-[60] h-[100dvh] w-[min(100vw,437px)] ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        } overflow-hidden`}
      >
        <div
          className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          } `}
          onClick={onClose}
        />

        <div
          role="dialog"
          aria-modal="true"
          className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} bg-beige3 z-[70] h-full w-52 transform transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : isLeft ? '-translate-x-full' : 'translate-x-full'
          } `}
        >
          <div className="flex justify-end p-3.5">
            <X className="text-green2 h-4.5 w-4.5 cursor-pointer" onClick={onClose} />
          </div>

          <nav className="text-title5 text-green1 flex flex-col gap-1 pl-7">
            <div className="border-gray1 mr-13 border-b" />
            <button onClick={() => go('/')} className="cursor-pointer py-2 text-left">
              홈
            </button>
            <div className="border-gray1 mr-13 border-b" />
            <button onClick={() => go('/explore')} className="cursor-pointer py-2 text-left">
              AI 맞춤 여행지 탐색
            </button>
            <div className="border-gray1 mr-13 border-b" />
            <button onClick={() => go('/search')} className="cursor-pointer py-2 text-left">
              여행지 탐색
            </button>
            <div className="border-gray1 mr-13 border-b" />
            <button onClick={() => go('/mytravel')} className="cursor-pointer py-2 text-left">
              나의 여행지
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
