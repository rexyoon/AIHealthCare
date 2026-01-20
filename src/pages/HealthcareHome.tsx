

export default function HealthcareHome() {
  return (
    // 전체 컨테이너: 모바일 뷰처럼 보이게 max-w-md 설정 (실제 앱에선 제거 가능)
    <div className="min-h-screen bg-black text-white flex justify-center font-sans">
      <div className="w-full max-w-md px-6 py-8 flex flex-col gap-8">
        
        {/*  상단 헤더 영역 */}
        <header className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-800 overflow-hidden border border-neutral-700">
            {/* 프로필 이미지 플레이스홀더 */}
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">
              Ready, <span className="text-[#CCFF00]">User</span>?
            </h1>
            <p className="text-xs text-neutral-400">Today's Bio-Rhythm Analysis</p>
          </div>
        </header>


        {/* 대시보드 요약 카드 */}
        <section className="bg-neutral-900 rounded-[2rem] p-6 shadow-2xl border border-neutral-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-neutral-200">Recent Analysis</h2>
            <span className="text-[10px] px-2 py-1 rounded-full bg-neutral-800 text-neutral-400">Weekly</span>
          </div>

          {/* 차트 영역 (라이브러리 없이 CSS로 구현) */}
          <div className="flex justify-between items-end h-32 mb-6 px-2">
            
            {/* 왼쪽: 원형 게이지 차트 (conic-gradient 사용) */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* 바깥쪽 원 (CSS Gradient로 게이지 표현) */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#CCFF00 75%, #333 0)`
                }}
              ></div>
              {/* 안쪽 구멍 (도넛 모양 만들기) */}
              <div className="absolute inset-2 bg-neutral-900 rounded-full flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">75<span className="text-xs">%</span></span>
                <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Healthy</span>
              </div>
            </div>

            {/* 오른쪽: 막대 차트 */}
            <div className="flex items-end gap-2 h-full pb-1">
              {/* 막대들 */}
              <div className="w-3 bg-neutral-700 rounded-t-sm h-[40%]"></div>
              <div className="w-3 bg-neutral-700 rounded-t-sm h-[60%]"></div>
              <div className="w-3 bg-neutral-700 rounded-t-sm h-[30%]"></div>
              <div className="w-3 bg-[#CCFF00] rounded-t-sm h-[80%] shadow-[0_0_10px_rgba(204,255,0,0.5)]"></div>
            </div>
          </div>

          {/* 하단 텍스트 정보 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-neutral-800 pb-3">
              <span className="text-neutral-400">Testosterone</span>
              <span className="font-mono text-[#CCFF00]">High Normal 🟢</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400">Liver Function</span>
              <span className="font-mono text-white">Stable</span>
            </div>
            
            <div className="mt-4 p-3 bg-neutral-800/50 rounded-xl">
               <p className="text-xs text-neutral-300 leading-relaxed">
                 <span className="text-[#CCFF00] font-bold">Insight:</span> Your stats are looking good compared to last week. Keep maintaining your current routine.
               </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

