import cn from 'classnames';
import React from 'react';

import classes from './Button.modules.scss';

interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ className, children }) => {
  return <button className={cn(classes.root, className)}>{children}</button>;
};
