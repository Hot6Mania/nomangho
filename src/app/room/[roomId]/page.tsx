"use client";

import { use, useMemo, useState } from "react";
import AppHeader from "@/components/header/AppHeader";
import ChatPanel from "@/components/chat/ChatPanel";
import NowPlayingInfoBar from "@/components/info/NowPlayingInfoBar";
import MediaPlayerShell from "@/components/media/MediaPlayerShell";
import PlaylistPanel from "@/components/playlist/PlaylistPanel";
import TabSwitcher from "@/components/tabs/TabSwitcher";
import type {
  PlaybackState,
  PlaylistItem,
  Provider,
  UserProfile,
} from "@/lib/types";
import { copyToClipboard, showToast } from "@/lib/ui";

export default function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  const [me, setMe] = useState<UserProfile>({
    id: "me",
    name: "Guest",
    color: "#2e7d32",
    role: "guest",
  });

  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [current, setCurrent] = useState<PlaylistItem | null>(null);
  const [playback, setPlayback] = useState<PlaybackState>({
    itemId: null,
    status: "paused",
    positionMs: 0,
    rate: 1,
    viewers: 1,
  });
  const [tab, setTab] = useState<"playlist" | "chat">("playlist");

  const now = useMemo(() => {
    if (!current) {
      return { title: "지금 재생 중인 곡이 없습니다", artist: "" };
    }
    return { title: current.title, artist: current.artist ?? "" };
  }, [current]);

  const onShare = async () => {
    const success = await copyToClipboard(window.location.href);
    showToast(
      success
        ? "공유 링크가 복사됐어요!"
        : "복사에 실패했어요. 주소창의 링크를 직접 복사해 주세요.",
    );
  };

  const onAddByLink = async (link: string) => {
    const normalized = link.trim();
    if (!normalized) return;

    const item: PlaylistItem = {
      id: crypto.randomUUID(),
      provider: detectProvider(normalized),
      sourceIdOrUrl: normalized,
      title: "제목을 불러오는 중...",
    };

    setPlaylist((prev) => [...prev, item]);

    if (!current) {
      setCurrent(item);
      setPlayback((prev) => ({
        ...prev,
        itemId: item.id,
        status: "paused",
      }));
    }
  };

  const controls = {
    play: () =>
      setPlayback((prev) => ({
        ...prev,
        status: "playing",
      })),
    pause: () =>
      setPlayback((prev) => ({
        ...prev,
        status: "paused",
      })),
    next: () => {
      if (!current) return;
      const idx = playlist.findIndex((entry) => entry.id === current.id);
      const nextItem = playlist[idx + 1];
      if (nextItem) {
        setCurrent(nextItem);
        setPlayback((prev) => ({
          ...prev,
          itemId: nextItem.id,
          status: "playing",
          positionMs: 0,
        }));
      }
    },
    seek: (ms: number) =>
      setPlayback((prev) => ({
        ...prev,
        positionMs: ms,
      })),
  };

  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <AppHeader
        title="Nomangho"
        subtitle={`Room · ${roomId}`}
        isHost={me.role === "host"}
        onShare={onShare}
        onAddByLink={onAddByLink}
        me={me}
        onUpdateMe={(profile) => setMe(profile)}
      />

      <main className="mx-auto max-w-5xl px-4 pb-8">
        <section className="mt-3 aspect-video w-full overflow-hidden rounded-xl border border-neutral-200 bg-black">
          <MediaPlayerShell
            item={current}
            playback={playback}
            onEnded={controls.next}
          />
        </section>

        <section className="mt-3">
          <NowPlayingInfoBar
            title={now.title}
            artist={now.artist}
            viewers={playback.viewers}
          />
        </section>

        <section className="mt-2">
          <TabSwitcher
            tabs={[
              { key: "playlist", label: "Playlist" },
              { key: "chat", label: "Chat" },
            ]}
            value={tab}
            onChange={(value) => setTab(value as "playlist" | "chat")}
          />
          <div className="mt-3 rounded-xl border border-neutral-200">
            {tab === "playlist" ? (
              <PlaylistPanel
                isHost={me.role === "host"}
                playlist={playlist}
                currentId={current?.id ?? null}
                onSelect={(item) => {
                  setCurrent(item);
                  setPlayback((prev) => ({
                    ...prev,
                    itemId: item.id,
                    status: "playing",
                    positionMs: 0,
                  }));
                }}
                onRemove={(id) => {
                  setPlaylist((prev) => prev.filter((entry) => entry.id !== id));
                  if (current?.id === id) {
                    setCurrent(null);
                    setPlayback((prev) => ({
                      ...prev,
                      itemId: null,
                      status: "paused",
                      positionMs: 0,
                    }));
                  }
                }}
              />
            ) : (
              <ChatPanel me={me} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function detectProvider(link: string): Provider {
  if (link.includes("youtube") || link.includes("youtu.be")) return "yt";
  if (link.includes("nicovideo.jp")) return "nico";
  if (link.includes("bilibili")) return "bili";
  if (link.includes("soundcloud")) return "sc";
  return "file";
}
