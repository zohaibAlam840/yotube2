"use client";
import React from "react";

// SVG Icon Components for Hero
const SubscribersIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ViewsIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VideosIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LikesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 10V22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12H15L16.24 9.62C16.3614 9.37527 16.4238 9.1072 16.4227 8.83568C16.4216 8.56416 16.357 8.29673 16.2339 8.053C16.1108 7.80927 15.9326 7.59584 15.713 7.42938C15.4934 7.26292 15.2383 7.14792 14.9675 7.09322C14.6967 7.03852 14.4173 7.04558 14.15 7.11392L14 7.18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="3" y="10" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Hero({ channel, loading, type }) {
  // safe getter for nested paths, returns first defined value among candidates
  const getFirst = (obj, candidates = []) => {
    for (const path of candidates) {
      if (!path) continue;
      const parts = path.split(".");
      let cur = obj;
      let ok = true;
      for (const p of parts) {
        if (cur == null || !(p in cur)) {
          ok = false;
          break;
        }
        cur = cur[p];
      }
      if (ok && cur != null && cur !== "") return cur;
    }
    return undefined;
  };

  // robust formatter:
  // - if a number (or numeric-string) -> toLocaleString
  // - if a string with letters (e.g. "1.2M", "12.3k") -> return as-is
  // - if value present, show it even during loading
  // - if absent, show "—" (not dots)
  const fmt = (val) => {
    if (val == null || val === "") return "—";

    // if it's a string, check if it's numeric or a human-short string
    if (typeof val === "string") {
      const cleaned = val.replace(/,/g, "").trim();
      // contains letters (k, M, etc.) -> return original string
      if (/[a-zA-Z]/.test(cleaned)) return val;
      const n = Number(cleaned);
      return Number.isFinite(n) ? n.toLocaleString() : val;
    }

    // number or other convertible -> format if finite
    const n = Number(val);
    return Number.isFinite(n) ? n.toLocaleString() : String(val);
  };

  // Try multiple likely property names/shapes so we show stats coming from different APIs
  const subscriberVal =
    getFirst(channel, [
      "subscriberCount",
      "statistics.subscriberCount",
      "subscriber_count",
      "subscriberCountText",
      "subscribers",
      "stats.subscriberCount",
    ]) ?? null;

  const viewVal =
    getFirst(channel, [
      "viewCount",
      "statistics.viewCount",
      "view_count",
      "viewCountText",
      "totalViews",
      "stats.viewCount",
    ]) ?? null;

  const videoVal =
    getFirst(channel, [
      "videoCount",
      "statistics.videoCount",
      "video_count",
      "videoCountText",
      "videos",
      "stats.videoCount",
    ]) ?? null;

  const likesVal =
    getFirst(channel, [
      "approxLikes",
      "likes",
      "statistics.likes",
      "likeCount",
      "approximateLikes",
    ]) ?? null;

  function InlineStat({ label, value, icon, highlight }) {
    return (
      <div
        className={`flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm min-w-0 ${
          highlight ? "ring-2 ring-white/30" : ""
        } transition-all hover:bg-white/15`}
        role="group"
        aria-label={label}
      >
        <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg" aria-hidden>
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-xl md:text-2xl font-bold leading-tight truncate">
            {fmt(value)}
          </div>
          <div className="text-xs opacity-90 truncate uppercase tracking-wider font-medium mt-1">{label}</div>
        </div>
      </div>
    );
  }

  // Create array of stats to display (remove likes if 0 or null)
  const statsToDisplay = [
    { label: "Subscribers", value: subscriberVal, icon: <SubscribersIcon className="w-5 h-5" />, highlight: true },
    { label: "Total Views", value: viewVal, icon: <ViewsIcon className="w-5 h-5" /> },
    { label: "Videos", value: videoVal, icon: <VideosIcon className="w-5 h-5" /> },
  ];
  
  // Only add likes if it has a value and is not 0
  if (likesVal && likesVal !== 0) {
    statsToDisplay.push({ label: "Approx Likes", value: likesVal, icon: <LikesIcon className="w-5 h-5" /> });
  }

  return (
    <div
      className="rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-white/20"
      style={{
        background: 'linear-gradient(135deg, var(--brand-red) 0%, #d62d20 100%)',
        color: "white",
        borderRadius: 24,
      }}
    >
      {/* Subtle background pattern */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: "30px 30px",
          opacity: 0.8,
          mixBlendMode: "overlay",
        }}
      />
      
      {/* Accent elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-white/10 rounded-full blur-xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={channel?.thumbnail ?? "/next.svg"}
              alt={channel?.title ?? "channel"}
              width={140}
              height={140}
              className="rounded-2xl shadow-2xl object-cover w-[140px] h-[140px] border-4 border-white/20"
            />
            <div className="absolute -bottom-2 -right-2 bg-white text-red-600 text-xs font-bold py-1 px-2 rounded-lg shadow-md">
              LIVE
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-baseline gap-4 flex-wrap">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              style={{ 
                color: "white",
                textShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              {channel?.title ?? "AleeAdee"}
            </h1>
            <div className="text-sm bg-white/20 py-1 px-3 rounded-full font-medium mt-1">{type}</div>
          </div>

          <p className="mt-4 text-md text-white/90 max-w-2xl leading-relaxed">
            {channel?.description
              ? channel.description.slice(0, 220) + (channel.description.length > 220 ? "…" : "")
              : "Channel description will appear here."}
          </p>

          {/* Stats grid: responsive and prevents overlap by using flex items with truncate */}
          <div className={`mt-8 grid gap-4 ${statsToDisplay.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
            {statsToDisplay.map((stat, index) => (
              <InlineStat 
                key={index}
                label={stat.label} 
                value={stat.value} 
                icon={stat.icon} 
                highlight={stat.highlight} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}