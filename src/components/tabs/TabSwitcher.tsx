"use client";

type Tab = {
  key: string;
  label: string;
};

type TabSwitcherProps = {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
};

export default function TabSwitcher({ tabs, value, onChange }: TabSwitcherProps) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg bg-neutral-100 p-1">
      {tabs.map((tab) => {
        const active = tab.key === value;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`rounded-md px-3 py-2 text-sm transition ${
              active ? "bg-white shadow-sm" : "text-neutral-600 hover:bg-white/60"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
