import { useState, useEffect } from "react";
import SidebarComponent from "./components/SidebarComponent";

interface SidebarProps {
  onStateChange?: (isMini: boolean) => void;
}

const Sidebar = ({ onStateChange }: SidebarProps) => {
  const [isMini, setIsMini] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      if (isMobileDevice) {
        setIsMini(true); // Show mini version on mobile by default
        setIsOpen(true); // Keep sidebar visible
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMiniChange = (newState: boolean) => {
    setIsMini(newState);
    onStateChange?.(newState);
  };

  return (
    <div className="relative">
      <SidebarComponent
        open={isOpen}
        onClose={() => {
          if (isMobile) {
            setIsMini(true); // Switch to mini version on mobile
          }
          handleMiniChange(true);
        }}
        mini={isMini}
        onToggleMini={() => {
          if (isMobile) {
            setIsOpen(true); // Keep sidebar visible on mobile
          }
          handleMiniChange(false);
        }}
        isMobile={isMobile}
      />
    </div>
  );
};

export default Sidebar;
