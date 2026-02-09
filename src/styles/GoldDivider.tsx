import React from 'react'
import { chakra } from '@chakra-ui/react'
import type { GoldDividerProps } from '../types/userTypes'

const GoldDivider: React.FC<GoldDividerProps> = ({ width, height = '4px' }) => (
  <chakra.svg
    width={width}
    height={height}
    viewBox="0 0 300 20"
    preserveAspectRatio="none"
    display="block"
    pointerEvents="none"
  >
    <defs>
      <linearGradient id="gold-divider-gradient" x1="0" y1="10" x2="300" y2="10" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4F1C00" />
        <stop offset="12%" stopColor="#9C5305" />
        <stop offset="32%" stopColor="#E0A526" />
        <stop offset="50%" stopColor="#FFE9A1" />
        <stop offset="68%" stopColor="#E0A526" />
        <stop offset="88%" stopColor="#9C5305" />
        <stop offset="100%" stopColor="#4F1C00" />
      </linearGradient>
      <radialGradient
        id="gold-divider-highlight"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(150 6) scale(140 48)"
      >
        <stop offset="0%" stopColor="#FFF5C2" stopOpacity="0.9" />
        <stop offset="45%" stopColor="#FFD46B" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#F0A11A" stopOpacity="0" />
      </radialGradient>
      <clipPath id="gold-divider-clip">
        <path d="M2 10C22 6 72 3 150 3C228 3 278 6 298 10C278 14 228 17 150 17C72 17 22 14 2 10Z" />
      </clipPath>
      <filter id="gold-divider-glow" x="-15%" y="-200%" width="130%" height="500%" colorInterpolationFilters="sRGB">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g clipPath="url(#gold-divider-clip)" filter="url(#gold-divider-glow)">
      <rect width="300" height="20" fill="url(#gold-divider-gradient)" opacity="0.95" />
      <rect width="300" height="20" fill="url(#gold-divider-highlight)" />
    </g>
  </chakra.svg>
);
export default GoldDivider;
