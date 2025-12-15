export const BUTTON_BASE='disabled:cursor-not-allowed active:scale-95 transition-color';

export const BUTTON_VARIANT = {
  lg: {
    green3: 'bg-green3 hover:opacity-80 disabled:opacity-50 btn-text-white rounded-l',
    'green-muted': 'bg-green-muted hover:opacity-80 disabled:opacity-50 btn-text-white rounded-l',
  },
  md: {
    green3: 'bg-green3 hover:opacity-80 disabled:opacity-50 btn-text-white rounded-l',
    'green-muted': 'bg-green-muted hover:opacity-80 disabled:opacity-50 btn-text-white rounded-l',
  },
  sm: {
    beige1: 'bg-beige2 hover:opacity-80 btn-text-black',
  },
} as const;

export const BUTTON_SIZE = {
  lg: 'w-full h-12 text-caption1',
  md: 'w-25 h-12 text-caption1',
  sm: 'w-18 h-6 text-caption2',
} as const;

export const BUTTON_COLOR={
  green3: 'bg-green3 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed',
  'green-muted': 'bg-green-muted hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed',
}

export const BUTTON_ROUNDED = {
  lg: 'rounded-l',
  md: 'rounded-l',
  sm: 'rounded-[10px]',
} as const;