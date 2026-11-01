import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './Icons.jsx';

export default function CopyValue({ value, label, className = '' }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const input = document.createElement('textarea');
      input.value = value;
      input.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <button
      type="button"
      className={`copy-value ${copied ? 'is-copied' : ''} ${className}`.trim()}
      onClick={copy}
      aria-label={`复制${label} ${value}`}
      data-tooltip={copied ? '已复制' : '点击复制'}
    >
      <span>{value}</span>
      <span className="copy-value__icon" aria-hidden="true">
        {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
      </span>
      <span className="sr-only" role="status">
        {copied ? `${label}已复制` : ''}
      </span>
    </button>
  );
}
