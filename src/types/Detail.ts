//주차정보
export type ParkingInfo = { name: string; total: number; available: number };

export type PlaceExtra = {
  aiSummary?: string; //AI
  parkings?: ParkingInfo[]; //주차 정보
};

//여행지 자세히보기 임시 타입
export type PlaceDetail = {
  id: string;
  name: string;
  address: string;
  thumbnail?: string | null;

  regionTag: string;
  themeName: string;
  serenity: number; //한적함 수치

  description: string;

  //액션 상태
  liked: boolean;
  likeCount: number;
  bookmarked: boolean;

  //강릉시만 받아오는 정보들...
  extra?: PlaceExtra;
};
