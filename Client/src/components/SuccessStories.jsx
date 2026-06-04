import { useState, useRef, useEffect } from "react";
import soham from "../assets/Soham.jpeg";
import poorva from "../assets/poorva.jpeg";
import shailesh from "../assets/Shailesh.jpeg";
import aditya from "../assets/Aditya.jpeg";
import prasad from "../assets/Prasad.jpeg";
import ratnadeep from "../assets/Ratnadeep.jpeg";
import sayali from "../assets/Sayali.jpeg";


const students = [
  {
    name: "Purva Kohat",
    percentile: "97.89",
    college: "VJTI Mumbai – Computer Engineering",
    img: poorva,
  },
  {
    name: "Shailesh Rathore",
    percentile: "86.63",
    college: "G.H Raisoni college of engineering and management nagpur- CSE",
    img: shailesh,
  },
  {
    name: "Sayali Khawshi",
    percentile: "88.57",
    college: "GCoE Yavatmal - CSE",
    img: sayali,
  },
  {
    name: "Aditya Jagtap ",
    percentile: "99.11",
    college: "PICT - EXTC",
    img: aditya,
  },
  {
    name: "Prasad Jadhav",
    percentile: "99.54",
    college: "PICT - IT",
    img: prasad,
  },
  {
    name: "Ratnadeep ghatge",
    percentile: "98.99",
    college: "VJTI Mumbai – Electrical Engineering",
    img: ratnadeep,
  },
  {
    name: "Soham Khare",
    percentile: "96.7",
    college: "VIIT - CSE",
    img: soham,
  },
];

// Stars component
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          className="w-3.5 h-3.5 text-amber-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SuccessStories() {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);

  // Duplicate cards for seamless infinite scroll
  const allCards = [...students, ...students];

  return (
    <section className="bg-slate-50 py-20 px-6 md:px-12 overflow-hidden">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-track {
          display: flex;
          width: max-content;
          animation: scroll-left 35s linear infinite;
        }
        .scroll-track.paused {
          animation-play-state: paused;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
        .story-card {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .story-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(13, 27, 110, 0.25);
        }
      `}</style>

      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <div className="reveal opacity-0 translate-y-8">
          <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-blue-700 mb-3">
            Wall of Fame
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] text-[#0D1B6E] leading-[1.05] mb-3">
            STUDENT SUCCESS<br />
            <span className="text-blue-600">STORIES</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-lg mx-auto">
            Join thousands of students who have achieved their dream percentiles with
            our guidance. Here are some of our stars.
          </p>
        </div>
      </div>

      {/* Scrolling Panel */}
      <div className="relative">


        <div
          ref={trackRef}
          className={`scroll-track ${isPaused ? "paused" : ""}`}
          onClick={() => setIsPaused((p) => !p)}
        >
          {allCards.map((s, i) => (
            <div
              key={i}
              className="story-card flex-shrink-0 w-[260px] sm:w-[280px] mx-2 sm:mx-3 rounded-2xl overflow-hidden bg-white border border-blue-100/60 cursor-pointer"
              style={{ boxShadow: "0 4px 24px -4px rgba(13, 27, 110, 0.08)" }}
            >
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#0D1B6E] via-[#1A3BAA] to-amber-400" />

              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  draggable="false"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1240]/50 via-transparent to-transparent" />

                {/* Percentile badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-amber-400 text-[#0A1240] text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full shadow-lg shadow-amber-400/30">
                    {s.percentile} %ile
                  </span>
                </div>

                {/* Verified check */}
                <div className="absolute top-3 right-3 w-7 h-7 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Info */}
              <div className="px-4 py-4 overflow-hidden">
                <p className="font-display text-[1.35rem] text-[#0D1B6E] tracking-widest leading-none mb-1 truncate">
                  {s.name.toUpperCase()}
                </p>
                <p className="text-[11px] text-slate-500 font-semibold leading-snug mb-3 truncate">
                  {s.college}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <Stars />
                  <span className="text-[8px] font-bold tracking-[1.5px] uppercase text-slate-400 shrink-0">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <p className="text-center text-[11px] text-slate-400 font-semibold tracking-wide mt-8">
        Click on the cards to pause/play · Hover to pause
      </p>
    </section>
  );
}
