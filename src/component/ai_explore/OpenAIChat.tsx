import React, { useEffect, useMemo, useRef, useState } from "react";
import api from "../../libs/axios";
type Role = "user" | "assistant";
type ChatMessage = {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
};
type OpenAIQueryResponse =
  | string
  | {
      reply?: string;
      message?: string;
      content?: string;
      data?: any;
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
      content: "AI COACH 준비 완료. 질문을 입력해.",
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
  function extractReply(payload: OpenAIQueryResponse): string {
    if (typeof payload === "string") return payload;
    return (
      payload.reply ??
      payload.message ??
      payload.content ??
      (payload.data ? JSON.stringify(payload.data) : JSON.stringify(payload))
    );
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = userInput.trim();
    if (!text || isSending) return;
    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: text,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsSending(true);
    try {
      const res = await api.post<OpenAIQueryResponse>("/api/openai/query", {
        query: text, 
      });
      const replyText = extractReply(res.data);
      const botMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        content: replyText,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("OpenAI 요청 실패:", error);
      const errMsg: ChatMessage = {
        id: uid(),
        role: "assistant",
        content:
          "요청 실패. (1) 엔드포인트 (/api/openai/query) (2) 요청 바디 key(query) (3) CORS/토큰 확인해.",
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };
  return (
    <div className="w-full max-w-xl">
      {/* 메시지 영역 */}
      <div
        ref={listRef}
        className="h-[520px] overflow-y-auto rounded-2xl bg-white p-4">
        <div className="flex flex-col gap-3">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`} >
                <div
                  className={[
                    "max-w-[80%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm",
                    isUser
                      ? "bg-black text-white rounded-br-md"
                      : "bg-gray-100 text-gray-900 rounded-bl-md",
                  ].join(" ")}>
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
      {/* 입력 영역 */}
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="질문을 입력하세요"
          className="flex-1 rounded-xl px-4 py-3 outline-none"
          disabled={isSending}/>
        <button
          type="submit"
          disabled={!canSend}
          className={`rounded-xl px-4 py-3 font-semibold ${
            canSend ? "bg-white" : "bg-gray-500 cursor-not-allowed"
          }`} >
          전송
        </button>
      </form>
    </div>
  );
};
export default OpenAIChat;