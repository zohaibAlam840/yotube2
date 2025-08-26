
// File: components/LatestVideo.jsx
"use client";
import React from "react";

export default function LatestVideo({ video }) {
  if (!video) return null;
  return (
    <div className="rounded-lg overflow-hidden border border-slate-100 bg-white shadow">
      <a href={`https://youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
        <div className="w-full h-56 bg-slate-200">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
        </div>
      </a>
      <div className="p-3">
        <div className="font-semibold">{video.title}</div>
        <div className="text-xs text-[var(--muted)] mt-1">{Number(video.viewCount).toLocaleString()} views</div>
        <p className="text-sm text-[var(--muted)] mt-2 line-clamp-3">{video.description ?? ''}</p>
      </div>
    </div>
  );
}
