"use client";

import type { PlaylistItem } from "@/lib/types";

type PlaylistPanelProps = {
  isHost: boolean;
  playlist: PlaylistItem[];
  currentId: string | null;
  onSelect: (item: PlaylistItem) => void;
  onRemove: (id: string) => void;
};

export default function PlaylistPanel({
  isHost,
  playlist,
  currentId,
  onSelect,
  onRemove,
}: PlaylistPanelProps) {
  const handleSelect = (item: PlaylistItem) => onSelect(item);
  const handleRemove = (id: string) => onRemove(id);

  return (
    <div className="max-h-[50vh] overflow-y-auto p-2">
      {playlist.length === 0 ? (
        <div className="px-3 py-4 text-sm text-neutral-500">
          재생 목록이 비어 있어요. 상단의 <span className="font-semibold">추가</span> 버튼으로 링크를 붙여 넣어 보세요.
        </div>
      ) : null}

      <ul className="divide-y divide-neutral-200">
        {playlist.map((item) => {
          const active = item.id === currentId;
          return (
            <li
              key={item.id}
              className={`flex items-center gap-3 p-3 transition ${
                active ? "bg-neutral-50" : "hover:bg-neutral-50"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-neutral-200 text-[10px] font-semibold text-neutral-700">
                {item.provider.toUpperCase()}
              </div>
              <div className="min-w-0 grow">
                <div className="truncate text-sm font-medium text-neutral-900">
                  {item.title}
                </div>
                {item.artist ? (
                  <div className="truncate text-xs text-neutral-500">{item.artist}</div>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  className="rounded border border-neutral-300 px-2 py-1 text-xs transition hover:bg-neutral-100"
                  onClick={() => handleSelect(item)}
                  title="이 트랙 재생"
                >
                  재생
                </button>
                {isHost ? (
                  <button
                    className="rounded border border-neutral-300 px-2 py-1 text-xs transition hover:bg-neutral-100"
                    onClick={() => handleRemove(item.id)}
                    title="트랙 삭제"
                  >
                    삭제
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
