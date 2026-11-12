const { execSync } = require('child_process');

const text = `ROYAL CUT - KASHI
WhatsApp: https://wa.me/923194678553
Instagram: https://instagram.com/Kashi_g00
TikTok: https://tiktok.com/@Kashig0321`;

execSync('npx --yes qrcode -e M -w 800 -o qr_social_text.png "' + text.replace(/"/g, '\\"') + '"');
execSync('npx --yes qrcode -t svg -e M -o qr_social_text.svg "' + text.replace(/"/g, '\\"') + '"');
console.log('Generated text QR code');
