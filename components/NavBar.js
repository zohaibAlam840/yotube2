// "use client";
// import React, { useState } from "react";
// import Link from "next/link";

// export default function NavBar({ channelName = "AleeAdee" }) {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     const q = query.trim();
//     if (!q) return;
//     window.open(
//       `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
//       "_blank"
//     );
//     setQuery("");
//     setOpen(false);
//   }

//   return (
//     <header className="w-full bg-white backdrop-blur-sm border-b border-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 lg:h-20">
//           {/* left: logo + name */}
//           <div className="flex items-center gap-3">
//             <Link href="/" className="flex items-center gap-3 no-underline">
//               <span
//                 aria-hidden
//                 className="inline-flex items-center justify-center rounded-full w-10 h-10 text-white font-extrabold"
//                 style={{ background: "linear-gradient(135deg,#ff5a5a,#ff2b2b)" }}
//               >
//                 A
//               </span>

//               <div className="hidden sm:block">
//                 <div className="text-lg font-extrabold text-slate-900">
//                   {channelName}
//                 </div>
//                 <div className="text-xs text-slate-500">channel preview</div>
//               </div>
//             </Link>
//           </div>

//           {/* center: search (desktop) */}
//           <div className="flex-1 px-4 hidden md:block">
//             <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
//               <label htmlFor="site-search" className="sr-only">
//                 Search YouTube
//               </label>
//               <div className="relative">
//                 <svg
//                   className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   aria-hidden
//                 >
//                   <path
//                     d="M21 21l-4.35-4.35"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                   <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
//                 </svg>

//                 <input
//                   id="site-search"
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder='Search "Doctor Mike" on YouTube'
//                   className="w-full rounded-full border border-slate-200 bg-slate-50 px-10 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--brand-red,#ff2b2b)] transition"
//                 />
//               </div>
//             </form>
//           </div>

//           {/* right side */}
//           <div className="flex items-center gap-3">
//             {/* desktop nav links */}
//             <nav className="hidden md:flex items-center gap-4">
//               <Link href="#home" className="text-sm text-slate-700 hover:text-[var(--brand-red,#ff2b2b)]">
//                 Home
//               </Link>
//               <Link href="#videos" className="text-sm text-slate-700 hover:text-[var(--brand-red,#ff2b2b)]">
//                 Videos
//               </Link>
//               <Link href="/about" className="text-sm text-slate-700 hover:text-[var(--brand-red,#ff2b2b)]">
//                 About
//               </Link>
//               <Link href="/contact" className="text-sm text-slate-700 hover:text-[var(--brand-red,#ff2b2b)]">
//                 Contact
//               </Link>
//             </nav>

//             {/* mobile quick-search */}
//             <button
//               type="button"
//               onClick={() => {
//                 const q = prompt("Search YouTube for:");
//                 if (q)
//                   window.open(
//                     `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
//                     "_blank"
//                   );
//               }}
//               className="md:hidden p-2 rounded-full hover:bg-slate-100"
//               aria-label="Quick search"
//             >
//               <svg
//                 className="w-5 h-5 text-slate-700"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 aria-hidden
//               >
//                 <path
//                   d="M21 21l-4.35-4.35"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
//               </svg>
//             </button>

//             {/* mobile menu toggle */}
//             <button
//               type="button"
//               onClick={() => setOpen((s) => !s)}
//               aria-expanded={open}
//               aria-label="Toggle menu"
//               className="inline-flex items-center justify-center p-2 rounded-md md:hidden hover:bg-slate-100"
//             >
//               <svg
//                 className="w-6 h-6 text-slate-700"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 aria-hidden
//               >
//                 {open ? (
//                   <path
//                     d="M6 18L18 6M6 6l12 12"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 ) : (
//                   <path
//                     d="M4 8h16M4 16h16"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* mobile menu */}
//       <div
//         className={`md:hidden transition-[max-height] duration-300 overflow-hidden border-t border-slate-100 ${
//           open ? "max-h-80" : "max-h-0"
//         }`}
//         aria-hidden={!open}
//       >
//         <div className="px-4 py-3 space-y-2 bg-white">
//           <Link href="#home" onClick={() => setOpen(false)} className="block text-slate-700 py-2">
//             Home
//           </Link>
//           <Link href="#videos" onClick={() => setOpen(false)} className="block text-slate-700 py-2">
//             Videos
//           </Link>
//           <Link href="/about" onClick={() => setOpen(false)} className="block text-slate-700 py-2">
//             About
//           </Link>
//           <Link href="/contact" onClick={() => setOpen(false)} className="block text-slate-700 py-2">
//             Contact
//           </Link>

//           {/* mobile inline search */}
//           <form onSubmit={handleSubmit} className="mt-2">
//             <label htmlFor="mobile-search" className="sr-only">
//               Search
//             </label>
//             <div className="relative">
//               <input
//                 id="mobile-search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search YouTube..."
//                 className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
//               />
//               <button
//                 type="submit"
//                 className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-sm bg-[var(--brand-red,#ff2b2b)] text-white"
//               >
//                 Go
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </header>
//   );
// }



"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function NavBar({ channelName = "AleeAdee" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
      "_blank"
    );
    setQuery("");
    setOpen(false);
  }

  return (
    <header className="w-full bg-white border-b border-red-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* left: logo + name */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 no-underline group">
              <span
                aria-hidden
                className="inline-flex items-center justify-center rounded-full w-10 h-10 text-white font-extrabold transition-transform group-hover:scale-105"
                style={{ background: "linear-gradient(135deg, #ff5a5a, #ff2b2b)" }}
              >
                A
              </span>

              <div className="hidden sm:block">
                <div className="text-lg font-extrabold text-gray-900 group-hover:text-red-600 transition-colors">
                  {channelName}
                </div>
                <div className="text-xs text-gray-500">YouTube Channel</div>
              </div>
            </Link>
          </div>

          {/* center: search (desktop) */}
          <div className="flex-1 px-4 hidden md:block">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <label htmlFor="site-search" className="sr-only">
                Search YouTube
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M21 21l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
                </svg>

                <input
                  id="site-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search "AleeAdee" on YouTube'
                  className="w-full rounded-full border border-gray-200 bg-gray-50 px-10 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
              </div>
            </form>
          </div>

          {/* right side */}
          <div className="flex items-center gap-3">
            {/* desktop nav links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                href="#home" 
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
              >
                Home
              </Link>
              <Link 
                href="#videos" 
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
              >
                Videos
              </Link>
              <Link 
                href="/about" 
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-sm font-medium text-gray-700 hover:text-red-600 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-red-600 after:transition-all hover:after:w-full"
              >
                Contact
              </Link>
            </nav>

            {/* Subscribe button */}
            <button className="hidden md:flex items-center bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
              Subscribe
            </button>

            {/* mobile quick-search */}
            <button
              type="button"
              onClick={() => {
                const q = prompt("Search YouTube for:");
                if (q)
                  window.open(
                    `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
                    "_blank"
                  );
              }}
              className="md:hidden p-2 rounded-full hover:bg-red-50 transition-colors"
              aria-label="Quick search"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {/* mobile menu toggle */}
            <button
              type="button"
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 rounded-md md:hidden hover:bg-red-50 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {open ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M4 8h16M4 16h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden border-t border-red-100 ${
          open ? "max-h-80" : "max-h-0"
        }`}
        aria-hidden={!open}
      >
        <div className="px-4 py-4 space-y-3 bg-white">
          <Link 
            href="#home" 
            onClick={() => setOpen(false)} 
            className="block text-gray-700 py-2 font-medium hover:text-red-600 transition-colors"
          >
            Home
          </Link>
          <Link 
            href="#videos" 
            onClick={() => setOpen(false)} 
            className="block text-gray-700 py-2 font-medium hover:text-red-600 transition-colors"
          >
            Videos
          </Link>
          <Link 
            href="/about" 
            onClick={() => setOpen(false)} 
            className="block text-gray-700 py-2 font-medium hover:text-red-600 transition-colors"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setOpen(false)} 
            className="block text-gray-700 py-2 font-medium hover:text-red-600 transition-colors"
          >
            Contact
          </Link>

          <button className="w-full flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors mt-2">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 15l5.19-3L10 9v6zm11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
            </svg>
            Subscribe
          </button>

          {/* mobile inline search */}
          <form onSubmit={handleSubmit} className="mt-4">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <input
                id="mobile-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search YouTube..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm pr-16 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}