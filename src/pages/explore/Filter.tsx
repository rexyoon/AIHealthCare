import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Progressbar from '@/component/Progressbar';
import { ArrowLeft } from '@/assets';
import RegionStep from './RegionStep';
import ThemeStep from './ThemeStep';
import LoadingStep from './LoadingStep';
import ResultsStep from './ResultStep';
import type { Pair, Phase, Place } from './types';

export default function FilterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [phase, setPhase] = useState<Phase>('select');
  const [region, setRegion] = useState<Pair>({});
  const [activity, setActivity] = useState<Pair>({});
  const [results, setResults] = useState<Place[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [regionCodes, setRegionCodes] = useState<{
    areaCode?: string | number;
    sigunguCode?: string | number;
  }>({});
  const [activityCodes, setActivityCodes] = useState<{ cat1?: string; cat2?: string[] }>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, phase]);

  useEffect(() => {
    setActivity({});
    setActivityCodes({});
  }, [region.left, region.right]);

  const progress = useMemo(() => {
    if (phase === 'results') return 1;
    return step === 1 ? 0.5 : 1;
  }, [phase, step]);

  const handleFinish = () => {
  // 1. 먼저 /searching 으로 이동
  navigate('/searching');

  // 2. 3초(3000ms) 후 /search/result로 이동
  setTimeout(() => {
    navigate('/search/result', {
      state: {
        region: {
          areaCode: regionCodes.areaCode,
          sigunguCode: regionCodes.sigunguCode,
        },
        activity: {
          cat1: activityCodes.cat1,
          cat2: activityCodes.cat2,
        },
      },
    });
  }, 3000);
};

  const resetAndSelectAgain = () => {
    setPhase('select');
    setStep(1);
    setResults([]);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 헤더 */}
      <div className="bg-green3-light relative sticky top-0 z-50 h-10 w-full shadow-sm">
        <button onClick={() => navigate(-1)} className="absolute top-1/2 -translate-y-1/2 pl-4">
          <ArrowLeft className="w-4" />
        </button>
        <span className="text-caption3 text-green1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          여행지 탐색
        </span>
      </div>

      <div className="px-8">
        {/* 진행 바 */}
        <div className="pt-5 pb-2">
          <Progressbar progress={progress} />
        </div>

        {/* 본문 */}
        <div className="flex-1 py-3">
          {phase === 'select' && (
            <>
              {step === 1 ? (
                <RegionStep
                  value={region}
                  onChange={setRegion}
                  onChangeCodes={setRegionCodes}
                  onNext={() => setStep(2)}
                />
              ) : (
                <ThemeStep
                  value={activity}
                  onChange={setActivity}
                  onChangeCodes={setActivityCodes}
                  onPrev={() => setStep(1)}
                  onFinish={handleFinish}
                />
              )}
            </>
          )}

          {phase === 'loading' && <LoadingStep />}

          {phase === 'results' && (
            <ResultsStep
              region={region}
              activity={activity}
              results={results}
              error={error}
              onReset={resetAndSelectAgain}
            />
          )}
        </div>
      </div>
    </div>
  );
}
