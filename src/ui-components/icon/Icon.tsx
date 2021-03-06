import { IconContext } from '@react-icons/all-files/lib/esm/iconContext';
import { h } from 'preact';
import { ComponentBaseProps } from '../../models/ComponentBaseProps';

type IconProps = ComponentBaseProps & {
  color?: string;
  size?: string;
  className?: string;
  style?: React.CSSProperties;
  attr?: React.SVGAttributes<SVGElement>;
  icon: any;
};

export function Icon({ color, size, className, style, attr, icon }: IconProps) {
  return (
    <IconContext.Provider value={{ color, size, className, style, attr }}>
      {icon}
    </IconContext.Provider>
  );
}
