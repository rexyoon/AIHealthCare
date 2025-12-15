export type ButtonVariant = 'lg' | 'md' | 'sm';

export type ButtonColorLg = 'green3' | 'green-muted';
export type ButtonColorMd = 'green3' | 'green-muted';
export type ButtonColorSm = 'beige1' | 'green3' | 'green-muted'; 

interface CommonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface LgButtonProps extends CommonProps {
  variant?: 'lg'; // default
  color?: ButtonColorLg;
}

export interface MdButtonProps extends CommonProps {
  variant: 'md';
  color?: ButtonColorMd;
}

export interface SmButtonProps extends CommonProps {
  variant: 'sm';
  color?: ButtonColorSm; 
}

export type ButtonProps = LgButtonProps | MdButtonProps | SmButtonProps;
