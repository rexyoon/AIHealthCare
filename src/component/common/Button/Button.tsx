import {cn} from '@/utils/cn';
import {BUTTON_BASE, BUTTON_VARIANT, BUTTON_ROUNDED, BUTTON_SIZE} from './Button.styled';
import type {ButtonProps} from './Button.types';


export default function Button({
  variant='lg',
  color='green3',
  onClick,
  disabled=false,
  children,
  className,
}:ButtonProps){
  const isSm = variant === 'sm';
  const variantClass = isSm
    ? BUTTON_VARIANT.sm['beige1']
    : BUTTON_VARIANT[variant][color as 'green3' | 'green-muted'];

  return(
    <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      BUTTON_BASE,
      BUTTON_SIZE[variant],
      BUTTON_ROUNDED[variant],
      variantClass,
      className,
    )}
    >
      {children}
    </button>
  )
}