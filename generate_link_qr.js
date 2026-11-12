#!/usr/bin/env node
const { execSync } = require('child_process');

const url = process.argv[2];
if (!url) {
  console.log('Usage: node generate_link_qr.js <URL>');
  console.log('Example: node generate_link_qr.js https://my-royal-cut-links.vercel.app');
  process.exit(1);
}

execSync(`npx --yes qrcode -e H -w 1000 -o qr_webpage.png "${url}"`);
execSync(`npx --yes qrcode -t svg -e H -o qr_webpage.svg "${url}"`);
console.log(`Successfully generated qr_webpage.png and qr_webpage.svg for: ${url}`);
