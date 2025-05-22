import { JSX } from "react";

export interface SidebarProps {
  open: boolean;
  onClose: React.MouseEventHandler<HTMLSpanElement>;
}

export interface DropdownProps {
  button: JSX.Element;
  children: JSX.Element;
  classNames: string;
  animation?: string;
}
