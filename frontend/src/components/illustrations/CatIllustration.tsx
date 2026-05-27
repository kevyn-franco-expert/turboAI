export default function CatIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="100" cy="110" rx="55" ry="35" fill="#FFF8F0" stroke="#5C3D2E" strokeWidth="2.5"/>
      {/* Black spots */}
      <ellipse cx="75" cy="100" rx="10" ry="8" fill="#3D2B1F" opacity="0.9"/>
      <ellipse cx="125" cy="115" rx="8" ry="6" fill="#3D2B1F" opacity="0.9"/>
      <ellipse cx="95" cy="130" rx="12" ry="7" fill="#3D2B1F" opacity="0.9"/>
      {/* Head */}
      <circle cx="100" cy="70" r="30" fill="#FFF8F0" stroke="#5C3D2E" strokeWidth="2.5"/>
      {/* Ears */}
      <path d="M78 52 L72 30 L92 48 Z" fill="#FFF8F0" stroke="#5C3D2E" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M122 52 L128 30 L108 48 Z" fill="#FFF8F0" stroke="#5C3D2E" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Ear inner */}
      <path d="M79 48 L76 36 L88 46 Z" fill="#FFD6D6"/>
      <path d="M121 48 L124 36 L112 46 Z" fill="#FFD6D6"/>
      {/* Eyes closed */}
      <path d="M88 68 Q92 72 96 68" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M104 68 Q108 72 112 68" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* Nose */}
      <ellipse cx="100" cy="76" rx="3" ry="2" fill="#5C3D2E"/>
      {/* Mouth */}
      <path d="M97 80 Q100 83 103 80" stroke="#5C3D2E" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* Cheeks */}
      <ellipse cx="85" cy="76" rx="5" ry="3" fill="#FFD6D6" opacity="0.6"/>
      <ellipse cx="115" cy="76" rx="5" ry="3" fill="#FFD6D6" opacity="0.6"/>
      {/* Paws up */}
      <ellipse cx="70" cy="105" rx="8" ry="6" fill="#FFF8F0" stroke="#5C3D2E" strokeWidth="2"/>
      <ellipse cx="130" cy="105" rx="8" ry="6" fill="#FFF8F0" stroke="#5C3D2E" strokeWidth="2"/>
      {/* Tail */}
      <path d="M145 110 Q165 100 160 80 Q155 65 170 70" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="170" cy="70" rx="6" ry="8" fill="#3D2B1F" opacity="0.9"/>
      {/* Zzz */}
      <text x="135" y="45" fontFamily="sans-serif" fontSize="14" fill="#8B6F5C">z</text>
      <text x="142" y="38" fontFamily="sans-serif" fontSize="10" fill="#8B6F5C">z</text>
    </svg>
  );
}
