// File: components/TopVideos.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

// SVG Icon for Views
const ViewsIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SVG Icon for Calendar/Date
const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TopVideos({ videos = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 animate-pulse">
            <div className="w-full h-44 bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="flex items-center mt-3">
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 ml-4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
        <div className="text-gray-400 mb-2">No videos found</div>
        <div className="text-sm text-gray-500">This channel hasn't uploaded any videos yet</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((v, i) => (
        <motion.a
          key={v.id || i}
          href={`https://youtube.com/watch?v=${v.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 group"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i, duration: 0.3 }}
        >
          <div className="relative w-full h-44 bg-gray-200 overflow-hidden">
            <img 
              src={v.thumbnail} 
              alt={v.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-bold py-1 px-2 rounded-md">
              #{i + 1}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <div className="text-white text-sm font-medium flex items-center">
                <ViewsIcon className="w-4 h-4 mr-1" />
                {Number(v.viewCount).toLocaleString()} views
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {v.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <CalendarIcon className="w-3 h-3 mr-1" />
              {v.publishedAt ? new Date(v.publishedAt).toLocaleDateString() : "Unknown date"}
            </div>
            {v.likeCount !== null && (
              <div className="mt-2 text-xs text-gray-500">
                {v.likeCount.toLocaleString()} likes
              </div>
            )}
          </div>
        </motion.a>
      ))}
    </div>
  );
}