const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function ArrowUpRight({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M6.5 17.5 17.5 6.5M8 6.5h9.5V16" {...strokeProps} />
    </svg>
  );
}

export function ArrowRight({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 12h15.5M13.5 6 20 12l-6.5 6" {...strokeProps} />
    </svg>
  );
}

export function ArrowLeft({ size = 18, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M20 12H4.5M10.5 6 4 12l6.5 6" {...strokeProps} />
    </svg>
  );
}

export function ArrowDown({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 4v15.5M6 13.5 12 20l6-6.5" {...strokeProps} />
    </svg>
  );
}

export function ChevronRight({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m9 5 7 7-7 7" {...strokeProps} />
    </svg>
  );
}

export function MailIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.4" {...strokeProps} />
      <path d="m4.2 7 7.8 6 7.8-6" {...strokeProps} />
    </svg>
  );
}

export function WechatIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M10.1 4.2c-4 0-7 2.7-7 6 0 1.9 1 3.6 2.7 4.7l-.7 2.5 2.7-1.3c.7.2 1.5.3 2.3.3.5 0 1 0 1.5-.1"
        {...strokeProps}
      />
      <path
        d="M13.1 9.4c-3.5 0-6.2 2.4-6.2 5.3 0 1.7.9 3.2 2.4 4.2l-.5 2.1 2.4-1.1c.6.2 1.2.2 1.9.2 3.5 0 6.2-2.4 6.2-5.4 0-2.9-2.7-5.3-6.2-5.3Z"
        {...strokeProps}
      />
      <circle cx="8" cy="9.3" r=".8" fill="currentColor" />
      <circle cx="12.2" cy="9.3" r=".8" fill="currentColor" />
      <circle cx="11.2" cy="14.2" r=".7" fill="currentColor" />
      <circle cx="15.1" cy="14.2" r=".7" fill="currentColor" />
    </svg>
  );
}

export function PinIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M19.3 10.2c0 5.1-7.3 10.1-7.3 10.1S4.7 15.3 4.7 10.2a7.3 7.3 0 1 1 14.6 0Z" {...strokeProps} />
      <circle cx="12" cy="10.2" r="2.6" {...strokeProps} />
    </svg>
  );
}

export function CapIcon({ size = 22, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m2.8 9.2 9.2-5 9.2 5-9.2 5-9.2-5Z" {...strokeProps} />
      <path d="M6.2 11.1v4c0 1.5 2.6 2.7 5.8 2.7s5.8-1.2 5.8-2.7v-4M21 9.5v5.8" {...strokeProps} />
    </svg>
  );
}

export function FolderIcon({ size = 22, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M3.2 6.9c0-1 .8-1.8 1.8-1.8h4l1.7 2h8.3c1 0 1.8.8 1.8 1.8v8.9c0 1-.8 1.8-1.8 1.8H5c-1 0-1.8-.8-1.8-1.8V6.9Z"
        {...strokeProps}
      />
      <path d="M4 10.1h16" {...strokeProps} />
    </svg>
  );
}

export function SparkleIcon({ size = 22, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 3.2c.5 4 2.3 5.8 6.2 6.3-3.9.5-5.7 2.3-6.2 6.3-.5-4-2.3-5.8-6.2-6.3 3.9-.5 5.7-2.3 6.2-6.3Z" {...strokeProps} />
      <path d="M18.5 14.4c.2 1.7 1 2.5 2.7 2.7-1.7.2-2.5 1-2.7 2.7-.2-1.7-1-2.5-2.7-2.7 1.7-.2 2.5-1 2.7-2.7ZM5.3 2.4c.1 1 .6 1.5 1.6 1.6-1 .1-1.5.6-1.6 1.6-.1-1-.6-1.5-1.6-1.6 1-.1 1.5-.6 1.6-1.6Z" {...strokeProps} />
    </svg>
  );
}

export function TrophyIcon({ size = 22, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M8 4.2h8v4.4a4 4 0 0 1-8 0V4.2Z" {...strokeProps} />
      <path d="M8 6H4.7v1.2a3.4 3.4 0 0 0 3.4 3.4M16 6h3.3v1.2a3.4 3.4 0 0 1-3.4 3.4M12 12.6v4M8.4 20h7.2M9.4 16.6h5.2" {...strokeProps} />
    </svg>
  );
}

export function CalendarIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3.2" y="5.2" width="17.6" height="15.2" rx="2.3" {...strokeProps} />
      <path d="M7.8 3.2v4M16.2 3.2v4M3.4 9.5h17.2M8 13.2h.1M12 13.2h.1M16 13.2h.1M8 16.7h.1M12 16.7h.1" {...strokeProps} />
    </svg>
  );
}

export function BookIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 5.5c1.6-.8 4-.8 6 0 1 .4 1.6 1 1.8 1.6V20c-.7-.7-2-1.2-3.5-1.2-1.6 0-3.1.4-4.3 1.2V5.5ZM20 5.5c-1.6-.8-4-.8-6 0-1 .4-1.6 1-1.8 1.6V20c.7-.7 2-1.2 3.5-1.2 1.6 0 3.1.4 4.3 1.2V5.5Z" {...strokeProps} />
    </svg>
  );
}

export function CopyIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="8" y="8" width="11.5" height="11.5" rx="2" {...strokeProps} />
      <path d="M16 8V6.4c0-1.1-.9-2-2-2H6.4c-1.1 0-2 .9-2 2V14c0 1.1.9 2 2 2H8" {...strokeProps} />
    </svg>
  );
}

export function CheckIcon({ size = 16, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="m4.5 12.5 5 5L20 6.8" {...strokeProps} />
    </svg>
  );
}

export function MouseIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="7" y="2.8" width="10" height="18.4" rx="5" {...strokeProps} />
      <path d="M12 6v3.4" {...strokeProps} />
    </svg>
  );
}

export function BrandMark({ size = 36, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true" {...props}>
      <path
        d="M22 38V17.5M22 26.3c-4.8 0-8.7-3.6-9.2-8.4 4.9-.1 8.8 3.1 9.2 8.4ZM22 20.3c.3-5.1 3.7-8.8 8.8-9.2.2 5-3.2 8.8-8.8 9.2ZM22 32.7c-3.9 0-7-2.8-7.4-6.7 4 0 7.1 2.5 7.4 6.7Z"
        fill="currentColor"
        opacity=".96"
      />
      <path d="M13.3 31.2c2-1.3 4-1.9 6.1-1.9M30.8 24.1c-1.7 2.1-2.9 4.2-3.5 6.4" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

export function Sprig({ size = 46, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 52" aria-hidden="true" {...props}>
      <path d="M22 49V9" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M21.8 18.1C13.7 18 8.2 13 7.3 5c7.9.2 13.3 5.3 14.5 13.1ZM22.2 28.2c7.5-.1 12.7-4.8 13.6-12.1-7.2.2-12.3 4.8-13.6 12.1ZM21.9 38c-6.4-.1-10.9-4-11.7-10.3 6.3.1 10.8 4.1 11.7 10.3ZM22.2 9.8C22.8 4.8 26 1.5 31 1c0 4.7-2.9 8-8.8 8.8Z" fill="currentColor" />
    </svg>
  );
}

export function PaperPlane({ size = 92, ...props }) {
  return (
    <svg width={size} height={size * 0.58} viewBox="0 0 100 58" aria-hidden="true" {...props}>
      <path d="M2.5 31.8 94 3 69.8 53.2 48.6 38.7 35.9 50l-1.5-16.6L2.5 31.8Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M34.4 33.4 69.8 53.2 56.7 29.6M69.8 53.2 94 3" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" opacity=".72" />
      <path d="M8 47.8c-1.8 2.2-3.1 4.8-3.8 7.7M20.8 49.5c-1 1.4-1.8 3-2.3 4.8" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity=".52" />
    </svg>
  );
}
