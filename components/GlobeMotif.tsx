export default function GlobeMotif({ size = 92 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="37" stroke="#caa155" strokeWidth="1.4" opacity="0.9" />
      <ellipse cx="50" cy="50" rx="14" ry="37" stroke="#caa155" strokeWidth="1" opacity="0.5" />
      <ellipse cx="50" cy="50" rx="37" ry="13" stroke="#caa155" strokeWidth="1" opacity="0.35" />
      <path d="M30,72 Q48,52 68,26" stroke="#caa155" strokeWidth="1.4" strokeDasharray="3 3" opacity="0.9" />
      {/* Southern Cross */}
      <circle cx="30" cy="66" r="1.7" fill="#caa155" />
      <circle cx="34.5" cy="72.5" r="1.7" fill="#caa155" />
      <circle cx="25" cy="74" r="1.7" fill="#caa155" />
      <circle cx="31" cy="79.5" r="1.7" fill="#caa155" />
      <circle cx="28.7" cy="71" r="1" fill="#caa155" />
      {/* Star ring */}
      <circle cx="75" cy="26" r="1.5" fill="#caa155" />
      <circle cx="72.95" cy="21.05" r="1.5" fill="#caa155" />
      <circle cx="68" cy="19" r="1.5" fill="#caa155" />
      <circle cx="63.05" cy="21.05" r="1.5" fill="#caa155" />
      <circle cx="61" cy="26" r="1.5" fill="#caa155" />
      <circle cx="63.05" cy="30.95" r="1.5" fill="#caa155" />
      <circle cx="68" cy="33" r="1.5" fill="#caa155" />
      <circle cx="72.95" cy="30.95" r="1.5" fill="#caa155" />
    </svg>
  );
}
