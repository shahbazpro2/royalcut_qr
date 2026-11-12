const { execSync } = require('child_process');
const fs = require('fs');

// 1. vCard format with all details
const vcard = `BEGIN:VCARD
VERSION:3.0
N:;Kashi;;;
FN:Kashi (Royal Cut)
ORG:Royal Cut
TEL;TYPE=CELL,VOICE,MSG:+923194678553
X-SOCIALPROFILE;type=whatsapp:https://wa.me/923194678553
X-SOCIALPROFILE;type=instagram:https://www.instagram.com/Kashi_g00
X-SOCIALPROFILE;type=tiktok:https://www.tiktok.com/@Kashig0321
URL:https://wa.me/923194678553
URL:https://www.instagram.com/Kashi_g00
URL:https://www.tiktok.com/@Kashig0321
NOTE:WhatsApp: +92 319 4678553 | Instagram: @Kashi_g00 | TikTok: @Kashig0321
END:VCARD`.trim();

fs.writeFileSync('kashi_contact.vcf', vcard);

// Generate vCard QR Codes (PNG and SVG)
execSync('npx --yes qrcode -e M -w 800 -o qr_contact_card.png "' + vcard.replace(/"/g, '\\"') + '"');
execSync('npx --yes qrcode -t svg -e M -o qr_contact_card.svg "' + vcard.replace(/"/g, '\\"') + '"');

console.log('Generated vCard QR codes successfully');
