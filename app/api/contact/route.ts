import { NextResponse } from "next/server";

export async function GET() {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Royal Cut;Kashif;;;
FN:Kashif Royal Cut
ORG:Royal Cut Barbershop & Salon
TITLE:Master Stylist
TEL;TYPE=CELL,VOICE,PREF:+923194678553
TEL;TYPE=WHATSAPP:+923194678553
URL;type=pref:https://wa.me/923194678553
URL:https://www.instagram.com/Kashi_g00
URL:https://www.tiktok.com/@royalcut0321
X-SOCIALPROFILE;type=whatsapp:https://wa.me/923194678553
X-SOCIALPROFILE;type=instagram:https://www.instagram.com/Kashi_g00
X-SOCIALPROFILE;type=tiktok:https://www.tiktok.com/@royalcut0321
NOTE:Master Stylist Kashif | Royal Cut Barbershop & Salon
END:VCARD`.trim();

  return new NextResponse(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="kashif_royal_cut.vcf"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
