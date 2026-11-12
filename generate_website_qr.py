#!/usr/bin/env python3
import sys
import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_circular_avatar(image_path, size=320, border_width=12):
    """Creates a high-res circular avatar with 24K gold multi-ring bevel."""
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    
    crop_w = int(w * 0.75)
    crop_h = crop_w
    left = int((w - crop_w) / 2)
    top = int(h * 0.38)
    cropped = img.crop((left, top, left + crop_w, top + crop_h))
    cropped = cropped.resize((size, size), Image.Resampling.LANCZOS)
    
    mask = Image.new("L", (size, size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, size - 1, size - 1), fill=255)
    
    avatar = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    avatar.paste(cropped, (0, 0), mask=mask)
    
    draw_avatar = ImageDraw.Draw(avatar)
    gold_outer = (195, 173, 134, 255)     # #C3AD86
    gold_highlight = (235, 222, 198, 255) # Light Champagne
    gold_dark = (135, 113, 70, 255)       # #877146
    
    for b in range(border_width):
        color = gold_highlight if b in (2, 3) else (gold_dark if b > border_width - 3 else gold_outer)
        draw_avatar.ellipse((b, b, size - 1 - b, size - 1 - b), outline=color)
        
    return avatar

def create_fancy_qr(url, avatar_img, qr_size=1200, corner_radius=72, border_w=16):
    """Generates a QR code with pure white background, rounded corners, and a matching golden border."""
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    
    raw_qr = qr.make_image(fill_color=(12, 14, 18), back_color=(255, 255, 255)).convert("RGBA")
    
    padding = border_w + 36
    inner_qr_size = qr_size - (2 * padding)
    raw_qr = raw_qr.resize((inner_qr_size, inner_qr_size), Image.Resampling.LANCZOS)
    
    card = Image.new("RGBA", (qr_size, qr_size), (0, 0, 0, 0))
    draw_card = ImageDraw.Draw(card)
    
    # Solid pure white rounded background
    draw_card.rounded_rectangle(
        [border_w // 2, border_w // 2, qr_size - 1 - border_w // 2, qr_size - 1 - border_w // 2],
        radius=corner_radius,
        fill=(255, 255, 255, 255)
    )
    
    # Paste inner QR onto white card
    card.paste(raw_qr, (padding, padding), mask=raw_qr)
    
    # Center avatar
    logo_size = int(qr_size * 0.24)
    avatar_resized = avatar_img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    backing_size = logo_size + 20
    backing = Image.new("RGBA", (backing_size, backing_size), (0, 0, 0, 0))
    draw_back = ImageDraw.Draw(backing)
    draw_back.ellipse((0, 0, backing_size - 1, backing_size - 1), fill=(255, 255, 255, 255), outline=(195, 173, 134, 255), width=5)
    
    pos_back = ((qr_size - backing_size) // 2, (qr_size - backing_size) // 2)
    pos_avatar = ((qr_size - logo_size) // 2, (qr_size - logo_size) // 2)
    
    card.paste(backing, pos_back, mask=backing)
    card.paste(avatar_resized, pos_avatar, mask=avatar_resized)
    
    # Matching golden rounded border
    draw_card.rounded_rectangle(
        [border_w // 2, border_w // 2, qr_size - 1 - border_w // 2, qr_size - 1 - border_w // 2],
        radius=corner_radius,
        outline=(195, 173, 134, 255),
        width=border_w
    )
    # Inner golden hairline
    draw_card.rounded_rectangle(
        [border_w + 6, border_w + 6, qr_size - border_w - 7, qr_size - border_w - 7],
        radius=max(4, corner_radius - 8),
        outline=(235, 222, 198, 180),
        width=3
    )
    
    return card

def build_luxury_stand(fancy_qr, url_text):
    W, H = 1200, 1800
    cw = W // 2
    
    # Base Obsidian with soft ambient salon poster texture
    bg = Image.new("RGBA", (W, H), (10, 12, 16, 255))
    poster_src = Image.open("salon_poster.jpg").convert("RGBA")
    poster_bg = poster_src.resize((W, H), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(32))
    bg = Image.blend(bg, poster_bg, 0.22)
    
    # Warm amber glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw_glow = ImageDraw.Draw(glow)
    draw_glow.ellipse((cw - 450, 60, cw + 450, 650), fill=(212, 175, 55, 45))
    draw_glow.ellipse((cw - 450, 500, cw + 450, 1350), fill=(212, 175, 55, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    bg = Image.alpha_composite(bg, glow)
    
    draw = ImageDraw.Draw(bg)
    
    f_serif_bold = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
    f_sans_bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    
    font_title = ImageFont.truetype(f_serif_bold, 86)
    font_sub = ImageFont.truetype(f_serif_bold, 34)
    font_stylist = ImageFont.truetype(f_serif_bold, 28)
    # Beautiful, tracked Didot/Georgia luxury font for CTA
    font_cta = ImageFont.truetype(f_serif_bold, 36)
    font_badge_title = ImageFont.truetype(f_sans_bold, 24)
    font_badge_handle = ImageFont.truetype(f_sans_bold, 22)
    
    # Clean Luxury Double Gold Frame (NO corner dots) using #C3AD86 and #877146
    margin = 44
    draw.rectangle([margin, margin, W - margin, H - margin], outline=(195, 173, 134, 230), width=4)
    draw.rectangle([margin + 12, margin + 12, W - margin - 12, H - margin - 12], outline=(135, 113, 70, 110), width=1)
    
    # 1. Exact Official Transparent Royal Cut Logo (Uploaded by user)
    header_y = 110
    branding_img = Image.open("public/royal_cut_branding_exact.png").convert("RGBA")
    brand_w = 650
    brand_h = int(branding_img.height * (brand_w / branding_img.width))
    brand_resized = branding_img.resize((brand_w, brand_h), Image.Resampling.LANCZOS)
    bg.paste(brand_resized, (cw - brand_w // 2, header_y), mask=brand_resized)
    
    # Stylist name Kashif in warm off-white (with breathing room below logo)
    stylist_y = header_y + brand_h + 30
    draw.text((cw, stylist_y), "KASHIF", font=font_stylist, fill=(246, 244, 240, 245), anchor="mt")
    
    # 5. Clean White Rounded QR Card with Matching Golden Border (spacious positioning)
    qr_card_size = 720
    qr_card_x = (W - qr_card_size) // 2
    qr_card_y = stylist_y + 68
    
    # Soft drop-shadow
    card_shadow = Image.new("RGBA", (qr_card_size + 40, qr_card_size + 40), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(card_shadow)
    s_draw.rounded_rectangle([20, 20, qr_card_size + 20, qr_card_size + 20], radius=44, fill=(0, 0, 0, 190))
    card_shadow = card_shadow.filter(ImageFilter.GaussianBlur(16))
    bg.paste(card_shadow, (qr_card_x - 20, qr_card_y - 12), mask=card_shadow)
    
    qr_resized = fancy_qr.resize((qr_card_size, qr_card_size), Image.Resampling.LANCZOS)
    bg.paste(qr_resized, (qr_card_x, qr_card_y), mask=qr_resized)
    
    # 6. Prestigious "SCAN TO CONNECT" Typography (Spacious gap below QR code)
    cta_y = qr_card_y + qr_card_size + 80
    cta_text = "S C A N   T O   C O N N E C T"
    
    # Drop Shadow and Off-White Text
    draw.text((cw + 2, cta_y + 2), cta_text, font=font_cta, fill=(0, 0, 0, 200), anchor="mm")
    draw.text((cw, cta_y), cta_text, font=font_cta, fill=(246, 244, 240), anchor="mm")
    
    # 7. 3 Clean, Minimalist Brand Cards (Spacious gap below CTA)
    pills_y = cta_y + 74
    pill_w = 330
    pill_h = 136
    spacing = 22
    total_w = 3 * pill_w + 2 * spacing
    start_x = (W - total_w) // 2
    
    social_configs = [
        {"icon_file": "icon_whatsapp.png", "name": "WHATSAPP", "handle": "0319-4678553", "color": (37, 211, 102)},
        {"icon_file": "icon_instagram.png", "name": "INSTAGRAM", "handle": "@Kashi_g00", "color": (225, 48, 108)},
        {"icon_file": "icon_tiktok.png", "name": "TIKTOK", "handle": "@royalcut0321", "color": (255, 255, 255)}
    ]
    
    for i, cfg in enumerate(social_configs):
        px = start_x + i * (pill_w + spacing)
        draw.rounded_rectangle([px, pills_y, px + pill_w, pills_y + pill_h], radius=20,
                               fill=(18, 21, 28, 250), outline=(135, 113, 70, 160), width=2)
        draw.rounded_rectangle([px + 4, pills_y + 4, px + pill_w - 4, pills_y + pill_h - 4], radius=16,
                               outline=(255, 255, 255, 15), width=1)
        
        icon_img = Image.open(cfg["icon_file"]).convert("RGBA")
        icon_size = 70
        icon_resized = icon_img.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
        
        icon_x = px + 22
        icon_y = pills_y + (pill_h - icon_size) // 2
        bg.paste(icon_resized, (icon_x, icon_y), mask=icon_resized)
        
        text_x = px + 108
        draw.text((text_x, pills_y + 40), cfg["name"], font=font_badge_title, fill=cfg["color"])
        draw.text((text_x, pills_y + 75), cfg["handle"], font=font_badge_handle, fill=(245, 247, 250))
        
    return bg

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "https://royalcut-qr.vercel.app/"
    print(f"Generating Salon Stand Poster with prestigious typography for: {url}")
    
    avatar = create_circular_avatar("profile.jpg", size=320, border_width=12)
    fancy_qr = create_fancy_qr(url, avatar, qr_size=1200, corner_radius=72, border_w=16)
    
    fancy_qr.save("public/website_qr_with_photo.png")
    fancy_qr.save("website_qr_with_photo.png")
    
    stand_poster = build_luxury_stand(fancy_qr, url)
    stand_poster.save("public/website_salon_stand.png")
    stand_poster.save("website_salon_stand.png")
    
    print("Regenerated website_salon_stand.png with prestigious typography!")
