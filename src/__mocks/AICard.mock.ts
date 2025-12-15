type Item = {
  id: string | number;
  name: string;
  serenity: number;
  themeTag: string;
  likeCount: number;
  thumbnail?: string;
}; //목데이터용 임시타입...

export const mockAICard: Item[] = [
  { id: '1001', name: '경포해수욕장', serenity: 2, themeTag: '자연관광지', likeCount: 0 },
  { id: '1002', name: '안목해변 커피거리', serenity: 1, themeTag: '체험관광지', likeCount: 12 },
  { id: '1003', name: '하회마을', serenity: 3, themeTag: '역사관광지', likeCount: 87 },
  { id: '1004', name: '가천대학교', serenity: 1, themeTag: '문화시설', likeCount: 1002 },
  { id: '5', name: '행궁동', serenity: 5, themeTag: '자연관광지', likeCount: 11 },
  { id: '6', name: '문막천 산책길', serenity: 5, themeTag: '산책', likeCount: 11 },
  { id: '7', name: '물향기수목원', serenity: 5, themeTag: '자연관광지', likeCount: 11 },
  { id: '8', name: '물향기수목원', serenity: 5, themeTag: '자연관광지', likeCount: 11 },
];
