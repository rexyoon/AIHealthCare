import Card from "../../component/ui/Card";

export default function History() {
  return (
    <div className="space-y-4">
      <Card title="히스토리">
        <div className="text-sm text-zinc-400">
          MVP 단계에서는 저장 기능 없이 UI만 둡니다. (다음 단계에서 백엔드/DB 붙일 예정)
        </div>
      </Card>
    </div>
  );
}
