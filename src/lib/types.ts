export type UserRole = "host" | "guest";

export type UserProfile = {
  id: string;
  name: string;
  color: string;
  role: UserRole;
};

export type Provider = "yt" | "nico" | "bili" | "sc" | "file";

export type PlaylistItem = {
  id: string;
  provider: Provider;
  sourceIdOrUrl: string;
  title: string;
  artist?: string;
  durationSec?: number;
  thumbnailUrl?: string;
};

export type PlaybackState = {
  itemId: string | null;
  status: "playing" | "paused" | "ended";
  positionMs: number;
  rate: number;
  viewers: number;
};

export type ChatMessage = {
  id: string;
  userId: string;
  name: string;
  color: string;
  text: string;
  ts: number;
};
