import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  // Determine dimensions based on size prop
  const dimensions = {
    sm: { iconWidth: 28, iconHeight: 28, fontSize: 'text-lg', subSize: 'text-[7px]' },
    md: { iconWidth: 42, iconHeight: 42, fontSize: 'text-2xl', subSize: 'text-[9px]' },
    lg: { iconWidth: 64, iconHeight: 64, fontSize: 'text-4xl', subSize: 'text-xs' },
    xl: { iconWidth: 96, iconHeight: 96, fontSize: 'text-6xl', subSize: 'text-base' }
  }[size];

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Icon portion resembling the uploaded gold & silver logo */}
      <svg
        width={dimensions.iconWidth}
        height={dimensions.iconHeight}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_15px_rgba(234,179,8,0.2)]"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </linearGradient>
          
          {/* Silver Gradient */}
          <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Monogram Background elements */}
        {/* Left 'N' leg (Gold, triangular arrow pointing right/up) */}
        <path
          d="M30 40 L90 110 L90 145 L30 180 Z"
          fill="url(#gold-grad)"
        />
        
        {/* Middle diagonal connector connecting to left leg */}
        <path
          d="M30 40 L110 115 L110 90 L50 30 Z"
          fill="url(#gold-grad)"
          opacity="0.9"
        />

        {/* Right 'N' leg (Silver, metallic) */}
        <path
          d="M170 180 L110 110 L110 75 L170 40 Z"
          fill="url(#silver-grad)"
        />
        
        {/* Connection bridge of N (Silver) */}
        <path
          d="M110 110 L50 180 L75 180 L130 115 Z"
          fill="url(#silver-grad)"
        />

        {/* Pickaxe Head (Gold, curved overlay crossing top of N) */}
        {/* Handle */}
        <path
          d="M80 135 L145 65 L155 75 L90 145 Z"
          fill="url(#gold-grad)"
        />
        {/* Curved pickaxe metal tip */}
        <path
          d="M80 40 Q130 45 180 110 Q145 75 110 75 Q115 50 80 40"
          fill="url(#gold-grad)"
          filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.5))"
        />
      </svg>

      {/* Text Branding portion */}
      {showText && (
        <div className="flex flex-col leading-none font-display">
          <div className="flex items-center">
            {/* NEXA Text with stylized 'X' like the brand image */}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-amber-200 tracking-wider">
              NEX
            </span>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-slate-100 to-slate-300 tracking-wider">
              A
            </span>
          </div>
          <div className={`flex items-center justify-between text-yellow-500 font-bold tracking-[0.25em] ${dimensions.subSize} uppercase mt-1`}>
            <span className="h-[1px] w-3 bg-yellow-500/50 block"></span>
            <span>MINING</span>
            <span className="h-[1px] w-3 bg-yellow-500/50 block"></span>
          </div>
        </div>
      )}
    </div>
  );
}
