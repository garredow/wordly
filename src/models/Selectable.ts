import { SelectablePriority } from '../enums';

export type Selectable = {
  id: string | number;
  priority: SelectablePriority;
  shortcut?: string | number;
  ariaLabel?: string;
  onSelect?: () => void;
};
