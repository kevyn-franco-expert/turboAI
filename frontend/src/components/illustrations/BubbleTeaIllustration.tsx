export default function BubbleTeaIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Steam */}
      <path d="M85 40 Q90 30 85 20" stroke="#8B6F5C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M100 35 Q105 25 100 15" stroke="#8B6F5C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      <path d="M115 40 Q120 30 115 20" stroke="#8B6F5C" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      {/* Straw */}
      <line x1="115" y1="55" x2="125" y2="25" stroke="#5C3D2E" strokeWidth="3" strokeLinecap="round"/>
      <line x1="123" y1="30" x2="127" y2="20" stroke="#E07A5F" strokeWidth="3" strokeLinecap="round"/>
      {/* Cup body */}
      <path d="M65 55 L75 145 Q75 155 85 155 L115 155 Q125 155 125 145 L135 55 Z" fill="#F9E4B7" stroke="#5C3D2E" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Lid */}
      <rect x="60" y="45" width="80" height="12" rx="4" fill="#E8D5A3" stroke="#5C3D2E" strokeWidth="2.5"/>
      <ellipse cx="100" cy="45" rx="40" ry="6" fill="#F9E4B7" stroke="#5C3D2E" strokeWidth="2"/>
      {/* Handle */}
      <path d="M135 75 Q155 75 155 95 Q155 115 130 115" stroke="#5C3D2E" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      {/* Face */}
      <path d="M90 95 Q95 100 100 95" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M105 95 Q110 100 115 95" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <ellipse cx="97" cy="105" rx="2.5" ry="2.5" fill="#5C3D2E"/>
      <path d="M95 110 Q100 115 105 110" stroke="#5C3D2E" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <ellipse cx="88" cy="102" rx="5" ry="3" fill="#FFD6D6" opacity="0.5"/>
      <ellipse cx="117" cy="102" rx="5" ry="3" fill="#FFD6D6" opacity="0.5"/>
      {/* Bubbles / Tapioca */}
      <circle cx="90" cy="135" r="5" fill="#5C3D2E" opacity="0.85"/>
      <circle cx="105" cy="140" r="5.5" fill="#5C3D2E" opacity="0.85"/>
      <circle cx="118" cy="132" r="5" fill="#5C3D2E" opacity="0.85"/>
      <circle cx="95" cy="125" r="4.5" fill="#5C3D2E" opacity="0.85"/>
      <circle cx="112" cy="122" r="4" fill="#5C3D2E" opacity="0.85"/>
      <circle cx="85" cy="145" r="5" fill="#5C3D2E" opacity="0.85"/>
      <circle cx="120" cy="145" r="4.5" fill="#5C3D2E" opacity="0.85"/>
      {/* Small decorative bubbles around */}
      <circle cx="70" cy="165" r="3" fill="#8B6F5C" opacity="0.3"/>
      <circle cx="130" cy="170" r="2.5" fill="#8B6F5C" opacity="0.3"/>
      <circle cx="140" cy="160" r="2" fill="#8B6F5C" opacity="0.3"/>
    </svg>
  );
}
