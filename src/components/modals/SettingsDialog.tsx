"use client";

import { useState } from "react";
import type { UserProfile } from "@/lib/types";

type SettingsDialogProps = {
  isHost: boolean;
  me: UserProfile;
  onSave: (profile: UserProfile) => void;
  onClose: () => void;
};

export default function SettingsDialog({
  isHost,
  me,
  onSave,
  onClose,
}: SettingsDialogProps) {
  const [name, setName] = useState(me.name);
  const [color, setColor] = useState(me.color);
  const [hostOnlyControl, setHostOnlyControl] = useState(true);

  const handleSave = () => {
    onSave({ ...me, name, color });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-base font-semibold">설정</h3>
        <div className="mt-3 space-y-4">
          <div>
            <label className="block text-xs text-neutral-600">이름</label>
            <input
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-neutral-600">닉네임 색상</label>
            <input
              type="color"
              className="mt-1 h-9 w-16 cursor-pointer rounded border border-neutral-300"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>

          {isHost ? (
            <div className="rounded-lg border border-neutral-200 p-3">
              <div className="text-sm font-medium">권한 (호스트)</div>
              <label className="mt-2 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={hostOnlyControl}
                  onChange={(event) => setHostOnlyControl(event.target.checked)}
                />
                호스트만 재생을 제어할 수 있어요.
              </label>
            </div>
          ) : null}
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm transition hover:bg-neutral-100"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-black px-3 py-2 text-sm text-white transition hover:opacity-90"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
