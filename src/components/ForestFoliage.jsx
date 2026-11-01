const C = {
  deep: '#172f1d',
  pine: '#24452a',
  moss: '#3f6537',
  fern: '#5e8248',
  leaf: '#87a65b',
  lime: '#b7c97b',
  cream: '#eef0cf',
  gold: '#d8bd76',
};

function Leaf({ x, y, size = 1, rotate = 0, fill = C.fern, vein = C.cream, flip = false, opacity = 1 }) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -size : size} ${size})`}
      opacity={opacity}
    >
      <path d="M0 0C31-51 108-63 166-4C108 56 31 51 0 0Z" fill={fill} />
      <path d="M10 0C55-37 110-43 151-10" fill="none" stroke={vein} strokeWidth="1.8" opacity=".38" />
      <path d="M10 0C55 37 110 43 151 10" fill="none" stroke={vein} strokeWidth="1.8" opacity=".2" />
      <path d="M12 1C62-3 108-2 154 0" fill="none" stroke={vein} strokeWidth="1.4" opacity=".44" />
    </g>
  );
}

const canopyLeaves = [
  [-75, 55, 0.9, -20, C.deep, false],
  [30, 20, 0.62, 12, C.pine, true],
  [1750, -5, 0.7, -16, C.pine, true],
  [1860, 42, 0.92, 22, C.deep, false],
  [1965, 120, 0.72, 28, C.moss, true],
];

const leftLeaves = [
  [-95, 250, 0.74, 44, C.deep, false],
  [-48, 400, 0.58, -14, C.moss, true],
  [-82, 545, 0.66, 70, C.pine, false],
  [-38, 690, 0.5, 28, C.fern, true],
  [-90, 830, 0.7, 104, C.deep, false],
  [-30, 955, 0.52, 50, C.moss, true],
];

const rightLeaves = [
  [1970, 220, 0.72, 160, C.pine, true],
  [1870, 380, 0.5, -18, C.deep, false],
  [1975, 530, 0.66, 190, C.moss, true],
  [1885, 690, 0.48, 12, C.fern, false],
  [1950, 840, 0.66, 160, C.deep, true],
  [1850, 960, 0.5, 200, C.moss, false],
];

const floorLeaves = [
  [-55, 1075, 0.75, -22, C.pine, false],
  [75, 1120, 0.56, 12, C.moss, true],
  [200, 1125, 0.4, -55, C.deep, false],
  [1680, 1125, 0.4, 34, C.fern, true],
  [1810, 1090, 0.62, 208, C.deep, true],
  [1970, 1045, 0.78, -45, C.pine, false],
];

const bloomLeaves = [
  [370, 390, 0.5, -38, C.gold, false],
  [500, 720, 0.42, 22, C.lime, true],
  [660, 930, 0.38, 68, C.cream, false],
  [1320, 460, 0.4, -14, C.lime, true],
  [1380, 810, 0.34, 42, C.gold, false],
  [1580, 430, 0.38, 30, C.cream, true],
  [1180, 230, 0.32, -55, C.lime, false],
];

function Scatter({ items, layer }) {
  return (
    <g>
      {items.map(([x, y, size, rotate, fill, flip], index) => (
        <Leaf
          key={`${layer}-${x}-${y}-${index}`}
          x={x}
          y={y}
          size={size}
          rotate={rotate}
          fill={fill}
          flip={flip}
        />
      ))}
    </g>
  );
}

export default function ForestFoliageLayer({ layer = 'left' }) {
  const content = layer === 'canopy'
    ? canopyLeaves
    : layer === 'right'
      ? rightLeaves
      : layer === 'floor'
        ? floorLeaves
        : layer === 'bloom'
          ? bloomLeaves
          : leftLeaves;

  return (
    <svg
      className={`forest-foliage forest-foliage--${layer}`}
      viewBox="0 0 1920 1080"
      preserveAspectRatio={
        layer === 'left'
          ? 'xMinYMid slice'
          : layer === 'right'
            ? 'xMaxYMid slice'
            : layer === 'canopy'
              ? 'xMidYMin slice'
              : layer === 'floor'
                ? 'xMidYMax slice'
                : 'xMidYMid slice'
      }
      aria-hidden="true"
      focusable="false"
    >
      <Scatter items={content} layer={layer} />

      {layer === 'bloom' && (
        <g className="forest-bloom-dots">
          <circle cx="520" cy="420" r="4" fill={C.cream} opacity=".85" />
          <circle cx="1180" cy="560" r="3" fill={C.gold} opacity=".8" />
          <circle cx="1450" cy="330" r="5" fill={C.cream} opacity=".7" />
          <circle cx="820" cy="880" r="3" fill={C.gold} opacity=".7" />
        </g>
      )}
    </svg>
  );
}
