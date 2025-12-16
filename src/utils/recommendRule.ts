import type { CheckInData, Recommendation } from "../types/fitness";

export function ruleBasedDecision(data: CheckInData): Recommendation {
    if(data.sleepHours < 5){
        return{
            mode:"RECOVERY",
            title:"회복 우선",
            reason:"수면 시간이 5시간 미만입니다, 고강도의 운동는 비추천입니다.",
            tip:"가벼운 유산소 15~25분 + 스트레칭 5분",
        };
    }
    if(data.soreness){
        return{
            mode:"RECOVERY",
            title:"회복 우선",
            reason:"근육통이 있어 과부하 위험이 있습니다.",
            tip:"폼롤링 5분 + 가동성 루틴 + LISS 15분",
        };
        }

        const next = 
        data.yesterdayWorkout === "PUSH"
        ? "PULL"
        : data.yesterdayWorkout === "PULL"
        ? "LEGS"
        : data.yesterdayWorkout === "LEGS"
        ? "PUSH"
        :"PUSH";
        
        return{
            mode:"TRAIN",
            title:"운동 진행",
            reason:"컨디션이 양호하여 운동을 진행합니다.",
            workout:next,
        };
        
}