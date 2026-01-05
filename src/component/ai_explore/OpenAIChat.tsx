import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../libs/axios";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
};

type QueryResponse = {
  reply: string;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const OpenAIChat: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content: "AI COACH 준비 완료. 혈압/혈당/체중 입력하면 코칭해줄게.",
      createdAt: Date.now(),
    },
  ]);
  const [isSending, setIsSending] = useState(false);

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
  }, [messages.length]);

  const handleSend = async () => {
    const text = userInput.trim();
    if (!text || isSending) return;

    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", content: text, createdAt: Date.now() },
    ]);
    setUserInput("");
    setIsSending(true);

    try {
      const res = await api.post<QueryResponse>("/api/openai/query", { query: text });

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: res.data.reply, createdAt: Date.now() },
      ]);
    } catch (error: any) {
      console.error("OpenAI 요청 실패:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: "요청 실패. 백엔드 로그/엔드포인트/포트 확인해.",
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleSend();
  };

  return (
    <div className="w-full max-w-xl">
      <div ref={listRef} className="h-[520px] overflow-y-auto rounded-2xl bg-white p-4">
        <div className="flex flex-col gap-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={[
                    "max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm",
                    isUser ? "bg-black text-white rounded-br-md" : "bg-gray-100 text-gray-900 rounded-bl-md",
                  ].join(" ")}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {isSending && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm bg-gray-100 text-gray-900 rounded-bl-md">
                응답 생성 중...
              </div>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="혈압 128/82, 혈당 95, 체중 84.9"
          className="flex-1 rounded-xl px-4 py-3 outline-none"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={!canSend}
          className={`rounded-xl px-4 py-3 font-semibold ${
            canSend ? "bg-white" : "bg-gray-500 cursor-not-allowed"
          }`}
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default OpenAIChat;
