import { HiX, HiMenu } from "react-icons/hi";

interface SidebarHeaderProps {
  mini: boolean;
  onClose: () => void;
  onToggleMini: () => void;
}

const SidebarHeader = ({ mini, onClose, onToggleMini }: SidebarHeaderProps) => {
  if (mini) {
    return (
      <div className="mt-[50px] flex justify-center">
        <HiMenu
          className="h-8 w-8 cursor-pointer text-navy-700 dark:text-white"
          onClick={onToggleMini}
        />
      </div>
    );
  }

  return (
    <>
      <span
        className="absolute top-4 right-4 block cursor-pointer"
        onClick={onClose}
      >
        <HiX className="h-6 w-6" />
      </span>
      <div className="mt-[50px] flex items-center justify-center w-full">
        <div className="mt-1 text-[26px] font-bold uppercase text-navy-700 dark:text-white text-center">
          HERBARIO <span className="font-medium">UFPS</span>
        </div>
      </div>
      <div className="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
    </>
  );
};

export default SidebarHeader;