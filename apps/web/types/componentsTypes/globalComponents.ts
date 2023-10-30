import { MouseEventHandler, ReactNode } from "react"

export interface LoaderProps {
  big?: boolean; 
  medium?: boolean; 
  white?: boolean;
  lightGreen?: boolean;
}

export interface MainButtonProps {
  title: string;
  type?: 'button' | 'submit';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerStyle?: string;
  small?: boolean;
  outlined?: boolean;
  titleStyle?: string;
}

export interface ButtonProps extends MainButtonProps {
  effect?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  loading?: boolean
}

export interface LinkButtonProps extends MainButtonProps {
  path: string
}