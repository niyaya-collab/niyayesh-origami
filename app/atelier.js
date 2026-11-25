"use client";

import { useRef, useState } from "react";

const MODELS = [
  {
    id: "heart",
    name: "قلب",
    line: "برای سینه‌ات",
    vow: "این قلب را دست‌های تو بیدار کرد.",
    steps: [
      { dir: "down", title: "تا به پایین", text: "لبهٔ بالای کاغذ را با دو انگشت بگیر و تا نیمه، به سمت پایین تا کن." },
      { dir: "left", title: "گوشه به میان", text: "گوشهٔ راست را بگیر و روی خط وسط تا کن." },
      { dir: "right", title: "گوشهٔ دیگر", text: "گوشهٔ چپ را هم آرام به وسط بیاور." },
      { dir: "up", title: "نوک قلب", text: "نوک پایین را با شست به بالا تا کن تا قلب شود." },
    ],
  },
  {
    id: "crane",
    name: "درنا",
    line: "پرنده‌ای که می‌ماند",
    vow: "بال باز کرد و پیش تو نشست.",
    steps: [
      { dir: "down", title: "تا از قطر", text: "گوشهٔ بالا را بگیر و روی گوشهٔ پایین بگذار. یک مثلث می‌شود." },
      { dir: "right", title: "بال باریک", text: "لبهٔ باز را به سمت راست تا کن تا بال باریک شود." },
      { dir: "up", title: "گردن", text: "نوک بسته را کمی به بالا بکش تا گردن درنا بلند شود." },
      { dir: "left", title: "سر کوچک", text: "نوک گردن را با یک تا کوتاه به چپ خم کن. این سر اوست." },
    ],
  },
  {
    id: "butterfly",
    name: "پروانه",
    line: "بال‌های باز",
    vow: "بال‌هایش را فقط برای تو باز کرد.",
    steps: [
      { dir: "left", title: "بال روی بال", text: "کاغذ را از وسط به چپ تا کن، طوری که دو لایه روی هم بنشینند." },
      { dir: "down", title: "لبهٔ نرم", text: "لبهٔ بالا را کمی به پایین تا کن." },
      { dir: "right", title: "باز کردن بال", text: "بال راست را با انگشت به بیرون، سمت راست، باز کن." },
      { dir: "up", title: "نشستن", text: "از پایین به بالا خم کن تا پروانه روی کاغذ بنشیند." },
    ],
  },
  {
    id: "tulip",
    name: "لاله",
    line: "یک شاخه برای تو",
    vow: "این گل مال دست‌های توست.",
    steps: [
      { dir: "down", title: "بستن گل", text: "لبهٔ بالا را تا پایین تا کن." },
      { dir: "left", title: "گلبرگ راست", text: "گوشهٔ راست را به سوی مرکز تا کن." },
      { dir: "right", title: "گلبرگ چپ", text: "گوشهٔ چپ را هم به مرکز بیاور." },
      { dir: "up", title: "شکفتن", text: "نوک پایین را بالا بده تا لاله باز شود." },
    ],
  },
  {
    id: "swan",
    name: "قو",
    line: "گردن خم",
    vow: "گردنش را سمت تو خم کرد.",
    steps: [
      { dir: "down", title: "مثلث", text: "کاغذ را از قطر تا کن تا یک مثلث سفید بماند." },
      { dir: "right", title: "گردن باریک", text: "یک لبه را به راست باریک کن. این گردن قو است." },
      { dir: "down", title: "سر", text: "سر را با یک تا کوچک به پایین خم کن." },
      { dir: "up", title: "ایستادن", text: "بدنه را از پایین به بالا بکش تا قو بایستد." },
    ],
  },
  {
    id: "bow",
    name: "پاپیون",
    line: "گرهٔ صورتی",
    vow: "این پاپیون را به تو می‌بندم.",
    steps: [
      { dir: "left", title: "سمت راست", text: "سمت راست کاغذ را تا خط وسط بیاور." },
      { dir: "right", title: "سمت چپ", text: "سمت چپ را هم تا وسط تا کن." },
      { dir: "down", title: "جمع کردن وسط", text: "وسط را با دو انگشت فشار بده و کمی به پایین جمع کن." },
      { dir: "up", title: "حلقه‌ها", text: "حلقه‌ها را به بالا باز کن تا پاپیون شود." },
    ],
  },
  {
    id: "star",
    name: "ستاره",
    line: "برای شب تو",
    vow: "این ستاره فقط بالای نام تو روشن است.",
    steps: [
      { dir: "down", title: "تا نصف", text: "لبهٔ بالا را تا نصف کاغذ پایین بیاور." },
      { dir: "left", title: "نوک چپ", text: "گوشه را به چپ تا کن تا یک نوک ساخته شود." },
      { dir: "right", title: "نوک راست", text: "گوشهٔ دیگر را به راست تا کن." },
      { dir: "up", title: "باز شدن", text: "نوک‌ها را به بالا بده تا ستاره باز شود." },
    ],
  },
  {
    id: "lotus",
    name: "نیلوفر",
    line: "گل روی آب",
    vow: "روی آب آرام، برای تو شکفت.",
    steps: [
      { dir: "up", title: "تا به بالا", text: "لبهٔ پایین را بگیر و تا بالا تا کن." },
      { dir: "left", title: "گلبرگ", text: "گلبرگ راست را به وسط تا کن." },
      { dir: "right", title: "گلبرگ دیگر", text: "گلبرگ چپ را هم به وسط بیاور." },
      { dir: "down", title: "خم گلبرگ", text: "نوک‌ها را کمی به پایین خم کن تا بشکفد." },
    ],
  },
];

const DIR_WORD = { down: "پایین", up: "بالا", left: "چپ", right: "راست" };

function readDir(dx, dy) {
  if (Math.hypot(dx, dy) < 42) return "";
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? "right" : "left";
  return dy > 0 ? "down" : "up";
}

export default function Atelier() {
  const [pick, setPick] = useState(null);
  const [step, setStep] = useState(0);
  const [alive, setAlive] = useState(false);
  const [nudge, setNudge] = useState(false);
  const start = useRef(null);
  const model = MODELS.find((item) => item.id === pick);

  function open(id) {
    setPick(id);
    setStep(0);
    setAlive(false);
  }

  function finishGesture(dx, dy) {
    if (!model || alive) return;
    const got = readDir(dx, dy);
    if (got !== model.steps[step].dir) {
      setNudge(true);
      window.setTimeout(() => setNudge(false), 360);
      return;
    }
    navigator.vibrate?.(12);
    if (step + 1 >= model.steps.length) setAlive(true);
    else setStep(step + 1);
  }

  if (!model) {
    return (
      <main className="home">
        <header className="hero">
          <p className="eyebrow">برای نیایش</p>
          <h1>تای‌های نیایش</h1>
          <p className="lede">
            یک کاغذ مربع بردار. هر طرح را با همان حرکتی که روی صفحه می‌بینی تا کن.
            هر کدام که تمام شود، زنده می‌شود و لبخند می‌زند.
          </p>
        </header>
        <section className="grid">
          {MODELS.map((item) => (
            <button key={item.id} className="card" type="button" onClick={() => open(item.id)}>
              <Mini kind={item.id} />
              <b>{item.name}</b>
              <span>{item.line}</span>
            </button>
          ))}
        </section>
      </main>
    );
  }

  if (alive) {
    return (
      <main className="alive">
        <p className="eyebrow">زنده شد</p>
        <Living kind={model.id} />
        <p className="vow soft">{model.vow}</p>
        <p className="vow">من عاشقشم.<br />تو مال خودمی، نیایش.</p>
        <div className="actions">
          <button className="again" type="button" onClick={() => { setAlive(false); setStep(0); }}>دوباره تا کنم</button>
          <button className="homebtn" type="button" onClick={() => setPick(null)}>طرح دیگر</button>
        </div>
      </main>
    );
  }

  const current = model.steps[step];

  return (
    <main className="studio">
      <div className="bar">
        <button className="back" type="button" onClick={() => setPick(null)}>بازگشت</button>
        <span className="stepcount">{model.name} · {step + 1} از {model.steps.length}</span>
      </div>
      <div className="dots" aria-hidden="true">
        {model.steps.map((item, index) => <i key={item.title} className={index <= step ? "on" : ""} />)}
      </div>
      <div
        className="stage"
        onPointerDown={(event) => {
          start.current = { x: event.clientX, y: event.clientY };
          event.currentTarget.setPointerCapture?.(event.pointerId);
        }}
        onPointerUp={(event) => {
          if (!start.current) return;
          finishGesture(event.clientX - start.current.x, event.clientY - start.current.y);
          start.current = null;
        }}
        onPointerCancel={() => { start.current = null; }}
      >
        <div className="paper-wrap">
          <Sheet kind={model.id} step={step} nudge={nudge} />
          <span className={`finger ${current.dir}`} />
        </div>
      </div>
      <div className="card-note">
        <b>{current.title} · به سمت {DIR_WORD[current.dir]}</b>
        <p>{current.text} بعد همین حرکت را با انگشت روی صفحه بکش.</p>
      </div>
    </main>
  );
}

function Sheet({ kind, step, nudge }) {
  return (
    <svg className={nudge ? "sheet nudge" : "sheet"} viewBox="0 0 200 200" aria-hidden="true">
      <Crease kind={kind} step={step} />
    </svg>
  );
}

function Crease({ kind, step }) {
  const flap = ["#ffe7ef", "#fff", "#f7e9ff", "#fff6ea"][step % 4];
  if (kind === "heart") {
    return step === 0 ? <Square />
      : step === 1 ? <Poly points="28,36 172,36 172,112 28,112" fill={flap} />
      : step === 2 ? <Poly points="100,40 168,108 100,150 32,108" fill={flap} />
      : <Poly points="100,156 46,102 46,74 68,54 86,54 100,70 114,54 132,54 154,74 154,102" fill="#ffd0e0" />;
  }
  if (kind === "crane") {
    return step === 0 ? <Square />
      : step === 1 ? <Poly points="36,36 164,36 100,164" fill={flap} />
      : step === 2 ? <Poly points="100,34 168,120 100,168 32,120" fill={flap} />
      : <Poly points="48,156 86,136 74,102 112,58 134,40 142,56 112,84 146,112 176,122 124,128 112,162 72,168" fill="#fff" />;
  }
  if (kind === "butterfly") {
    return step < 2 ? <Poly points="36,40 164,40 164,160 36,160" fill={flap} />
      : step === 2 ? <Poly points="100,48 168,70 156,130 100,150 44,130 32,70" fill={flap} />
      : <Poly points="100,86 162,46 184,98 146,132 100,114 54,132 16,98 38,46" fill="#f3e4ff" />;
  }
  if (kind === "tulip") {
    return step === 0 ? <Square />
      : step === 1 ? <Poly points="48,78 100,36 152,78 100,168" fill={flap} />
      : step === 2 ? <Poly points="70,70 100,34 130,70 116,150 84,150" fill={flap} />
      : <Poly points="100,30 138,78 118,150 100,132 82,150 62,78" fill="#ffd7e4" />;
  }
  if (kind === "swan") {
    return step === 0 ? <Square />
      : step === 1 ? <Poly points="40,120 150,50 168,78 70,156" fill={flap} />
      : step === 2 ? <Poly points="46,132 120,78 156,46 168,64 124,96 86,156" fill={flap} />
      : <Poly points="34,160 96,150 90,116 124,72 158,40 170,54 136,90 122,128 150,164 46,172" fill="#fff" />;
  }
  if (kind === "bow") {
    return step < 2 ? <Poly points="30,70 170,70 170,130 30,130" fill={flap} />
      : step === 2 ? <Poly points="28,78 86,78 100,108 114,78 172,78 172,126 114,126 100,98 86,126 28,126" fill={flap} />
      : <Poly points="24,84 78,70 100,100 122,70 176,84 176,120 122,132 100,104 78,132 24,120" fill="#ffd0e0" />;
  }
  if (kind === "star") {
    return step < 2 ? <Square />
      : step === 2 ? <Poly points="100,28 124,78 176,84 136,118 150,170 100,142 50,170 64,118 24,84 76,78" fill={flap} />
      : <Poly points="100,24 122,76 176,80 134,114 148,168 100,138 52,168 66,114 24,80 78,76" fill="#fff4d8" />;
  }
  return step === 0 ? <Square />
    : step === 1 ? <Poly points="40,150 100,40 160,150" fill={flap} />
    : step === 2 ? <Poly points="70,150 100,48 130,150 116,150 100,110 84,150" fill={flap} />
    : <Poly points="100,36 132,78 160,150 124,132 100,156 76,132 40,150 68,78" fill="#f6e7ff" />;
}

function Square() {
  return <Poly points="36,36 164,36 164,164 36,164" fill="#fff" />;
}

function Poly({ points, fill }) {
  return (
    <>
      <polygon points={points} fill={fill} stroke="#e7b7c6" strokeWidth="3" strokeLinejoin="round" />
      <polygon points={points} fill="none" stroke="rgba(198,161,91,0.45)" strokeWidth="1" strokeDasharray="4 6" />
    </>
  );
}

function Mini({ kind }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true">
      <Crease kind={kind} step={3} />
    </svg>
  );
}

function Living({ kind }) {
  return (
    <svg className="alive-art" viewBox="0 0 200 200" role="img" aria-label="اوریگامی زنده">
      <Crease kind={kind} step={3} />
      <ellipse className="cheek" cx="78" cy="108" rx="8" ry="5" fill="#f3a0b8" />
      <ellipse className="cheek" cx="122" cy="108" rx="8" ry="5" fill="#f3a0b8" />
      <path className="eye" d="M84 96c4 4 8 4 12 0" fill="none" stroke="#7c314c" strokeWidth="2.4" strokeLinecap="round" />
      <path className="eye" d="M108 96c4 4 8 4 12 0" fill="none" stroke="#7c314c" strokeWidth="2.4" strokeLinecap="round" />
      <path className="mouth" d="M90 116c6 10 16 10 22 0" fill="none" stroke="#7c314c" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
