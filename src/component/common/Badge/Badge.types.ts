export type BadgeType='default'|'parkingTag'|'parkingCount';
export type BadgeColor='green'|'red'|'orange'|'yellow';
export type BadgeSize='sm'|'lg'|'xl';

export interface BadgeProp{
  type: BadgeType;
  children: React.ReactNode;
  color?:BadgeColor;
  count?:number; 
  percent?:number; //parkingCount 
  size?:BadgeSize;
}