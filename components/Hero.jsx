// "use client";
// import React from "react";

// // SVG Icon Components for Hero
// const SubscribersIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const ViewsIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const VideosIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M23 7L16 12L23 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <rect x="1" y="5" width="15" height="14" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const LikesIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 10V22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13C20 12.7348 19.8946 12.4804 19.7071 12.2929C19.5196 12.1054 19.2652 12 19 12H15L16.24 9.62C16.3614 9.37527 16.4238 9.1072 16.4227 8.83568C16.4216 8.56416 16.357 8.29673 16.2339 8.053C16.1108 7.80927 15.9326 7.59584 15.713 7.42938C15.4934 7.26292 15.2383 7.14792 14.9675 7.09322C14.6967 7.03852 14.4173 7.04558 14.15 7.11392L14 7.18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <rect x="3" y="10" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// export default function Hero({ channel, loading, type }) {
//   // safe getter for nested paths, returns first defined value among candidates
//   const getFirst = (obj, candidates = []) => {
//     for (const path of candidates) {
//       if (!path) continue;
//       const parts = path.split(".");
//       let cur = obj;
//       let ok = true;
//       for (const p of parts) {
//         if (cur == null || !(p in cur)) {
//           ok = false;
//           break;
//         }
//         cur = cur[p];
//       }
//       if (ok && cur != null && cur !== "") return cur;
//     }
//     return undefined;
//   };

//   // robust formatter:
//   // - if a number (or numeric-string) -> toLocaleString
//   // - if a string with letters (e.g. "1.2M", "12.3k") -> return as-is
//   // - if value present, show it even during loading
//   // - if absent, show "—" (not dots)
//   const fmt = (val) => {
//     if (val == null || val === "") return "—";

//     // if it's a string, check if it's numeric or a human-short string
//     if (typeof val === "string") {
//       const cleaned = val.replace(/,/g, "").trim();
//       // contains letters (k, M, etc.) -> return original string
//       if (/[a-zA-Z]/.test(cleaned)) return val;
//       const n = Number(cleaned);
//       return Number.isFinite(n) ? n.toLocaleString() : val;
//     }

//     // number or other convertible -> format if finite
//     const n = Number(val);
//     return Number.isFinite(n) ? n.toLocaleString() : String(val);
//   };

//   // Try multiple likely property names/shapes so we show stats coming from different APIs
//   const subscriberVal =
//     getFirst(channel, [
//       "subscriberCount",
//       "statistics.subscriberCount",
//       "subscriber_count",
//       "subscriberCountText",
//       "subscribers",
//       "stats.subscriberCount",
//     ]) ?? null;

//   const viewVal =
//     getFirst(channel, [
//       "viewCount",
//       "statistics.viewCount",
//       "view_count",
//       "viewCountText",
//       "totalViews",
//       "stats.viewCount",
//     ]) ?? null;

//   const videoVal =
//     getFirst(channel, [
//       "videoCount",
//       "statistics.videoCount",
//       "video_count",
//       "videoCountText",
//       "videos",
//       "stats.videoCount",
//     ]) ?? null;

//   const likesVal =
//     getFirst(channel, [
//       "approxLikes",
//       "likes",
//       "statistics.likes",
//       "likeCount",
//       "approximateLikes",
//     ]) ?? null;

//   function InlineStat({ label, value, icon, highlight }) {
//     return (
//       <div
//         className={`flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm min-w-0 ${
//           highlight ? "ring-2 ring-white/30" : ""
//         } transition-all hover:bg-white/15`}
//         role="group"
//         aria-label={label}
//       >
//         <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg" aria-hidden>
//           {icon}
//         </div>

//         <div className="min-w-0">
//           <div className="text-xl md:text-2xl font-bold leading-tight truncate">
//             {fmt(value)}
//           </div>
//           <div className="text-xs opacity-90 truncate uppercase tracking-wider font-medium mt-1">{label}</div>
//         </div>
//       </div>
//     );
//   }

//   // Create array of stats to display (remove likes if 0 or null)
//   const statsToDisplay = [
//     { label: "Subscribers", value: subscriberVal, icon: <SubscribersIcon className="w-5 h-5" />, highlight: true },
//     { label: "Total Views", value: viewVal, icon: <ViewsIcon className="w-5 h-5" /> },
//     { label: "Videos", value: videoVal, icon: <VideosIcon className="w-5 h-5" /> },
//   ];
  
//   // Only add likes if it has a value and is not 0
//   if (likesVal && likesVal !== 0) {
//     statsToDisplay.push({ label: "Approx Likes", value: likesVal, icon: <LikesIcon className="w-5 h-5" /> });
//   }

//   return (
//     <div
//       className="rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-white/20"
//       style={{
//         background: 'linear-gradient(135deg, var(--brand-red) 0%, #d62d20 100%)',
//         color: "white",
//         borderRadius: 24,
//       }}
//     >
//       {/* Subtle background pattern */}
//       <div
//         aria-hidden
//         style={{
//           position: "absolute",
//           inset: 0,
//           backgroundImage:
//             'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)',
//           backgroundSize: "30px 30px",
//           opacity: 0.8,
//           mixBlendMode: "overlay",
//         }}
//       />
      
//       {/* Accent elements */}
//       <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-white/10 rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-white/10 rounded-full blur-xl"></div>

//       <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
//         <div className="flex-shrink-0">
//           <div className="relative">
//             <img
//               src={channel?.thumbnail ?? "/next.svg"}
//               alt={channel?.title ?? "channel"}
//               width={140}
//               height={140}
//               className="rounded-2xl shadow-2xl object-cover w-[140px] h-[140px] border-4 border-white/20"
//             />
//             <div className="absolute -bottom-2 -right-2 bg-white text-red-600 text-xs font-bold py-1 px-2 rounded-lg shadow-md">
//               LIVE
//             </div>
//           </div>
//         </div>

//         <div className="flex-1">
//           <div className="flex items-baseline gap-4 flex-wrap">
//             <h1
//               className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
//               style={{ 
//                 color: "white",
//                 textShadow: '0 2px 4px rgba(0,0,0,0.2)'
//               }}
//             >
//               {channel?.title ?? "AleeAdee"}
//             </h1>
//             <div className="text-sm bg-white/20 py-1 px-3 rounded-full font-medium mt-1">{type}</div>
//           </div>

//           <p className="mt-4 text-md text-white/90 max-w-2xl leading-relaxed">
//             {channel?.description
//               ? channel.description.slice(0, 220) + (channel.description.length > 220 ? "…" : "")
//               : "Channel description will appear here."}
//           </p>

//           {/* Stats grid: responsive and prevents overlap by using flex items with truncate */}
//           <div className={`mt-8 grid gap-4 ${statsToDisplay.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
//             {statsToDisplay.map((stat, index) => (
//               <InlineStat 
//                 key={index}
//                 label={stat.label} 
//                 value={stat.value} 
//                 icon={stat.icon} 
//                 highlight={stat.highlight} 
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React from "react";
import { motion } from "framer-motion";

// SVG Icon Components for Hero
const YouTubeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

const CalendarIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V6M16 2V6M3 10H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33397 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.5309C19.5521 2.60386 18.298 2.07802 16.987 2.06663C15.676 2.05524 14.413 2.55921 13.47 3.47L11.75 5.18M14 11C13.5705 10.4259 13.0226 9.95081 12.3934 9.60706C11.7643 9.2633 11.0685 9.05889 10.3533 9.00768C9.63821 8.95647 8.92041 9.05964 8.24866 9.31023C7.5769 9.56082 6.96689 9.9529 6.46 10.46L3.46 13.46C2.54921 14.403 2.04524 15.666 2.05663 16.977C2.06802 18.288 2.59386 19.5421 3.5209 20.4691C4.44794 21.3961 5.70201 21.922 7.01299 21.9334C8.32397 21.9448 9.58699 21.4408 10.53 20.53L12.24 18.82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Hero({ channel, loading, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden border border-red-200"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fff5f5 100%)',
        color: "#1a1a1a",
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
            'radial-gradient(circle at 25% 25%, rgba(239, 68, 68, 0.05) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(239, 68, 68, 0.05) 1px, transparent 1px)',
          backgroundSize: "30px 30px",
          opacity: 0.8,
        }}
      />
      
      {/* Accent elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -mt-16 -mr-16 bg-red-100 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 -mb-12 -ml-12 bg-red-100 rounded-full blur-xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              src={channel?.thumbnail ?? "/next.svg"}
              alt={channel?.title ?? "channel"}
              width={140}
              height={140}
              className="rounded-2xl shadow-2xl object-cover w-[140px] h-[140px] border-4 border-white"
            />
            <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-lg shadow-md flex items-center">
              <YouTubeIcon className="w-4 h-4 mr-1" />
              LIVE
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-baseline gap-4 flex-wrap">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              style={{ 
                color: "#1a1a1a",
              }}
            >
              {channel?.title ?? "AleeAdee"}
            </h1>
            <div className="text-sm bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium mt-1">{type}</div>
          </div>

          <p className="mt-4 text-md text-gray-700 max-w-2xl leading-relaxed">
            {channel?.description
              ? channel.description.slice(0, 220) + (channel.description.length > 220 ? "…" : "")
              : "Channel description will appear here."}
          </p>

          {/* Channel metadata */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center text-sm text-gray-600 bg-red-50 py-2 px-4 rounded-lg">
              <CalendarIcon className="w-4 h-4 mr-2 text-red-600" />
              Joined {channel?.publishedAt ? new Date(channel.publishedAt).toLocaleDateString() : "Jan 2020"}
            </div>
            
            <div className="flex items-center text-sm text-gray-600 bg-red-50 py-2 px-4 rounded-lg">
              <svg className="w-4 h-4 mr-2 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Content updated weekly
            </div>
            
            {channel?.customUrl && (
              <a 
                href={`https://youtube.com/${channel.customUrl}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-sm text-red-600 bg-white border border-red-200 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Visit Channel
              </a>
            )}
          </div>

          {/* Call to action buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" fill="currentColor"/>
              </svg>
              Subscribe
            </button>
            
            <button className="bg-white text-red-600 border border-red-200 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.21726 10.5505C3.83235 10.2752 3.40989 10 3.06217 10C2.49173 10 2 10.4917 2 11.0622V12.9378C2 13.5083 2.49173 14 3.06217 14C3.40989 14 3.83235 13.7248 4.21726 13.4495L7.78274 10.9505C8.16765 10.6752 8.59011 10.4 8.93783 10.4C9.50827 10.4 10 10.8917 10 11.4622V12.5378C10 13.1083 9.50827 13.6 8.93783 13.6C8.59011 13.6 8.16765 13.3248 7.78274 13.0495L4.21726 10.5505Z" fill="currentColor"/>
                <path d="M12.2173 10.5505C11.8324 10.2752 11.4099 10 11.0622 10C10.4917 10 10 10.4917 10 11.0622V12.9378C10 13.5083 10.4917 14 11.0622 14C11.4099 14 11.8324 13.7248 12.2173 13.4495L15.7827 10.9505C16.1676 10.6752 16.5901 10.4 16.9378 10.4C17.5083 10.4 18 10.8917 18 11.4622V12.5378C18 13.1083 17.5083 13.6 16.9378 13.6C16.5901 13.6 16.1676 13.3248 15.7827 13.0495L12.2173 10.5505Z" fill="currentColor"/>
                <path d="M20.2173 10.5505C19.8324 10.2752 19.4099 10 19.0622 10C18.4917 10 18 10.4917 18 11.0622V12.9378C18 13.5083 18.4917 14 19.0622 14C19.4099 14 19.8324 13.7248 20.2173 13.4495L23.7827 10.9505C24.1676 10.6752 24.5901 10.4 24.9378 10.4C25.5083 10.4 26 10.8917 26 11.4622V12.5378C26 13.1083 25.5083 13.6 24.9378 13.6C24.5901 13.6 24.1676 13.3248 23.7827 13.0495L20.2173 10.5505Z" fill="currentColor"/>
              </svg>
              Watch Latest
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}