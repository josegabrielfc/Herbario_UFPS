interface MiniNavItemsProps {
  routes: any[];
  isAdmin?: boolean;
  handleRouteClick: (path: string) => void;
}

const MiniNavItems = ({ routes, isAdmin, handleRouteClick }: MiniNavItemsProps) => (
  <>
    {routes.map((route, index) => (
      <li
        key={isAdmin ? `admin-${index}` : index}
        className="cursor-pointer rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/10"
        title={route.name}
        onClick={() =>
          handleRouteClick(isAdmin ? `admin/${route.path}` : route.path)
        }
      >
        {typeof route.icon === "string" ? (
          <span className="text-xl">{route.icon}</span>
        ) : (
          route.icon
        )}
      </li>
    ))}
  </>
);

export default MiniNavItems;