const C = {
  deep: '#0b4d57',
  teal: '#0d7477',
  aqua: '#2ea7a0',
  mint: '#8ccfb3',
  gold: '#f0b94f',
  amber: '#e78a3d',
  coral: '#e75e4b',
  red: '#c74046',
  magenta: '#b93d72',
  plum: '#5b3a6c',
  violet: '#755088',
  cream: '#f7e7c7',
  lime: '#9cbb5f',
};

function Leaf({ x, y, size = 1, rotate = 0, fill = C.teal, vein = C.cream, flip = false, opacity = 1 }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -size : size} ${size})`}
      opacity={opacity}
    >
      <path d="M0 0C24-37 82-45 126-3C82 40 24 37 0 0Z" fill={fill} />
      <path d="M8 0C44-29 82-34 116-8" fill="none" stroke={vein} strokeWidth="1.7" opacity=".42" />
      <path d="M8 0C44 29 82 34 116 8" fill="none" stroke={vein} strokeWidth="1.7" opacity=".26" />
      <path d="M10 1C47-2 83-1 119 0" fill="none" stroke={vein} strokeWidth="1.3" opacity=".5" />
    </g>
  );
}

function SmallLeaf({ x, y, size = 1, rotate = 0, fill = C.aqua, flip = false }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -size : size} ${size})`}>
      <path d="M0 0C15-25 54-30 82-2C54 27 15 24 0 0Z" fill={fill} opacity=".94" />
      <path d="M5 0C30-20 55-22 75-6" fill="none" stroke={C.cream} strokeWidth="1.3" opacity=".3" />
    </g>
  );
}

function Tree({ flip = false }) {
  return (
    <g transform={flip ? 'translate(1920 0) scale(-1 1)' : undefined}>
      <path
        d="M-28 1080C34 872 84 715 224 574C173 708 156 844 179 977C185 1018 189 1050 188 1080Z"
        fill="#352348"
      />
      <path
        d="M160 790C260 699 348 631 458 570"
        fill="none"
        stroke="#4b2f5e"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M260 655C342 610 402 563 453 494"
        fill="none"
        stroke="#4b2f5e"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M95 908C46 849 17 791 0 717"
        fill="none"
        stroke="#3f2952"
        strokeWidth="17"
        strokeLinecap="round"
      />
      <path d="M40 1004C111 946 171 891 226 818" fill="none" stroke="#492e5a" strokeWidth="9" strokeLinecap="round" />
    </g>
  );
}

const backLeaves = [
  [80, 150, 1.45, -25, C.deep, false],
  [200, 85, 1.1, 16, C.plum, true],
  [1320, 70, 1.3, -12, C.deep, true],
  [1430, 170, 1.2, 22, C.teal, false],
  [1570, 90, 1.55, -22, C.plum, false],
  [1670, 280, 1.25, 108, C.deep, true],
  [60, 490, 1.55, 64, C.teal, false],
  [1880, 540, 1.65, 152, C.deep, true],
  [330, 1010, 1.15, -52, C.plum, false],
  [1690, 1015, 1.3, 215, C.teal, true],
];

const midLeaves = [
  [-20, 180, 1.2, -40, C.magenta, false],
  [35, 360, 0.9, 27, C.coral, true],
  [5, 540, 1.25, 74, C.amber, false],
  [55, 720, 0.85, -12, C.gold, true],
  [10, 900, 1.0, 118, C.magenta, false],
  [145, 1005, 0.85, 38, C.teal, false],
  [1875, 250, 1.3, 152, C.teal, true],
  [1770, 585, 0.9, -36, C.coral, false],
  [1855, 420, 1.15, 208, C.gold, true],
  [1850, 720, 1.1, 32, C.magenta, false],
  [1800, 880, 1.2, 142, C.amber, true],
  [1690, 1005, 0.9, -22, C.teal, false],
];

const frontLeaves = [
  [-20, 1030, 1.8, -24, C.teal, false],
  [115, 1100, 1.5, 18, C.magenta, true],
  [245, 1028, 1.25, -52, C.coral, false],
  [230, 1180, 1.7, 32, C.amber, true],
  [1490, 1130, 1.9, 200, C.teal, true],
  [1650, 1040, 1.4, 158, C.gold, false],
  [1780, 1150, 1.8, -28, C.magenta, true],
  [1875, 1010, 1.4, -44, C.coral, false],
  [520, 1135, 1.1, 9, C.lime, false],
  [1260, 1150, 1.2, 172, C.lime, true],
];

const bloomLeaves = [
  [390, 330, 0.75, -55, C.gold, false],
  [445, 490, 0.55, 38, C.coral, true],
  [1480, 410, 0.7, 155, C.amber, true],
  [1390, 590, 0.55, -20, C.mint, false],
  [950, 160, 0.5, 22, C.magenta, true],
  [1040, 900, 0.6, 130, C.teal, false],
  [830, 850, 0.45, -60, C.gold, true],
  [1570, 640, 0.55, 35, C.coral, false],
  [310, 780, 0.5, 150, C.teal, true],
  [620, 690, 0.42, -15, C.aqua, false],
];

function Scatter({ items, shadowLayer }) {
  return (
    <g filter={`url(#bird-shadow-${shadowLayer})`}>
      {items.map(([x, y, size, rotate, fill, flip], index) => (
        <Leaf
          key={`${x}-${y}-${index}`}
          x={x}
          y={y}
          size={size}
          rotate={rotate}
          fill={fill}
          flip={flip}
          vein={C.cream}
        />
      ))}
    </g>
  );
}

export default function BirdFoliageLayer({ layer = 'mid' }) {
  const isBack = layer === 'back';
  const isFront = layer === 'front';
  const isBloom = layer === 'bloom';
  const content = isBack ? backLeaves : isFront ? frontLeaves : isBloom ? bloomLeaves : midLeaves;

  return (
    <svg
      className={`bird-foliage bird-foliage--${layer}`}
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id={`bird-shadow-${layer}`}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#031517" floodOpacity="0.42" />
        </filter>
      </defs>

      {isBack && (
        <g filter={`url(#bird-shadow-${layer})`}>
          <Tree />
          <Tree flip />
          <path
            d="M1920 240C1680 220 1510 300 1380 430C1540 380 1740 390 1920 430Z"
            fill="#432b59"
            opacity=".9"
          />
          <path d="M0 270C180 210 330 235 470 340C320 310 150 330 0 390Z" fill="#392648" opacity=".9" />
        </g>
      )}

      <Scatter items={content} shadowLayer={layer} />

      {isFront && (
        <g filter={`url(#bird-shadow-${layer})`}>
          <path
            d="M0 1080C185 1045 330 980 445 865C360 1030 315 1080 305 1080Z"
            fill="#5d3b6d"
          />
          <path
            d="M1920 1080C1740 1035 1600 965 1490 850C1585 1000 1650 1075 1680 1080Z"
            fill="#5d3b6d"
          />
          <SmallLeaf x={355} y={955} size={1.5} rotate={-34} fill={C.gold} flip />
          <SmallLeaf x={420} y={1008} size={1.1} rotate={15} fill={C.coral} />
          <SmallLeaf x={1500} y={968} size={1.35} rotate={200} fill={C.gold} />
          <SmallLeaf x={1440} y={1020} size={1.1} rotate={-24} fill={C.coral} flip />
        </g>
      )}

      {isBloom && (
        <g filter={`url(#bird-shadow-${layer})`}>
          <circle cx="390" cy="330" r="7" fill={C.gold} opacity=".8" />
          <circle cx="1480" cy="410" r="5" fill={C.mint} opacity=".7" />
          <circle cx="950" cy="160" r="4" fill={C.cream} opacity=".8" />
          <circle cx="1570" cy="640" r="3" fill={C.gold} opacity=".7" />
        </g>
      )}
    </svg>
  );
}
