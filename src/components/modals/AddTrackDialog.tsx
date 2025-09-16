"use client";

import { useState } from "react";

type AddTrackDialogProps = {
  onSubmit: (link: string) => void;
  onClose: () => void;
};

export default function AddTrackDialog({ onSubmit, onClose }: AddTrackDialogProps) {
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    const trimmed = link.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-base font-semibold">Add track</h3>
        <p className="mt-1 text-xs text-neutral-500">
          Paste a shareable link and select Add to queue it up.
        </p>
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs text-neutral-600" htmlFor="track-link">
              Link URL
            </label>
            <input
              id="track-link"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="https://..."
              autoFocus
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm transition hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-black px-3 py-2 text-sm text-white transition hover:opacity-90"
            disabled={!link.trim()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
