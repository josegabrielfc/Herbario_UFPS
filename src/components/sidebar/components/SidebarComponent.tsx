import { useNavigate } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import MiniNavItems from "./MiniNavItems";
import Links from "./Links";
import SidebarCard from "./SidebarCard";
import { userRoutes, adminRoutes } from "../../../routes/Routes";

interface SidebarComponentProps {
  open: boolean;
  onClose: () => void;
  mini: boolean;
  onToggleMini: () => void;
  isMobile?: boolean;
}

const SidebarComponent = (props: SidebarComponentProps) => {
  const { open, onClose, mini, onToggleMini, isMobile } = props;
  const navigate = useNavigate();

  const handleRouteClick = (path: string) => navigate(path);

  const sidebarClasses = `
    sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col 
    bg-white pb-10 shadow-2xl shadow-white/5 transition-all 
    dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 
    ${open ? "translate-x-0" : "-translate-x-96"}
    ${mini ? "w-20" : "w-[300px]"}
    ${isMobile && !mini ? "w-screen" : ""}
  `;

  return (
    <div className={sidebarClasses}>
      <SidebarHeader
        mini={mini}
        onClose={onClose}
        onToggleMini={onToggleMini}
      />

      <ul className="mb-auto pt-1">
        {mini ? (
          <div className="flex flex-col items-center space-y-4 pt-4">
            <MiniNavItems
              routes={userRoutes}
              handleRouteClick={handleRouteClick}
            />
            <MiniNavItems
              routes={adminRoutes}
              isAdmin
              handleRouteClick={handleRouteClick}
            />
          </div>
        ) : (
          <>
            <Links routes={userRoutes} />
            <Links routes={adminRoutes} />
          </>
        )}
      </ul>

      {!mini && (
        <div className="flex justify-center">
          <SidebarCard />
        </div>
      )}
    </div>
  );
};

export default SidebarComponent;