// // app/api/youtube/route.js
// import { NextResponse } from "next/server";

// const API_KEY = process.env.YT_API_KEY;
// const EXPLICIT_CHANNEL_ID = process.env.CHANNEL_ID || null;
// const CHANNEL_HANDLE = process.env.CHANNEL_HANDLE; // fallback if no CHANNEL_ID
// const MAX_VIDEO_IDS = Number(process.env.MAX_VIDEO_IDS ?? 50);
// const MIN_FETCH_INTERVAL_MS = Number(process.env.MIN_FETCH_INTERVAL_MS ?? 300000); // default 5 minutes

// if (!API_KEY) {
//   console.error("Missing YT_API_KEY env var");
// }

// // Simple in-memory cache (module-level). Note: serverless platforms may re-create the module.
// let cachedPayload = null;
// let lastFetchTs = 0;

// async function fetchJson(url) {
//   const r = await fetch(url);
//   if (!r.ok) {
//     const text = await r.text();
//     throw new Error(`YT fetch failed (${r.status}): ${text}`);
//   }
//   return r.json();
// }

// async function resolveChannelId(handle) {
//   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(
//     handle
//   )}&key=${API_KEY}`;

//   const j = await fetchJson(url);
//   const item = j.items?.[0];
//   if (!item) return null;
//   return item.id?.channelId ?? item.snippet?.channelId ?? null;
// }

// async function fetchChannelStats(channelId) {
//   const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${API_KEY}`;
//   const j = await fetchJson(url);
//   const ch = j.items?.[0];
//   if (!ch) return null;
//   return {
//     channelId,
//     title: ch.snippet.title,
//     description: ch.snippet.description,
//     thumbnail:
//       ch.snippet.thumbnails?.high?.url ?? ch.snippet.thumbnails?.default?.url ?? null,
//     subscriberCount:
//       ch.statistics.hiddenSubscriberCount === true
//         ? null
//         : Number(ch.statistics.subscriberCount || 0),
//     viewCount: Number(ch.statistics.viewCount || 0),
//     videoCount: Number(ch.statistics.videoCount || 0),
//     uploadsPlaylistId: ch.contentDetails?.relatedPlaylists?.uploads ?? null,
//   };
// }

// async function fetchUploadVideoIds(uploadsPlaylistId, limit = MAX_VIDEO_IDS) {
//   if (!uploadsPlaylistId) return [];
//   const ids = [];
//   let pageToken = "";
//   while (ids.length < limit) {
//     const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${Math.min(
//       50,
//       limit - ids.length
//     )}${pageToken ? `&pageToken=${pageToken}` : ""}&key=${API_KEY}`;
//     const j = await fetchJson(url);
//     (j.items || []).forEach((it) => {
//       const vid = it.contentDetails?.videoId;
//       if (vid) ids.push(vid);
//     });
//     pageToken = j.nextPageToken;
//     if (!pageToken) break;
//   }
//   return ids.slice(0, limit);
// }

// async function fetchVideosStats(videoIds = []) {
//   if (!videoIds.length) return [];
//   const chunks = [];
//   for (let i = 0; i < videoIds.length; i += 50) {
//     chunks.push(videoIds.slice(i, i + 50));
//   }
//   const results = [];
//   for (const chunk of chunks) {
//     const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${chunk.join(
//       ","
//     )}&key=${API_KEY}`;
//     const j = await fetchJson(url);
//     (j.items || []).forEach((it) => {
//       results.push({
//         id: it.id,
//         title: it.snippet?.title ?? "",
//         thumbnail:
//           it.snippet?.thumbnails?.medium?.url ??
//           it.snippet?.thumbnails?.default?.url ??
//           null,
//         viewCount: Number(it.statistics?.viewCount ?? 0),
//         likeCount:
//           it.statistics && typeof it.statistics.likeCount !== "undefined"
//             ? Number(it.statistics.likeCount)
//             : null,
//         publishedAt: it.snippet?.publishedAt ?? null,
//       });
//     });
//   }
//   return results;
// }

// export async function GET() {
//   if (!API_KEY) {
//     return NextResponse.json(
//       { error: "Server missing YT_API_KEY env var" },
//       { status: 500 }
//     );
//   }

//   // honor cache window if available
//   const now = Date.now();
//   if (cachedPayload && now - lastFetchTs < MIN_FETCH_INTERVAL_MS) {
//     const res = NextResponse.json(cachedPayload);
//     // reflect cache hit
//     res.headers.set("X-Cache", "HIT");
//     res.headers.set("Cache-Control", `s-maxage=${Math.floor(MIN_FETCH_INTERVAL_MS / 1000)}, stale-while-revalidate=59`);
//     return res;
//   }

//   try {
//     const channelId = EXPLICIT_CHANNEL_ID ?? (await resolveChannelId(CHANNEL_HANDLE));
//     if (!channelId) {
//       return NextResponse.json({ error: "Channel not found" }, { status: 404 });
//     }

//     const stats = await fetchChannelStats(channelId);
//     if (!stats) {
//       return NextResponse.json({ error: "Failed to fetch channel stats" }, { status: 500 });
//     }

//     // fetch recent video ids from uploads playlist and then their stats
//     const ids = await fetchUploadVideoIds(stats.uploadsPlaylistId, MAX_VIDEO_IDS);
//     const videos = await fetchVideosStats(ids);

//     // compute approximate total likes (sum of likeCount where available)
//     const approxLikes = videos.reduce((acc, v) => acc + (v.likeCount || 0), 0);

//     // sort videos by viewCount descending
//     const byViews = [...videos].sort((a, b) => b.viewCount - a.viewCount);

//     // pick top 6 for the front page (existing behavior)
//     const topVideos = byViews.slice(0, 6);

//     // also include a "mostViewed" list (top 10) and the single topVideo
//     const mostViewed = byViews.slice(0, 10);
//     const topVideo = mostViewed[0] ?? null;

//     const payload = {
//       channel: {
//         id: stats.channelId,
//         title: stats.title,
//         description: stats.description,
//         thumbnail: stats.thumbnail,
//         subscriberCount: stats.subscriberCount,
//         viewCount: stats.viewCount,
//         videoCount: stats.videoCount,
//       },
//       topVideos,     // top 6 (by view count)
//       mostViewed,    // top 10 (by view count) — new
//       topVideo,      // single most viewed video — new
//       approxLikes,
//       fetchedAt: new Date().toISOString(),
//     };

//     // update cache
//     cachedPayload = payload;
//     lastFetchTs = Date.now();

//     const res = NextResponse.json(payload);
//     res.headers.set("X-Cache", "MISS");
//     res.headers.set("Cache-Control", `s-maxage=${Math.floor(MIN_FETCH_INTERVAL_MS / 1000)}, stale-while-revalidate=59`);
//     return res;
//   } catch (err) {
//     console.error("YT API error", err);
//     return NextResponse.json(
//       { error: "Failed to fetch YouTube data", detail: String(err) },
//       { status: 500 }
//     );
//   }
// }



// app/api/youtube/route.js
import { NextResponse } from "next/server";

const API_KEY = process.env.YT_API_KEY;
const EXPLICIT_CHANNEL_ID = process.env.CHANNEL_ID || null;
const CHANNEL_HANDLE = process.env.CHANNEL_HANDLE;
const MAX_VIDEO_IDS = Number(process.env.MAX_VIDEO_IDS ?? 50);
const MIN_FETCH_INTERVAL_MS = Number(process.env.MIN_FETCH_INTERVAL_MS ?? 300000);

if (!API_KEY) console.error("Missing YT_API_KEY env var");

let cachedPayload = null;
let lastFetchTs = 0;

async function fetchJson(url) {
  const r = await fetch(url);
  if (!r.ok) {
    const text = await r.text();
    throw new Error(`YT fetch failed (${r.status}): ${text}`);
  }
  return r.json();
}

async function resolveChannelId(handle) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(
    handle
  )}&key=${API_KEY}`;
  const j = await fetchJson(url);
  const item = j.items?.[0];
  if (!item) return null;
  return item.id?.channelId ?? item.snippet?.channelId ?? null;
}

async function fetchChannelStats(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${API_KEY}`;
  const j = await fetchJson(url);
  const ch = j.items?.[0];
  if (!ch) return null;
  return {
    channelId,
    title: ch.snippet.title,
    description: ch.snippet.description,
    thumbnail:
      ch.snippet.thumbnails?.high?.url ?? ch.snippet.thumbnails?.default?.url ?? null,
    subscriberCount:
      ch.statistics.hiddenSubscriberCount === true
        ? null
        : Number(ch.statistics.subscriberCount || 0),
    viewCount: Number(ch.statistics.viewCount || 0),
    videoCount: Number(ch.statistics.videoCount || 0),
    uploadsPlaylistId: ch.contentDetails?.relatedPlaylists?.uploads ?? null,
  };
}

// Use uploads playlist (chronological) - unchanged
async function fetchUploadVideoIds(uploadsPlaylistId, limit = MAX_VIDEO_IDS) {
  if (!uploadsPlaylistId) return [];
  const ids = [];
  let pageToken = "";
  while (ids.length < limit) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${Math.min(
      50,
      limit - ids.length
    )}${pageToken ? `&pageToken=${pageToken}` : ""}&key=${API_KEY}`;
    const j = await fetchJson(url);
    (j.items || []).forEach((it) => {
      const vid = it.contentDetails?.videoId;
      if (vid) ids.push(vid);
    });
    pageToken = j.nextPageToken;
    if (!pageToken) break;
  }
  return ids.slice(0, limit);
}

// NEW: use search endpoint with order=viewCount to get channel's top videos by view count
async function fetchMostViewedVideoIds(channelId, limit = MAX_VIDEO_IDS) {
  if (!channelId) return [];
  const ids = [];
  let pageToken = "";
  while (ids.length < limit) {
    // search supports maxResults up to 50
    const url = `https://www.googleapis.com/youtube/v3/search?part=id&channelId=${encodeURIComponent(
      channelId
    )}&type=video&order=viewCount&maxResults=${Math.min(50, limit - ids.length)}${
      pageToken ? `&pageToken=${pageToken}` : ""
    }&key=${API_KEY}`;
    const j = await fetchJson(url);
    (j.items || []).forEach((it) => {
      const vid = it.id?.videoId;
      if (vid) ids.push(vid);
    });
    pageToken = j.nextPageToken;
    if (!pageToken) break;
  }
  return ids.slice(0, limit);
}

async function fetchVideosStats(videoIds = []) {
  if (!videoIds.length) return [];
  const chunks = [];
  for (let i = 0; i < videoIds.length; i += 50) {
    chunks.push(videoIds.slice(i, i + 50));
  }
  const results = [];
  for (const chunk of chunks) {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${chunk.join(
      ","
    )}&key=${API_KEY}`;
    const j = await fetchJson(url);
    (j.items || []).forEach((it) => {
      results.push({
        id: it.id,
        title: it.snippet?.title ?? "",
        thumbnail:
          it.snippet?.thumbnails?.medium?.url ??
          it.snippet?.thumbnails?.default?.url ??
          null,
        viewCount: Number(it.statistics?.viewCount ?? 0),
        likeCount:
          it.statistics && typeof it.statistics.likeCount !== "undefined"
            ? Number(it.statistics.likeCount)
            : null,
        publishedAt: it.snippet?.publishedAt ?? null,
      });
    });
  }
  return results;
}

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ error: "Server missing YT_API_KEY env var" }, { status: 500 });
  }

  const now = Date.now();
  if (cachedPayload && now - lastFetchTs < MIN_FETCH_INTERVAL_MS) {
    const res = NextResponse.json(cachedPayload);
    res.headers.set("X-Cache", "HIT");
    res.headers.set("Cache-Control", `s-maxage=${Math.floor(MIN_FETCH_INTERVAL_MS / 1000)}, stale-while-revalidate=59`);
    return res;
  }

  try {
    const channelId = EXPLICIT_CHANNEL_ID ?? (await resolveChannelId(CHANNEL_HANDLE));
    if (!channelId) {
      return NextResponse.json({ error: "Channel not found" }, { status: 404 });
    }

    const stats = await fetchChannelStats(channelId);
    if (!stats) {
      return NextResponse.json({ error: "Failed to fetch channel stats" }, { status: 500 });
    }

    // 1) fetch uploads (recent uploads) and their stats (existing behavior)
    const ids = await fetchUploadVideoIds(stats.uploadsPlaylistId, MAX_VIDEO_IDS);
    const videos = await fetchVideosStats(ids);
    const approxLikes = videos.reduce((acc, v) => acc + (v.likeCount || 0), 0);
    const byViews = [...videos].sort((a, b) => b.viewCount - a.viewCount);
    const topVideos = byViews.slice(0, 6);

    // 2) fetch MOST VIEWED across the channel using search?order=viewCount
    let mostViewed = [];
    let topVideo = null;
    try {
      const mostViewedIds = await fetchMostViewedVideoIds(channelId, Math.min(50, MAX_VIDEO_IDS));
      if (mostViewedIds.length) {
        const mvStats = await fetchVideosStats(mostViewedIds);
        // mvStats should already be in the same order returned by 'search?order=viewCount' generally,
        // but to be safe sort by viewCount descending
        mostViewed = [...mvStats].sort((a, b) => b.viewCount - a.viewCount).slice(0, 10);
        topVideo = mostViewed[0] ?? null;
      } else {
        // fallback to uploads-based order if search returned nothing
        mostViewed = byViews.slice(0, 10);
        topVideo = mostViewed[0] ?? null;
      }
    } catch (err) {
      console.warn("fetchMostViewedVideoIds failed, falling back to uploads-based list", err);
      mostViewed = byViews.slice(0, 10);
      topVideo = mostViewed[0] ?? null;
    }

    const payload = {
      channel: {
        id: stats.channelId,
        title: stats.title,
        description: stats.description,
        thumbnail: stats.thumbnail,
        subscriberCount: stats.subscriberCount,
        viewCount: stats.viewCount,
        videoCount: stats.videoCount,
      },
      topVideos,     // top 6 from uploads
      mostViewed,    // top N by views across channel (search-based)
      topVideo,      // single most viewed video by viewCount
      approxLikes,
      fetchedAt: new Date().toISOString(),
    };

    cachedPayload = payload;
    lastFetchTs = Date.now();

    const res = NextResponse.json(payload);
    res.headers.set("X-Cache", "MISS");
    res.headers.set("Cache-Control", `s-maxage=${Math.floor(MIN_FETCH_INTERVAL_MS / 1000)}, stale-while-revalidate=59`);
    return res;
  } catch (err) {
    console.error("YT API error", err);
    return NextResponse.json({ error: "Failed to fetch YouTube data", detail: String(err) }, { status: 500 });
  }
}
