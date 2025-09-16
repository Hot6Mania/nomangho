"use client";

import { useState } from "react";
import AddTrackDialog from "@/components/modals/AddTrackDialog";
import SettingsDialog from "@/components/modals/SettingsDialog";
import type { UserProfile } from "@/lib/types";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  isHost: boolean;
  onShare: () => void;
  onAddByLink: (link: string) => void;
  me: UserProfile;
  onUpdateMe: (profile: UserProfile) => void;
};

export default function AppHeader({
  title,
  subtitle,
  isHost,
  onShare,
  onAddByLink,
  me,
  onUpdateMe,
}: AppHeaderProps) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <header className="sticky top-0 z-20 w-full border-b border-neutral-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-xs font-semibold text-white">
            NOM
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight">{title}</span>
            <span className="text-xs text-neutral-500">
              {subtitle ?? "Nomangho Room"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm transition hover:bg-neutral-100"
            onClick={onShare}
            title="현재 페이지 URL 복사"
          >
            공유
          </button>
          <button
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm transition hover:bg-neutral-100"
            onClick={() => setOpenAdd(true)}
            title="링크로 트랙 추가"
          >
            추가
          </button>
          <button
            className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm transition hover:bg-neutral-100"
            onClick={() => setOpenSettings(true)}
            title="설정"
          >
            설정
          </button>
        </div>
      </div>

      {openAdd ? (
        <AddTrackDialog
          onClose={() => setOpenAdd(false)}
          onSubmit={(link) => {
            onAddByLink(link);
            setOpenAdd(false);
          }}
        />
      ) : null}

      {openSettings ? (
        <SettingsDialog
          isHost={isHost}
          me={me}
          onClose={() => setOpenSettings(false)}
          onSave={(profile) => {
            onUpdateMe(profile);
            setOpenSettings(false);
          }}
        />
      ) : null}
    </header>
  );
}
