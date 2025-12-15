import { useEffect, useRef, useState } from 'react';
import { X, Search, MapPin, Crosshair } from 'lucide-react';
import Button from '../common/Button/Button';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: string) => void;
  currentAddress?: string;
};

const AddressSearchModal = ({ isOpen, onClose, onAddressSelect, currentAddress = '' }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [geocoder, setGeocoder] = useState<any>(null);
  const [places, setPlaces] = useState<any>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>(currentAddress ?? '');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  //초기화
  useEffect(() => {
    if (!isOpen || !window.kakao || !window.kakao.maps) return;
    window.kakao.maps.load(() => {
      const container = mapRef.current;
      if (!container) return;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), //기본 위치: 서울 시청
        level: 3,
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);

      const geocoderInstance = new window.kakao.maps.services.Geocoder();
      setGeocoder(geocoderInstance);

      const placesInstance = new window.kakao.maps.services.Places();
      setPlaces(placesInstance);

      //마커 생성
      const markerInstance = new window.kakao.maps.Marker({
        position: mapInstance.getCenter(),
        draggable: true,
      });
      markerInstance.setMap(mapInstance);
      setMarker(markerInstance);

      const recenter = (lat: number, lng: number) => {
        const { kakao } = window;
        const latlng = new kakao.maps.LatLng(lat, lng);

        requestAnimationFrame(() => {
          mapInstance.relayout?.();
          mapInstance.setLevel(3);
          mapInstance.setCenter(latlng);
          markerInstance.setPosition(latlng);
        });
      };

      const locateNow = () => {
        if (!navigator.geolocation) return;
        setIsLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            recenter(lat, lng);

            geocoderInstance.coord2Address(lng, lat, function (result: any[], status: any) {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0]?.address?.address_name;
                if (address) setSelectedAddress(address);
              }
              setIsLoadingLocation(false);
            });
          },
          () => {
            setIsLoadingLocation(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 },
        );
      };

      if (currentAddress) {
        geocoderInstance.addressSearch(currentAddress, (result: any[], status: any) => {
          if (status === window.kakao.maps.services.Status.OK && result[0]) {
            const { x, y, address_name } = result[0];
            const pos = new window.kakao.maps.LatLng(y, x);
            mapInstance.setCenter(pos);
            markerInstance.setPosition(pos);
            setSelectedAddress(address_name || currentAddress);
          } else {
            setSelectedAddress(currentAddress);
          }
          setTimeout(() => {
            mapInstance.relayout?.();
            mapInstance.setCenter(markerInstance.getPosition());
          }, 0);
        });
      } else {
        if (!searchKeyword && !currentAddress) {
          locateNow();
        }
      }

      //마커 드래그
      window.kakao.maps.event.addListener(markerInstance, 'dragend', function () {
        const position = markerInstance.getPosition();
        geocoderInstance.coord2Address(
          position.getLng(),
          position.getLat(),
          function (result: any[], status: any) {
            if (status === window.kakao.maps.services.Status.OK) {
              const address = result[0].address.address_name;
              setSelectedAddress(address);
            }
          },
        );
      });
    });
  }, [isOpen]);

  //현재 위치 가져오기
  const getCurrentLocation = (
    mapInstance = map,
    markerInstance = marker,
    geocoderInstance = geocoder,
  ) => {
    if (!window.kakao?.maps || !mapInstance || !markerInstance || !geocoderInstance) {
      console.warn('Kakao SDK or map is not ready yet.');
      return;
    }
    if (!navigator.geolocation) {
      alert('현재 위치를 불러올 수 없습니다!');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const locPosition = new window.kakao.maps.LatLng(lat, lng);

        //지도 중심, 마커 현재 위치로 이동시키기
        requestAnimationFrame(() => {
          mapInstance.relayout?.();
          mapInstance.setLevel(3);
          mapInstance.setCenter(locPosition);
          markerInstance.setPosition(locPosition);
        });

        geocoderInstance.coord2Address(lng, lat, function (result: any[], status: any) {
          if (status === window.kakao.maps.services.Status.OK) {
            const address = result[0].address.address_name;
            setSelectedAddress(address);
          }
          setIsLoadingLocation(false);
        });
      },
      (error) => {
        console.error('현재 위치를 가져오는데 실패했습니다:', error);
        setIsLoadingLocation(false);
        alert('현재 위치를 가져오는데 실패했습니다. 위치 권한을 확인해주세요!');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000,
      },
    );
  };

  //주소 수동 검색
  const searchAddress = (keyword: string) => {
    if (!places || !keyword.trim()) {
      setSearchResults([]);
      return;
    }

    places.keywordSearch(keyword, (data: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setSearchResults(data.slice(0, 10)); //최대 10개
      } else {
        setSearchResults([]);
      }
    });
  };

  const selectSearchResult = (place: any) => {
    const lat = Number(place.y);
    const lng = Number(place.x);

    setSearchKeyword('');
    setSearchResults([]);

    if (map && marker) {
      requestAnimationFrame(() => {
        map.relayout?.();
        map.setLevel(3);
        const pos = new window.kakao.maps.LatLng(lat, lng);
        map.setCenter(pos);
        marker.setPosition(pos);
      });
    }

    setSelectedAddress(place.road_address_name || place.address_name || '');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    searchAddress(keyword);
  };

  const handleConfirm = () => {
    if (selectedAddress) {
      onAddressSelect(selectedAddress);
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center overscroll-contain bg-black/50">
      <div className="flex h-[90vh] w-full max-w-[430px] flex-col overflow-hidden rounded-l bg-white shadow-xl">
        <div className="border-gray1 flex items-center justify-between border-b p-4">
          <h2 className="text-title2 text-green1">출발지 설정</h2>
          <button onClick={onClose} className="hover:bg-gray2 rounded-full p-1" aria-label="닫기">
            <X size={22} className="text-black" />
          </button>
        </div>
        <div className="border-gray1 border-b p-2">
          <div className="relative">
            <Search className="text-gray1 absolute top-1/2 left-3 -translate-y-1/2" size={18} />
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="주소나 장소명을 검색하세요"
              className="border-gray1 text-body1 w-full rounded-l border py-2 pr-4 pl-10 focus:ring-2 focus:ring-[var(--color-green3)] focus:outline-none"
            />
          </div>

          <button
            onClick={() => getCurrentLocation()}
            disabled={isLoadingLocation}
            className="text-green2 hover:bg-green3-light mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-l py-2 disabled:opacity-50"
          >
            <Crosshair size={18} />
            <span className="text-caption1">
              {isLoadingLocation ? '현재 위치 가져오는 중...' : '현재 위치로 설정하기'}
            </span>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="relative flex h-full flex-col">
            <div ref={mapRef} className="border-gray1 h-[60dvh] w-full flex-1" />
            <div className="bg-green0 sticky bottom-0 z-10 p-2">
              <div className="text-caption2 text-green0 mb-1">선택된 주소</div>
              <div className="text-body1 text-black">
                {selectedAddress || '주소를 선택해주세요'}
              </div>
              <div className="text-caption2 text-green-muted mt-1">
                지도에서 마커를 드래그하여 위치를 조정할 수 있습니다
              </div>
            </div>

            {searchResults.length > 0 && (
              <div className="scrollbar-hidden absolute inset-0 z-20 overflow-y-auto bg-white">
                {searchResults.map((place, index) => (
                  <button
                    type="button"
                    key={index}
                    onClick={() => selectSearchResult(place)}
                    className="border-gray1 hover:bg-green0 w-full border-b p-2 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-gray1 mt-1" />
                      <div>
                        <div className="text-body1 text-black">{place.place_name}</div>
                        <div className="text-caption2 text-green-muted">{place.address_name}</div>
                        {place.road_address_name && (
                          <div className="text-caption2 text-gray1">{place.road_address_name}</div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-gray1 border-t bg-white p-3">
          <Button onClick={handleConfirm} disabled={!selectedAddress}>
            이 주소로 설정하기
          </Button>
        </div>
      </div>
    </div>
  );
};
export { AddressSearchModal };
