import { memo } from 'react';
import { Badge } from '@/component';
import toPercent from '@/utils/toPercent';
import clsx from 'clsx';

type ParkingItem = {
  name: string;
  total: number;
  available: number;
};

interface ParkingTableProps {
  parkings: ParkingItem[];
  className?: string;
}

const ParkingTable = memo(function ParkingTable({ parkings, className }: ParkingTableProps) {
  const hasData = Array.isArray(parkings) && parkings.length > 0;

  return (
    <div className={clsx('w-full', className)}>
      {!hasData ? (
        <div className="text-body3 text-gray-500">주차장 정보가 없습니다.</div>
      ) : (
        <div className="table w-full table-fixed">
          <div className="table-header-group">
            <div className="table-row">
              <div className="table-cell w-[50%] py-1 text-left">
                <span className="text-title4 text-black">근처 공영주차장</span>
              </div>
              <div className="table-cell w-[20%] py-1 text-center">
                <span className="text-body3 text-black">총 주차 대수</span>
              </div>
              <div className="table-cell w-[20%] py-1 text-center">
                <span className="text-body3 text-black">가능 주차 대수</span>
              </div>
            </div>
          </div>

          <div className="table-row-group">
            {parkings.map((p) => {
              const percent = toPercent(p.available, p.total);
              return (
                <div key={p.name} className="table-row">
                  <div className="table-cell py-1 align-middle">
                    <Badge type="parkingTag" size="lg">
                      <span className="truncate">{p.name}</span>
                    </Badge>
                  </div>
                  <div className="table-cell py-1 text-center align-middle">
                    <Badge type="parkingCount" size="lg" percent={percent}>
                      {String(p.total)}
                    </Badge>
                  </div>
                  <div className="table-cell py-1 text-center align-middle">
                    <Badge type="parkingCount" size="lg" percent={percent}>
                      {String(p.available)}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
});

export default ParkingTable;
