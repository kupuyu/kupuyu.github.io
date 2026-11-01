export function PaperBoyScene({ className = '' }) {
  return (
    <svg className={`paper-boy ${className}`} viewBox="0 0 760 580" aria-hidden="true">
      <defs>
        <linearGradient id="rock-moss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a4ba6d" />
          <stop offset="48%" stopColor="#708d49" />
          <stop offset="100%" stopColor="#425d32" />
        </linearGradient>
        <linearGradient id="rock-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#526d3d" />
          <stop offset="100%" stopColor="#2d4525" />
        </linearGradient>
        <linearGradient id="cap-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8aa658" />
          <stop offset="100%" stopColor="#5a773d" />
        </linearGradient>
        <linearGradient id="pack-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#58733f" />
          <stop offset="100%" stopColor="#324b2d" />
        </linearGradient>
      </defs>

      {/* layered mossy rock */}
      <g filter="url(#art-shadow)">
        <path d="M32 509C106 470 161 478 230 446c80-37 166-24 244-54 92-36 179-21 268-2v142c-104 19-175 1-268 17-108 19-174 26-268 1-62-17-119 6-174 15Z" fill="#263c20" />
        <path d="M42 443c72-52 143-50 216-83 78-35 156-25 238-52 91-31 172-16 246-6l2 108c-79 24-154 44-238 55-110 15-179 34-270 24-75-9-137 7-194 26Z" fill="url(#rock-moss)" />
        <path d="M42 443c79-28 145-37 222-36 104 1 171-29 254-52 91-25 163-25 226-20v47c-92 26-161 47-255 57-103 11-176 33-269 25-70-6-129 9-178 26Z" fill="#b9ca83" opacity=".33" />
        <path d="M42 477c91-19 155-16 238-15 100 1 172-27 260-42 91-16 158-8 220-5v74c-103 20-182 31-273 37-109 7-184 20-273 15-65-4-122 1-172 11Z" fill="url(#rock-face)" />
        <path d="M170 466c26 19 34 46 25 80M338 453c22 24 25 57 10 85M567 437c-9 31-1 60 22 84" fill="none" stroke="#263e22" strokeWidth="5" strokeLinecap="round" opacity=".58" />
        <path d="M73 496c55-17 106-17 154-7M244 525c67-14 123-16 177-7M478 499c62-14 118-12 167-2" fill="none" stroke="#89a45d" strokeWidth="4" strokeLinecap="round" opacity=".45" />
        <path d="M107 463c14-24 37-41 67-50M450 416c18-15 39-22 64-21M610 389c13-11 27-16 44-17" fill="none" stroke="#d8e3a3" strokeWidth="3" strokeLinecap="round" opacity=".75" />
      </g>

      {/* grass and ferns at the rock edge */}
      <g filter="url(#art-shadow)">
        <path d="M27 514c-18-13-32-31-41-54 20 3 39 12 56 28-4 13-9 22-15 26ZM55 533c-5-25 0-48 14-68 13 19 19 42 16 68-12 4-22 4-30 0ZM96 529c3-27 15-48 37-63 4 24-2 47-19 68-8 3-14 1-18-5Z" fill="#6e8b49" />
        <path d="M716 508c19-17 33-37 41-61-24 3-45 15-62 35 4 12 11 21 21 26ZM690 535c2-28 11-51 27-68 5 25 2 48-10 67-8 4-14 4-17 1Z" fill="#5f7d43" />
        <path d="M4 546c32-18 67-24 104-18-24 19-55 29-92 30L4 546ZM624 536c25-19 53-27 84-23-18 18-44 29-77 32l-7-9Z" fill="#90aa60" />
      </g>

      {/* rabbit */}
      <g transform="translate(520 332)" filter="url(#art-shadow)">
        <ellipse cx="42" cy="121" rx="57" ry="13" fill="#172414" opacity=".25" />
        <path d="M40 38c-9-16-14-45-4-63 10-18 30-4 31 19 1 17-2 35-8 48" fill="#f4edda" />
        <path d="M70 38c6-19 20-48 37-56 19-9 25 13 13 34-9 16-23 28-36 38" fill="#f8f2e1" />
        <path d="M48 31c-4-15-5-32 0-42 6 12 9 28 8 43" fill="#d7b6aa" opacity=".6" />
        <path d="M77 29c7-14 19-32 29-36-3 14-13 31-25 42" fill="#d7b6aa" opacity=".55" />
        <ellipse cx="45" cy="73" rx="42" ry="39" fill="#f8f2e1" />
        <path d="M8 64c11-25 37-33 58-24 16 7 24 22 23 39-18 7-39 3-56-3-9-3-17-6-25-12Z" fill="#ebe2cd" opacity=".66" />
        <circle cx="30" cy="69" r="3.8" fill="#33392c" />
        <circle cx="59" cy="67" r="3.8" fill="#33392c" />
        <circle cx="31" cy="67.5" r="1.2" fill="#fff9ea" />
        <circle cx="60" cy="65.5" r="1.2" fill="#fff9ea" />
        <path d="M41 82c2-2 7-2 9 0-1 4-7 5-9 0Z" fill="#a78378" />
        <path d="M46 88c0 4-4 7-8 5M46 88c0 4 4 7 8 5" fill="none" stroke="#71695a" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M14 115c9-6 22-7 32-1 9 5 17 4 27-3 4 6 4 12-2 16-15 9-39 8-52-1-6-4-8-8-5-11Z" fill="#ece4d0" />
      </g>

      {/* boy seen from behind, sitting */}
      <g transform="translate(280 136)" filter="url(#art-shadow)">
        {/* rear leg */}
        <path d="M108 285c-12 33-27 56-53 67l-10-23c16-17 23-36 23-60 10-7 26-3 40 16Z" fill="#2f412c" />
        <path d="M46 344c-9 5-17 14-18 23 13 5 31 6 45 0l4-19-31-4Z" fill="#5c402e" />
        <path d="M46 347c4 8 5 15 2 22" fill="none" stroke="#372a20" strokeWidth="2.4" strokeLinecap="round" />

        {/* front leg */}
        <path d="M127 281c-2 36 5 65 22 86l24-13c-11-23-12-47-4-70-12-11-27-12-42-3Z" fill="#3a4f31" />
        <path d="M147 364c-3 10-1 19 5 25 12-3 24-11 31-21l-13-17-23 13Z" fill="#6b4d35" />
        <path d="M153 367c6 5 10 11 11 18" fill="none" stroke="#3f2e22" strokeWidth="2.4" strokeLinecap="round" />

        {/* left arm and hand */}
        <path d="M44 162c-19 22-28 53-23 87 5 34 20 52 42 54l7-29c-13-9-19-26-17-48 2-19 9-34 19-45Z" fill="#e8ceb0" />
        <path d="M59 287c-5 8-6 17-2 24 9 1 16-3 20-11l-4-15-14 2Z" fill="#e1bf9e" />

        {/* backpack */}
        <path d="M49 157c-17 17-24 55-19 93 5 36 20 58 51 62 34 4 61-17 70-51 9-35 3-73-15-94-24-25-64-32-87-10Z" fill="url(#pack-fill)" />
        <path d="M58 162c-12 15-17 37-15 63 23 11 55 12 88 2 11-2 22-6 31-11-2-23-8-41-19-54-25-20-63-20-85 0Z" fill="#4e6b3d" />
        <path d="M80 173c24-10 54-8 75 7" fill="none" stroke="#93a76a" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        <path d="M65 229c23 12 54 13 88 3l3 20c-33 11-64 8-94-3Z" fill="#2b4027" opacity=".55" />
        <path d="M91 240c5-7 14-9 21-5 7 4 9 12 5 18-4 7-14 8-21 3-7-5-8-11-5-16Z" fill="#769152" />
        <path d="M74 168c-8 33-9 73-2 107M160 166c11 34 12 76 2 112" fill="none" stroke="#263d25" strokeWidth="6" strokeLinecap="round" opacity=".6" />
        <path d="M58 176c-8 26-9 59-2 92M174 178c8 28 8 60-1 90" fill="none" stroke="#c8b989" strokeWidth="2" strokeLinecap="round" opacity=".55" />

        {/* neck + head */}
        <path d="M94 143c2-16 13-26 29-26 17 0 28 11 29 28l-2 31H96Z" fill="#e7c6a4" />
        <circle cx="123" cy="98" r="48" fill="#e9c8a6" />
        <path d="M75 94c0-30 19-48 47-48 29 0 48 19 49 49-8-10-16-16-27-18-17-3-36 6-48 19-8 9-14 8-21-2Z" fill="#3c3329" />
        <path d="M76 97c-12 1-19 10-16 20 3 9 12 11 22 7l6-19Z" fill="#e5c29f" />
        <path d="M170 96c12 1 19 10 16 20-3 9-12 12-22 7l-6-19Z" fill="#e5c29f" />
        <path d="M92 121c7 18 20 27 32 27 13 0 25-9 32-26l-4-8c-9 9-17 13-28 13-10 0-19-4-28-13Z" fill="#c9a483" opacity=".38" />

        {/* cap */}
        <path d="M84 76c-3-27 14-49 41-52 28-3 49 15 52 44 1 8-3 15-10 16-23 4-52 4-74-1-6-1-9-3-9-7Z" fill="url(#cap-fill)" />
        <path d="M86 73c29 7 58 7 87 0l3 13c-29 9-62 9-92 1Z" fill="#4a6535" />
        <path d="M88 68c-27 2-48 11-55 25 23 5 42 1 58-12Z" fill="#698747" />
        <path d="M84 78c20 8 46 11 73 8" fill="none" stroke="#a7ba72" strokeWidth="2.4" strokeLinecap="round" opacity=".7" />
        <path d="M132 24c4-10 12-16 24-18-3 10-10 16-20 20" fill="#5a773d" />
        <path d="M102 54c-1-12 6-20 17-22 10-2 19 4 22 15-13 4-26 6-39 7Z" fill="#93ac62" opacity=".55" />

        {/* paper rim light */}
        <path d="M71 84c0-31 22-56 54-60M56 156c-13 27-16 62-8 96M78 323c17-9 35-13 53-9" fill="none" stroke="#f7efd7" strokeWidth="2" strokeLinecap="round" opacity=".35" />
      </g>

      {/* foreground leaves */}
      <g filter="url(#art-shadow)">
        <path d="M0 566c41-36 89-54 143-54-25 31-65 52-119 62Z" fill="#405b31" />
        <path d="M623 560c25-38 61-62 109-70-13 37-42 64-88 79Z" fill="#4d6938" />
        <path d="M681 568c14-22 36-36 66-41-8 24-27 41-57 50Z" fill="#6f8c48" />
      </g>

      {/* mushrooms */}
      <g transform="translate(658 486)" filter="url(#art-shadow)" data-fg="true">
        <path d="M23 48c-2-12 0-21 4-30" fill="none" stroke="#eadfc4" strokeWidth="5" strokeLinecap="round" />
        <path d="M0 22c3-17 12-27 26-27 15 0 24 10 27 27-18 5-36 5-53 0Z" fill="#ae7953" />
        <path d="M6 19c5-11 12-17 20-17 7 0 13 6 16 16-12 3-24 3-36 1Z" fill="#cd9b6e" />
      </g>

      {/* foreground leaves soften the rock cut-out against the forest */}
      <g filter="url(#art-shadow)">
        <path d="M0 470c52-35 102-45 150-28 14 5 25 13 34 24-55 22-106 31-154 29Z" fill="#2a4423" />
        <path d="M0 542c45-20 89-22 132-5 18 7 33 18 45 32-61 14-119 16-174 6Z" fill="#1b311b" />
        <path d="M26 430c20-40 51-66 93-77 4 31-15 60-56 88Z" fill="#3a5a2e" />
        <path d="M0 398c22-25 48-37 78-35-9 24-30 41-62 52Z" fill="#446638" opacity=".9" />
      </g>
    </svg>
  );
}

export function WoodSign({ className = '' }) {
  return (
    <aside className={`wood-sign ${className}`} aria-label="创作关键词：探索、创作、成长">
      <span className="wood-sign__strap" aria-hidden="true" />
      <span className="wood-sign__nail wood-sign__nail--left" aria-hidden="true" />
      <span className="wood-sign__nail wood-sign__nail--right" aria-hidden="true" />
      <svg className="wood-sign__grain" viewBox="0 0 220 310" aria-hidden="true">
        <path d="M12 74c49-16 104-17 170-4M8 132c53-13 120-11 190 2M16 196c53-8 111-5 170 8M22 248c47-8 93-4 148 6" />
        <path d="M40 34c4 84-6 166-20 247M132 28c-3 81 8 168 25 254" />
        <ellipse cx="64" cy="104" rx="9" ry="18" />
        <ellipse cx="151" cy="210" rx="7" ry="14" />
      </svg>

      <svg className="wood-sign__rabbit" viewBox="0 0 60 68" aria-hidden="true">
        <path d="M14 44c-5-11-7-31-3-41 5-12 17-4 18 12 0 9-2 19-5 27" fill="currentColor" />
        <path d="M30 43c3-13 11-31 22-35 11-5 14 8 7 21-6 11-15 19-23 25" fill="currentColor" />
        <path d="M10 42c2-13 11-22 24-22 15 0 25 10 27 25-16 7-35 6-51-3Z" fill="currentColor" />
        <circle cx="24" cy="36" r="2.6" fill="#415032" />
        <circle cx="40" cy="35" r="2.6" fill="#415032" />
        <path d="M30 44c2-1 5-1 6 1-1 3-5 3-6-1Z" fill="#415032" />
      </svg>

      <p>探索<br />创作<br />成长</p>
      <span className="wood-sign__foot">NO. 01 — PYK</span>
    </aside>
  );
}

export function CatPeek({ className = '' }) {
  return (
    <svg className={`cat-peek ${className}`} viewBox="0 0 300 300" aria-hidden="true">
      <defs>
        <radialGradient id="cat-hole" cx="50%" cy="46%" r="60%">
          <stop offset="0%" stopColor="#405b36" />
          <stop offset="100%" stopColor="#162716" />
        </radialGradient>
      </defs>
      <path d="M4 126C18 50 77 2 150 5c78 3 130 53 143 129 12 71-23 126-37 166H33c-20-47-38-103-29-174Z" fill="url(#cat-hole)" />
      <g filter="url(#art-shadow)">
        <path d="M118 138c-18-40-25-84-5-91 20-7 40 30 50 70-14 8-29 15-45 21Z" fill="#f2ead6" />
        <path d="M207 124c10-43 34-76 51-66 17 10 6 55-17 91-11-10-23-18-34-25Z" fill="#f6efdd" />
        <path d="M127 125c-9-25-14-53-4-58 11 21 21 42 30 63" fill="#d5b3a5" opacity=".58" />
        <path d="M221 112c9-27 23-47 32-39 4 14-4 38-15 58" fill="#d5b3a5" opacity=".52" />
        <ellipse cx="169" cy="165" rx="70" ry="61" fill="#f7f0de" />
        <path d="M109 152c17-35 55-47 85-33 22 10 34 32 33 58-26 10-55 5-79-5-18-7-31-13-39-20Z" fill="#e9e0cb" opacity=".62" />
        <circle cx="145" cy="158" r="6" fill="#37402f" />
        <circle cx="193" cy="154" r="6" fill="#37402f" />
        <circle cx="147" cy="155.5" r="2" fill="#fff9ea" />
        <circle cx="195" cy="151.5" r="2" fill="#fff9ea" />
        <path d="M162 176c4-4 12-4 16 0-2 7-13 8-16 0Z" fill="#a17e73" />
        <path d="M170 186c0 7-7 12-14 9M170 186c0 7 7 12 14 9" fill="none" stroke="#6b6558" strokeWidth="2" strokeLinecap="round" />
        <path d="M132 186c-15 1-27 6-37 13M207 181c15 2 27 7 36 15M146 143c-8-1-15-3-21-6M187 140c8-1 15-3 21-7" fill="none" stroke="#cbbfa7" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M102 205c15-14 34-19 53-12 6 2 11 6 15 11-18 12-44 13-68 1Z" fill="#eee5d0" />
        <path d="M211 202c12-11 25-15 39-10 5 2 9 5 12 9-13 10-30 11-51 1Z" fill="#f3ebd7" />
      </g>
      <g fill="#6c8749" filter="url(#art-shadow)">
        <path d="M3 252c24-43 59-67 105-72-15 39-48 69-98 87Z" />
        <path d="M65 299c5-44 23-77 54-99 11 37-4 72-42 104Z" />
        <path d="M226 283c14-37 38-63 73-77 2 32-20 61-64 88Z" />
      </g>
      <g fill="#9bb467" opacity=".9">
        <path d="M29 242c17-26 37-41 60-47-7 24-27 43-57 57Z" />
        <path d="M245 262c12-24 28-39 48-44-4 21-19 37-44 50Z" />
      </g>
    </svg>
  );
}

export function LeafCluster({ className = '', tone = 'dark', flip = false }) {
  const palette =
    tone === 'light'
      ? { back: '#819a58', mid: '#a2b76b', front: '#c3d08f', vein: '#6f864f' }
      : { back: '#1a2c1a', mid: '#304a2b', front: '#476337', vein: '#91a865' };

  return (
    <svg
      className={`leaf-cluster leaf-cluster--${tone} ${flip ? 'leaf-cluster--flip' : ''} ${className}`}
      viewBox="0 0 420 340"
      aria-hidden="true"
    >
      <g filter="url(#art-shadow)">
        <path d="M118 324c-30-66-23-135 22-205 17 29 25 68 22 116-2 36-15 66-44 89Z" fill={palette.back} />
        <path d="M146 312c39-53 93-83 163-91-20 51-64 89-132 113Z" fill={palette.mid} />
        <path d="M154 289c35-26 68-50 102-73-14 30-45 61-91 92Z" fill={palette.back} opacity=".9" />
        <path d="M196 178c-17-45-4-88 38-128 21 42 17 85-12 130-9 6-18 5-26-2Z" fill={palette.front} />
        <path d="M213 170c-3-37 7-68 28-94 2 28-7 59-28 94Z" fill={palette.vein} opacity=".55" />
        <path d="M86 250c-39-23-65-55-77-97 47 6 82 33 106 82-4 9-14 14-29 15Z" fill={palette.mid} />
        <path d="M75 237c-19-17-36-33-53-50 23 7 43 22 61 45Z" fill={palette.vein} opacity=".45" />
        <path d="M257 162c19-45 52-75 99-90-4 47-31 82-82 105-9-1-15-6-17-15Z" fill={palette.mid} />
        <path d="M274 151c20-27 42-46 66-58-10 21-28 42-53 63Z" fill={palette.vein} opacity=".42" />
        <path d="M232 302c39-24 80-27 123-11-26 29-61 43-107 42-9-6-15-17-16-31Z" fill={palette.front} opacity=".88" />
        <path d="M157 320c-10-20-10-39 2-58 14 12 21 28 20 49-8 7-15 10-22 9Z" fill={palette.front} />
      </g>
      <g fill="none" stroke={palette.vein} strokeWidth="2" strokeLinecap="round" opacity=".55">
        <path d="M190 313c-12-40-13-82-3-126M214 296c25-30 53-51 83-65M235 165c3-32 12-57 28-78M92 236c-14-17-27-34-39-52M294 151c18-20 36-34 54-42" />
      </g>
    </svg>
  );
}

export function CanopyEdge({ className = '', flip = false, tone = 'dark' }) {
  const palette =
    tone === 'light'
      ? { a: '#6f8c4b', b: '#93aa61', c: '#b5c783', d: '#7f9754' }
      : { a: '#142516', b: '#233b22', c: '#38552f', d: '#2a4327' };
  return (
    <svg className={`canopy-edge ${flip ? 'canopy-edge--flip' : ''} ${className}`} viewBox="0 0 880 260" aria-hidden="true">
      <g filter="url(#art-shadow)">
        <path d="M0 0h880c-20 41-60 70-116 86-8-26-35-44-71-39-28 4-47 24-52 51-36-21-84-25-127-7-17-32-54-48-96-37-35 9-57 38-60 72-39 4-73 22-101 54-24-24-50-33-80-27-26 5-45 22-55 47-36-3-67 10-92 38L0 214Z" fill={palette.a} />
        <path d="M0 0h880c-55 23-92 48-128 84-20-12-43-11-67 2-16-39-53-62-98-56-42 6-73 35-83 74-33-18-72-17-110 2-17-41-56-62-104-53-44 9-72 39-78 79-33-2-64 12-92 39-25-20-51-25-77-14-24 10-40 30-47 56-31-1-58 11-79 35L0 193Z" fill={palette.b} />
        <path d="M0 0h880c-31 20-60 40-87 65-29-11-58-6-84 13-13-32-42-50-78-47-35 3-59 26-65 58-32-16-68-13-101 9-17-32-48-46-84-38-32 7-54 31-58 63-35 8-63 27-84 55-18-13-38-15-60-5-19 9-30 25-34 47-31 7-54 25-68 52L0 184Z" fill={palette.c} opacity=".92" />
      </g>
      <g fill={palette.d} opacity=".85">
        <path d="M122 38c-24 26-31 57-22 92 27-20 42-49 43-86-7-5-14-7-21-6ZM327 24c-14 34-9 65 14 94 17-30 15-62-5-95-4-1-7-1-9 1ZM564 32c-20 31-22 62-7 94 24-25 32-55 24-91-6-3-11-4-17-3ZM763 43c-9 30 0 57 26 81 9-30-1-58-26-81Z" />
      </g>
    </svg>
  );
}

export function Butterfly({ className = '' }) {
  return (
    <svg className={`paper-butterfly ${className}`} viewBox="0 0 80 72" aria-hidden="true">
      <g filter="url(#art-shadow)">
        <path d="M38 34C24 9 4 3 5 22c1 17 17 23 32 24-10 14-6 28 6 24 9-3 10-17 3-28 12 7 25 1 22-11-3-13-20-13-30 3Z" fill="#f2ead3" />
        <path d="M40 36c8 8 11 18 5 23-7 5-12-5-9-16 5 4 9 5 11 3" fill="#e4d9bd" opacity=".7" />
        <path d="M40 33c-4-11-4-20 0-25 4 7 4 15 0 25Z" fill="#5d7048" />
        <path d="M33 27c-5-6-10-8-13-6M48 26c5-6 10-8 14-6" fill="none" stroke="#cbbd9b" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}


export function PaperDeerScene({ className = '' }) {
  return (
    <svg className={`paper-deer-scene ${className}`} viewBox="0 0 300 380" aria-hidden="true">
      <g filter="url(#art-shadow)">
        <ellipse cx="158" cy="352" rx="108" ry="14" fill="#1a2918" opacity=".28" />

        {/* back ferns */}
        <path d="M34 346c-32-49-25-102 18-158 14 46 8 98-18 158Z" fill="#294526" />
        <path d="M51 342c-4-54 20-96 68-126-6 48-28 90-68 126Z" fill="#36552f" />
        <path d="M262 348c16-58 4-104-36-154-4 54 6 103 36 154Z" fill="#2b4828" />
        <path d="M250 349c23-41 58-63 106-62-31 34-64 57-106 62Z" fill="#3e5e34" />
        <path d="M70 333c-20-28-22-53-6-77 15 20 22 45 18 75Z" fill="#577a42" />
        <path d="M228 329c17-28 43-42 78-41-20 25-46 42-78 41Z" fill="#4b6a3a" opacity=".9" />

        {/* legs */}
        <path d="M119 236l-13 83c-1 7 3 12 9 13 7 1 11-4 12-11l10-78Z" fill="#8d5838" />
        <path d="M143 241l-4 82c0 7 4 11 10 11 6 0 10-5 10-12l1-77Z" fill="#9f6743" />
        <path d="M193 242l7 79c1 7 5 10 11 9 6-1 9-6 8-13l-6-72Z" fill="#9a603d" />
        <path d="M218 234l5 70c1 6 4 9 9 8 5-1 7-5 7-10l-3-64Z" fill="#875336" />
        <path d="M104 321h23l2 11h-27Z" fill="#4e3828" />
        <path d="M150 325h20l2 11h-24Z" fill="#4b3526" />
        <path d="M209 326h21l2 11h-24Z" fill="#4b3526" />
        <path d="M229 314h17l2 10h-21Z" fill="#4b3526" />

        {/* body */}
        <path d="M96 224c3-30 27-49 62-51 31-2 57 14 67 40l6 25c-15 21-45 32-78 29-35-3-59-17-57-43Z" fill="#c98a55" />
        <path d="M111 240c24 14 55 18 88 10 12-3 22-7 29-12-5 15-16 25-32 30-31 9-66 2-85-16Z" fill="#f0dcba" opacity=".92" />
        <path d="M121 218c14-11 35-16 58-14 22 1 38 8 49 20-20-7-37-10-58-9-20 1-36 2-49 3Z" fill="#dca16c" opacity=".55" />

        {/* neck and chest */}
        <path d="M177 218c5-28 14-49 29-63l22 15-13 50-14 17Z" fill="#be7e4c" />
        <path d="M195 214c7-22 15-37 25-46l9 7-14 44Z" fill="#efd6b1" opacity=".9" />

        {/* head */}
        <path d="M207 137c6-19 20-29 37-25 15 3 24 16 22 32l-4 18-25 8-26-10Z" fill="#cb8a56" />
        <path d="M248 141c10 1 18 7 21 15-7 7-17 9-28 5l-5-13Z" fill="#e7c69f" />
        <path d="M264 155c4-1 7 1 8 4-2 3-5 4-9 2Z" fill="#493627" />
        <circle cx="238" cy="144" r="3.4" fill="#2e2b22" />
        <circle cx="237" cy="143" r="1.1" fill="#fff9e9" />

        {/* ears */}
        <path d="M211 122c-9-14-7-27 3-37 10 9 13 23 8 37Z" fill="#b97949" />
        <path d="M209 118c-4-10-3-19 2-27 6 8 7 17 4 27Z" fill="#e8b08a" opacity=".75" />
        <path d="M227 117c1-14 8-25 20-31 3 13-4 26-16 36Z" fill="#d59a68" />

        {/* antlers */}
        <g fill="none" stroke="#83603e" strokeWidth="5" strokeLinecap="round">
          <path d="M218 123c-5-23-3-42 5-59M224 92c8-11 19-17 32-19M219 101c-10-8-20-12-32-11M224 76c-1-12 2-22 9-30" />
        </g>
        <g fill="none" stroke="#a67a4d" strokeWidth="2" strokeLinecap="round" opacity=".55">
          <path d="M220 121c-4-20-2-37 4-52M225 91c7-9 16-15 27-17" />
        </g>

        {/* spots and tail */}
        <g fill="#f4e2c4" opacity=".9">
          <ellipse cx="128" cy="207" rx="6" ry="4" transform="rotate(-18 128 207)" />
          <ellipse cx="145" cy="199" rx="5.2" ry="3.6" transform="rotate(-12 145 199)" />
          <ellipse cx="163" cy="208" rx="6.4" ry="4.2" transform="rotate(-8 163 208)" />
          <ellipse cx="182" cy="200" rx="4.8" ry="3.4" transform="rotate(-20 182 200)" />
          <ellipse cx="119" cy="221" rx="4.4" ry="3" transform="rotate(-24 119 221)" />
        </g>
        <path d="M94 226c-14-8-23-4-26 5 8 8 17 8 27 3Z" fill="#d59a68" />

        {/* bird on antler */}
        <g transform="translate(224 32) rotate(-7)">
          <path d="M4 22c9-12 24-13 34-3 7 8 4 18-7 21-12 4-24-1-29-9Z" fill="#d6814d" />
          <circle cx="36" cy="17" r="8" fill="#d6814d" />
          <path d="M43 17l11 3-11 4Z" fill="#8b5934" />
          <circle cx="37" cy="15" r="1.5" fill="#2d3325" />
          <path d="M14 22c8-8 18-9 25-3-7 6-15 9-25 8Z" fill="#6d8b66" />
          <path d="M4 22L-7 29l4-11Z" fill="#b86a42" />
          <path d="M20 35v10M30 35v10" fill="none" stroke="#6d4b32" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* front ferns and mushrooms */}
        <path d="M31 350c18-23 44-35 77-36-22 26-48 39-77 36ZM271 351c-22-18-49-26-82-22 22 23 49 30 82 22Z" fill="#6c8951" />
        <path d="M78 345c-13-20-11-43 5-70 11 20 10 44-5 70Z" fill="#8ca45f" />
        <path d="M224 348c10-22 26-40 47-52-7 25-23 43-47 52Z" fill="#7d9659" />
        <g transform="translate(64 304)">
          <path d="M12 25c-1-10 4-18 12-23 6 8 7 16 3 24Z" fill="#eedfc2" />
          <path d="M0 27c4-18 18-27 38-22 17 4 25 17 22 33-15 9-33 10-48 3Z" fill="#c97853" />
          <g fill="#f7e8cf">
            <circle cx="16" cy="22" r="3.5" />
            <circle cx="30" cy="18" r="4" />
            <circle cx="44" cy="25" r="3" />
            <circle cx="25" cy="31" r="2.5" />
          </g>
        </g>
        <g transform="translate(238 318) scale(.7)">
          <path d="M11 22c0-9 4-16 11-21 6 7 7 14 3 21Z" fill="#f1e2c6" />
          <path d="M0 24c3-16 16-24 34-20 15 4 22 15 20 29-14 8-30 9-44 3Z" fill="#d18a60" />
          <g fill="#f8ead4"><circle cx="15" cy="19" r="3" /><circle cx="29" cy="16" r="3.5" /><circle cx="39" cy="23" r="2.5" /></g>
        </g>
      </g>
    </svg>
  );
}

export function PaperBird({ className = '', tone = 'amber' }) {
  const palette =
    tone === 'teal'
      ? { body: '#4e7f75', wing: '#8eb6a1', tail: '#315e58', beak: '#d4a56e' }
      : { body: '#d98650', wing: '#5f8270', tail: '#b86b43', beak: '#8b5934' };
  return (
    <svg className={`paper-bird ${className}`} viewBox="0 0 120 92" aria-hidden="true">
      <g filter="url(#art-shadow)">
        <path d="M13 48c15-20 42-24 63-11 9 6 16 8 28 5-6 10-18 15-30 15-15 0-29 4-41 11Z" fill={palette.body} />
        <path d="M31 42c11-12 29-14 42-5-9 9-21 13-37 12Z" fill={palette.wing} />
        <path d="M95 46c6-8 14-10 22-6-6 7-13 10-22 8Z" fill={palette.wing} opacity=".9" />
        <circle cx="91" cy="38" r="12" fill={palette.body} />
        <path d="M102 37l14 4-14 5Z" fill={palette.beak} />
        <circle cx="93" cy="35" r="1.8" fill="#2b3124" />
        <path d="M14 49L0 57l6-15Z" fill={palette.tail} />
        <path d="M47 60v10M65 58v10" fill="none" stroke="#735136" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}
