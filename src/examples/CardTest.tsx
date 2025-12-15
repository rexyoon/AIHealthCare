//그냥 테스트용...
import { PlaceCard } from '@/component';
import { useState } from 'react';

export default function CardTestPage() {
  const [places, setPlaces] = useState([
    {
      id: 1,
      title: '행궁동',
      theme: '자연관광지',
      quietLevel: 2,
      likeCount: 3,
      imgUrl: '',
    },
    {
      id: 2,
      title: '서촌',
      theme: '역사문화',
      quietLevel: 1,
      likeCount: 5,
      imgUrl: '',
    },
  ]);

  const handelRemove = (id: number) => {
    setPlaces((prev) => prev.filter((place) => place.id !== id));
  };

  return (
    <div className="bg-beige3 flex flex-col gap-4 p-4">
      <h1 className="text-caprion1">placecard 테스트 (x있는 버전)</h1>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          title={place.title}
          theme={place.theme}
          likeCount={place.likeCount}
          imgUrl={place.imgUrl}
          quietLevel={place.quietLevel}
          showRemoveButton
          onRemove={() => handelRemove(place.id)}
        />
      ))}
      <h1 className="text-caprion1">placecard 테스트 (x없는 버전)</h1>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          title={place.title}
          theme={place.theme}
          likeCount={place.likeCount}
          imgUrl={place.imgUrl}
          quietLevel={place.quietLevel}
          onRemove={() => handelRemove(place.id)}
        />
      ))}
    </div>
    
    
  );
}
