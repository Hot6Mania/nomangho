import Image from "next/image";

const videos = [
  {
    id: 1,
    title: "A Clean Apple‑Style Card",
    channel: "Nomangho",
    views: "1.2M views",
    time: "2 days ago",
    thumb: "/window.svg",
    avatar: "/vercel.svg",
  },
  {
    id: 2,
    title: "Designing Calm Interfaces",
    channel: "Studio A",
    views: "842K views",
    time: "1 week ago",
    thumb: "/globe.svg",
    avatar: "/next.svg",
  },
  {
    id: 3,
    title: "Tailwind UI Polish Tips",
    channel: "Nomangho",
    views: "312K views",
    time: "3 weeks ago",
    thumb: "/file.svg",
    avatar: "/vercel.svg",
  },
  {
    id: 4,
    title: "Minimal Motion and Depth",
    channel: "Studio B",
    views: "990K views",
    time: "1 month ago",
    thumb: "/next.svg",
    avatar: "/globe.svg",
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <div className="chip-row">
        <button className="chip chip--active">All</button>
        <button className="chip">Music</button>
        <button className="chip">Gaming</button>
        <button className="chip">Live</button>
        <button className="chip">News</button>
        <button className="chip">Trailers</button>
      </div>

      <section className="mt-4 video-grid">
        {videos.map((v) => (
          <article key={v.id} className="video-card">
            <div className="video-thumb relative">
              <Image src={v.thumb} alt="" fill className="object-cover" />
            </div>
            <div className="video-meta">
              <div className="video-avatar overflow-hidden">
                <Image
                  src={v.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="video-title">{v.title}</h3>
                <p className="video-subtext">
                  {v.channel} · {v.views} · {v.time}
                </p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
