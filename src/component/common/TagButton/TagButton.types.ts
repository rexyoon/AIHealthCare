export type TagColor = 'green' | 'red' | 'yellow';

export interface TagButtonProps{
  children: React.ReactNode;
  selected: boolean;
  color: TagColor;
  onClick?: () => void;
};