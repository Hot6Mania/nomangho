"use client";

import { useMemo, useRef, useState } from "react";
import type { ChatMessage, UserProfile } from "@/lib/types";

type ChatPanelProps = {
  me: UserProfile;
};

export default function ChatPanel({ me }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => a.ts - b.ts),
    [messages],
  );

  const send = () => {
    if (!text.trim()) return;

    const message: ChatMessage = {
      id: crypto.randomUUID(),
      userId: me.id,
      name: me.name,
      color: me.color,
      text: text.trim(),
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, message]);
    setText("");
    queueMicrotask(() => {
      const container = scrollRef.current;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      }
    });
    // TODO: integrate realtime broadcasting (Supabase, Ably, etc.)
  };

  return (
    <div className="flex h-[50vh] flex-col">
      <div ref={scrollRef} className="grow overflow-y-auto p-3">
        {sortedMessages.length === 0 ? (
          <p className="text-sm text-neutral-500">
            아직 메시지가 없어요. 첫 메시지를 남겨보세요!
          </p>
        ) : (
          sortedMessages.map((message) => (
            <div key={message.id} className="mb-3">
              <div className="text-xs font-medium" style={{ color: message.color }}>
                {message.name}
              </div>
              <div className="text-sm text-neutral-800">{message.text}</div>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.nativeEvent.isComposing) {
              event.preventDefault();
              send();
            }
          }}
          placeholder="메시지를 입력하세요..."
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
        <button
          onClick={send}
          className="rounded-md bg-black px-3 py-2 text-sm text-white transition hover:opacity-90"
        >
          보내기
        </button>
      </div>
    </div>
  );
}
