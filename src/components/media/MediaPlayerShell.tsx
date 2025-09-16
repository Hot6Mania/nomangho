"use client";

import { useEffect, useRef } from "react";
import type { PlaybackState, PlaylistItem } from "@/lib/types";

type MediaPlayerShellProps = {
  item: PlaylistItem | null;
  playback: PlaybackState;
  onEnded: () => void;
};

export default function MediaPlayerShell({
  item,
  playback,
  onEnded,
}: MediaPlayerShellProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // TODO: provider adapter mounting point (YouTube, SoundCloud, etc.)
    // For now this effect simply keeps a reference to the mount node.
    return () => {
      // Clean up embedded players once real integrations are added.
      if (container.firstChild) {
        container.innerHTML = "";
      }
    };
  }, [item?.id]);

  useEffect(() => {
    // Placeholder for playback status synchronization.
    if (playback.status === "ended") {
      onEnded();
    }
  }, [playback.status, onEnded]);

  if (!item) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-sm text-neutral-300">
        재생할 트랙이 없어요. 플레이리스트에 곡을 추가해 주세요.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center bg-black text-white"
    >
      <div className="flex flex-col items-center gap-3">
        {item.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumbnailUrl}
            alt=""
            className="max-h-64 rounded object-cover"
          />
        ) : (
          <div className="rounded border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
            {item.provider.toUpperCase()}
          </div>
        )}
        <div className="text-sm text-neutral-300">재생 상태: {playback.status}</div>
      </div>
    </div>
  );
}
