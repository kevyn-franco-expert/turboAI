export default function CactusIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <path d="M65 130 L70 165 L130 165 L135 130 Z" fill="#D4A373" stroke="#5C3D2E" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="60" y="120" width="80" height="15" rx="3" fill="#C49363" stroke="#5C3D2E" strokeWidth="2.5"/>
      {/* Pot face */}
      <path d="M90 145 Q95 150 100 145" stroke="#5C3D2E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="85" cy="142" rx="2" ry="2" fill="#5C3D2E"/>
      <ellipse cx="115" cy="142" rx="2" ry="2" fill="#5C3D2E"/>
      <ellipse cx="80" cy="148" rx="4" ry="2.5" fill="#FFD6D6" opacity="0.5"/>
      <ellipse cx="120" cy="148" rx="4" ry="2.5" fill="#FFD6D6" opacity="0.5"/>
      {/* Cactus body */}
      <rect x="85" y="50" width="30" height="75" rx="15" fill="#A8D5BA" stroke="#5C3D2E" strokeWidth="2.5"/>
      {/* Left arm */}
      <path d="M85 85 Q65 85 65 70 Q65 55 75 55" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" fill="#A8D5BA"/>
      {/* Right arm */}
      <path d="M115 80 Q135 80 135 65 Q135 50 125 50" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" fill="#A8D5BA"/>
      {/* Cactus face */}
      <path d="M94 70 Q98 74 102 70" stroke="#5C3D2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M108 70 Q112 74 116 70" stroke="#5C3D2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <ellipse cx="98" cy="78" rx="2" ry="2" fill="#5C3D2E"/>
      <path d="M96 82 Q100 86 104 82" stroke="#5C3D2E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="92" cy="76" rx="4" ry="2.5" fill="#FFD6D6" opacity="0.5"/>
      <ellipse cx="118" cy="76" rx="4" ry="2.5" fill="#FFD6D6" opacity="0.5"/>
      {/* Spines */}
      <path d="M85 60 L80 58" stroke="#5C3D2E" strokeWidth="1" strokeLinecap="round"/>
      <path d="M85 75 L80 73" stroke="#5C3D2E" strokeWidth="1" strokeLinecap="round"/>
      <path d="M85 90 L80 88" stroke="#5C3D2E" strokeWidth="1" strokeLinecap="round"/>
      <path d="M115 65 L120 63" stroke="#5C3D2E" strokeWidth="1" strokeLinecap="round"/>
      <path d="M115 80 L120 78" stroke="#5C3D2E" strokeWidth="1" strokeLinecap="round"/>
      <path d="M115 95 L120 93" stroke="#5C3D2E" strokeWidth="1" strokeLinecap="round"/>
      {/* Flower */}
      <circle cx="100" cy="42" r="5" fill="#E07A5F" stroke="#5C3D2E" strokeWidth="1.5"/>
      <circle cx="95" cy="40" r="4" fill="#E07A5F" stroke="#5C3D2E" strokeWidth="1.5"/>
      <circle cx="105" cy="40" r="4" fill="#E07A5F" stroke="#5C3D2E" strokeWidth="1.5"/>
      <circle cx="100" cy="38" r="4" fill="#E07A5F" stroke="#5C3D2E" strokeWidth="1.5"/>
      <circle cx="100" cy="42" r="2.5" fill="#F4D35E"/>
    </svg>
  );
}
