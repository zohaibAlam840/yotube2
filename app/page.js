// // File: app/page.js
// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import NavBar from "../components/NavBar";
// import Hero from "../components/Hero";
// import TopVideos from "../components/TopVideos";
// import LatestVideo from "../components/LatestVideo";
// import Footer from "../components/Footer";
// import { useTypewriter, useCountUp, useLoadInter, formatN } from "../components/hooks";

// // SVG Icon Components
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

// const RankIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M2 10L7 4.5L12 10L11.5 16H4.5L4 10H2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M12 10L17 4.5L22 10L21.5 16H14.5L14 10H12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const DataIcon = ({ className = "w-5 h-5" }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M21 21H6.2C5.07989 21 4.51984 21 4.09202 20.782C3.71569 20.5903 3.40973 20.2843 3.21799 19.908C3 19.4802 3 18.9201 3 17.8V3M21 7V7.2C21 8.88016 21 9.72024 20.673 10.362C20.3854 10.9265 19.9265 11.3854 19.362 11.673C18.7202 12 17.8802 12 16.2 12H7.8C6.11984 12 5.27976 12 4.63803 11.673C4.07354 11.3854 3.6146 10.9265 3.32698 10.362C3 9.72024 3 8.88016 3 7.2V7M8 16H16M8 19H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// export default function Home() {
//   useLoadInter();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const type = useTypewriter(["Live-ish stats", "Updated every 30s", "Realtime vibes ✨"], 60, 1200);
//   const POLL_MS = 30_000;
//   const abortRef = useRef(null);

//   useEffect(() => {
//     let mounted = true;
//     const controller = new AbortController();
//     abortRef.current = controller;

//     const fetchData = async () => {
//       try {
//         const res = await fetch("/api/youtube", { signal: controller.signal });
//         const j = await res.json();
//         if (mounted) {
//           setData(j);
//           setLoading(false);
//         }
//       } catch (err) {
//         if (err.name === "AbortError") return;
//         console.error(err);
//       }
//     };

//     fetchData();
//     const id = setInterval(() => {
//       if (abortRef.current) abortRef.current.abort();
//       abortRef.current = new AbortController();
//       fetchData();
//     }, POLL_MS);

//     return () => {
//       mounted = false;
//       clearInterval(id);
//       if (abortRef.current) abortRef.current.abort();
//     };
//   }, []);

//   const subs = useCountUp(data?.channel?.subscriberCount ?? 0, 900);
//   const views = useCountUp(data?.channel?.viewCount ?? 0, 900);
//   const vids = useCountUp(data?.channel?.videoCount ?? 0, 900);
//   const likes = useCountUp(data?.approxLikes ?? 0, 900);

//   const topVideos = data?.topVideos ?? [];
//   const topVideosTotalViewsValue = topVideos.reduce((s, v) => s + (Number(v.viewCount) || 0), 0);
//   const topVideosTotalViews = useCountUp(topVideosTotalViewsValue, 900);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-[var(--brand-text)]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
//       <NavBar />

//       <main id="home" className="max-w-7xl mx-auto mt-10 space-y-12 px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <div className="max-w-5xl mx-auto">
//           <Hero
//             tall
//             channel={data?.channel ? { ...data.channel, approxLikes: data?.approxLikes } : null}
//             loading={loading}
//             type={type}
//           />
//         </div>

//         {/* Main Content Grid */}
//         <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           {/* Left Column - Top Videos & Latest Upload */}
//           <div className="lg:col-span-8 space-y-8">
//             {/* Top Videos Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//                     <VideosIcon className="w-6 h-6 text-blue-600" />
//                     Top Videos
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1 ml-8">Most popular uploads from this channel</p>
//                 </div>

//                 <div className="mt-4 sm:mt-0 text-left sm:text-right">
//                   <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
//                     <ViewsIcon className="w-3 h-3" />
//                     Top videos total views
//                   </p>
//                   <p className="text-lg font-semibold text-gray-900">{loading ? "..." : formatN(topVideosTotalViews)}</p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {data?.fetchedAt ? `Updated ${new Date(data.fetchedAt).toLocaleTimeString()}` : ""}
//                   </p>
//                 </div>
//               </div>

//               <TopVideos videos={topVideos} loading={loading} />
//             </div>

//             {/* Latest Upload Card */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                 <VideosIcon className="w-5 h-5 text-blue-600" />
//                 Latest Upload
//               </h3>
//               <LatestVideo video={topVideos[0]} />
//             </div>
//           </div>
//         </section>

//         {/* About Section */}
//         <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//           <h3 className="text-xl font-bold text-gray-900 mb-4">About This Dashboard</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <p className="text-gray-600">
//                 This dashboard displays live metrics pulled from the YouTube Data API, updated every 30 seconds. 
//                 We maintain security by keeping API keys on the server and only serving aggregated data to the frontend.
//               </p>
//             </div>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
//               <p className="text-sm text-gray-600">
//                 Email: <a href="mailto:youremail@example.com" className="text-blue-600 hover:underline">youremail@example.com</a>
//               </p>
//               <p className="text-sm text-gray-600 mt-2">
//                 For inquiries about data accuracy or partnership opportunities.
//               </p>
//             </div>
//           </div>
//         </section>

//         <Footer />
//       </main>
//     </div>
//   );
// }

// File: app/page.js
"use client";
import React, { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import TopVideos from "../components/TopVideos";
import LatestVideo from "../components/LatestVideo";
import Footer from "../components/Footer";
import { useTypewriter, useCountUp, useLoadInter, formatN } from "../components/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUpIcon, 
  UsersIcon, 
  EyeIcon, 
  VideoCameraIcon, 
  HeartIcon, 
  TrophyIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

// Custom animated counter component
const AnimatedCounter = ({ value, duration = 900, className = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTimestamp;
    const startValue = displayValue;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * (value - startValue) + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span className={className}>{formatN(displayValue)}</span>;
};

// Stats Card Component
const StatCard = ({ icon: Icon, title, value, loading, trend, className = "" }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-xl p-6 shadow-lg border border-gray-200 ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 rounded-lg bg-red-50">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
      {trend && (
        <div className={`flex items-center text-sm font-medium ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend.value > 0 ? (
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowTrendingUpIcon className="w-4 h-4 mr-1 transform rotate-180" />
          )}
          {trend.value}%
        </div>
      )}
    </div>
    <div className="mt-2">
      {loading ? (
        <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
      ) : (
        <div className="text-2xl font-bold text-gray-900">
          <AnimatedCounter value={value} />
        </div>
      )}
      <p className="text-sm text-gray-500 mt-1">{title}</p>
    </div>
  </motion.div>
);

export default function Home() {
  useLoadInter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const type = useTypewriter(["Live-ish stats", "Updated every 30s", "Realtime vibes ✨", "Powered by YouTube API"], 60, 1200);
  const POLL_MS = 30_000;
  const abortRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    abortRef.current = controller;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/youtube", { signal: controller.signal });
        const j = await res.json();
        if (mounted) {
          setData(j);
          setLoading(false);
        }
      } catch (err) {
        if (err.name === "AbortError") return;
        console.error(err);
      }
    };

    fetchData();
    const id = setInterval(() => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      fetchData();
    }, POLL_MS);

    return () => {
      mounted = false;
      clearInterval(id);
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const subs = data?.channel?.subscriberCount ?? 0;
  const views = data?.channel?.viewCount ?? 0;
  const vids = data?.channel?.videoCount ?? 0;
  const likes = data?.approxLikes ?? 0;

  const topVideos = data?.topVideos ?? [];
  const topVideosTotalViewsValue = topVideos.reduce((s, v) => s + (Number(v.viewCount) || 0), 0);

  return (
    <div className="min-h-screen bg-white text-[var(--brand-text)]" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
      <NavBar />

      <main id="home" className="max-w-7xl mx-auto mt-10 space-y-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto">
          <Hero
            tall
            channel={data?.channel ? { ...data.channel, approxLikes: data?.approxLikes } : null}
            loading={loading}
            type={type}
          />
        </div>

        {/* Stats Grid */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard 
            icon={UsersIcon} 
            title="Subscribers" 
            value={subs} 
            loading={loading}
            trend={{ value: 2.5 }}
          />
          <StatCard 
            icon={EyeIcon} 
            title="Total Views" 
            value={views} 
            loading={loading}
            trend={{ value: 1.8 }}
          />
          <StatCard 
            icon={VideoCameraIcon} 
            title="Videos" 
            value={vids} 
            loading={loading}
          />
          <StatCard 
            icon={HeartIcon} 
            title="Approx. Likes" 
            value={likes} 
            loading={loading}
            trend={{ value: 3.2 }}
          />
        </motion.section>

        {/* Main Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Top Videos & Latest Upload */}
          <div className="lg:col-span-8 space-y-8">
            {/* Top Videos Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-red-50">
                    </div>
                    Top Videos
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 ml-8">Most popular uploads from this channel</p>
                </div>

                <div className="mt-4 sm:mt-0 text-left sm:text-right">
                  <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                    <EyeIcon className="w-3 h-3" />
                    Top videos total views
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {loading ? (
                      <span className="h-6 w-24 bg-gray-200 rounded-md animate-pulse inline-block"></span>
                    ) : (
                      formatN(topVideosTotalViewsValue)
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center justify-end gap-1">
                    <ClockIcon className="w-3 h-3" />
                    {data?.fetchedAt ? `Updated ${new Date(data.fetchedAt).toLocaleTimeString()}` : ""}
                  </p>
                </div>
              </div>

              <TopVideos videos={topVideos} loading={loading} />
            </motion.div>

            {/* Latest Upload Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-red-50">
                  <VideoCameraIcon className="w-5 h-5 text-red-600" />
                </div>
                Latest Upload
              </h3>
              <LatestVideo video={topVideos[0]} loading={loading} />
            </motion.div>
          </div>

          {/* Right Column - Channel Insights */}
          <div className="lg:col-span-4 space-y-8">
            {/* Channel Ranking Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrophyIcon className="w-5 h-5" />
                  Channel Ranking
                </h3>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Top 5%</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-red-100">Engagement Rate</span>
                  <span className="font-semibold">8.2%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between py-2">
                  <span className="text-red-100">Growth Rate</span>
                  <span className="font-semibold">+2.7%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-red-300 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <button className="w-full mt-6 bg-white text-red-700 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors">
                View Analytics
              </button>
            </motion.div>

            {/* Performance Metrics Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-red-50">
                  <ChartBarIcon className="w-5 h-5 text-red-600" />
                </div>
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Avg. View Duration</span>
                    <span>4:32</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Click-Through Rate</span>
                    <span>7.4%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-500 mb-1">
                    <span>Audience Retention</span>
                    <span>62%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">About This Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">
                This dashboard displays live metrics pulled from the YouTube Data API, updated every 30 seconds. 
                We maintain security by keeping API keys on the server and only serving aggregated data to the frontend.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                <span>Live data updated {data?.fetchedAt ? new Date(data.fetchedAt).toLocaleTimeString() : 'recently'}</span>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
              <p className="text-sm text-gray-600">
                Email: <a href="mailto:contact@example.com" className="text-red-600 hover:underline font-medium">contact@example.com</a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                For inquiries about data accuracy or partnership opportunities.
              </p>
              <div className="flex space-x-3 mt-4">
                <button className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors">
                  Request Feature
                </button>
                <button className="text-xs border border-red-600 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </motion.section>

        <Footer />
      </main>
    </div>
  );
}