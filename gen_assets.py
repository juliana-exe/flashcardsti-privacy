"""
Gerador de assets visuais — FlashCards TI
Gera: icon.png, adaptive-icon.png, splash.png, store-icon.png, feature-graphic.png, screenshots
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont

# ── Paleta ────────────────────────────────────────────────────────────────────
BG         = (13,  13,  13)       # #0D0D0D
SURFACE    = (17,  17,  34)       # #111122
SURFACE2   = (26,  26,  26)       # #1A1A1A
CARD_BACK  = (22,  10,  37)       # #160A25
NEON       = (0,   255, 65)       # #00FF41
NEON_DIM   = (0,   255, 65,  30)  # rgba
PURPLE     = (123, 47,  190)      # #7B2FBE
PURPLE_L   = (180, 127, 255)      # #B47FFF
PURPLE_DIM = (123, 47,  190, 38)  # rgba
RED        = (255, 68,  68)       # #FF4444
GOLD       = (255, 215, 0)        # #FFD700
TEXT       = (232, 232, 232)      # #E8E8E8
TEXT_DIM   = (153, 153, 153)      # #999999
BORDER     = (42,  42,  42)       # #2A2A2A


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=fill, outline=outline, width=width)


def make_icon(size=1024):
    """Ícone principal: card estilizado com símbolo de circuito e "TI" """
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img, 'RGBA')

    pad = int(size * 0.08)
    S = size

    # Fundo arredondado escuro
    rounded_rect(draw, [0, 0, S-1, S-1], radius=int(S * 0.22), fill=BG)

    # ── Card de fundo (verso — roxo) ──────────────────────────────────────────
    off = int(S * 0.055)
    cw = int(S * 0.62)
    ch = int(S * 0.78)
    cx0 = (S - cw) // 2 + off
    cy0 = (S - ch) // 2 + off
    rounded_rect(draw, [cx0, cy0, cx0+cw, cy0+ch],
                 radius=int(S*0.07), fill=CARD_BACK,
                 outline=(*PURPLE_L, 90), width=max(1, int(S*0.004)))

    # ── Card da frente (verde neon) ───────────────────────────────────────────
    cw2 = int(S * 0.62)
    ch2 = int(S * 0.78)
    cx2 = (S - cw2) // 2 - off
    cy2 = (S - ch2) // 2 - off
    rounded_rect(draw, [cx2, cy2, cx2+cw2, cy2+ch2],
                 radius=int(S*0.07), fill=SURFACE,
                 outline=(*NEON, 100), width=max(1, int(S*0.005)))

    # ── Linhas decorativas no card (simula texto) ─────────────────────────────
    lx = cx2 + int(cw2 * 0.15)
    lw = int(cw2 * 0.70)
    lh = max(3, int(S * 0.013))
    gap = int(S * 0.055)
    for i, alpha in enumerate([200, 140, 90]):
        ly = cy2 + int(ch2 * 0.55) + i * gap
        draw.rounded_rectangle([lx, ly, lx + lw - i * int(lw*0.15), ly + lh],
                                radius=lh//2, fill=(*TEXT_DIM, alpha))

    # ── Símbolo central: "FC" grandes ────────────────────────────────────────
    font_size = int(S * 0.28)
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except OSError:
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", font_size)
        except OSError:
            font = ImageFont.load_default()

    text = "FC"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = cx2 + (cw2 - tw) // 2 - bbox[0]
    ty = cy2 + int(ch2 * 0.18) - bbox[1]

    # Sombra / glow
    for glow_r in range(6, 0, -1):
        alpha = int(60 / glow_r)
        draw.text((tx + glow_r, ty + glow_r), text, font=font, fill=(*NEON, alpha))
        draw.text((tx - glow_r, ty - glow_r), text, font=font, fill=(*NEON, alpha))

    draw.text((tx, ty), text, font=font, fill=NEON)

    # ── Pequena tag "TI" no rodapé do card ───────────────────────────────────
    try:
        font_sm = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", int(S * 0.065))
    except OSError:
        font_sm = ImageFont.load_default()

    tag_text = "CONCURSOS"
    tag_bbox = draw.textbbox((0, 0), tag_text, font=font_sm)
    tag_w = tag_bbox[2] - tag_bbox[0] + int(S * 0.05)
    tag_h = tag_bbox[3] - tag_bbox[1] + int(S * 0.025)
    tag_x = cx2 + (cw2 - tag_w) // 2
    tag_y = cy2 + ch2 - int(ch2 * 0.2)
    rounded_rect(draw, [tag_x, tag_y, tag_x+tag_w, tag_y+tag_h],
                 radius=tag_h//2, fill=(*NEON, 20), outline=(*NEON, 80),
                 width=max(1, int(S*0.003)))
    draw.text((tag_x + int(S*0.025) - tag_bbox[0],
               tag_y + int(S*0.012) - tag_bbox[1]),
              tag_text, font=font_sm, fill=(*NEON, 200))

    return img


def make_feature_graphic(w=1024, h=500):
    """Feature Graphic 1024x500 para a Play Store."""
    img = Image.new('RGB', (w, h), BG)
    draw = ImageDraw.Draw(img)

    # Grid de pontos decorativos
    dot_spacing = 40
    for gx in range(0, w + dot_spacing, dot_spacing):
        for gy in range(0, h + dot_spacing, dot_spacing):
            draw.ellipse([gx-1, gy-1, gx+1, gy+1], fill=(*BORDER, 255))

    # Faixa de destaque central
    draw.rectangle([0, h//2 - 2, w, h//2 + 2], fill=(*NEON, 15))

    # Mini ícone na esquerda
    icon_size = 200
    icon = make_icon(icon_size)
    ix = int(w * 0.08)
    iy = (h - icon_size) // 2
    img.paste(icon, (ix, iy), icon)

    # Texto principal
    try:
        font_big = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 72)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 28)
        font_tag = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 22)
    except OSError:
        font_big = ImageFont.load_default()
        font_sub = font_big
        font_tag = font_big

    tx = ix + icon_size + int(w * 0.06)

    # "FLASHCARDS"
    draw.text((tx, h//2 - 90), "FLASH", font=font_big, fill=NEON)
    flash_bbox = draw.textbbox((tx, h//2 - 90), "FLASH", font=font_big)
    draw.text((tx + flash_bbox[2] - flash_bbox[0], h//2 - 90), "CARDS", font=font_big, fill=TEXT)

    # "TI"
    try:
        font_ti = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 42)
    except OSError:
        font_ti = font_sub
    draw.text((tx, h//2 + 2), "TI  ", font=font_ti, fill=TEXT_DIM)

    # Subtítulo
    draw.text((tx, h//2 + 56), "Concursos Públicos de Tecnologia", font=font_sub, fill=(*TEXT_DIM, 210))

    # Tags de matérias
    tags = ["Banco de Dados", "Redes", "Segurança", "SO"]
    tag_x = tx
    tag_y = h//2 + 110
    for tag in tags:
        tb = draw.textbbox((0, 0), tag, font=font_tag)
        tw = tb[2] - tb[0] + 20
        th = tb[3] - tb[1] + 10
        rounded_rect(draw, [tag_x, tag_y, tag_x+tw, tag_y+th],
                     radius=th//2, fill=(*PURPLE, 60), outline=(*PURPLE_L, 100), width=1)
        draw.text((tag_x + 10 - tb[0], tag_y + 5 - tb[1]), tag, font=font_tag, fill=PURPLE_L)
        tag_x += tw + 10

    return img


def make_splash(w=1284, h=2778):
    """Splash screen."""
    img = Image.new('RGB', (w, h), BG)
    draw = ImageDraw.Draw(img)

    # Ícone centralizado
    icon_size = int(w * 0.45)
    icon = make_icon(icon_size)
    ix = (w - icon_size) // 2
    iy = (h - icon_size) // 2 - int(h * 0.06)
    img.paste(icon, (ix, iy), icon)

    # Texto abaixo
    try:
        font_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", int(w * 0.075))
        font_sub   = ImageFont.truetype("C:/Windows/Fonts/arial.ttf",   int(w * 0.038))
    except OSError:
        font_title = ImageFont.load_default()
        font_sub = font_title

    title = "FLASHCARDS TI"
    tb = draw.textbbox((0, 0), title, font=font_title)
    tx = (w - (tb[2] - tb[0])) // 2 - tb[0]
    ty = iy + icon_size + int(h * 0.025)

    # split: "FLASH" neon + "CARDS TI" branco
    flash_bbox = draw.textbbox((0, 0), "FLASH", font=font_title)
    fw = flash_bbox[2] - flash_bbox[0]
    total_bbox = draw.textbbox((0, 0), "FLASHCARDS TI", font=font_title)
    total_w = total_bbox[2] - total_bbox[0]
    tx_start = (w - total_w) // 2

    draw.text((tx_start - flash_bbox[0], ty - flash_bbox[1]), "FLASH", font=font_title, fill=NEON)
    rest_bbox = draw.textbbox((0, 0), "CARDS TI", font=font_title)
    draw.text((tx_start + fw - rest_bbox[0], ty - rest_bbox[1]), "CARDS TI", font=font_title, fill=TEXT)

    sub = "Concursos Públicos"
    sb = draw.textbbox((0, 0), sub, font=font_sub)
    draw.text(((w - (sb[2]-sb[0]))//2 - sb[0], ty + (tb[3]-tb[1]) + int(h*0.012) - sb[1]),
              sub, font=font_sub, fill=TEXT_DIM)

    return img


def _load_fonts():
    paths = [
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/Arial_Bold.ttf",
        "C:/Windows/Fonts/verdanab.ttf",
    ]
    paths_reg = [
        "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/Arial.ttf",
        "C:/Windows/Fonts/verdana.ttf",
    ]
    def _f(size, bold=True):
        for p in (paths if bold else paths_reg):
            try:
                return ImageFont.truetype(p, size)
            except OSError:
                pass
        return ImageFont.load_default()
    return _f


def _draw_header(draw, W, f):
    """Desenha o header padrão do app."""
    HDR_Y = 56
    draw.rectangle([0, 0, W, HDR_Y + 100], fill=(15, 15, 15))
    # linha verde neon embaixo do header
    draw.rectangle([0, HDR_Y + 100, W, HDR_Y + 103], fill=(*NEON, 60))

    # status bar
    draw.text((36, 16), "9:41", font=f(26, bold=True), fill=TEXT)
    draw.text((W - 190, 16), "WiFi  ▮▮▮▮", font=f(24, bold=False), fill=TEXT_DIM)

    # título
    y_hdr = HDR_Y + 14
    t1 = "FLASH"
    t2 = "CARDS"
    t3 = " TI"
    fnt_big = f(52, bold=True)
    b1 = draw.textbbox((0,0), t1, font=fnt_big)
    w1 = b1[2]-b1[0]
    b2 = draw.textbbox((0,0), t2, font=fnt_big)
    w2 = b2[2]-b2[0]
    b3 = draw.textbbox((0,0), t3, font=fnt_big)
    w3 = b3[2]-b3[0]
    x0 = 40
    draw.text((x0 - b1[0], y_hdr - b1[1]), t1, font=fnt_big, fill=NEON)
    draw.text((x0 + w1 - b2[0], y_hdr - b2[1]), t2, font=fnt_big, fill=TEXT)
    draw.text((x0 + w1 + w2 - b3[0], y_hdr - b3[1]), t3, font=f(52, bold=False), fill=TEXT_DIM)

    sub = "Concursos Públicos"
    sb = draw.textbbox((0,0), sub, font=f(26, bold=False))
    draw.text((40 - sb[0], y_hdr + 58 - sb[1]), sub, font=f(26, bold=False), fill=TEXT_DIM)

    # botão filtro
    fc = W - 66
    fr = 32
    draw.ellipse([fc-fr, y_hdr+8, fc+fr, y_hdr+8+fr*2], fill=(28,28,28), outline=(*BORDER,200), width=1)
    fi = f(34, bold=True)
    draw.text((fc - 14, y_hdr + 8 + 4), "≡", font=fi, fill=TEXT_DIM)

    return HDR_Y + 103


def _draw_stats(draw, W, y, f, know=12, total=45, review=8):
    """Desenha a barra de estatísticas."""
    H_BAR = 76
    draw.rectangle([0, y, W, y + H_BAR], fill=(20, 20, 20))
    draw.rectangle([0, y + H_BAR - 1, W, y + H_BAR], fill=(*BORDER, 120))

    fnum = f(40, bold=True)
    flbl = f(24, bold=False)

    col_w = W // 3

    # Já Sei
    kn = str(know)
    kb = draw.textbbox((0,0), kn, font=fnum)
    kx = col_w//2 - (kb[2]-kb[0])//2 - 26
    draw.text((kx - kb[0], y + 10 - kb[1]), kn, font=fnum, fill=NEON)
    kw = kb[2]-kb[0]
    draw.text((kx + kw + 6, y + 18), "Já Sei", font=flbl, fill=TEXT_DIM)

    # Total (centro)
    tot = str(total)
    tb2 = draw.textbbox((0,0), tot, font=fnum)
    tx2 = col_w + col_w//2 - (tb2[2]-tb2[0])//2 - 22
    draw.text((tx2 - tb2[0], y + 10 - tb2[1]), tot, font=fnum, fill=TEXT_DIM)
    draw.text((tx2 + (tb2[2]-tb2[0]) + 6, y + 18), "Total", font=flbl, fill=TEXT_DIM)

    # Revisar
    rv = str(review)
    rb = draw.textbbox((0,0), rv, font=fnum)
    rx2 = col_w*2 + col_w//2 - (rb[2]-rb[0])//2 - 30
    draw.text((rx2 - rb[0], y + 10 - rb[1]), rv, font=fnum, fill=RED)
    draw.text((rx2 + (rb[2]-rb[0]) + 6, y + 18), "Revisar", font=flbl, fill=TEXT_DIM)

    # separadores verticais
    draw.line([col_w, y+16, col_w, y+H_BAR-16], fill=(*BORDER, 180), width=1)
    draw.line([col_w*2, y+16, col_w*2, y+H_BAR-16], fill=(*BORDER, 180), width=1)

    return y + H_BAR


def _draw_progress(draw, W, y, f, done=20, total=45):
    """Desenha a barra de progresso."""
    pct = done / total if total else 0
    remaining = total - done
    pad = 40

    draw.rectangle([0, y, W, y + 100], fill=(18, 18, 18))

    fn_num = f(44, bold=True)
    fn_lbl = f(25, bold=False)
    fn_pct = f(28, bold=True)

    rem_s = str(remaining)
    rb = draw.textbbox((0,0), rem_s, font=fn_num)
    draw.text((pad - rb[0], y + 12 - rb[1]), rem_s, font=fn_num, fill=TEXT)
    rw = rb[2]-rb[0]
    draw.text((pad + rw + 8, y + 22), "cards restantes", font=fn_lbl, fill=TEXT_DIM)

    done_s = f"{done} concluídos"
    db = draw.textbbox((0,0), done_s, font=fn_lbl)
    draw.text((W - pad - (db[2]-db[0]) - db[0], y + 12 - db[1]), done_s, font=fn_lbl, fill=TEXT_DIM)

    pct_s = f"{int(pct*100)}%"
    pb = draw.textbbox((0,0), pct_s, font=fn_pct)
    draw.text((W - pad - (pb[2]-pb[0]) - pb[0], y + 40 - pb[1]), pct_s, font=fn_pct, fill=NEON)

    track_y = y + 74
    track_h = 10
    draw.rounded_rectangle([pad, track_y, W-pad, track_y+track_h], radius=track_h//2, fill=(38,38,38))
    fill_w = int((W - pad*2) * pct)
    if fill_w > 0:
        draw.rounded_rectangle([pad, track_y, pad+fill_w, track_y+track_h], radius=track_h//2, fill=NEON)

    return y + 100


def _draw_card_front(draw, cx, cy, cw, ch, f):
    """Desenha o flashcard — frente."""
    rounded_rect(draw, [cx, cy, cx+cw, cy+ch],
                 radius=28, fill=SURFACE, outline=(*NEON, 90), width=3)

    # linha verde no topo
    draw.rounded_rectangle([cx+3, cy+3, cx+cw-3, cy+6+3], radius=3, fill=(*NEON, 60))

    pad = 32
    fn_badge = f(26, bold=True)
    fn_label = f(27, bold=False)
    fn_term  = f(52, bold=True)
    fn_mat   = f(27, bold=False)
    fn_hint  = f(25, bold=False)

    # ── badges topo ──────────────────────────────────────────────────────
    bx = cx + pad
    by = cy + pad
    for txt, color, border in [("CESPE", NEON, (*NEON,100)), ("  Médio  ", GOLD, (*GOLD,80))]:
        tb = draw.textbbox((0,0), txt.strip(), font=fn_badge)
        tw2 = tb[2]-tb[0] + 28
        th2 = tb[3]-tb[1] + 14
        rounded_rect(draw, [bx, by, bx+tw2, by+th2], radius=th2//2,
                     fill=(*color, 18), outline=border, width=1)
        draw.text((bx+14-tb[0], by+7-tb[1]), txt.strip(), font=fn_badge, fill=color)
        bx += tw2 + 12

    # ── ícone central (simulado com retângulo arredondado + símbolo) ──────
    ic_size = 90
    ic_x = cx + (cw - ic_size)//2
    ic_y = cy + int(ch * 0.28)
    rounded_rect(draw, [ic_x, ic_y, ic_x+ic_size, ic_y+ic_size],
                 radius=22, fill=(*NEON, 22), outline=(*NEON, 55), width=1)
    sym = "DB"
    sb = draw.textbbox((0,0), sym, font=f(30, bold=True))
    draw.text((ic_x + (ic_size-(sb[2]-sb[0]))//2-sb[0], ic_y+(ic_size-(sb[3]-sb[1]))//2-sb[1]),
              sym, font=f(30, bold=True), fill=NEON)

    # ── label TERMO ────────────────────────────────────────────────────────
    lbl = "TERMO"
    lb = draw.textbbox((0,0), lbl, font=fn_label)
    draw.text((cx+(cw-(lb[2]-lb[0]))//2-lb[0], ic_y+ic_size+22-lb[1]), lbl, font=fn_label, fill=TEXT_DIM)

    # ── texto principal ────────────────────────────────────────────────────
    term = "Normalização de\nBanco de Dados"
    ty_start = ic_y + ic_size + 64
    for line in term.split("\n"):
        tb2 = draw.textbbox((0,0), line, font=fn_term)
        draw.text((cx+(cw-(tb2[2]-tb2[0]))//2-tb2[0], ty_start-tb2[1]),
                  line, font=fn_term, fill=TEXT)
        ty_start += tb2[3]-tb2[1] + 8

    # ── matéria ────────────────────────────────────────────────────────────
    mat = "• Banco de Dados"
    mb2 = draw.textbbox((0,0), mat, font=fn_mat)
    draw.text((cx+(cw-(mb2[2]-mb2[0]))//2-mb2[0], ty_start+16-mb2[1]), mat, font=fn_mat, fill=TEXT_DIM)

    # ── hint e contador ────────────────────────────────────────────────────
    hint = "Toque para revelar  ↑"
    hb = draw.textbbox((0,0), hint, font=fn_hint)
    draw.text((cx+(cw-(hb[2]-hb[0]))//2-hb[0], cy+ch-52-hb[1]), hint, font=fn_hint, fill=(*TEXT_DIM, 150))

    cnt = "21 / 45"
    cb = draw.textbbox((0,0), cnt, font=fn_hint)
    draw.text((cx+cw-pad-(cb[2]-cb[0])-cb[0], cy+ch-52-cb[1]), cnt, font=fn_hint, fill=(*TEXT_DIM,150))


def _draw_card_back(draw, cx, cy, cw, ch, f):
    """Desenha o flashcard — verso."""
    rounded_rect(draw, [cx, cy, cx+cw, cy+ch],
                 radius=28, fill=CARD_BACK, outline=(*PURPLE_L, 90), width=3)
    draw.rounded_rectangle([cx+3, cy+3, cx+cw-3, cy+6+3], radius=3, fill=(*PURPLE_L, 50))

    pad = 32
    fn_badge = f(26, bold=True)
    fn_label = f(27, bold=False)
    fn_def   = f(36, bold=False)
    fn_hint  = f(25, bold=False)

    # badges
    bx, by = cx+pad, cy+pad
    for txt, color, border in [("CESPE", PURPLE_L, (*PURPLE_L,90)), ("  Médio  ", GOLD, (*GOLD,70))]:
        tb = draw.textbbox((0,0), txt.strip(), font=fn_badge)
        tw2 = tb[2]-tb[0]+28; th2 = tb[3]-tb[1]+14
        rounded_rect(draw, [bx, by, bx+tw2, by+th2], radius=th2//2,
                     fill=(*color,15), outline=border, width=1)
        draw.text((bx+14-tb[0], by+7-tb[1]), txt.strip(), font=fn_badge, fill=color)
        bx += tw2+12

    # ícone
    ic_size = 90
    ic_x = cx+(cw-ic_size)//2
    ic_y = cy+int(ch*0.27)
    rounded_rect(draw, [ic_x, ic_y, ic_x+ic_size, ic_y+ic_size],
                 radius=22, fill=(*PURPLE_L, 18), outline=(*PURPLE_L, 50), width=1)
    sym = "?"
    sb = draw.textbbox((0,0), sym, font=f(42, bold=True))
    draw.text((ic_x+(ic_size-(sb[2]-sb[0]))//2-sb[0], ic_y+(ic_size-(sb[3]-sb[1]))//2-sb[1]),
              sym, font=f(42, bold=True), fill=PURPLE_L)

    lbl = "DEFINIÇÃO"
    lb = draw.textbbox((0,0), lbl, font=fn_label)
    draw.text((cx+(cw-(lb[2]-lb[0]))//2-lb[0], ic_y+ic_size+22-lb[1]), lbl, font=fn_label, fill=PURPLE_L)

    # definição
    lines = [
        "Processo de organizar colunas",
        "e tabelas de um banco de dados",
        "relacional para reduzir dupli-",
        "cações e garantir integridade.",
    ]
    ty_s = ic_y + ic_size + 64
    for line in lines:
        lb2 = draw.textbbox((0,0), line, font=fn_def)
        draw.text((cx+(cw-(lb2[2]-lb2[0]))//2-lb2[0], ty_s-lb2[1]), line, font=fn_def, fill=TEXT)
        ty_s += lb2[3]-lb2[1]+6

    hint = "←  Revisar      Já sei  →"
    hb = draw.textbbox((0,0), hint, font=fn_hint)
    draw.text((cx+(cw-(hb[2]-hb[0]))//2-hb[0], cy+ch-52-hb[1]), hint, font=fn_hint, fill=(*TEXT_DIM,150))
    cnt = "21 / 45"
    cb = draw.textbbox((0,0), cnt, font=fn_hint)
    draw.text((cx+cw-pad-(cb[2]-cb[0])-cb[0], cy+ch-52-cb[1]), cnt, font=fn_hint, fill=(*TEXT_DIM,150))


def _draw_action_buttons(draw, W, y, f):
    """Desenha os botões de ação na base da tela."""
    pad = 40
    btn_h = 88
    btn_w = int((W - pad*2 - 84*2) / 2 + 30)

    # Revisar
    bx1 = pad
    rounded_rect(draw, [bx1, y, bx1+btn_w, y+btn_h],
                 radius=22, fill=(255,68,68,35), outline=(255,68,68,110), width=2)
    lbl1 = "✗  Revisar"
    lb = draw.textbbox((0,0), lbl1, font=f(32, bold=True))
    draw.text((bx1+(btn_w-(lb[2]-lb[0]))//2-lb[0], y+(btn_h-(lb[3]-lb[1]))//2-lb[1]),
              lbl1, font=f(32, bold=True), fill=RED)

    # Reset (centro)
    rc = W//2
    rr = 40
    draw.ellipse([rc-rr, y+4, rc+rr, y+btn_h-4], fill=(28,28,28), outline=(*BORDER,200), width=1)
    sym = "↺"
    sb = draw.textbbox((0,0), sym, font=f(38, bold=True))
    draw.text((rc-(sb[2]-sb[0])//2-sb[0], y+(btn_h-(sb[3]-sb[1]))//2-sb[1]),
              sym, font=f(38, bold=True), fill=TEXT_DIM)

    # Já Sei
    bx2 = W - pad - btn_w
    rounded_rect(draw, [bx2, y, bx2+btn_w, y+btn_h],
                 radius=22, fill=(0,255,65,28), outline=(0,255,65,110), width=2)
    lbl2 = "✓  Já Sei"
    lb2 = draw.textbbox((0,0), lbl2, font=f(32, bold=True))
    draw.text((bx2+(btn_w-(lb2[2]-lb2[0]))//2-lb2[0], y+(btn_h-(lb2[3]-lb2[1]))//2-lb2[1]),
              lbl2, font=f(32, bold=True), fill=NEON)

    return y + btn_h


def make_screenshot(index=1):
    """Screenshots simulando a tela do app (1080x1920)."""
    W, H = 1080, 1920
    img = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(img, 'RGBA')
    f = _load_fonts()

    # ── layout fixo de zonas ──────────────────────────────────────────────────
    BOTTOM_PAD = 32
    BTN_H      = 88
    PAD        = 40

    # header
    y = _draw_header(draw, W, f)
    y += 4
    # stats
    y = _draw_stats(draw, W, y, f)
    # progress
    y = _draw_progress(draw, W, y, f)
    y += 12

    # card ocupa o espaço restante menos os botões e padding
    card_x = PAD
    card_w = W - PAD * 2
    card_y = y
    card_h = H - BOTTOM_PAD - BTN_H - 20 - card_y
    # card sombra (próximo)
    shadow_off = 14
    rounded_rect(draw, [card_x + shadow_off, card_y + shadow_off,
                         card_x + card_w + shadow_off, card_y + card_h + shadow_off],
                 radius=28, fill=(20, 10, 35))

    if index == 1:
        _draw_card_front(draw, card_x, card_y, card_w, card_h, f)
    else:
        _draw_card_back(draw, card_x, card_y, card_w, card_h, f)

    # botões
    btn_y = H - BOTTOM_PAD - BTN_H
    _draw_action_buttons(draw, W, btn_y, f)

    return img


def make_screenshot_filters():
    """Screenshot do modal de filtros."""
    W, H = 1080, 1920
    base = make_screenshot(index=1)
    f = _load_fonts()

    # overlay
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 175))
    base.paste(overlay, (0, 0), overlay)
    draw = ImageDraw.Draw(base, 'RGBA')

    SHEET_H = 820
    sheet_y = H - SHEET_H
    pad = 48

    # sheet arredondada
    rounded_rect(draw, [0, sheet_y, W, H],
                 radius=36, fill=(24, 24, 24))
    # linha de alça
    draw.rounded_rectangle([W//2-40, sheet_y+16, W//2+40, sheet_y+22], radius=3, fill=(60,60,60))

    fn_title = f(52, bold=True)
    fn_sec   = f(26, bold=True)
    fn_chip  = f(30, bold=False)
    fn_btn   = f(36, bold=True)

    # título
    draw.text((pad, sheet_y + 44), "Filtros", font=fn_title, fill=TEXT)
    # X
    cx2, cy2, r2 = W-68, sheet_y+70, 32
    draw.ellipse([cx2-r2, cy2-r2, cx2+r2, cy2+r2], fill=(40,40,40))
    xb = draw.textbbox((0,0), "✕", font=f(32, bold=True))
    draw.text((cx2-(xb[2]-xb[0])//2-xb[0], cy2-(xb[3]-xb[1])//2-xb[1]), "✕", font=f(32,bold=True), fill=TEXT_DIM)

    def draw_chips(items, active_i, start_x, start_y, active_color):
        cx3, cy3 = start_x, start_y
        for i, item in enumerate(items):
            cb = draw.textbbox((0,0), item, font=fn_chip)
            cw2 = cb[2]-cb[0]+36
            ch2 = cb[3]-cb[1]+20
            if cx3 + cw2 > W - pad:
                cx3 = start_x
                cy3 += ch2 + 14
            active = (i == active_i)
            rounded_rect(draw, [cx3, cy3, cx3+cw2, cy3+ch2], radius=ch2//2,
                         fill=(*active_color, 35) if active else (38,38,38),
                         outline=(*active_color, 200) if active else (*BORDER,180),
                         width=2 if active else 1)
            draw.text((cx3+18-cb[0], cy3+10-cb[1]), item, font=fn_chip,
                      fill=active_color if active else TEXT_DIM)
            cx3 += cw2 + 12
        return cy3 + ch2

    # BANCA
    draw.text((pad, sheet_y + 130), "BANCA", font=fn_sec, fill=TEXT_DIM)
    y_after = draw_chips(["Todas","CESPE","FCC","FGV","IBFC"], 1, pad, sheet_y+172, NEON)

    # MATÉRIA
    draw.text((pad, y_after + 36), "MATÉRIA", font=fn_sec, fill=TEXT_DIM)
    y_after2 = draw_chips(["Todas","Banco de Dados","Redes","Segurança","SO"], 2, pad, y_after+76, NEON)

    # botão aplicar
    btn_top = H - 100
    rounded_rect(draw, [pad, btn_top, W-pad, btn_top+72], radius=20, fill=NEON)
    lbl = "Aplicar Filtros"
    lb = draw.textbbox((0,0), lbl, font=fn_btn)
    draw.text(((W-(lb[2]-lb[0]))//2-lb[0], btn_top+(72-(lb[3]-lb[1]))//2-lb[1]),
              lbl, font=fn_btn, fill=BG)

    return base


def make_tablet_screenshot(index=1, size="7"):
    """
    Screenshots para tablet.
    7" → 1200x1920 (9:16)
    10" → 1600x2560 (9:16)
    """
    W, H = (1200, 1920) if size == "7" else (1600, 2560)
    scale = W / 1080  # fator de escala relativo ao phone

    img = Image.new('RGB', (W, H), BG)
    draw = ImageDraw.Draw(img, 'RGBA')
    f = _load_fonts()

    def fs(base_size, bold=True):
        return f(max(12, int(base_size * scale)), bold)

    # ── helper local para rounded_rect ────────────────────────────────────────
    def rr(xy, radius, fill=None, outline=None, width=1):
        draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)

    BOTTOM_PAD = int(40 * scale)
    BTN_H      = int(96 * scale)
    PAD        = int(40 * scale)

    # ── Status bar ─────────────────────────────────────────────────────────────
    sb_h = int(56 * scale)
    draw.rectangle([0, 0, W, sb_h], fill=(15, 15, 15))
    draw.text((int(36*scale), int(14*scale)), "9:41", font=fs(26), fill=TEXT)
    draw.text((W - int(190*scale), int(14*scale)), "WiFi  ▮▮▮▮", font=fs(24, bold=False), fill=TEXT_DIM)

    # ── Header ─────────────────────────────────────────────────────────────────
    HDR_H = int(110 * scale)
    draw.rectangle([0, sb_h, W, sb_h + HDR_H], fill=(15, 15, 15))
    draw.rectangle([0, sb_h + HDR_H, W, sb_h + HDR_H + int(3*scale)], fill=(*NEON, 60))

    fnt_big = fs(52, bold=True)
    fnt_sub = fs(26, bold=False)
    y_hdr = sb_h + int(14 * scale)
    t1b = draw.textbbox((0,0), "FLASH", font=fnt_big)
    w1 = t1b[2]-t1b[0]
    t2b = draw.textbbox((0,0), "CARDS", font=fnt_big)
    w2 = t2b[2]-t2b[0]
    x0 = int(40 * scale)
    draw.text((x0, y_hdr - t1b[1]), "FLASH", font=fnt_big, fill=NEON)
    draw.text((x0 + w1, y_hdr - t2b[1]), "CARDS", font=fnt_big, fill=TEXT)
    t3b = draw.textbbox((0,0), " TI", font=fs(52, bold=False))
    draw.text((x0 + w1 + w2, y_hdr - t3b[1]), " TI", font=fs(52, bold=False), fill=TEXT_DIM)
    sb2 = draw.textbbox((0,0), "Concursos Públicos", font=fnt_sub)
    draw.text((x0, y_hdr + int(58*scale) - sb2[1]), "Concursos Públicos", font=fnt_sub, fill=TEXT_DIM)
    # botão filtro
    fc = W - int(66*scale)
    fr = int(32*scale)
    draw.ellipse([fc-fr, y_hdr+int(8*scale), fc+fr, y_hdr+int(8*scale)+fr*2],
                 fill=(28,28,28), outline=(*BORDER,200), width=1)
    fib = draw.textbbox((0,0), "≡", font=fs(34, bold=True))
    draw.text((fc - (fib[2]-fib[0])//2, y_hdr + int(8*scale)+fr//2), "≡", font=fs(34, bold=True), fill=TEXT_DIM)

    y = sb_h + HDR_H + int(3*scale)

    # ── Stats bar ──────────────────────────────────────────────────────────────
    SB_H = int(80 * scale)
    draw.rectangle([0, y, W, y + SB_H], fill=(20, 20, 20))
    draw.rectangle([0, y + SB_H - 1, W, y + SB_H], fill=(*BORDER, 120))
    fnum = fs(40, bold=True)
    flbl = fs(24, bold=False)
    col_w = W // 3
    for col, val, lbl_t, color in [
        (0, "12", "Já Sei", NEON),
        (1, "45", "Total",  TEXT_DIM),
        (2, "8",  "Revisar", RED),
    ]:
        vb = draw.textbbox((0,0), val, font=fnum)
        vw = vb[2]-vb[0]
        lbb = draw.textbbox((0,0), lbl_t, font=flbl)
        total_w = vw + 8 + (lbb[2]-lbb[0])
        start_x = col*col_w + (col_w - total_w)//2
        draw.text((start_x - vb[0], y + int(10*scale) - vb[1]), val, font=fnum, fill=color)
        draw.text((start_x + vw + 8, y + int(20*scale) - lbb[1]), lbl_t, font=flbl, fill=TEXT_DIM)
    draw.line([col_w,   y+int(16*scale), col_w,   y+SB_H-int(16*scale)], fill=(*BORDER,180), width=1)
    draw.line([col_w*2, y+int(16*scale), col_w*2, y+SB_H-int(16*scale)], fill=(*BORDER,180), width=1)
    y += SB_H

    # ── Progress bar ───────────────────────────────────────────────────────────
    PB_H = int(100 * scale)
    draw.rectangle([0, y, W, y + PB_H], fill=(18, 18, 18))
    fn_num = fs(44, bold=True)
    fn_lbl = fs(25, bold=False)
    fn_pct = fs(28, bold=True)
    rem_b = draw.textbbox((0,0), "25", font=fn_num)
    draw.text((PAD - rem_b[0], y + int(12*scale) - rem_b[1]), "25", font=fn_num, fill=TEXT)
    lbl_b = draw.textbbox((0,0), "cards restantes", font=fn_lbl)
    draw.text((PAD + (rem_b[2]-rem_b[0]) + int(8*scale), y + int(22*scale) - lbl_b[1]),
              "cards restantes", font=fn_lbl, fill=TEXT_DIM)
    done_s = "20 concluídos"
    db = draw.textbbox((0,0), done_s, font=fn_lbl)
    draw.text((W - PAD - (db[2]-db[0]) - db[0], y + int(12*scale) - db[1]), done_s, font=fn_lbl, fill=TEXT_DIM)
    pct_b = draw.textbbox((0,0), "44%", font=fn_pct)
    draw.text((W - PAD - (pct_b[2]-pct_b[0]) - pct_b[0], y + int(42*scale) - pct_b[1]),
              "44%", font=fn_pct, fill=NEON)
    track_y = y + int(74*scale)
    track_h = int(10*scale)
    draw.rounded_rectangle([PAD, track_y, W-PAD, track_y+track_h], radius=track_h//2, fill=(38,38,38))
    fill_w = int((W - PAD*2) * 0.44)
    draw.rounded_rectangle([PAD, track_y, PAD+fill_w, track_y+track_h], radius=track_h//2, fill=NEON)
    y += PB_H + int(12*scale)

    # ── Card ───────────────────────────────────────────────────────────────────
    card_x = PAD
    card_w = W - PAD * 2
    card_y = y
    card_h = H - BOTTOM_PAD - BTN_H - int(20*scale) - card_y

    # sombra
    so = int(14*scale)
    draw.rounded_rectangle([card_x+so, card_y+so, card_x+card_w+so, card_y+card_h+so],
                            radius=int(28*scale), fill=(20, 10, 35))

    # funções de card escalam via fs
    def _rr_card(xy, radius, fill=None, outline=None, width=1):
        draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)

    if index == 1:
        # frente
        _rr_card([card_x, card_y, card_x+card_w, card_y+card_h],
                 radius=int(28*scale), fill=SURFACE, outline=(*NEON, 90), width=int(3*scale))
        draw.rounded_rectangle([card_x+3, card_y+3, card_x+card_w-3, card_y+int(9*scale)],
                                radius=3, fill=(*NEON, 60))
        # badges
        bx, by = card_x + int(32*scale), card_y + int(32*scale)
        for txt, color, bc in [("CESPE", NEON, (*NEON,100)), ("Médio", GOLD, (*GOLD,80))]:
            tb = draw.textbbox((0,0), txt, font=fs(26, bold=True))
            tw2 = tb[2]-tb[0]+int(28*scale); th2 = tb[3]-tb[1]+int(14*scale)
            _rr_card([bx,by,bx+tw2,by+th2], radius=th2//2, fill=(*color,18), outline=bc, width=1)
            draw.text((bx+int(14*scale)-tb[0], by+int(7*scale)-tb[1]), txt, font=fs(26,bold=True), fill=color)
            bx += tw2 + int(12*scale)
        # ícone
        ic = int(90*scale)
        ix = card_x + (card_w - ic)//2
        iy = card_y + int(card_h*0.28)
        _rr_card([ix,iy,ix+ic,iy+ic], radius=int(22*scale), fill=(*NEON,22), outline=(*NEON,55), width=1)
        sym_b = draw.textbbox((0,0), "DB", font=fs(30, bold=True))
        draw.text((ix+(ic-(sym_b[2]-sym_b[0]))//2-sym_b[0], iy+(ic-(sym_b[3]-sym_b[1]))//2-sym_b[1]),
                  "DB", font=fs(30, bold=True), fill=NEON)
        # TERMO
        lb = draw.textbbox((0,0), "TERMO", font=fs(27, bold=False))
        draw.text((card_x+(card_w-(lb[2]-lb[0]))//2-lb[0], iy+ic+int(22*scale)-lb[1]),
                  "TERMO", font=fs(27, bold=False), fill=TEXT_DIM)
        # termo
        fn_term = fs(52, bold=True)
        ty_s = iy + ic + int(64*scale)
        for line in ["Normalização de", "Banco de Dados"]:
            tb2 = draw.textbbox((0,0), line, font=fn_term)
            draw.text((card_x+(card_w-(tb2[2]-tb2[0]))//2-tb2[0], ty_s-tb2[1]), line, font=fn_term, fill=TEXT)
            ty_s += tb2[3]-tb2[1]+int(8*scale)
        # matéria
        mb = draw.textbbox((0,0), "• Banco de Dados", font=fs(27, bold=False))
        draw.text((card_x+(card_w-(mb[2]-mb[0]))//2-mb[0], ty_s+int(16*scale)-mb[1]),
                  "• Banco de Dados", font=fs(27, bold=False), fill=TEXT_DIM)
        # hints
        hint = "Toque para revelar  ↑"
        hb = draw.textbbox((0,0), hint, font=fs(25, bold=False))
        draw.text((card_x+(card_w-(hb[2]-hb[0]))//2-hb[0], card_y+card_h-int(52*scale)-hb[1]),
                  hint, font=fs(25, bold=False), fill=(*TEXT_DIM,150))
        cnt = "21 / 45"
        cb = draw.textbbox((0,0), cnt, font=fs(25, bold=False))
        draw.text((card_x+card_w-int(32*scale)-(cb[2]-cb[0])-cb[0], card_y+card_h-int(52*scale)-cb[1]),
                  cnt, font=fs(25, bold=False), fill=(*TEXT_DIM,150))

    else:
        # verso
        _rr_card([card_x, card_y, card_x+card_w, card_y+card_h],
                 radius=int(28*scale), fill=CARD_BACK, outline=(*PURPLE_L, 90), width=int(3*scale))
        draw.rounded_rectangle([card_x+3, card_y+3, card_x+card_w-3, card_y+int(9*scale)],
                                radius=3, fill=(*PURPLE_L, 50))
        bx, by = card_x + int(32*scale), card_y + int(32*scale)
        for txt, color, bc in [("CESPE", PURPLE_L, (*PURPLE_L,90)), ("Médio", GOLD, (*GOLD,70))]:
            tb = draw.textbbox((0,0), txt, font=fs(26, bold=True))
            tw2 = tb[2]-tb[0]+int(28*scale); th2 = tb[3]-tb[1]+int(14*scale)
            _rr_card([bx,by,bx+tw2,by+th2], radius=th2//2, fill=(*color,15), outline=bc, width=1)
            draw.text((bx+int(14*scale)-tb[0], by+int(7*scale)-tb[1]), txt, font=fs(26,bold=True), fill=color)
            bx += tw2 + int(12*scale)
        ic = int(90*scale)
        ix = card_x + (card_w - ic)//2
        iy = card_y + int(card_h*0.27)
        _rr_card([ix,iy,ix+ic,iy+ic], radius=int(22*scale), fill=(*PURPLE_L,18), outline=(*PURPLE_L,50), width=1)
        sym_b = draw.textbbox((0,0), "?", font=fs(42, bold=True))
        draw.text((ix+(ic-(sym_b[2]-sym_b[0]))//2-sym_b[0], iy+(ic-(sym_b[3]-sym_b[1]))//2-sym_b[1]),
                  "?", font=fs(42, bold=True), fill=PURPLE_L)
        lb = draw.textbbox((0,0), "DEFINIÇÃO", font=fs(27, bold=False))
        draw.text((card_x+(card_w-(lb[2]-lb[0]))//2-lb[0], iy+ic+int(22*scale)-lb[1]),
                  "DEFINIÇÃO", font=fs(27, bold=False), fill=PURPLE_L)
        fn_def = fs(36, bold=False)
        ty_s = iy + ic + int(64*scale)
        for line in ["Processo de organizar colunas", "e tabelas de um banco de dados",
                     "relacional para reduzir dupli-", "cações e garantir integridade."]:
            lb2 = draw.textbbox((0,0), line, font=fn_def)
            draw.text((card_x+(card_w-(lb2[2]-lb2[0]))//2-lb2[0], ty_s-lb2[1]), line, font=fn_def, fill=TEXT)
            ty_s += lb2[3]-lb2[1]+int(6*scale)
        hint = "←  Revisar      Já sei  →"
        hb = draw.textbbox((0,0), hint, font=fs(25, bold=False))
        draw.text((card_x+(card_w-(hb[2]-hb[0]))//2-hb[0], card_y+card_h-int(52*scale)-hb[1]),
                  hint, font=fs(25, bold=False), fill=(*TEXT_DIM,150))

    # ── Botões ─────────────────────────────────────────────────────────────────
    btn_y = H - BOTTOM_PAD - BTN_H
    btn_w = int((W - PAD*2 - int(84*scale)*2) / 2 + int(30*scale))
    bx1 = PAD
    draw.rounded_rectangle([bx1, btn_y, bx1+btn_w, btn_y+BTN_H],
                            radius=int(22*scale), fill=(255,68,68,35), outline=(255,68,68,110), width=2)
    l1b = draw.textbbox((0,0), "✗  Revisar", font=fs(32, bold=True))
    draw.text((bx1+(btn_w-(l1b[2]-l1b[0]))//2-l1b[0], btn_y+(BTN_H-(l1b[3]-l1b[1]))//2-l1b[1]),
              "✗  Revisar", font=fs(32, bold=True), fill=RED)
    rc = W//2; rr_r = int(40*scale)
    draw.ellipse([rc-rr_r, btn_y+4, rc+rr_r, btn_y+BTN_H-4], fill=(28,28,28), outline=(*BORDER,200), width=1)
    sb3 = draw.textbbox((0,0), "↺", font=fs(38, bold=True))
    draw.text((rc-(sb3[2]-sb3[0])//2-sb3[0], btn_y+(BTN_H-(sb3[3]-sb3[1]))//2-sb3[1]),
              "↺", font=fs(38, bold=True), fill=TEXT_DIM)
    bx2 = W - PAD - btn_w
    draw.rounded_rectangle([bx2, btn_y, bx2+btn_w, btn_y+BTN_H],
                            radius=int(22*scale), fill=(0,255,65,28), outline=(0,255,65,110), width=2)
    l2b = draw.textbbox((0,0), "✓  Já Sei", font=fs(32, bold=True))
    draw.text((bx2+(btn_w-(l2b[2]-l2b[0]))//2-l2b[0], btn_y+(BTN_H-(l2b[3]-l2b[1]))//2-l2b[1]),
              "✓  Já Sei", font=fs(32, bold=True), fill=NEON)

    return img


def make_tablet_screenshot_filters(size="7"):
    """Screenshot do modal de filtros para tablet."""
    W, H = (1200, 1920) if size == "7" else (1600, 2560)
    scale = W / 1080
    base = make_tablet_screenshot(index=1, size=size)
    f = _load_fonts()

    def fs(base_size, bold=True):
        return f(max(12, int(base_size * scale)), bold)

    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 175))
    base.paste(overlay, (0, 0), overlay)
    draw = ImageDraw.Draw(base, 'RGBA')

    SHEET_H = int(820 * scale)
    sheet_y = H - SHEET_H
    pad = int(48 * scale)

    draw.rounded_rectangle([0, sheet_y, W, H], radius=int(36*scale), fill=(24, 24, 24))
    draw.rounded_rectangle([W//2-int(40*scale), sheet_y+int(16*scale),
                              W//2+int(40*scale), sheet_y+int(22*scale)],
                             radius=3, fill=(60,60,60))

    fn_title = fs(52, bold=True)
    fn_sec   = fs(26, bold=True)
    fn_chip  = fs(30, bold=False)
    fn_btn   = fs(36, bold=True)

    draw.text((pad, sheet_y + int(44*scale)), "Filtros", font=fn_title, fill=TEXT)
    cx2 = W - int(68*scale); cy2 = sheet_y + int(70*scale); r2 = int(32*scale)
    draw.ellipse([cx2-r2, cy2-r2, cx2+r2, cy2+r2], fill=(40,40,40))
    xb = draw.textbbox((0,0), "✕", font=fs(32, bold=True))
    draw.text((cx2-(xb[2]-xb[0])//2-xb[0], cy2-(xb[3]-xb[1])//2-xb[1]),
              "✕", font=fs(32,bold=True), fill=TEXT_DIM)

    def draw_chips(items, active_i, sx, sy, ac):
        cx3, cy3 = sx, sy
        last_h = 0
        for i, item in enumerate(items):
            cb = draw.textbbox((0,0), item, font=fn_chip)
            cw2 = cb[2]-cb[0]+int(36*scale)
            ch2 = cb[3]-cb[1]+int(20*scale)
            if cx3 + cw2 > W - pad:
                cx3 = sx; cy3 += ch2 + int(14*scale)
            active = (i == active_i)
            draw.rounded_rectangle([cx3,cy3,cx3+cw2,cy3+ch2], radius=ch2//2,
                         fill=(*ac,35) if active else (38,38,38),
                         outline=(*ac,200) if active else (*BORDER,180),
                         width=2 if active else 1)
            draw.text((cx3+int(18*scale)-cb[0], cy3+int(10*scale)-cb[1]),
                      item, font=fn_chip, fill=ac if active else TEXT_DIM)
            cx3 += cw2 + int(12*scale)
            last_h = ch2
        return cy3 + last_h

    draw.text((pad, sheet_y + int(130*scale)), "BANCA", font=fn_sec, fill=TEXT_DIM)
    y_a = draw_chips(["Todas","CESPE","FCC","FGV","IBFC"], 1, pad, sheet_y+int(172*scale), NEON)
    draw.text((pad, y_a + int(36*scale)), "MATÉRIA", font=fn_sec, fill=TEXT_DIM)
    draw_chips(["Todas","Banco de Dados","Redes","Segurança","SO"], 2, pad, y_a+int(76*scale), NEON)

    btn_top = H - int(100*scale)
    draw.rounded_rectangle([pad, btn_top, W-pad, btn_top+int(72*scale)],
                            radius=int(20*scale), fill=NEON)
    lbl = "Aplicar Filtros"
    lb = draw.textbbox((0,0), lbl, font=fn_btn)
    draw.text(((W-(lb[2]-lb[0]))//2-lb[0], btn_top+(int(72*scale)-(lb[3]-lb[1]))//2-lb[1]),
              lbl, font=fn_btn, fill=BG)

    return base


def main():
    os.makedirs("assets", exist_ok=True)
    os.makedirs("assets/store", exist_ok=True)

    print("Gerando icon.png (1024x1024)...")
    icon = make_icon(1024)
    icon.save("assets/icon.png")

    print("Gerando adaptive-icon.png (1024x1024)...")
    icon.save("assets/adaptive-icon.png")

    print("Gerando store-icon.png (512x512)...")
    store_icon = make_icon(512)
    store_icon_rgb = Image.new("RGB", (512, 512), BG)
    store_icon_rgb.paste(store_icon, (0, 0), store_icon)
    store_icon_rgb.save("assets/store/store-icon.png")

    print("Gerando feature-graphic.png (1024x500)...")
    fg = make_feature_graphic()
    fg.save("assets/store/feature-graphic.png")

    print("Gerando splash.png (1284x2778)...")
    splash = make_splash()
    splash.save("assets/splash.png")

    print("Gerando screenshot-1 (card frente)...")
    s1 = make_screenshot(index=1)
    s1.save("assets/store/screenshot-1.png")

    print("Gerando screenshot-2 (card verso)...")
    s2 = make_screenshot(index=2)
    s2.save("assets/store/screenshot-2.png")

    print("Gerando screenshot-3 (filtros)...")
    s3 = make_screenshot_filters()
    s3.save("assets/store/screenshot-3.png")

    # ── Tablet 7" (1200x1920) ─────────────────────────────────────────────────
    print("Gerando tablet-7in-1 (frente do card)...")
    t7_1 = make_tablet_screenshot(index=1, size="7")
    t7_1.save("assets/store/tablet-7in-1.png")

    print("Gerando tablet-7in-2 (verso do card)...")
    t7_2 = make_tablet_screenshot(index=2, size="7")
    t7_2.save("assets/store/tablet-7in-2.png")

    print("Gerando tablet-7in-3 (filtros)...")
    t7_3 = make_tablet_screenshot_filters(size="7")
    t7_3.save("assets/store/tablet-7in-3.png")

    # ── Tablet 10" (1600x2560) ────────────────────────────────────────────────
    print("Gerando tablet-10in-1 (frente do card)...")
    t10_1 = make_tablet_screenshot(index=1, size="10")
    t10_1.save("assets/store/tablet-10in-1.png")

    print("Gerando tablet-10in-2 (verso do card)...")
    t10_2 = make_tablet_screenshot(index=2, size="10")
    t10_2.save("assets/store/tablet-10in-2.png")

    print("Gerando tablet-10in-3 (filtros)...")
    t10_3 = make_tablet_screenshot_filters(size="10")
    t10_3.save("assets/store/tablet-10in-3.png")

    print("\nAssets gerados com sucesso:")
    print("  assets/icon.png               — ícone do app (1024x1024)")
    print("  assets/adaptive-icon.png      — ícone adaptativo Android (1024x1024)")
    print("  assets/splash.png             — splash screen (1284x2778)")
    print("  assets/store/store-icon.png   — ícone Play Store (512x512)")
    print("  assets/store/feature-graphic.png — feature graphic (1024x500)")
    print("  assets/store/screenshot-1.png — screenshot frente do card (phone)")
    print("  assets/store/screenshot-2.png — screenshot verso do card (phone)")
    print("  assets/store/screenshot-3.png — screenshot filtros (phone)")
    print("  assets/store/tablet-7in-1.png — tablet 7\" frente (1200x1920)")
    print("  assets/store/tablet-7in-2.png — tablet 7\" verso (1200x1920)")
    print("  assets/store/tablet-7in-3.png — tablet 7\" filtros (1200x1920)")
    print("  assets/store/tablet-10in-1.png — tablet 10\" frente (1600x2560)")
    print("  assets/store/tablet-10in-2.png — tablet 10\" verso (1600x2560)")
    print("  assets/store/tablet-10in-3.png — tablet 10\" filtros (1600x2560)")


if __name__ == "__main__":
    main()
