import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../libs/axios";
import SendingIcon from "../../image/Sending.png";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
};

// 백엔드가 JsonNode를 그대로 내려옴
type AiJsonResponse = Record<string, any> | string;

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// JSON을 보기 좋게 문자열로 변환 (문자열이면 그대로)
function formatAiResponse(data: AiJsonResponse): string {
  if (typeof data === "string") return data;
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

const OpenAIChat: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content: "안녕하세요 AI 코치 IronLogic입니다.",
      createdAt: Date.now(),
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const canSend = useMemo(
    () => userInput.trim().length > 0 && !isSending,
    [userInput, isSending]
  );

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length, isSending]);

  const pushMessage = (role: Role, content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: uid(), role, content, createdAt: Date.now() },
    ]);
  };

  const handleClearInput = () => {
    setUserInput("");
    inputRef.current?.focus();
  };

  const handleSend = async () => {
    const text = userInput.trim();
    if (!text || isSending) return;

    // 유저 메시지 추가
    pushMessage("user", text);
    setUserInput("");
    setIsSending(true);
    setErrorMessage(""); // 에러 메시지 초기화

    try {
      const res = await api.post<AiJsonResponse>("/api/openai/query", { query: text });
      const pretty = formatAiResponse(res.data);
      pushMessage("assistant", pretty);
    } catch (error: any) {
      const status = error?.response?.status;
      const data = error?.response?.data;

      console.error("OpenAI 요청 실패:", {
        message: error?.message,
        status,
        data,
      });

      const serverMsg = data ? `\n\n[서버 응답]\n${formatAiResponse(data)}` : "";
      setErrorMessage(`요청 실패. (${status ?? "NO_STATUS"}) 백엔드 로그/엔드포인트/포트 확인해.${serverMsg}`);
      pushMessage("assistant", `요청 실패. (${status ?? "NO_STATUS"})`);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSend();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void handleSend();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      handleClearInput();
    }
  };

  return (
    <div className="w-full max-w-[380px]">
      {/* Card */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex h-12 items-center bg-black px-4">
          <div className="text-sm font-semibold tracking-wide text-white">AI COACH</div>
        </div>

        {/* Messages */}
        <div ref={listRef} className="h-[520px] overflow-y-auto bg-white px-4 py-4">
          <div className="flex flex-col gap-3">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div className={[
                    "max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-sm leading-relaxed",
                    isUser ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-900",
                    !isUser ? "font-mono" : "",
                  ].join(" ")}>
                    {m.content}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-xl bg-zinc-100 px-3 py-2 text-sm text-zinc-900">
                  응답 생성 중...
                </div>
              </div>
            )}
            
            {errorMessage && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-xl bg-red-100 px-3 py-2 text-sm text-red-600">
                  {errorMessage}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom input bar */}
        <form onSubmit={handleSubmit} className="bg-white p-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="혈압, 혈당, 체중을 입력해주세요"
              className="h-10 w-full rounded-full bg-zinc-200/80 px-4 pr-12 text-sm text-zinc-900 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-400 disabled:opacity-60"
              disabled={isSending}
            />

            <button
              type="button"
              onClick={userInput.trim().length ? handleSend : handleClearInput}
              disabled={isSending || (!userInput.trim().length && userInput.length === 0)}
              className={[
                "absolute right-2 top-1/2 -translate-y-1/2",
                "flex items-center justify-center",
                "active:scale-[0.98] transition",
                isSending ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
              aria-label={userInput.trim().length ? "send" : "clear"}
              title={userInput.trim().length ? "Send (Enter)" : "Clear (Esc)"}
            >
              <img src={SendingIcon} alt="send" className="h-7 w-7" />
            </button>
          </div>

          <div className="mt-2 text-[11px] text-zinc-500">
            Enter: 전송 · Esc: 입력 지우기
          </div>
          <button type="submit" className="hidden" disabled={!canSend} aria-hidden="true" />
        </form>
      </div>
    </div>
  );
};

export default OpenAIChat;
