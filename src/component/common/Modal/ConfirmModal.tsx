export default function ConfirmModal({
  open,
  title = '확인',
  description = '이 작업을 진행하시겠습니까?',
  confirmText = '확인',
  cancelText = '취소',
  loading = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => !loading && onClose()} />
      <div className="relative w-[90%] max-w-[360px] rounded-l bg-white p-6 shadow-xl">
        {/* 제목 */}
        <h2 className="text-title4 text-green1 font-semibold">{title}</h2>

        {/* 내용 */}
        <p className="text-body1 text-green1 mt-3 leading-relaxed whitespace-pre-line">
          {description}
        </p>

        {/* 버튼 영역 */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="text-caption2 text-green-muted hover:text-green1 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="rounded-m bg-red1 text-caption2 btn-text-white px-4 py-2 hover:brightness-95 disabled:opacity-60"
          >
            {loading ? '처리 중…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
