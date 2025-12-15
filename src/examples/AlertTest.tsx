import Alert from '@/component/common/Alert/Alert';
import { useAlertQueue } from '@/stores/useAlertQueue';

export default function AlertComponent() {
  const { alerts, addAlert, removeAlert } = useAlertQueue();

  const handleClick = () => {
    addAlert('닉네임이 중복이에요.');
  };

  return (
    <div className="relative min-h-screen px-4 pt-10 pb-32">
      <button
        onClick={handleClick}
        className="bg-green3 fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-lg px-6 py-3 text-white shadow-md"
      >
        오류 띄우기
      </button>

      <div className="absolute bottom-24 left-1/2 flex w-full max-w-md -translate-x-1/2 flex-col-reverse gap-2 px-4">
        {alerts.map((alert) => (
          <Alert key={alert.id} onClose={() => removeAlert(alert.id)}>
            {alert.message}
          </Alert>
        ))}
      </div>
    </div>
  );
}
