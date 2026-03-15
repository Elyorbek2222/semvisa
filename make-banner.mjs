import sharp from 'sharp'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
  <!-- Background -->
  <rect width="640" height="360" fill="#0F1115"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="640" height="3" fill="#C2D100"/>

  <!-- Hexagon decoration left -->
  <path d="M80 100 L120 77 L160 100 L160 146 L120 169 L80 146 Z" stroke="#C2D100" stroke-width="1.5" fill="none" opacity="0.3"/>
  <path d="M96 109 L120 96 L144 109 L144 137 L120 150 L96 137 Z" fill="#C2D100" fill-opacity="0.08"/>

  <!-- Hexagon decoration right -->
  <path d="M490 190 L530 167 L570 190 L570 236 L530 259 L490 236 Z" stroke="#C2D100" stroke-width="1.5" fill="none" opacity="0.2"/>

  <!-- Small dots pattern -->
  <circle cx="480" cy="80" r="2" fill="#C2D100" opacity="0.4"/>
  <circle cx="500" cy="80" r="2" fill="#C2D100" opacity="0.4"/>
  <circle cx="520" cy="80" r="2" fill="#C2D100" opacity="0.4"/>
  <circle cx="490" cy="96" r="2" fill="#C2D100" opacity="0.3"/>
  <circle cx="510" cy="96" r="2" fill="#C2D100" opacity="0.3"/>

  <!-- Main logo hexagon -->
  <path d="M290 60 L330 83 L330 129 L290 152 L250 129 L250 83 Z" stroke="#C2D100" stroke-width="2" fill="none"/>
  <path d="M290 78 L315 92 L315 120 L290 134 L265 120 L265 92 Z" fill="#C2D100" fill-opacity="0.12"/>

  <!-- SEM VISA text -->
  <text x="320" y="115" font-family="Arial, sans-serif" font-weight="900" font-size="58" fill="#FFFFFF" letter-spacing="-1">SEM</text>
  <text x="320" y="165" font-family="Arial, sans-serif" font-weight="900" font-size="58" fill="#C2D100" letter-spacing="-1">VISA</text>

  <!-- Tagline -->
  <text x="320" y="198" font-family="Arial, sans-serif" font-weight="400" font-size="16" fill="#FFFFFF" fill-opacity="0.45" letter-spacing="2">CONSULTING</text>

  <!-- Divider line -->
  <rect x="320" y="216" width="180" height="1" fill="#C2D100" opacity="0.25"/>

  <!-- Stats -->
  <text x="320" y="244" font-family="Arial, sans-serif" font-weight="700" font-size="15" fill="#C2D100">98%</text>
  <text x="360" y="244" font-family="Arial, sans-serif" font-weight="400" font-size="13" fill="#FFFFFF" fill-opacity="0.4"> muvaffaqiyat  ·  </text>
  <text x="474" y="244" font-family="Arial, sans-serif" font-weight="700" font-size="15" fill="#C2D100">15 yil</text>
  <text x="512" y="244" font-family="Arial, sans-serif" font-weight="400" font-size="13" fill="#FFFFFF" fill-opacity="0.4"> tajriba</text>

  <!-- Destinations -->
  <text x="320" y="278" font-family="Arial, sans-serif" font-weight="500" font-size="13" fill="#FFFFFF" fill-opacity="0.35" letter-spacing="1">AQSH · SHENGEN · KANADA · BUYUK BRITANIYA</text>

  <!-- Bottom accent -->
  <rect x="0" y="357" width="640" height="3" fill="#C2D100" opacity="0.4"/>
</svg>
`

await sharp(Buffer.from(svg))
  .png()
  .toFile('sem-visa-banner-640x360.png')

console.log('Done: sem-visa-banner-640x360.png')
