"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Instagram, 
  Check, 
  Copy, 
  UserPlus 
} from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const contactName = "Kashif Royal Cut";
  const whatsappNumber = "03194678553";
  const whatsappUrl = `https://wa.me/923194678553?text=Hi%20Kashif,%20adding%20your%20contact%20from%20Royal%20Cut!`;
  const instagramUrl = "https://www.instagram.com/Kashi_g00";
  const tiktokUrl = "https://www.tiktok.com/@royalcut0321";

  const handleCopyNumber = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(whatsappNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Directly open the native mobile Add Contact screen with autofilled name and number
  const handleSaveContact = (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || "";
    const isAndroid = /Android/i.test(ua);

    if (isAndroid) {
      const androidIntent = 
        `intent:#Intent;action=android.intent.action.INSERT;type=vnd.android.cursor.dir/contact;` +
        `S.name=${encodeURIComponent(contactName)};` +
        `S.phone=${encodeURIComponent(whatsappNumber)};` +
        `S.notes=${encodeURIComponent("Royal Cut Barbershop & Salon - WhatsApp & Phone")};` +
        `end`;

      window.location.href = androidIntent;

      setTimeout(() => {
        window.location.href = "/api/contact";
      }, 600);
    } else {
      window.location.href = "/api/contact";
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden font-sans bg-[#08090C]">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <Image
          src="/salon_poster.jpg"
          alt="Royal Cut Ambience"
          fill
          className="object-cover opacity-20 filter blur-2xl scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090C]/90 via-[#0A0C10]/95 to-[#08090C]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#C3AD86]/10 rounded-full blur-[140px]" />
      </div>

      <div className="w-full max-w-md bg-[#101218]/95 border border-[#877146]/40 rounded-[32px] p-6 sm:p-8 relative text-center shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(195,173,134,0.12)]">
        
        {/* Official Royal Cut Transparent Logo Uploaded by User */}
        <div className="flex flex-col items-center justify-center mb-7 sm:mb-8">
          <div className="relative w-full max-w-[320px] sm:max-w-[350px] h-[165px] sm:h-[182px] mx-auto">
            <Image
              src="/royal_cut_branding_exact.png"
              alt="Royal Cut Barbershop & Salon Official Logo"
              fill
              className="object-contain filter drop-shadow-[0_8px_24px_rgba(195,173,134,0.35)]"
              priority
            />
          </div>
          <h1 className="sr-only">Royal Cut Barbershop &amp; Salon</h1>
        </div>

        {/* Kashif Portrait with Gold Halo */}
        <div className="relative w-24 h-24 mx-auto mb-3.5 group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#877146] via-[#C3AD86] to-[#877146] blur-sm group-hover:blur-md transition-all duration-300" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#C3AD86] shadow-xl">
            <Image
              src="/kashi_avatar_gold.png"
              alt="Kashif"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Stylist Name */}
        <h2 className="text-base sm:text-lg font-serif font-bold text-[#C3AD86] tracking-[0.25em] uppercase mb-7 sm:mb-8 drop-shadow-[0_2px_10px_rgba(195,173,134,0.3)]">
          KASHIF
        </h2>

        {/* Action Connect Links with Official Brand-Themed Icons */}
        <div className="space-y-3.5 text-left">
          
          {/* WhatsApp Card with Official WhatsApp Logo */}
          <div className="group rounded-2xl border border-[#877146]/35 bg-[#161922] hover:bg-[#1C202B] hover:border-[#25D366]/50 transition-all duration-200 p-4 flex items-center justify-between shadow-lg">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 flex-1 pr-2"
            >
              {/* Official WhatsApp Logo Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(37,211,102,0.35)] group-hover:scale-105 transition-all">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#25D366] transition-colors">
                  Add on WhatsApp
                </h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5 font-medium">
                  {whatsappNumber}
                </p>
              </div>
            </a>

            {/* Quick Copy Number Button */}
            <button
              onClick={handleCopyNumber}
              title="Copy WhatsApp number"
              className="shrink-0 p-2.5 rounded-xl bg-white/5 hover:bg-[#25D366]/20 text-gray-300 hover:text-[#25D366] border border-white/10 hover:border-[#25D366]/40 transition-all active:scale-95"
            >
              {copied ? (
                <Check className="w-4 h-4 text-[#25D366]" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Instagram Card with Official Instagram Gradient Logo */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-[#877146]/35 bg-[#161922] hover:bg-[#1C202B] hover:border-[#E1306C]/50 transition-all duration-200 p-4 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(225,48,108,0.35)] group-hover:scale-105 transition-all">
                <Instagram className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#E1306C] transition-colors">
                  Follow on Instagram
                </h2>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">
                  @Kashi_g00
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#E1306C]/15 text-[#E1306C] border border-[#E1306C]/35 group-hover:bg-gradient-to-r group-hover:from-[#F58529] group-hover:to-[#DD2A7B] group-hover:text-white transition-all">
              Follow
            </span>
          </a>

          {/* TikTok Card with Official Black & White Logo */}
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-[#877146]/35 bg-[#161922] hover:bg-[#1C202B] hover:border-white/40 transition-all duration-200 p-4 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-black border border-white/20 text-white flex items-center justify-center shrink-0 shadow-[0_0_14px_rgba(255,255,255,0.06)] group-hover:scale-105 group-hover:border-white/40 transition-all">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.02 2.87.01 5.75-.02 8.62-.05 1.63-.49 3.25-1.36 4.63-1.03 1.62-2.58 2.89-4.39 3.55-1.77.67-3.75.67-5.54.06-2.02-.68-3.72-2.12-4.73-3.99-.95-1.77-1.22-3.87-.76-5.83.47-1.99 1.72-3.72 3.46-4.8 1.74-1.09 3.86-1.43 5.86-1.02v4.23c-1.06-.32-2.26-.26-3.26.24-.96.48-1.67 1.39-1.92 2.44-.27 1.09-.04 2.29.61 3.19.64.91 1.68 1.47 2.78 1.55 1.18.09 2.39-.33 3.18-1.21.68-.74.96-1.76.95-2.75.04-5.26.02-10.53.02-15.79z" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-gray-100 transition-colors">
                  Follow on TikTok
                </h2>
                <p className="text-xs text-gray-400 mt-0.5 font-medium">
                  @royalcut0321
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
              Watch
            </span>
          </a>
        </div>

        {/* Save Contact to Phone Button - Styled in Exact #C3AD86 / #877146 Brand Colors */}
        <div className="mt-6 pt-5 border-t border-[#877146]/25">
          <button
            onClick={handleSaveContact}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C3AD86] via-[#D5C29F] to-[#877146] text-[#0A0C10] font-sans font-bold text-sm tracking-wider uppercase shadow-[0_4px_22px_rgba(195,173,134,0.32)] hover:shadow-[0_6px_28px_rgba(195,173,134,0.48)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer border border-[#C3AD86]"
          >
            <UserPlus className="w-4 h-4 text-[#0A0C10] stroke-[2.5]" />
            <span>Save Contact to Phone</span>
          </button>
        </div>

        {/* Footer */}
        <p className="font-serif text-[11px] text-[#877146] tracking-widest uppercase mt-6">
          &copy; Royal Cut Barbershop &amp; Salon &bull; Kashif
        </p>
      </div>
    </main>
  );
}
