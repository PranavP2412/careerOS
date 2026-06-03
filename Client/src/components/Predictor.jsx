import { useState, useEffect, useRef } from "react";
import whatsappIcon from "../assets/icons8-whatsapp.svg";

// ─── Google Apps Script URL ──────────────────────────────────
// IMPORTANT: Replace this with your deployed Apps Script URL
// See the setup guide: google_sheets_setup.md
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/library/d/1n31i1f4_j3ymHwrhuaYx7V-HvgB6RoUUJONolHa0A1kWQ5uuJt_vXWA4/3";

// ─── Percentile Lookup Data ───────────────────────────────────
const marksToPercentile = {
  easy: [
    { range: "< 50",      min: 0,   max: 49,  pMin: "0.00",  pMax: "50.00" },
    { range: "50 – 59",    min: 50,  max: 59,  pMin: "50.10", pMax: "58.00" },
    { range: "60 – 79",    min: 60,  max: 79,  pMin: "58.10", pMax: "74.00" },
    { range: "80 – 99",    min: 80,  max: 99,  pMin: "74.10", pMax: "87.00" },
    { range: "100 – 109",  min: 100, max: 109, pMin: "87.10", pMax: "91.50" },
    { range: "110 – 119",  min: 110, max: 119, pMin: "91.60", pMax: "94.50" },
    { range: "120 – 129",  min: 120, max: 129, pMin: "94.60", pMax: "96.50" },
    { range: "130 – 139",  min: 130, max: 139, pMin: "96.60", pMax: "98.00" },
    { range: "140 – 149",  min: 140, max: 149, pMin: "98.10", pMax: "99.00" },
    { range: "150 – 159",  min: 150, max: 159, pMin: "99.01", pMax: "99.27" },
    { range: "160 – 169",  min: 160, max: 169, pMin: "99.28", pMax: "99.70" },
    { range: "170 – 179",  min: 170, max: 179, pMin: "99.71", pMax: "99.90" },
    { range: "180 – 189",  min: 180, max: 189, pMin: "99.91", pMax: "99.98" },
    { range: "190 – 200",  min: 190, max: 200, pMin: "99.98", pMax: "100.00" },
  ],
  moderate: [
    { range: "< 50",      min: 0,   max: 49,  pMin: "0.00",  pMax: "57.69" },
    { range: "50 – 59",    min: 50,  max: 59,  pMin: "58.10", pMax: "64.31" },
    { range: "60 – 79",    min: 60,  max: 79,  pMin: "64.17", pMax: "80.06" },
    { range: "80 – 99",    min: 80,  max: 99,  pMin: "80.40", pMax: "92.10" },
    { range: "100 – 109",  min: 100, max: 109, pMin: "92.11", pMax: "96.54" },
    { range: "110 – 119",  min: 110, max: 119, pMin: "96.03", pMax: "97.10" },
    { range: "120 – 129",  min: 120, max: 129, pMin: "97.13", pMax: "98.10" },
    { range: "130 – 139",  min: 130, max: 139, pMin: "98.12", pMax: "99.11" },
    { range: "140 – 149",  min: 140, max: 149, pMin: "99.13", pMax: "99.40" },
    { range: "150 – 159",  min: 150, max: 159, pMin: "99.41", pMax: "99.90" },
    { range: "160 – 169",  min: 160, max: 169, pMin: "99.90", pMax: "99.95" },
    { range: "170 – 179",  min: 170, max: 179, pMin: "99.95", pMax: "100.00" },
    { range: "180 – 189",  min: 180, max: 189, pMin: "100.00", pMax: "100.00" },
    { range: "190 – 200",  min: 190, max: 200, pMin: "100.00", pMax: "100.00" },
  ],
  difficult: [
    { range: "< 50",      min: 0,   max: 49,  pMin: "0.00",  pMax: "65.00" },
    { range: "50 – 59",    min: 50,  max: 59,  pMin: "65.10", pMax: "72.00" },
    { range: "60 – 79",    min: 60,  max: 79,  pMin: "72.10", pMax: "85.00" },
    { range: "80 – 99",    min: 80,  max: 99,  pMin: "85.10", pMax: "94.00" },
    { range: "100 – 109",  min: 100, max: 109, pMin: "94.10", pMax: "96.50" },
    { range: "110 – 119",  min: 110, max: 119, pMin: "96.60", pMax: "97.80" },
    { range: "120 – 129",  min: 120, max: 129, pMin: "97.90", pMax: "98.80" },
    { range: "130 – 139",  min: 130, max: 139, pMin: "98.90", pMax: "99.50" },
    { range: "140 – 149",  min: 140, max: 149, pMin: "99.51", pMax: "99.80" },
    { range: "150 – 159",  min: 150, max: 159, pMin: "99.81", pMax: "99.93" },
    { range: "160 – 169",  min: 160, max: 169, pMin: "99.93", pMax: "99.97" },
    { range: "170 – 179",  min: 170, max: 179, pMin: "99.97", pMax: "100.00" },
    { range: "180 – 189",  min: 180, max: 189, pMin: "100.00", pMax: "100.00" },
    { range: "190 – 200",  min: 190, max: 200, pMin: "100.00", pMax: "100.00" },
  ],
};

const examDates = [
  "April 11, 2026",
  "April 13, 2026",
  "April 15, 2026",
  "April 16, 2026",
  "April 17, 2026",
  "April 18, 2026",
  "April 19, 2026",
  "April 20, 2026",
];

const difficultySchedule = [
  { date: "April 11, 2026", morning: "Easy",     afternoon: "Moderate" },
  { date: "April 13, 2026", morning: "Moderate",  afternoon: "Difficult" },
  { date: "April 15, 2026", morning: "Easy",      afternoon: "Moderate" },
  { date: "April 16, 2026", morning: "Moderate",  afternoon: "Difficult" },
  { date: "April 17, 2026", morning: "Difficult", afternoon: "Moderate" },
  { date: "April 18, 2026", morning: "Moderate",  afternoon: "Moderate" },
  { date: "April 19, 2026", morning: "Moderate",  afternoon: "Difficult" },
  { date: "April 20, 2026", morning: "Moderate",  afternoon: "Easy" },
];

const faqData = [
  {
    q: "What is MHT CET Percentile Predictor?",
    a: "The MHT CET Percentile Predictor is a free tool that lets you estimate your MHT CET 2026 percentile based on your expected marks and the difficulty level of your exam paper. It uses historical data and analysis trusted by thousands of students across Maharashtra.",
  },
  {
    q: "How to predict MHT CET 2026 percentile from marks?",
    a: "Enter your expected marks (out of 200), select your exam date, shift, and the paper difficulty level (Easy, Moderate, or Difficult). The predictor instantly calculates your estimated percentile for MHT CET 2026.",
  },
  {
    q: "What is the relation between MHT CET marks and percentile?",
    a: "MHT CET percentile depends on your marks and the overall difficulty of the paper. For example, on an easy paper, 150 marks may yield around 99.01–99.27 percentile, while the same marks on a difficult paper can result in a higher percentile of 99.81+.",
  },
  {
    q: "Is the MHT CET Percentile Predictor accurate?",
    a: "Our predictor is based on analysis of past years' MHT CET data (2024 & 2025 trends) and adjusted for 2026. It provides reliable estimates and has been trusted by thousands of students.",
  },
  {
    q: "What percentile is needed for top engineering colleges in Maharashtra?",
    a: "For top engineering colleges like COEP, VJTI, and Walchand, you generally need a MHT CET percentile above 98. For mid-tier colleges, a percentile between 85–95 is competitive.",
  },
  {
    q: "How does paper difficulty affect MHT CET percentile?",
    a: "Paper difficulty significantly impacts your percentile. A score of 100 marks on a difficult paper can give a percentile of 96+, while the same score on an easy paper may result in around 87–91 percentile.",
  },
];

// ─── localStorage helpers ────────────────────────────────────
const STORAGE_KEY = "careeros_student";

function getSavedStudent() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return null;
}

function saveStudent(student) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
}

// ─── Google Sheets helper ────────────────────────────────────
// ─── Google Sheets helper ────────────────────────────────────
async function sendToGoogleSheet(data) {
  try {
    // Convert the data object into URL query parameters
    const params = new URLSearchParams(data).toString();
    const requestUrl = `${GOOGLE_SCRIPT_URL}?${params}`;

    // Send a GET request. 'no-cors' works perfectly for this method.
    await fetch(requestUrl, {
      method: "GET",
      mode: "no-cors",
    });
    
    return true;
  } catch (err) {
    console.error("Failed to save to Google Sheet:", err);
    return false;
  }
}


// ─── Animated Number ────────────────────────────────────────
function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const target = parseFloat(value) || 0;
    const startTime = performance.now();
    function animate(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay((target * eased).toFixed(2));
      if (progress < 1) ref.current = requestAnimationFrame(animate);
    }
    ref.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(ref.current);
  }, [value, duration]);

  return <span>{display}</span>;
}

// ─── Difficulty Badge ──────────────────────────────────────
function DiffBadge({ level }) {
  const colors = {
    Easy: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Moderate: "bg-amber-400/20 text-amber-300 border-amber-400/30",
    Difficult: "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold tracking-wide uppercase ${colors[level]}`}>
      {level}
    </span>
  );
}

// ─── Scroll Reveal Hook ──────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.classList.remove("opacity-0", "translate-y-8");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Details Modal ───────────────────────────────────────────
function DetailsModal({ onSubmit, onClose, isSubmitting }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!/^\d{10}$/.test(phone.trim())) errs.phone = "Enter valid 10-digit number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = "Enter valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onSubmit({ name: name.trim(), phone: phone.trim(), email: email.trim() });
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-[modalIn_0.3s_ease]">
        <style>{`
          @keyframes modalIn { from { opacity:0; transform:scale(0.92) translateY(16px); } to { opacity:1; transform:scale(1) translateY(0); } }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="1" fill="currentColor" />
          </svg>
        </div>

        {/* Heading */}
        <h3 className="text-center text-2xl font-extrabold text-gray-900 mb-1">Almost There!</h3>
        <p className="text-center text-sm text-gray-500 mb-6">Enter your details to unlock your percentile result</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl border bg-gray-50 pl-10 pr-4 py-3 text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.name ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:border-amber-400 focus:ring-amber-100"
                }`}
              />
            </div>
            {errors.name && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className={`w-full rounded-xl border bg-gray-50 pl-10 pr-4 py-3 text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.phone ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:border-amber-400 focus:ring-amber-100"
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-xl border bg-gray-50 pl-10 pr-4 py-3 text-sm font-semibold text-gray-900 placeholder:text-gray-400 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                  errors.email ? "border-red-300 focus:ring-red-200" : "border-gray-200 focus:border-amber-400 focus:ring-amber-100"
                }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-500 font-semibold">{errors.email}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full rounded-xl bg-amber-400 py-3.5 text-base font-extrabold text-[#0A1240] shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Reveal My Percentile ✨
              </span>
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-gray-400">
          🔒 Your data is 100% secure<br />No spam, ever.
        </p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────
export default function Predictor() {

    const [isPredicting, setIsPredicting] = useState(false);
  useReveal();

  // form state
  const [attempt, setAttempt] = useState("1st");
  const [examDate, setExamDate] = useState("");
  const [shift, setShift] = useState("");
  const [marks, setMarks] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [result, setResult] = useState(null);
  const [tableTab, setTableTab] = useState("moderate");
  const [openFaq, setOpenFaq] = useState(null);

  // modal & student state
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingResult, setPendingResult] = useState(null);
  const [savedStudent, setSavedStudent] = useState(() => getSavedStudent());

  function computePercentile() {
    const m = parseInt(marks, 10);
    if (isNaN(m) || m < 0 || m > 200 || !difficulty) return null;
    const table = marksToPercentile[difficulty];
    const row = table.find((r) => m >= r.min && m <= r.max);
    if (!row) return null;
    const fraction = row.max === row.min ? 1 : (m - row.min) / (row.max - row.min);
    const pLow = parseFloat(row.pMin);
    const pHigh = parseFloat(row.pMax);
    const predicted = (pLow + fraction * (pHigh - pLow)).toFixed(2);
    return { percentile: predicted, marks: m, difficulty };
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const res = computePercentile();
    if (!res) return;

    if (savedStudent) {
      // 1. Start loading animation
      setIsPredicting(true);
      setPendingResult(res);

      // 2. Start saving to Google Sheets
      const savePromise = sendToGoogleSheet({
        name: savedStudent.name,
        phone: savedStudent.phone,
        email: savedStudent.email,
        attempt,
        examDate,
        shift,
        marks: res.marks,
        difficulty: res.difficulty,
        percentile: res.percentile,
      });

      // 3. Create a strict 3-second delay
      const delayPromise = new Promise(resolve => setTimeout(resolve, 3000));

      // 4. Wait for BOTH the 3 seconds to pass AND the save to finish
      await Promise.all([savePromise, delayPromise]);

      // 5. Show result and turn off loader
      setResult(res);
      setPendingResult(null);
      setIsPredicting(false);
    } else {
      // First time — show the details modal
      setPendingResult(res);
      setShowModal(true);
    }
  }

  async function handleModalSubmit(student) {
    setIsSubmitting(true);

    // Save student identity to localStorage
    saveStudent(student);
    setSavedStudent(student);

    if (pendingResult) {
      const savePromise = sendToGoogleSheet({
        name: student.name,
        phone: student.phone,
        email: student.email,
        attempt,
        examDate,
        shift,
        marks: pendingResult.marks,
        difficulty: pendingResult.difficulty,
        percentile: pendingResult.percentile,
      });
      
      const delayPromise = new Promise(resolve => setTimeout(resolve, 3000));
      await Promise.all([savePromise, delayPromise]);
      
      setResult(pendingResult);
    }

    setIsSubmitting(false);
    setShowModal(false);
    setPendingResult(null);
  }



  return (
    <div className="font-sans bg-[#070E2E] text-white min-h-screen overflow-x-hidden">

      {/* ── GOOGLE FONTS ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Manrope:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Manrope', sans-serif; }
        .font-display { font-family: 'Bebas Neue', cursive; }
        .reveal { transition: opacity 0.65s ease, transform 0.65s ease; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(251,191,36,0.15)} 50%{box-shadow:0 0 40px rgba(251,191,36,0.3)} }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      {/* ── BG Textures ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-25"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-amber-400/5 blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      {/* ── Details Modal ── */}
      {showModal && (
        <DetailsModal
          onSubmit={handleModalSubmit}
          onClose={() => { setShowModal(false); setPendingResult(null); }}
          isSubmitting={isSubmitting}
        />
      )}

      {/* ═══════════════════════════════════════
          NAV
      ═══════════════════════════════════════ */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-4 border-b border-white/5">
        <a href="/" className="font-display text-3xl text-white tracking-widest">
          CAREER<span className="text-amber-400">OS</span>
        </a>
        <div className="flex items-center gap-3">
          {savedStudent && (
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold text-amber-400/70 tracking-wide uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Welcome, {savedStudent.name.split(" ")[0]}
            </span>
          )}
          <a
            href="/"
            className="bg-white/5 border border-white/10 text-white text-xs font-extrabold tracking-wide px-5 py-2.5 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          MAIN — Hero + Form
      ═══════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

          {/* ── LEFT: Hero Text + Stats ── */}
          <div className="lg:col-span-5 lg:pt-8">
            <section className="flex flex-col items-start text-left">
              {/* Badge */}
              <div className="reveal opacity-0 translate-y-8 mb-5 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-amber-400 w-fit">
                🎯 MHT CET 2026 Predictor
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
              </div>

              {/* Headline */}
              <h1 className="reveal opacity-0 translate-y-8 font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-[0.95] tracking-wide mb-4">
                KNOW YOUR<br />
                <span className="text-amber-400">PERCENTILE</span><br />
                INSTANTLY
              </h1>

              {/* Sub text */}
              <p className="reveal opacity-0 translate-y-8 mt-2 max-w-lg text-white/55 text-sm md:text-base leading-relaxed font-medium">
                Enter your marks and estimate your MHT CET percentile with our prediction engine. Guided by{" "}
                <span className="font-bold text-white">top JEE & MHT-CET rankers.</span>
              </p>
            </section>

            {/* Stats Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {[
                { icon: "👥", value: "100+", label: "Students Guided", suffix: "+" },
                { icon: "🎯", value: "99.9", label: "Accuracy Rate", suffix: "%" },
                { icon: "📊", value: "3", label: "Difficulty Levels", suffix: "" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="reveal opacity-0 translate-y-8 flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4 hover:border-amber-400/20 hover:bg-white/[0.07] transition-all duration-200"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-xl">
                    {s.icon}
                  </div>
                  <div>
                    <div className="font-display text-2xl text-amber-400 tracking-wide leading-none">
                      {s.value}<span className="text-amber-400/70">{s.suffix}</span>
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Predictor Form ── */}
          <div className="lg:col-span-7">
            <section id="predictor" className="relative w-full">
              {/* Trust badge */}

              {/* Card */}
              <div className="reveal opacity-0 translate-y-8 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 sm:p-8 md:p-10 backdrop-blur-sm shadow-2xl shadow-black/30 animate-pulse-glow">

                {/* Header */}
                <div className="mb-8 text-center sm:text-left">
                  <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-amber-400">
                  </div>
                  <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-white tracking-wide leading-none">
                    PREDICT YOUR PERCENTILE
                  </h2>
                  <p className="mt-2 text-sm text-white/45">Fill in your exam details below</p>
                </div>

                {/* Attempt Toggle */}
                <div className="mb-6">
                  <label className="mb-2 flex items-center gap-2 text-sm font-bold text-white/80">Which Attempt?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["1st", "2nd"].map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAttempt(a)}
                        className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                          attempt === a
                            ? "border-amber-400 bg-amber-400/15 text-amber-400 shadow-sm ring-1 ring-amber-400/50"
                            : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08]"
                        }`}
                      >
                        {a} Attempt
                      </button>
                    ))}
                  </div>
                </div>

                <form className="space-y-6" onSubmit={handleFormSubmit} noValidate>
                  {/* Exam Date */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-white/80">
                      <span className="text-amber-400">📅</span>
                      Exam Date <span className="ml-1 text-[10px] font-semibold text-amber-400/70">(PCM Group)</span>
                    </label>
                    <div className="relative">
                      <select
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 pr-10 text-sm font-semibold text-white focus:border-amber-400/50 focus:outline-none focus:ring-4 focus:ring-amber-400/10 transition-all"
                      >
                        <option value="" disabled className="text-gray-500 bg-[#0A1240]">Select your exam date</option>
                        {examDates.map((d) => (
                          <option key={d} value={d} className="text-white bg-[#0A1240]">{d}</option>
                        ))}
                      </select>
                      <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Shift */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-white/80">Shift</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { key: "morning", emoji: "🌅", label: "Morning" },
                        { key: "afternoon", emoji: "🌇", label: "Afternoon" },
                      ].map((s) => (
                        <button
                          key={s.key}
                          type="button"
                          onClick={() => setShift(s.key)}
                          className={`rounded-xl border px-4 py-3 text-sm font-bold transition-all ${
                            shift === s.key
                              ? "border-amber-400 bg-amber-400/15 text-amber-400 shadow-sm ring-1 ring-amber-400/50"
                              : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08]"
                          }`}
                        >
                          <span className="mr-2 text-lg">{s.emoji}</span>{s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Marks */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-white/80">Marks Obtained</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="200"
                        placeholder="Enter marks (0 – 200)"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 pr-24 text-lg font-bold text-white placeholder:text-white/25 placeholder:font-normal placeholder:text-sm focus:border-amber-400/50 focus:outline-none focus:ring-4 focus:ring-amber-400/10 transition-all"
                      />
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm font-bold text-white/25">
                        {marks || 0} / 200
                      </div>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-white/80">Difficulty Level</label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {[
                        { key: "easy", emoji: "😊", label: "Easy" },
                        { key: "moderate", emoji: "😐", label: "Moderate" },
                        { key: "difficult", emoji: "😤", label: "Difficult" },
                      ].map((d) => (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => setDifficulty(d.key)}
                          className={`relative flex flex-col items-center justify-center gap-1 rounded-xl border px-2 py-4 transition-all sm:gap-2 sm:py-5 ${
                            difficulty === d.key
                              ? "border-amber-400 bg-amber-400/15 shadow-sm ring-1 ring-amber-400/50"
                              : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                          }`}
                        >
                          <span className="text-2xl sm:text-3xl">{d.emoji}</span>
                          <span className={`text-xs font-bold sm:text-sm ${difficulty === d.key ? "text-amber-400" : "text-white/50"}`}>
                            {d.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
<button
  type="submit"
  disabled={isPredicting}
  className="group relative w-full overflow-hidden rounded-xl bg-amber-400 py-4 text-base font-extrabold text-[#0A1240] shadow-lg shadow-amber-400/20 transition-all hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30 hover:-translate-y-0.5 sm:text-lg disabled:opacity-80 disabled:cursor-wait"
>
  {isPredicting ? (
    <span className="relative flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5 text-[#0A1240]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      Analyzing Data...
    </span>
  ) : (
    <span className="relative flex items-center justify-center gap-2">
      🎯 Check My Percentile
      <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
    </span>
  )}
</button>
                </form>

                {/* ── Result Display ── */}
                {result && (
                  <div className="mt-8 rounded-2xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-amber-400/5 p-6 text-center animate-float">
                    <p className="text-[10px] font-extrabold tracking-[3px] uppercase text-amber-400/60 mb-2">
                      Your Estimated Percentile
                    </p>
                    <div className="font-display text-[4rem] md:text-[5rem] text-amber-400 leading-none tracking-wide">
                      <AnimatedNumber value={result.percentile} />
                    </div>
                    <p className="text-white/40 text-xs mt-2 font-semibold">
                      Based on {result.marks} marks • {result.difficulty.charAt(0).toUpperCase() + result.difficulty.slice(1)} paper
                    </p>
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeiuHkhunyX7lcPe_ms8UKJ1waK8AxqropYV9qK60BoBHsoKw/viewform?usp=sharing&ouid=108883885572194550504"
                        className="bg-amber-400 text-[#0A1240] text-xs font-extrabold tracking-wide px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/40 transition-all duration-200"
                      >
                        💬 Connect with an Expert
                      </a>
                      <a
  href="https://wa.me/919356605358"
  className="inline-flex items-center gap-2 bg-amber-400 text-[#0A1240] text-xs font-extrabold tracking-wide px-5 py-2.5 rounded-full hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/40 transition-all duration-200"
>
  <img 
    src={whatsappIcon} 
    alt="WhatsApp" 
    className="h-5 w-5" 
  />
  Join WhatsApp community for updates
</a>
                      <button
                        onClick={() => { setResult(null); setMarks(""); setDifficulty(""); setShift(""); setExamDate(""); }}
                        className="text-white/50 text-xs font-bold px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/5 transition-all duration-200"
                      >
                        🔄 Predict Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          TABLES
      ═══════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* ── Difficulty Schedule ── */}
          <div className="reveal opacity-0 translate-y-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl flex flex-col h-full">
            <div className="border-b border-white/5 bg-white/[0.03] px-5 py-3">
              <p className="text-sm font-bold text-white/80">📅 MHT CET 2026 — Difficulty Schedule (PCM)</p>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-amber-400/5">
                    <th className="px-5 py-3 text-left text-[10px] font-extrabold uppercase tracking-widest text-white/40">Date</th>
                    <th className="px-5 py-3 text-left text-[10px] font-extrabold uppercase tracking-widest text-white/40">🌅 Morning</th>
                    <th className="px-5 py-3 text-left text-[10px] font-extrabold uppercase tracking-widest text-white/40">🌇 Afternoon</th>
                  </tr>
                </thead>
                <tbody>
                  {difficultySchedule.map((row, i) => (
                    <tr key={i} className={`border-b border-white/[0.03] transition-colors hover:bg-white/[0.04] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                      <td className="px-5 py-3 font-semibold text-white/70 whitespace-nowrap">{row.date}</td>
                      <td className="px-5 py-3 whitespace-nowrap"><DiffBadge level={row.morning} /></td>
                      <td className="px-5 py-3 whitespace-nowrap"><DiffBadge level={row.afternoon} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Marks vs Percentile ── */}
          <div className="reveal opacity-0 translate-y-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-xl flex flex-col h-full">
            <div className="border-b border-white/5 bg-white/[0.03] px-5 py-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-sm font-bold text-white/80">📊 Marks vs Percentile</p>
                <div className="flex rounded-lg bg-white/[0.05] p-1 shrink-0">
                  {["easy", "moderate", "difficult"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTableTab(tab)}
                      className={`rounded-md px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide transition-all ${
                        tableTab === tab
                          ? "bg-amber-400/15 text-amber-400 shadow-sm ring-1 ring-amber-400/30"
                          : "text-white/40 hover:text-white/60"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-x-auto flex-1 max-h-[384px] overflow-y-auto scrollbar-hide">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-[#0A1240]/95 backdrop-blur-sm z-10">
                  <tr>
                    <th className="px-5 py-3 text-left text-[10px] font-extrabold uppercase tracking-widest text-white/40">Marks Range</th>
                    <th className="px-5 py-3 text-left text-[10px] font-extrabold uppercase tracking-widest text-white/40">Percentile Range</th>
                  </tr>
                </thead>
                <tbody>
                  {marksToPercentile[tableTab].map((row, i) => (
                    <tr key={i} className={`border-b border-white/[0.03] transition-colors hover:bg-white/[0.04] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}>
                      <td className="px-5 py-2.5 font-semibold text-white/70 whitespace-nowrap">{row.range}</td>
                      <td className="px-5 py-2.5 font-bold text-amber-400 whitespace-nowrap">{row.pMin} – {row.pMax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="reveal opacity-0 translate-y-8 text-center mb-10">
            <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-amber-400 mb-3">Got Questions?</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] text-white leading-[1.05]">
              FREQUENTLY ASKED<br />
              <span className="text-amber-400">QUESTIONS</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <div
                key={i}
                className="reveal opacity-0 translate-y-8 rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden transition-all duration-200 hover:border-white/15"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold text-white/85 pr-4">{faq.q}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 shrink-0 text-amber-400 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-6 pb-5 text-sm text-white/45 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA
      ═══════════════════════════════════════ */}
      <section className="relative z-10 py-16 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B6E]/40 to-[#1A3BAA]/20 rounded-3xl" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="reveal opacity-0 translate-y-8">
            <p className="text-[11px] font-extrabold tracking-[3px] uppercase text-amber-400 mb-3">Need Expert Guidance?</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-white leading-[1.05] mb-4">
              CONFUSED ABOUT<br />WHAT COMES NEXT?
            </h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Get personalized college predictions, branch selection advice, and CAP round strategy — from real rankers who've been there.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/#contact"
                className="bg-amber-400 text-[#0A1240] font-extrabold text-sm px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-400/40 transition-all duration-200"
              >
                💬 Talk to a Mentor
              </a>
              <a
                href="https://wa.me/919356605358"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white/[0.06] border border-white/10 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-white/[0.12] transition-all duration-200"
              >
                📞 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center">
        <p className="font-display text-xl text-amber-400 tracking-[3px] mb-1">CAREER OS</p>
        <p className="text-[11px] text-white/25 font-medium">
          © 2026 Career OS · By Rankers, For Future Rankers · Carrerosadmission101@gmail.com
        </p>
      </footer>
    </div>
  );
}
