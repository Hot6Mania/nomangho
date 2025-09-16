import type { FC } from "react";

type NowPlayingInfoBarProps = {
  title: string;
  artist?: string;
  viewers: number;
};

const NowPlayingInfoBar: FC<NowPlayingInfoBarProps> = ({
  title,
  artist,
  viewers,
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{title}</div>
        <div className="truncate text-xs text-neutral-500">{artist}</div>
      </div>
      <div className="text-xs text-neutral-600">현재 {viewers.toLocaleString()}명 시청 중</div>
    </div>
  );
};

export default NowPlayingInfoBar;
