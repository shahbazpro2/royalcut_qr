const sharp = require('sharp');

const whatsappSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="44" fill="#25D366"/>
  <path fill="#FFFFFF" d="M100.1 34C63.6 34 34 63.6 34 100.1c0 12.8 3.7 24.8 10 35L36 166l32-8.4c9.8 5.4 21.1 8.5 32.1 8.5 36.5 0 66.1-29.6 66.1-66.1S136.6 34 100.1 34zm38.6 93.6c-1.6 4.5-8 8.3-13.1 9.4-3.5.8-8 1.4-23.4-5-19.7-8.2-32.3-28.3-33.3-29.6-1-1.3-7.8-10.4-7.8-19.8s4.9-14 6.6-15.9c1.8-1.9 3.9-2.4 5.2-2.4 1.3 0 2.6 0 3.7.1 1.2.1 2.8-.4 4.4 3.4 1.6 3.9 5.6 13.6 6.1 14.6.5 1 .8 2.2.2 3.5-.7 1.3-1 2.1-2 3.3-1 1.2-2.1 2.6-3 3.5-1 1-2.1 2.1-.9 4.1 1.2 2.1 5.3 8.7 11.4 14.1 7.8 7 14.4 9.1 16.5 10.1 2.1 1 3.3.8 4.5-.5 1.3-1.4 5.3-6.2 6.7-8.3 1.4-2.1 2.8-1.8 4.8-1 1.9.8 12.3 5.8 14.4 6.9 2.1 1 3.5 1.6 4 2.4.6.9.6 5.1-1 9.6z"/>
</svg>`;

const instagramSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFD600"/>
      <stop offset="25%" stop-color="#FF7A00"/>
      <stop offset="50%" stop-color="#FF0069"/>
      <stop offset="75%" stop-color="#D300C5"/>
      <stop offset="100%" stop-color="#7638FA"/>
    </linearGradient>
  </defs>
  <rect width="200" height="200" rx="44" fill="url(#ig)"/>
  <rect x="42" y="42" width="116" height="116" rx="32" fill="none" stroke="#FFFFFF" stroke-width="12"/>
  <circle cx="100" cy="100" r="28" fill="none" stroke="#FFFFFF" stroke-width="12"/>
  <circle cx="129" cy="71" r="7.5" fill="#FFFFFF"/>
</svg>`;

const tiktokSvg = `
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" rx="44" fill="#000000" stroke="#00F2FE" stroke-width="4"/>
  <!-- TikTok note with cyan and red 3D chromatic aberration -->
  <g transform="translate(10, 5)">
    <!-- Cyan layer -->
    <path fill="#00F2FE" d="M110 50c4 7 11 15 20 17v16c-8-1-15-4-21-9v43c0 23-18 41-41 41s-41-18-41-41 18-41 41-41c3 0 7 .4 10 1v19c-3-.7-6-1-10-1-13 0-23 10-23 23s10 23 23 23 23-10 23-23V40h19v10z"/>
    <!-- Red layer offset -->
    <path fill="#FE2C55" d="M114 54c4 7 11 15 20 17v16c-8-1-15-4-21-9v43c0 23-18 41-41 41s-41-18-41-41 18-41 41-41c3 0 7 .4 10 1v19c-3-.7-6-1-10-1-13 0-23 10-23 23s10 23 23 23 23-10 23-23V44h19v10z" style="mix-blend-mode: screen;"/>
    <!-- Crisp White core -->
    <path fill="#FFFFFF" d="M112 52c4 7 11 15 20 17v16c-8-1-15-4-21-9v43c0 23-18 41-41 41s-41-18-41-41 18-41 41-41c3 0 7 .4 10 1v19c-3-.7-6-1-10-1-13 0-23 10-23 23s10 23 23 23 23-10 23-23V42h19v10z"/>
  </g>
</svg>`;

async function render() {
  await sharp(Buffer.from(whatsappSvg)).png().toFile('icon_whatsapp.png');
  await sharp(Buffer.from(instagramSvg)).png().toFile('icon_instagram.png');
  await sharp(Buffer.from(tiktokSvg)).png().toFile('icon_tiktok.png');
  console.log('Official icons generated successfully via sharp');
}
render();
