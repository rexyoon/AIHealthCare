import { cn } from "@/utils/cn";
import { SELECTED_COLOR_CLASS, UNSELECTED_CLASS } from "./TagButton.styled";
import type { TagButtonProps } from "./TagButton.types";

export default function TagButton({children, selected, color, onClick}:TagButtonProps){
  const base = 'px-4 py-1 rounded-full text-caption2 transition-colors';
  const style = selected ? SELECTED_COLOR_CLASS[color] : UNSELECTED_CLASS;

  return (
    <button onClick={onClick} className={cn(base, style)}>
      {children}
    </button>
  );
}