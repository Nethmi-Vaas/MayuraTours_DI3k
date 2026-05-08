export default function PeacockLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central large feather */}
      <g transform="translate(40, 50)">
        <ellipse cx="0" cy="-25" rx="12" ry="18" fill="#1a6b5c" />
        <ellipse cx="0" cy="-27" rx="9" ry="14" fill="#2d8bb3" />
        <ellipse cx="0" cy="-29" rx="6" ry="9" fill="#c9a227" />
        <ellipse cx="0" cy="-30" rx="3.5" ry="5" fill="#0f3d4c" />
        <path d="M0 0 Q0 -10 0 -10" stroke="#8B7355" strokeWidth="2" />
      </g>

      {/* Left feather */}
      <g transform="translate(20, 55) rotate(-25)">
        <ellipse cx="0" cy="-20" rx="10" ry="15" fill="#1a6b5c" />
        <ellipse cx="0" cy="-22" rx="7" ry="11" fill="#2d8bb3" />
        <ellipse cx="0" cy="-24" rx="5" ry="7" fill="#c9a227" />
        <ellipse cx="0" cy="-25" rx="3" ry="4" fill="#0f3d4c" />
      </g>

      {/* Right feather */}
      <g transform="translate(60, 55) rotate(25)">
        <ellipse cx="0" cy="-20" rx="10" ry="15" fill="#1a6b5c" />
        <ellipse cx="0" cy="-22" rx="7" ry="11" fill="#2d8bb3" />
        <ellipse cx="0" cy="-24" rx="5" ry="7" fill="#c9a227" />
        <ellipse cx="0" cy="-25" rx="3" ry="4" fill="#0f3d4c" />
      </g>

      {/* Far left small feather */}
      <g transform="translate(8, 62) rotate(-45)">
        <ellipse cx="0" cy="-15" rx="7" ry="11" fill="#1a6b5c" />
        <ellipse cx="0" cy="-16" rx="5" ry="8" fill="#2d8bb3" />
        <ellipse cx="0" cy="-17" rx="3.5" ry="5" fill="#c9a227" />
        <ellipse cx="0" cy="-18" rx="2" ry="3" fill="#0f3d4c" />
      </g>

      {/* Far right small feather */}
      <g transform="translate(72, 62) rotate(45)">
        <ellipse cx="0" cy="-15" rx="7" ry="11" fill="#1a6b5c" />
        <ellipse cx="0" cy="-16" rx="5" ry="8" fill="#2d8bb3" />
        <ellipse cx="0" cy="-17" rx="3.5" ry="5" fill="#c9a227" />
        <ellipse cx="0" cy="-18" rx="2" ry="3" fill="#0f3d4c" />
      </g>

      {/* Stem/base */}
      <path
        d="M40 55 Q40 75 40 90"
        stroke="#8B7355"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M40 55 Q30 65 20 72"
        stroke="#8B7355"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M40 55 Q50 65 60 72"
        stroke="#8B7355"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}
