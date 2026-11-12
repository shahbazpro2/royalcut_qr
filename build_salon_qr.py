#!/usr/bin/env python3
import os
import qrcode
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_circular_avatar(image_path, size=240, border_width=8, border_color=(212, 175, 55, 255)):
    """Crops the image around the face/torso and returns a circular RGBA image with a gold border."""
    img = Image.open(image_path).convert("RGBA")
    w, h = img.size
    
    # Crop to focus nicely on Kashi's head and upper torso (approx 390 to 710 in height, centered)
    crop_w = int(w * 0.75)
    crop_h = crop_w
    left = int((w - crop_w) / 2)
    top = int(h * 0.38)
    right = left + crop_w
    bottom = top + crop_h
    
    cropped = img.crop((left, top, right, bottom))
    cropped = cropped.resize((size, size), Image.Resampling.LANCZOS)
    
    # Create circular mask
    mask = Image.new("L", (size, size), 0)
    draw_mask = ImageDraw.Draw(mask)
    draw_mask.ellipse((0, 0, size - 1, size - 1), fill=255)
    
    # Output circular avatar
    avatar = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    avatar.paste(cropped, (0, 0), mask=mask)
    
    # Draw gold ring
    draw_avatar = ImageDraw.Draw(avatar)
    for b in range(border_width):
        draw_avatar.ellipse(
            (b, b, size - 1 - b, size - 1 - b),
            outline=border_color
        )
        
    return avatar

def create_fancy_qr(data_content, avatar_img, qr_size=900, qr_color=(18, 20, 24), bg_color=(255, 255, 255)):
    """Generates a high error-correction QR code with Kashi's photo embedded in the center."""
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # 30% error recovery for logo overlay
        box_size=20,
        border=3,
    )
    qr.add_data(data_content)
    qr.make(fit=True)
    
    # Generate base QR image
    qr_img = qr.make_image(fill_color=qr_color, back_color=bg_color).convert("RGBA")
    qr_img = qr_img.resize((qr_size, qr_size), Image.Resampling.LANCZOS)
    
    # Calculate center avatar size (about 26% of QR size for safety with Error Correction H)
    logo_size = int(qr_size * 0.26)
    avatar_resized = avatar_img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Create a clean white/gold backing plate for the avatar so QR modules don't bleed into it
    backing_size = logo_size + 16
    backing = Image.new("RGBA", (backing_size, backing_size), (0, 0, 0, 0))
    draw_back = ImageDraw.Draw(backing)
    draw_back.ellipse((0, 0, backing_size - 1, backing_size - 1), fill=(255, 255, 255, 255), outline=(212, 175, 55, 255), width=3)
    
    # Position in center
    pos_back = ((qr_size - backing_size) // 2, (qr_size - backing_size) // 2)
    pos_avatar = ((qr_size - logo_size) // 2, (qr_size - logo_size) // 2)
    
    qr_img.paste(backing, pos_back, mask=backing)
    qr_img.paste(avatar_resized, pos_avatar, mask=avatar_resized)
    
    return qr_img

def build_salon_stand_poster(fancy_qr, avatar_img):
    """Creates a printable luxury hair salon acrylic stand / mirror frame poster (1200 x 1800 px)."""
    W, H = 1200, 1800
    
    # Background: dark luxury salon vibe with warm backlight glow
    bg = Image.new("RGBA", (W, H), (14, 16, 20, 255))
    
    # Add warm radial glow in upper/center area (like the LED mirror in Kashi's photo)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw_glow = ImageDraw.Draw(glow)
    draw_glow.ellipse((100, 300, W - 100, 1350), fill=(212, 175, 55, 35))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    bg.paste(glow, (0, 0), mask=glow)
    
    # Fonts
    font_bold_path = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    font_reg_path = "/System/Library/Fonts/Supplemental/Arial.ttf"
    
    title_font = ImageFont.truetype(font_bold_path, 72)
    subtitle_font = ImageFont.truetype(font_bold_path, 28)
    kashi_font = ImageFont.truetype(font_reg_path, 32)
    cta_font = ImageFont.truetype(font_bold_path, 42)
    social_font = ImageFont.truetype(font_bold_path, 26)
    handle_font = ImageFont.truetype(font_reg_path, 22)
    
    draw = ImageDraw.Draw(bg)
    
    # Luxury double border
    margin = 40
    draw.rectangle([margin, margin, W - margin, H - margin], outline=(212, 175, 55, 200), width=3)
    draw.rectangle([margin + 12, margin + 12, W - margin - 12, H - margin - 12], outline=(212, 175, 55, 80), width=1)
    
    # Corner ornaments
    corn_size = 40
    for cx, cy in [(margin + 12, margin + 12), (W - margin - 12, margin + 12), 
                   (margin + 12, H - margin - 12), (W - margin - 12, H - margin - 12)]:
        draw.rectangle([cx - 4, cy - 4, cx + 4, cy + 4], fill=(212, 175, 55, 255))
    
    # Header: Crown / Salon styling
    header_y = 110
    draw.text((W // 2, header_y), "ROYAL CUT", font=title_font, fill=(245, 220, 130), anchor="mt")
    draw.text((W // 2, header_y + 85), "PREMIUM HAIR SALON & STYLING", font=subtitle_font, fill=(180, 185, 195), anchor="mt")
    draw.text((W // 2, header_y + 130), "BY KASHI", font=kashi_font, fill=(212, 175, 55), anchor="mt")
    
    # Decorative separator line with diamond
    sep_y = header_y + 190
    draw.line([(W // 2 - 250, sep_y), (W // 2 + 250, sep_y)], fill=(212, 175, 55, 120), width=2)
    draw.polygon([(W // 2, sep_y - 8), (W // 2 + 8, sep_y), (W // 2, sep_y + 8), (W // 2 - 8, sep_y)], fill=(212, 175, 55, 255))
    
    # Frame for the QR Code (White card with gold border and soft shadow)
    qr_card_size = 720
    qr_card_x = (W - qr_card_size) // 2
    qr_card_y = sep_y + 40
    
    # Card backing
    card = Image.new("RGBA", (qr_card_size, qr_card_size), (255, 255, 255, 255))
    card_draw = ImageDraw.Draw(card)
    card_draw.rectangle([0, 0, qr_card_size - 1, qr_card_size - 1], outline=(212, 175, 55, 255), width=6)
    
    # Paste fancy QR onto the card
    qr_display = fancy_qr.resize((qr_card_size - 30, qr_card_size - 30), Image.Resampling.LANCZOS)
    card.paste(qr_display, (15, 15), mask=qr_display)
    
    bg.paste(card, (qr_card_x, qr_card_y))
    
    # Call to action below QR
    cta_y = qr_card_y + qr_card_size + 45
    draw.text((W // 2, cta_y), "SCAN TO CONNECT & BOOK", font=cta_font, fill=(255, 255, 255), anchor="mt")
    draw.text((W // 2, cta_y + 55), "WhatsApp  •  Instagram  •  TikTok", font=subtitle_font, fill=(212, 175, 55), anchor="mt")
    
    # 3 Social Feature Pill Cards at the bottom
    pills_y = cta_y + 125
    pill_w = 320
    pill_h = 130
    spacing = 25
    total_pills_w = 3 * pill_w + 2 * spacing
    start_x = (W - total_pills_w) // 2
    
    socials = [
        {"name": "WHATSAPP", "handle": "0319-4678553", "color": (37, 211, 102)},
        {"name": "INSTAGRAM", "handle": "@Kashi_g00", "color": (225, 48, 108)},
        {"name": "TIKTOK", "handle": "@Kashig0321", "color": (0, 242, 254)}
    ]
    
    for i, soc in enumerate(socials):
        px = start_x + i * (pill_w + spacing)
        # Pill background
        draw.rounded_rectangle([px, pills_y, px + pill_w, pills_y + pill_h], radius=18, 
                               fill=(24, 28, 36, 255), outline=soc["color"], width=2)
        # Name
        draw.text((px + pill_w // 2, pills_y + 30), soc["name"], font=social_font, fill=soc["color"], anchor="mt")
        # Handle
        draw.text((px + pill_w // 2, pills_y + 75), soc["handle"], font=handle_font, fill=(230, 235, 245), anchor="mt")
        
    # Footer tag
    draw.text((W // 2, H - 75), "ROYAL CUT SALON  •  THANK YOU FOR VISITING", font=ImageFont.truetype(font_reg_path, 20), fill=(120, 125, 135), anchor="mt")
    
    return bg

def main():
    image_path = "profile.jpg"
    print("1. Creating circular avatar of Kashi with gold rim...")
    avatar = create_circular_avatar(image_path, size=260, border_width=10)
    avatar.save("kashi_avatar_gold.png")
    
    # Data to encode: vCard digital contact card
    vcard_data = """BEGIN:VCARD
VERSION:3.0
N:;Kashi;;;
FN:Kashi (Royal Cut Hair Salon)
ORG:Royal Cut Hair Salon
TITLE:Master Stylist
TEL;TYPE=CELL,VOICE,MSG:+923194678553
URL;TYPE=WhatsApp:https://wa.me/923194678553
URL;TYPE=Instagram:https://www.instagram.com/Kashi_g00
URL;TYPE=TikTok:https://www.tiktok.com/@Kashig0321
NOTE:Royal Cut Hair Salon | WhatsApp: 03194678553 | Instagram: @Kashi_g00 | TikTok: @Kashig0321
END:VCARD""".strip()

    print("2. Generating fancy salon QR code with embedded photo...")
    fancy_qr = create_fancy_qr(vcard_data, avatar, qr_size=1000)
    fancy_qr.save("salon_qr_with_photo.png")
    
    print("3. Generating luxury salon stand / mirror poster (1200 x 1800)...")
    salon_poster = build_salon_stand_poster(fancy_qr, avatar)
    salon_poster.save("salon_qr_stand.png")
    
    print("All fancy salon assets generated successfully!")

if __name__ == "__main__":
    main()
