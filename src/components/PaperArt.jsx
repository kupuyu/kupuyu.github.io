const TEAR_MAIN =
  'M0 69.7 L14 43.8 L26 61.5 L36 46.4 L54 70.2 L86 64.9 L94 57.5 L110 48.9 L122 62.2 L154 65.0 L162 57.3 L180 51.3 L196 63.8 L208 47.9 L220 52.8 L252 71.8 L268 51.2 L290 51.7 L306 61.0 L314 44.5 L346 60.4 L378 52.7 L404 54.4 L426 40.9 L458 46.6 L468 53.7 L480 44.0 L498 44.7 L512 53.2 L544 43.3 L554 44.7 L564 61.5 L590 40.4 L616 61.6 L632 74.7 L658 62.3 L668 61.2 L684 69.2 L696 55.0 L714 38.1 L736 61.4 L744 41.4 L762 60.7 L794 47.2 L806 39.7 L832 62.8 L850 38.8 L862 44.2 L870 49.6 L892 44.6 L918 47.1 L928 47.5 L940 44.7 L948 40.0 L964 44.4 L972 47.9 L986 63.2 L1000 57.2 L1012 50.4 L1020 57.5 L1030 40.6 L1062 59.7 L1094 47.4 L1110 55.8 L1142 58.9 L1154 70.2 L1180 52.0 L1202 56.3 L1216 61.6 L1224 68.5 L1238 36.7 L1250 45.3 L1258 55.9 L1268 69.4 L1278 42.2 L1290 47.2 L1308 72.1 L1340 62.7 L1358 70.1 L1372 64.6 L1388 39.1 L1396 42.8 L1412 67.4 L1422 46.3 L1440 68.4 L1466 52.1 L1484 47.5 L1500 46.5 L1518 71.9 L1534 55.5 L1544 43.1 L1560 60.8 L1568 47.2 L1580 46.6 L1598 60.6 L1600 130 L0 130 Z';
const TEAR_ACCENT =
  'M0 30.2 L12 32.2 L30 44.2 L48 42.0 L63 30.7 L73 23.7 L107 48.9 L129 43.1 L157 28.0 L179 49.2 L201 50.0 L229 36.7 L263 33.0 L285 45.6 L300 48.9 L334 35.8 L362 33.3 L384 53.7 L399 42.7 L409 42.6 L424 37.3 L452 32.4 L480 48.9 L514 45.8 L532 32.2 L554 48.8 L564 20.3 L598 30.7 L610 40.3 L638 31.2 L648 39.2 L676 30.7 L704 34.2 L719 50.3 L731 51.1 L753 27.9 L763 46.4 L791 50.5 L825 47.4 L859 45.7 L874 29.3 L896 41.9 L924 49.0 L946 27.1 L974 35.2 L986 38.2 L1004 41.1 L1014 35.5 L1048 39.4 L1063 27.5 L1078 56.0 L1088 38.9 L1103 36.9 L1121 31.6 L1131 55.8 L1146 33.5 L1174 37.0 L1202 36.6 L1212 41.9 L1224 26.0 L1236 30.4 L1270 52.7 L1304 48.8 L1326 39.6 L1338 24.8 L1366 33.9 L1400 43.8 L1412 27.6 L1427 54.9 L1439 32.3 L1473 48.5 L1501 41.7 L1513 32.2 L1547 33.4 L1575 49.8 L1600 130 L0 130 Z';

export function TornEdge({ fill, accent, className = '' }) {
  return (
    <div className={`torn-edge ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1600 130" preserveAspectRatio="none">
        {accent ? (
          <>
            <path
              d={TEAR_ACCENT}
              fill={accent}
              transform="translate(0 -21)"
              opacity=".5"
              filter="url(#edge-rough)"
            />
            <path d={TEAR_ACCENT} fill={accent} transform="translate(0 -9)" filter="url(#edge-rough)" />
          </>
        ) : null}
        <path d={TEAR_MAIN} fill={fill} filter="url(#edge-rough)" />
        <path d={TEAR_MAIN} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1.2" transform="translate(0 -1)" />
        <g stroke={accent || fill} strokeWidth="1.3" strokeLinecap="round" opacity=".45">
          <path d="M194 63l-4-9" />
          <path d="M415 64l4-10" />
          <path d="M734 62l-5-8" />
          <path d="M1038 63l5-10" />
          <path d="M1268 57l-3-8" />
          <path d="M1392 55l4-9" />
        </g>
      </svg>
    </div>
  );
}

export function Fern({ className = '', flip = false }) {
  const fronds = Array.from({ length: 11 }, (_, i) => {
    const y = 36 + i * 23;
    const spread = 40 - i * 2.1;
    const tilt = -12 + i * 2.1;
    return { y, spread, tilt, length: 34 - i * 0.65 };
  });

  return (
    <svg
      className={`fern ${flip ? 'fern--flip' : ''} ${className}`}
      viewBox="0 0 120 320"
      aria-hidden="true"
    >
      <path d="M59 318C58 255 57 174 60 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      {fronds.map((frond, index) => (
        <g key={index} transform={`translate(59 ${frond.y})`}>
          <path
            d={`M0 0C-${frond.spread * 0.45} -${frond.length * 0.48} -${frond.spread * 0.9} -${frond.length * 0.35} -${frond.spread} -${frond.length * 0.08}C-${frond.spread * 0.72} ${frond.length * 0.18} -${frond.spread * 0.25} ${frond.length * 0.11} 0 0Z`}
            fill="currentColor"
            transform={`rotate(${-frond.tilt})`}
          />
          <path
            d={`M0 0C${frond.spread * 0.45} -${frond.length * 0.48} ${frond.spread * 0.9} -${frond.length * 0.35} ${frond.spread} -${frond.length * 0.08}C${frond.spread * 0.72} ${frond.length * 0.18} ${frond.spread * 0.25} ${frond.length * 0.11} 0 0Z`}
            fill="currentColor"
            transform={`rotate(${frond.tilt})`}
          />
        </g>
      ))}
    </svg>
  );
}

export function Rabbit({ className = '', sleeping = false }) {
  return (
    <svg className={`rabbit-paper ${className}`} viewBox="0 0 260 300" aria-hidden="true">
      <ellipse cx="141" cy="278" rx="80" ry="14" fill="rgba(30,41,29,.18)" />
      <g className="rabbit-paper__body">
        <path
          d="M99 153C77 170 74 217 92 241c17 22 58 24 80 7 26-19 26-58 6-80-17-19-54-32-79-15Z"
          fill="#f1ebd8"
          filter="url(#art-shadow)"
        />
        <path d="M113 165c-10 23-7 56 9 70 12 10 36 7 44-7 8-16-3-44-19-58-10-9-26-12-34-5Z" fill="#e5ddc6" />
        <circle cx="181" cy="223" r="23" fill="#f7f2e2" />
        <circle cx="181" cy="223" r="14" fill="#e9e1cc" opacity=".58" />
        <ellipse cx="117" cy="254" rx="24" ry="10" fill="#e9e2ce" transform="rotate(-12 117 254)" />
        <ellipse cx="163" cy="258" rx="25" ry="10" fill="#f4eedc" transform="rotate(8 163 258)" />
        <path
          d="M100 122c-17-16-29-58-20-83 8-22 37-13 50 13 9 18 12 41 10 62"
          fill="#f4eedd"
          filter="url(#art-shadow)"
        />
        <path
          d="M97 113c-10-19-17-48-10-64 6-14 22-7 29 11 7 18 7 38 3 55"
          fill="#d6b8a8"
          opacity=".62"
        />
        <path
          d="M139 113c4-24 18-60 39-67 22-8 32 19 19 44-10 19-28 31-41 41"
          fill="#f4eedd"
          filter="url(#art-shadow)"
        />
        <path
          d="M146 106c7-20 22-46 34-49 12-4 15 12 7 27-7 14-20 24-31 31"
          fill="#d6b8a8"
          opacity=".58"
        />
        <ellipse cx="130" cy="137" rx="51" ry="45" fill="#f7f1e0" filter="url(#art-shadow)" />
        <path d="M83 132c4-30 29-47 57-43 25 3 41 25 39 49-19 7-37 6-54 0-15-5-29-6-42-6Z" fill="#ece4cf" opacity=".58" />
        {sleeping ? (
          <>
            <path d="M111 135c5 4 11 4 16 0" fill="none" stroke="#3a4035" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M151 135c5 4 11 4 16 0" fill="none" stroke="#3a4035" strokeWidth="2.4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="117" cy="135" r="4.4" fill="#343a2f" />
            <circle cx="155" cy="133" r="4.4" fill="#343a2f" />
            <circle cx="118.4" cy="133.5" r="1.4" fill="#fbf6e7" />
            <circle cx="156.4" cy="131.5" r="1.4" fill="#fbf6e7" />
          </>
        )}
        <circle cx="96" cy="151" r="9" fill="#d7aa9a" opacity=".35" />
        <circle cx="174" cy="148" r="9" fill="#d7aa9a" opacity=".32" />
        <path d="M132 151c2-3 8-3 10 0-1 5-8 6-10 0Z" fill="#9a7b70" />
        <path d="M137 158c0 5-5 8-9 6M137 158c0 5 5 8 9 6" fill="none" stroke="#6d6658" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M115 157c-10 1-18 4-25 8M113 162c-9 4-15 8-19 13M158 155c10-1 19 1 27 5M160 160c9 3 16 7 21 12" fill="none" stroke="#c7bca4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M126 107c7-7 16-7 23 0-7 5-15 5-23 0Z" fill="#f7f1e0" />
        <path d="M119 228c8-12 24-17 34-8 7 7 2 17-8 20-12 4-21 0-26-12Z" fill="#ece4d0" opacity=".64" />
      </g>
    </svg>
  );
}

export function MushroomPatch({ className = '' }) {
  return (
    <svg className={`mushroom-patch ${className}`} viewBox="0 0 180 150" aria-hidden="true">
      <ellipse cx="90" cy="137" rx="72" ry="10" fill="rgba(21,37,24,.2)" />
      <g filter="url(#art-shadow)">
        <path d="M58 139c-5-27-4-44 2-62" fill="none" stroke="#e6dcc3" strokeWidth="7" strokeLinecap="round" />
        <path d="M43 81c3-24 17-39 38-39 20 0 33 16 36 39-25 8-49 8-74 0Z" fill="#a46e4d" />
        <path d="M48 76c8-19 21-28 35-28 13 0 24 10 29 27-22 6-43 6-64 1Z" fill="#bd8961" />
        <path d="M64 59c5-5 12-8 19-9M84 50c5 1 9 3 13 7" fill="none" stroke="#d8b28d" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      </g>
      <g filter="url(#art-shadow)">
        <path d="M121 139c-3-19-2-33 3-44" fill="none" stroke="#ece2c9" strokeWidth="5" strokeLinecap="round" />
        <path d="M107 100c2-17 12-27 25-27 14 0 23 11 25 27-17 6-33 6-50 0Z" fill="#704f3a" />
        <path d="M113 96c5-10 12-17 20-17 7 0 13 6 17 16-13 4-25 4-37 1Z" fill="#956b4d" />
      </g>
      <g filter="url(#art-shadow)">
        <path d="M26 139c-2-12-1-20 2-28" fill="none" stroke="#e9dfc8" strokeWidth="4" strokeLinecap="round" />
        <path d="M17 113c2-12 9-19 18-19 10 0 17 8 18 19-12 4-24 4-36 0Z" fill="#7c5b43" />
      </g>
      <g fill="none" stroke="#617446" strokeWidth="2" strokeLinecap="round">
        <path d="M45 139c-8-19-21-30-38-33M47 138c-2-21 1-37 10-50" />
        <path d="M101 138c7-16 17-24 31-27M102 139c1-12 5-21 12-28" />
      </g>
    </svg>
  );
}

export function SprigDivider({ className = '' }) {
  return (
    <span className={`sprig-divider ${className}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 34 34" width="34" height="34">
        <path d="M17 30V8" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M16.9 17.5C11.6 17 8.1 13.9 7.8 8.8c5.1 0 8.7 3.2 9.1 8.7ZM17.2 23c4.8-.1 8.1-3 8.7-7.8-4.6.1-8 3-8.7 7.8ZM17 10.5C17.5 7.3 19.5 5 22.9 4.6c0 3-1.9 5.2-5.9 5.9Z" fill="currentColor" />
      </svg>
      <span />
    </span>
  );
}

export function ContactNook() {
  return (
    <div className="contact-nook" aria-hidden="true">
      <svg viewBox="0 0 560 660" preserveAspectRatio="xMinYMax meet">
        <defs>
          <radialGradient id="nook-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3d49d" stopOpacity=".5" />
            <stop offset="100%" stopColor="#f3d49d" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path d="M0 660V0h84c3 88 48 127 34 205-10 59 27 107 5 174-15 47 20 97 2 150-13 40 4 83-2 131H0Z" fill="#18301f" />
        <path d="M0 660V0h34c9 73 46 110 28 176-15 54 22 102 3 160-17 53 12 103-5 156-9 30-3 70-8 109-2 20-1 40-2 59H0Z" fill="#102519" />

        <g fill="#25422c" opacity=".96">
          <path d="M84 79c35-29 72-27 97 3-28 44-48 95-46 150 18 25 30 52 33 83-37-8-65-28-86-61-15-25-20-58-14-92 4-29 10-56 16-83Z" />
          <path d="M0 130c23-31 51-45 83-42-2 40-14 78-35 110-22 33-34 67-34 104H0V130Z" />
          <path d="M0 654c4-67 20-113 51-146 36-38 88-48 150-33 1 81-24 141-74 175-47 32-89 34-127 4Z" />
          <path d="M303 660c-15-59-12-105 10-143 23-39 64-64 111-68 40 45 58 95 51 150-67 12-124 32-172 61Z" />
        </g>

        <g fill="none" stroke="#4a6342" strokeWidth="2.6" strokeLinecap="round" opacity=".8">
          <path d="M120 172c-4 56 4 105 24 149M137 201c25-12 46-30 64-52M130 248c-25-8-44-23-57-44M146 287c18-9 31-23 41-40" />
          <path d="M410 604c-2-47 4-82 20-112M418 550c-19-8-33-21-43-39M424 589c20-11 34-25 43-43" />
        </g>

        <g fill="#355237">
          <path d="M250 455c38-22 79-20 120 5-8 62-29 108-63 137-28-28-49-66-57-114-2-13-2-23 0-28Z" />
          <path d="M181 501c24-29 54-37 86-25 32 12 50 40 53 82-44 22-82 24-116 8-22-11-31-35-23-65Z" />
        </g>

        <path d="M347 660v-90c0-45 25-73 69-73s69 28 69 73v90Z" fill="#0c1d13" />
        <path d="M359 660v-88c0-35 21-60 57-60s57 25 57 60v88Z" fill="#152a1d" />
        <ellipse cx="431" cy="589" rx="52" ry="38" fill="url(#nook-glow)" />

        <g transform="translate(343 541)">
          <ellipse cx="92" cy="89" rx="66" ry="12" fill="#09150f" opacity=".5" />
          <path d="M74 54c-12-19-11-40 3-52 14-13 33-5 45 11 12 16 20 30 30 36 7 5 11 11 10 18-1 13-16 22-39 26-27 5-50 1-59-10-6-8-4-19 10-29Z" fill="#d9c6a0" />
          <path d="M88 70c17 5 38 0 54-13 4 9 2 18-7 24-20 13-47 11-62 2-8-5-8-12-5-19 5 4 11 6 20 6Z" fill="#c2ab82" />
          <path d="M91 54c-8-12-8-26 0-35 9-10 23-7 32 3 4 4 7 9 9 14-13 9-27 15-41 18Z" fill="#e6d5b1" />
          <path d="M92 34c3-10 12-15 21-13 8 2 15 9 18 19-13 3-26 1-39-6Z" fill="#b88058" />
          <path d="M83 43c-8-5-15-9-22-10 4 11 11 20 21 27Z" fill="#b88058" />
          <circle cx="100" cy="44" r="2.2" fill="#37392f" />
          <path d="M112 48c3 2 6 1 8-2" fill="none" stroke="#5a5141" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M89 66c10 2 20 0 27-5" fill="none" stroke="#a99572" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
          <path d="M68 76c-4-17 0-33 10-45 4 19 3 34-4 48Z" fill="#e2d1ac" opacity=".8" />
        </g>

        <g transform="translate(300 548)">
          <circle cx="12" cy="19" r="45" fill="url(#nook-glow)" />
          <path d="M5 42h19v28c0 6-5 10-10 10s-9-4-9-10V42Z" fill="#e4d5ae" />
          <path d="M7 45h15" fill="none" stroke="#a79168" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 42V32" fill="none" stroke="#3a3c2a" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 34c-8-6-7-16 2-22 2 8 9 10 7 18-1 5-5 8-9 4Z" fill="#e7b873" />
          <path d="M14 31c-3-3-3-8 1-11 1 4 4 5 3 9 0 2-2 3-4 2Z" fill="#f7e8bd" />
        </g>

        <g fill="none" stroke="#5c744b" strokeWidth="2" strokeLinecap="round">
          <path d="M196 660c-7-54-1-98 19-133M208 610c24-8 42-22 55-43M203 634c-22-5-41-17-55-37" />
          <path d="M106 180c28-18 56-23 84-13M124 211c-14 20-22 43-24 68" />
        </g>
        <g fill="#617a4d">
          <path d="M452 660c-4-39 0-70 13-94 15 19 23 51 21 94Z" />
          <path d="M475 660c10-42 28-68 53-79 2 32-12 58-40 79Z" />
        </g>

        <g fill="#d8cda9" opacity=".7">
          <circle cx="283" cy="340" r="2.4" />
          <circle cx="368" cy="291" r="1.7" />
          <circle cx="235" cy="420" r="1.5" />
          <circle cx="440" cy="390" r="2" />
          <circle cx="316" cy="460" r="1.4" />
        </g>
      </svg>
    </div>
  );
}
