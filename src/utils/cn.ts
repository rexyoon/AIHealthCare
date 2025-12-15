import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind 클래스 병합 및 조건부 클래스 유틸
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
