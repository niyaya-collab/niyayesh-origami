"use client";

import { useRef, useState } from "react";

const PAPER = "#fff";
const BLUSH = "#ffe7ef";
const LILAC = "#f7e9ff";
const CREAM = "#fff6ea";
const PINK = "#ffd0e0";
const GOLD = "#fff4d8";
const ROSE = "#ffd7e4";
const VIOLET = "#f3e4ff";
const SQUARE = "36,36 164,36 164,164 36,164";

function fold(points, fill, extra, behind) {
  return { points, fill, extra, behind };
}

const MODELS = [
  {
    id: "heart",
    name: "قلب",
    line: "برای سینه‌ات",
    vow: "این قلب را دست‌های تو بیدار کرد.",
    face: { x: 100, y: 108 },
    steps: [
      { dir: "down", title: "تا به پایین", text: "لبهٔ بالای کاغذ را با دو انگشت بگیر و تا نیمه، به سمت پایین تا کن." },
      { dir: "left", title: "گوشه به میان", text: "گوشهٔ راست را بگیر و روی خط وسط تا کن." },
      { dir: "right", title: "گوشهٔ دیگر", text: "گوشهٔ چپ را هم آرام به وسط بیاور." },
      { dir: "up", title: "نوک قلب", text: "نوک پایین را با شست به بالا تا کن تا قلب شود." },
    ],
  },
  {
    id: "unicorn",
    name: "اسب تک‌شاخ",
    line: "یال و شاخ",
    vow: "این تک‌شاخ فقط برای تو آرام گرفت.",
    face: { x: 152, y: 104, s: 0.62 },
    steps: [
      { dir: "down", title: "تا از قطر", text: "گوشهٔ بالا را روی گوشهٔ پایین بگذار تا یک مثلث شود." },
      { dir: "right", title: "بدنه", text: "یک لبه را به راست تا کن تا بدن اسب شکل بگیرد." },
      { dir: "up", title: "شاخ", text: "نوک پیشانی را به بالا بکش. این شاخ اوست." },
      { dir: "left", title: "یال", text: "یال را با یک تا کوتاه به چپ بخوابان." },
    ],
  },
  {
    id: "crane",
    name: "درنا",
    line: "پرنده‌ای که می‌ماند",
    vow: "بال باز کرد و پیش تو نشست.",
    face: { x: 128, y: 58, s: 0.58 },
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
    face: { x: 100, y: 104, s: 0.8 },
    steps: [
      { dir: "left", title: "بال روی بال", text: "کاغذ را از وسط به چپ تا کن، طوری که دو لایه روی هم بنشینند." },
      { dir: "down", title: "لبهٔ نرم", text: "لبهٔ بالا را کمی به پایین تا کن." },
      { dir: "right", title: "باز کردن بال", text: "بال راست را با انگشت به بیرون، سمت راست، باز کن." },
      { dir: "up", title: "نشستن", text: "از پایین به بالا خم کن تا پروانه روی کاغذ بنشیند." },
    ],
  },
  {
    id: "cat",
    name: "گربه",
    line: "نرم و نزدیک",
    vow: "خودش را به دست تو مالید.",
    face: { x: 118, y: 122, s: 0.66 },
    steps: [
      { dir: "down", title: "تا نصف", text: "لبهٔ بالا را تا نصف کاغذ پایین بیاور." },
      { dir: "left", title: "گوش چپ", text: "گوشهٔ چپ را به میان تا کن تا یک گوش شود." },
      { dir: "right", title: "گوش راست", text: "گوشهٔ راست را هم به میان بیاور." },
      { dir: "up", title: "نشستن", text: "بدنه را از پایین کمی بالا بده تا گربه بنشیند." },
    ],
  },
  {
    id: "bunny",
    name: "خرگوش",
    line: "گوش‌های بلند",
    vow: "گوش‌هایش را برایت تکان داد.",
    face: { x: 112, y: 116, s: 0.48 },
    steps: [
      { dir: "up", title: "تا به بالا", text: "لبهٔ پایین را تا بالا تا کن." },
      { dir: "left", title: "گوش چپ", text: "یک نوار باریک را به چپ تا کن. این گوش اول است." },
      { dir: "right", title: "گوش راست", text: "نوار دیگر را به راست تا کن." },
      { dir: "down", title: "بدن نرم", text: "پایین کاغذ را کمی به پایین خم کن تا بنشیند." },
    ],
  },
  {
    id: "tulip",
    name: "لاله",
    line: "یک شاخه برای تو",
    vow: "این گل مال دست‌های توست.",
    face: { x: 100, y: 92, s: 0.75 },
    steps: [
      { dir: "down", title: "بستن گل", text: "لبهٔ بالا را تا پایین تا کن." },
      { dir: "left", title: "گلبرگ راست", text: "گوشهٔ راست را به سوی مرکز تا کن." },
      { dir: "right", title: "گلبرگ چپ", text: "گوشهٔ چپ را هم به مرکز بیاور." },
      { dir: "up", title: "شکفتن", text: "نوک پایین را بالا بده تا لاله باز شود." },
    ],
  },
  {
    id: "rose",
    name: "رز",
    line: "گل سرخ",
    vow: "این رز را دست تو باز کرد.",
    face: { x: 100, y: 108, s: 0.7 },
    steps: [
      { dir: "left", title: "تا از وسط", text: "کاغذ را از وسط به چپ تا کن." },
      { dir: "down", title: "گلبرگ", text: "لبهٔ بالا را به پایین تا کن تا یک گلبرگ ساخته شود." },
      { dir: "right", title: "گلبرگ دیگر", text: "گوشه را به راست باز کن." },
      { dir: "up", title: "وسط گل", text: "نوک‌ها را کمی به بالا بده تا رز بشکفد." },
    ],
  },
  {
    id: "swan",
    name: "قو",
    line: "گردن خم",
    vow: "گردنش را سمت تو خم کرد.",
    face: { x: 150, y: 62, s: 0.55 },
    steps: [
      { dir: "down", title: "مثلث", text: "کاغذ را از قطر تا کن تا یک مثلث سفید بماند." },
      { dir: "right", title: "گردن باریک", text: "یک لبه را به راست باریک کن. این گردن قو است." },
      { dir: "down", title: "سر", text: "سر را با یک تا کوچک به پایین خم کن." },
      { dir: "up", title: "ایستادن", text: "بدنه را از پایین به بالا بکش تا قو بایستد." },
    ],
  },
  {
    id: "dove",
    name: "کبوتر",
    line: "نامهٔ سفید",
    vow: "نامه‌اش فقط به نام توست.",
    face: { x: 160, y: 84, s: 0.46 },
    steps: [
      { dir: "right", title: "بال", text: "لبهٔ چپ را به راست تا کن تا بال جمع شود." },
      { dir: "up", title: "سینه", text: "نوک پایین را کمی به بالا بده." },
      { dir: "left", title: "دم", text: "دم را با یک تا کوتاه به چپ باز کن." },
      { dir: "down", title: "نوک", text: "سر را کمی به پایین خم کن تا کبوتر شود." },
    ],
  },
  {
    id: "bow",
    name: "پاپیون",
    line: "گرهٔ صورتی",
    vow: "این پاپیون را به تو می‌بندم.",
    face: { x: 100, y: 104, s: 0.85 },
    steps: [
      { dir: "left", title: "سمت راست", text: "سمت راست کاغذ را تا خط وسط بیاور." },
      { dir: "right", title: "سمت چپ", text: "سمت چپ را هم تا وسط تا کن." },
      { dir: "down", title: "جمع کردن وسط", text: "وسط را با دو انگشت فشار بده و کمی به پایین جمع کن." },
      { dir: "up", title: "حلقه‌ها", text: "حلقه‌ها را به بالا باز کن تا پاپیون شود." },
    ],
  },
  {
    id: "crown",
    name: "تاج",
    line: "برای سر تو",
    vow: "این تاج مال سر توست.",
    face: { x: 100, y: 112, s: 0.72 },
    steps: [
      { dir: "down", title: "نوار تاج", text: "لبهٔ بالا را تا پایین تا کن تا یک نوار پهن بماند." },
      { dir: "up", title: "نوک وسط", text: "وسط نوار را به بالا بکش. این نوک تاج است." },
      { dir: "left", title: "نوک چپ", text: "گوشهٔ چپ را به بالا و کمی به چپ تا کن." },
      { dir: "right", title: "نوک راست", text: "گوشهٔ راست را هم بلند کن تا تاج کامل شود." },
    ],
  },
  {
    id: "fan",
    name: "بادبزن",
    line: "نسیم صورتی",
    vow: "این بادبزن فقط صورت تو را نوازش می‌کند.",
    face: { x: 100, y: 112, s: 0.7 },
    steps: [
      { dir: "up", title: "جمع کردن", text: "لبهٔ پایین را تا بالا تا کن." },
      { dir: "left", title: "پلیسه", text: "یک تای باریک به چپ بزن." },
      { dir: "right", title: "پلیسهٔ دیگر", text: "تای بعدی را به راست بزن." },
      { dir: "down", title: "باز شدن", text: "بادبزن را از دسته به پایین باز کن." },
    ],
  },
  {
    id: "dress",
    name: "پیراهن",
    line: "دامن باز",
    vow: "این پیراهن برای تو دوخته شد.",
    face: { x: 100, y: 88, s: 0.48 },
    steps: [
      { dir: "down", title: "بالاتنه", text: "لبهٔ بالا را کمی به پایین تا کن. این یقه است." },
      { dir: "left", title: "آستین", text: "گوشهٔ چپ را به داخل تا کن." },
      { dir: "right", title: "آستین دیگر", text: "گوشهٔ راست را هم به داخل بیاور." },
      { dir: "up", title: "دامن", text: "لبهٔ پایین را به بالا باز کن تا دامن پهن شود." },
    ],
  },
  {
    id: "ring",
    name: "انگشتر",
    line: "یک حلقه",
    vow: "این حلقه را به تو می‌دهم.",
    face: { x: 100, y: 66, s: 0.46 },
    steps: [
      { dir: "down", title: "نوار", text: "کاغذ را تا کن تا یک نوار باریک بماند." },
      { dir: "left", title: "حلقه", text: "یک سر نوار را به چپ خم کن." },
      { dir: "right", title: "سر دیگر", text: "سر دیگر را به راست روی آن بگذار." },
      { dir: "up", title: "نگین", text: "نوک وسط را به بالا تا کن تا نگین شود." },
    ],
  },
  {
    id: "star",
    name: "ستاره",
    line: "برای شب تو",
    vow: "این ستاره فقط بالای نام تو روشن است.",
    face: { x: 100, y: 108, s: 0.8 },
    steps: [
      { dir: "down", title: "تا نصف", text: "لبهٔ بالا را تا نصف کاغذ پایین بیاور." },
      { dir: "left", title: "نوک چپ", text: "گوشه را به چپ تا کن تا یک نوک ساخته شود." },
      { dir: "right", title: "نوک راست", text: "گوشهٔ دیگر را به راست تا کن." },
      { dir: "up", title: "باز شدن", text: "نوک‌ها را به بالا بده تا ستاره باز شود." },
    ],
  },
  {
    id: "blossom",
    name: "شکوفه",
    line: "گل بهاری",
    vow: "این شکوفه با اسم تو باز شد.",
    face: { x: 100, y: 104, s: 0.68 },
    steps: [
      { dir: "down", title: "تا از قطر", text: "کاغذ را از قطر تا کن." },
      { dir: "left", title: "گلبرگ", text: "یک گوشه را به چپ تا کن." },
      { dir: "right", title: "گلبرگ روبه‌رو", text: "گوشهٔ روبه‌رو را به راست تا کن." },
      { dir: "up", title: "شکفتن", text: "نوک‌ها را به بالا باز کن تا شکوفه شود." },
    ],
  },
  {
    id: "lotus",
    name: "نیلوفر",
    line: "گل روی آب",
    vow: "روی آب آرام، برای تو شکفت.",
    face: { x: 100, y: 112, s: 0.75 },
    steps: [
      { dir: "up", title: "تا به بالا", text: "لبهٔ پایین را بگیر و تا بالا تا کن." },
      { dir: "left", title: "گلبرگ", text: "گلبرگ راست را به وسط تا کن." },
      { dir: "right", title: "گلبرگ دیگر", text: "گلبرگ چپ را هم به وسط بیاور." },
      { dir: "down", title: "خم گلبرگ", text: "نوک‌ها را کمی به پایین خم کن تا بشکفد." },
    ],
  },
  {
    id: "lily",
    name: "سوسن",
    line: "گل سفید",
    vow: "این سوسن برای تو خم شد.",
    face: { x: 100, y: 102, s: 0.5 },
    steps: [
      { dir: "up", title: "بستن", text: "لبهٔ پایین را تا بالا تا کن." },
      { dir: "left", title: "گلبرگ چپ", text: "گلبرگ را به چپ تا کن." },
      { dir: "right", title: "گلبرگ راست", text: "گلبرگ دیگر را به راست بیاور." },
      { dir: "down", title: "نوک‌ها", text: "نوک گل را کمی به پایین خم کن." },
    ],
  },
  {
    id: "angel",
    name: "فرشته",
    line: "بال‌های نرم",
    vow: "بال‌هایش دور تو جمع شد.",
    face: { x: 100, y: 56, s: 0.42 },
    steps: [
      { dir: "down", title: "بالاتنه", text: "لبهٔ بالا را کمی به پایین تا کن." },
      { dir: "left", title: "بال چپ", text: "گوشهٔ چپ را بیرون، به سمت چپ، باز کن." },
      { dir: "right", title: "بال راست", text: "گوشهٔ راست را هم باز کن." },
      { dir: "up", title: "هاله", text: "نوک سر را به بالا تا کن تا هاله پیدا شود." },
    ],
  },
  {
    id: "mermaid",
    name: "پری دریایی",
    line: "از آب آمده",
    vow: "از دریا آمد و پیش تو ماند.",
    face: { x: 104, y: 50, s: 0.4 },
    steps: [
      { dir: "down", title: "تا از قطر", text: "کاغذ را از قطر تا کن." },
      { dir: "right", title: "دم", text: "نوک پایین را به راست خم کن. این دم است." },
      { dir: "left", title: "مو", text: "لبهٔ سر را به چپ تا کن تا مو بیفتد." },
      { dir: "up", title: "باله", text: "نوک دم را کمی به بالا باز کن." },
    ],
  },
  {
    id: "shell",
    name: "صدف",
    line: "یک مروارید",
    vow: "این مروارید مال توست.",
    face: { x: 100, y: 128, s: 0.55 },
    steps: [
      { dir: "up", title: "کاسه", text: "لبهٔ پایین را تا بالا تا کن." },
      { dir: "left", title: "لبهٔ چپ", text: "گوشهٔ چپ را به داخل تا کن." },
      { dir: "right", title: "لبهٔ راست", text: "گوشهٔ راست را هم به داخل بیاور." },
      { dir: "down", title: "مروارید", text: "وسط را با شست کمی به پایین فشار بده تا مروارید بنشیند." },
    ],
  },
  {
    id: "perfume",
    name: "عطر",
    line: "شیشهٔ کوچک",
    vow: "بویش بوی توست.",
    face: { x: 100, y: 116, s: 0.62 },
    steps: [
      { dir: "down", title: "بدنه", text: "لبهٔ بالا را تا پایین تا کن تا شیشه کوتاه شود." },
      { dir: "up", title: "درپوش", text: "یک نوار باریک را به بالا تا کن. این درِ شیشه است." },
      { dir: "left", title: "شانهٔ چپ", text: "گوشهٔ چپ شیشه را به داخل تا کن." },
      { dir: "right", title: "شانهٔ راست", text: "گوشهٔ راست را هم جمع کن تا شیشهٔ عطر شود." },
    ],
  },
  {
    id: "moon",
    name: "ماه",
    line: "شب روشن",
    vow: "این ماه فقط شب تو روشن است.",
    face: { x: 64, y: 104, s: 0.62 },
    steps: [
      { dir: "left", title: "تا از وسط", text: "کاغذ را از وسط به چپ تا کن." },
      { dir: "down", title: "خم بالا", text: "گوشهٔ بالا را به پایین تا کن." },
      { dir: "right", title: "خم لبه", text: "لبهٔ باز را کمی به راست برگردان تا هلال شود." },
      { dir: "up", title: "نوک ماه", text: "نوک پایین را به بالا بده تا ماه بایستد." },
    ],
  },
];

const PIECES = {
  heart: [
    fold(SQUARE, PAPER),
    fold("28,36 172,36 172,112 28,112", BLUSH),
    fold("100,40 168,108 100,150 32,108", PAPER),
    fold("100,156 46,102 46,74 68,54 86,54 100,70 114,54 132,54 154,74 154,102", PINK),
  ],
  unicorn: [
    fold(SQUARE, PAPER),
    fold("36,36 164,36 100,164", BLUSH),
    fold("40,150 78,118 120,96 168,120 150,156 70,168", CREAM),
    fold("34,122 58,104 100,112 116,96 128,74 142,58 134,80 158,92 174,108 164,122 148,136 162,172 140,154 124,162 108,178 92,156 76,176 58,154 42,162", PAPER, (
      <polygon points="120,78 104,26 136,70" fill={GOLD} stroke="#c6a15b" strokeWidth="2" strokeLinejoin="round" />
    )),
  ],
  crane: [
    fold(SQUARE, PAPER),
    fold("36,36 164,36 100,164", BLUSH),
    fold("100,34 168,120 100,168 32,120", PAPER),
    fold("48,156 86,136 74,102 112,58 134,40 142,56 112,84 146,112 176,122 124,128 112,162 72,168", PAPER),
  ],
  butterfly: [
    fold("36,40 164,40 164,160 36,160", BLUSH),
    fold("36,40 164,40 164,160 36,160", LILAC),
    fold("100,48 168,70 156,130 100,150 44,130 32,70", LILAC),
    fold("100,86 162,46 184,98 146,132 100,114 54,132 16,98 38,46", VIOLET),
  ],
  cat: [
    fold(SQUARE, PAPER),
    fold("36,48 164,48 164,164 36,164", BLUSH),
    fold("78,52 100,96 122,52 150,100 156,164 52,164 58,100", CREAM),
    fold("72,86 64,42 92,78 108,74 122,40 148,82 162,118 158,164 132,178 96,176 74,168 46,178 58,154 68,132 64,108", PAPER, (
      <>
        <polygon points="70,50 88,76 96,70" fill={PINK} />
        <polygon points="116,70 130,46 144,78" fill={PINK} />
      </>
    )),
  ],
  bunny: [
    fold(SQUARE, PAPER),
    fold("48,36 152,36 152,164 48,164", BLUSH),
    fold("78,36 98,36 104,120 150,150 70,164 62,120", CREAM),
    fold("64,128 86,114 140,114 162,136 168,162 146,180 78,180 56,156", PAPER, (
      <>
        <polygon points="76,108 68,22 90,18 100,104" fill={PAPER} stroke="#e7b7c6" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="118,104 128,18 150,22 142,108" fill={PAPER} stroke="#e7b7c6" strokeWidth="3" strokeLinejoin="round" />
        <polygon points="74,34 84,24 94,96" fill={PINK} />
        <polygon points="126,26 138,20 140,96" fill={PINK} />
        <circle cx="112" cy="116" r="26" fill={PAPER} stroke="#e7b7c6" strokeWidth="3" />
        <circle cx="58" cy="152" r="12" fill={BLUSH} stroke="#e7b7c6" strokeWidth="2" />
      </>
    )),
  ],
  tulip: [
    fold(SQUARE, PAPER),
    fold("48,78 100,36 152,78 100,168", BLUSH),
    fold("70,70 100,34 130,70 116,150 84,150", ROSE),
    fold("100,30 138,78 118,150 100,132 82,150 62,78", ROSE),
  ],
  rose: [
    fold(SQUARE, PAPER),
    fold("36,36 100,36 100,164 36,164", PINK),
    fold("70,48 130,48 150,120 100,164 50,120", ROSE),
    fold("100,40 118,46 136,64 146,88 140,112 148,134 128,152 100,164 72,152 52,134 60,112 54,88 64,64 82,46", PINK, (
      <>
        <ellipse cx="100" cy="104" rx="28" ry="24" fill={ROSE} />
        <circle cx="100" cy="104" r="11" fill="#c94b6e" />
      </>
    )),
  ],
  swan: [
    fold(SQUARE, PAPER),
    fold("40,120 150,50 168,78 70,156", BLUSH),
    fold("46,132 120,78 156,46 168,64 124,96 86,156", PAPER),
    fold("34,160 96,150 90,116 124,72 158,40 170,54 136,90 122,128 150,164 46,172", PAPER),
  ],
  dove: [
    fold(SQUARE, PAPER),
    fold("70,40 164,40 164,160 70,160", BLUSH),
    fold("36,130 90,90 150,70 168,110 90,150", PAPER),
    fold("26,118 52,132 78,122 112,136 142,128 160,108 174,86 190,74 170,68 152,82 124,96 86,102 48,108", PAPER, (
      <polygon points="176,72 196,80 166,94" fill={ROSE} />
    )),
  ],
  bow: [
    fold("30,70 170,70 170,130 30,130", BLUSH),
    fold("30,70 170,70 170,130 30,130", PINK),
    fold("28,78 86,78 100,108 114,78 172,78 172,126 114,126 100,98 86,126 28,126", PINK),
    fold("24,84 78,70 100,100 122,70 176,84 176,120 122,132 100,104 78,132 24,120", PINK),
  ],
  crown: [
    fold("28,78 172,78 172,148 28,148", GOLD),
    fold("28,70 172,70 172,146 28,146", CREAM),
    fold("30,146 54,78 100,40 146,78 170,146", GOLD),
    fold("24,148 32,76 56,112 74,68 100,32 126,68 144,112 168,76 176,148", GOLD, (
      <>
        <circle cx="74" cy="78" r="5" fill={PINK} />
        <circle cx="100" cy="48" r="6" fill={ROSE} />
        <circle cx="126" cy="78" r="5" fill={PINK} />
      </>
    )),
  ],
  fan: [
    fold("36,90 164,90 164,164 36,164", BLUSH),
    fold("48,70 152,70 140,160 60,160", PINK),
    fold("36,120 70,48 130,48 164,120 100,156", ROSE),
    fold("100,170 24,126 40,82 66,48 100,28 134,48 160,82 176,126", PINK, (
      <>
        <line x1="100" y1="164" x2="40" y2="82" stroke="#e7b7c6" strokeWidth="1.6" />
        <line x1="100" y1="164" x2="66" y2="48" stroke="#e7b7c6" strokeWidth="1.6" />
        <line x1="100" y1="164" x2="100" y2="28" stroke="#e7b7c6" strokeWidth="1.6" />
        <line x1="100" y1="164" x2="134" y2="48" stroke="#e7b7c6" strokeWidth="1.6" />
        <line x1="100" y1="164" x2="160" y2="82" stroke="#e7b7c6" strokeWidth="1.6" />
      </>
    )),
  ],
  dress: [
    fold(SQUARE, PAPER),
    fold("70,40 130,40 150,164 50,164", BLUSH),
    fold("78,40 122,40 112,92 150,164 50,164 88,92", PINK),
    fold("90,44 110,44 126,64 162,78 140,100 126,108 166,174 34,174 74,108 60,100 38,78 74,64", ROSE),
  ],
  ring: [
    fold("28,108 172,108 172,150 28,150", GOLD),
    fold("36,112 164,112 152,150 48,150", CREAM),
    fold("70,96 130,96 160,122 150,152 50,152 40,122", GOLD),
    fold("100,24 126,72 114,108 172,122 158,156 42,156 28,122 86,108 74,72", GOLD),
  ],
  star: [
    fold(SQUARE, PAPER),
    fold(SQUARE, CREAM),
    fold("100,28 124,78 176,84 136,118 150,170 100,142 50,170 64,118 24,84 76,78", GOLD),
    fold("100,24 122,76 176,80 134,114 148,168 100,138 52,168 66,114 24,80 78,76", GOLD),
  ],
  blossom: [
    fold(SQUARE, PAPER),
    fold("36,36 164,36 100,164", BLUSH),
    fold("100,40 150,90 100,150 50,90", PINK),
    fold("100,24 118,72 168,80 124,108 146,164 100,132 54,164 76,108 32,80 82,72", ROSE, (
      <circle cx="100" cy="104" r="10" fill={GOLD} />
    )),
  ],
  lotus: [
    fold(SQUARE, PAPER),
    fold("40,150 100,40 160,150", LILAC),
    fold("70,150 100,48 130,150 116,150 100,110 84,150", VIOLET),
    fold("100,36 132,78 160,150 124,132 100,156 76,132 40,150 68,78", VIOLET, null, (
      <>
        <polygon points="24,138 72,84 96,156" fill="#e4d4ff" stroke="#e7b7c6" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="176,138 128,84 104,156" fill="#e4d4ff" stroke="#e7b7c6" strokeWidth="2" strokeLinejoin="round" />
      </>
    )),
  ],
  lily: [
    fold(SQUARE, PAPER),
    fold("48,40 152,40 120,164 80,164", PAPER),
    fold("100,36 146,80 120,160 80,160 54,80", BLUSH),
    fold("86,22 114,22 108,96 118,170 82,170 92,96", PAPER, null, (
      <>
        <polygon points="28,70 78,58 96,108 70,132 24,112" fill={BLUSH} stroke="#e7b7c6" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="172,70 122,58 104,108 130,132 176,112" fill={BLUSH} stroke="#e7b7c6" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="48,156 88,112 100,128 76,178 36,166" fill={ROSE} stroke="#e7b7c6" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="152,156 112,112 100,128 124,178 164,166" fill={ROSE} stroke="#e7b7c6" strokeWidth="2" strokeLinejoin="round" />
      </>
    )),
  ],
  angel: [
    fold(SQUARE, PAPER),
    fold("70,36 130,36 150,164 50,164", BLUSH),
    fold("28,100 70,70 100,48 130,70 172,100 140,164 60,164", LILAC),
    fold("16,104 50,74 76,98 90,70 110,70 124,98 150,74 184,104 154,126 132,114 146,174 54,174 68,114 46,126", PAPER, (
      <>
        <circle cx="100" cy="56" r="16" fill={PAPER} stroke="#e7b7c6" strokeWidth="2" />
        <ellipse cx="100" cy="32" rx="18" ry="7" fill="none" stroke="#c6a15b" strokeWidth="2.4" />
      </>
    )),
  ],
  mermaid: [
    fold(SQUARE, PAPER),
    fold("40,36 160,36 100,164", BLUSH),
    fold("80,40 130,70 160,150 70,164 60,90", LILAC),
    fold("86,34 112,30 132,48 138,72 128,104 156,132 178,158 156,176 100,148 44,176 22,158 48,130 74,104 70,72 76,48", VIOLET, (
      <circle cx="104" cy="48" r="15" fill={PAPER} stroke="#e7b7c6" strokeWidth="2" />
    )),
  ],
  shell: [
    fold(SQUARE, PAPER),
    fold("36,80 164,80 164,164 36,164", CREAM),
    fold("40,150 70,70 130,70 160,150", BLUSH),
    fold("32,160 44,112 66,72 100,44 134,72 156,112 168,160", ROSE, (
      <>
        <line x1="100" y1="148" x2="66" y2="72" stroke="#e7b7c6" strokeWidth="1.6" />
        <line x1="100" y1="148" x2="100" y2="44" stroke="#e7b7c6" strokeWidth="1.6" />
        <line x1="100" y1="148" x2="134" y2="72" stroke="#e7b7c6" strokeWidth="1.6" />
        <circle cx="100" cy="128" r="14" fill={PAPER} stroke="#e7b7c6" strokeWidth="2" />
      </>
    )),
  ],
  perfume: [
    fold(SQUARE, PAPER),
    fold("64,56 136,56 150,164 50,164", LILAC),
    fold("86,32 114,32 114,58 142,164 58,164 86,58", VIOLET),
    fold("84,28 116,28 116,52 134,72 146,166 54,166 66,72 84,52", VIOLET),
  ],
  moon: [
    fold(SQUARE, PAPER),
    fold("36,36 100,36 100,164 36,164", GOLD),
    fold("40,40 108,36 84,100 112,164 44,150", CREAM),
    fold("44,34 92,26 78,58 96,92 80,128 100,166 64,158 32,118 30,68", GOLD),
  ],
};

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
            تک‌شاخ، تاج، رز، پیراهن و بقیه، هر کدام که تمام شود زنده می‌شود و لبخند می‌زند.
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
        <Living model={model} />
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
  const piece = PIECES[kind][step];
  return (
    <>
      {piece.behind || null}
      <Poly points={piece.points} fill={piece.fill} />
      {piece.extra || null}
    </>
  );
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

function Living({ model }) {
  const { x, y, s = 1 } = model.face;
  return (
    <svg className="alive-art" viewBox="0 0 200 200" role="img" aria-label="اوریگامی زنده">
      <Crease kind={model.id} step={3} />
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <ellipse className="cheek" cx="-22" cy="2" rx="8" ry="5" fill="#f3a0b8" />
        <ellipse className="cheek" cx="22" cy="2" rx="8" ry="5" fill="#f3a0b8" />
        <path className="eye" d="M-16 -10c4 4 8 4 12 0" fill="none" stroke="#7c314c" strokeWidth="2.4" strokeLinecap="round" />
        <path className="eye" d="M4 -10c4 4 8 4 12 0" fill="none" stroke="#7c314c" strokeWidth="2.4" strokeLinecap="round" />
        <path className="mouth" d="M-12 8c6 10 16 10 22 0" fill="none" stroke="#7c314c" strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}
