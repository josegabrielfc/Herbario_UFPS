import { SelectOption } from "./index";

export interface SelectWithTooltipProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  tooltipText?: string;
  required?: boolean;
  showTooltipCondition?: boolean;
}

export interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface UIMessagesProps {
  error: string | null;
  success: boolean;
  successMessage?: string;
}
