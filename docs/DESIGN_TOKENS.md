# Design Tokens - Cleo-Codes Brix Builder Theme

Alle Design-Eigenschaften werden hier zentral dokumentiert und in CSS-Variablen umgewandelt. Diese Tokens kommen entweder von **Figma Design** oder werden **manuell definiert**.

---

## 📋 Farb-Tokens

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--color-primary` | `#` | ⬜ | Primärfarbe (CTA, Links) | Buttons, Links, Akzente |
| `--color-secondary` | `#` | ⬜ | Sekundärfarbe | Hover-States, Accents |
| `--color-success` | `#` | ⬜ | Erfolgs-Grün | Success-Messages, Checkmarks |
| `--color-warning` | `#` | ⬜ | Warnungs-Orange | Warnings, Alerts |
| `--color-error` | `#` | ⬜ | Fehler-Rot | Error-Messages, Validierung |
| `--color-info` | `#` | ⬜ | Info-Blau | Info-Messages, Tooltips |
| `--color-text` | `#000000` | ⬜ | Standard Text | Alle Text-Elemente |
| `--color-text-light` | `#666666` | ⬜ | Heller Text | Sekundärer Text, Labels |
| `--color-text-lighter` | `#999999` | ⬜ | Sehr heller Text | Placeholder, Hints |
| `--color-bg` | `#FFFFFF` | ⬜ | Hintergrund | Body Background |
| `--color-bg-light` | `#F5F5F5` | ⬜ | Heller Hintergrund | Sections, Cards |
| `--color-bg-lighter` | `#FAFAFA` | ⬜ | Sehr heller Hintergrund | Hover-States |
| `--color-border` | `#E0E0E0` | ⬜ | Border-Farbe | Linien, Divider |
| `--color-shadow` | `rgba(0,0,0,0.1)` | ⬜ | Shadow-Farbe | Shadows, Depth |

---

## 🔤 Typografie-Tokens - Fluid Typography

**Neue Fluid Properties von Figma Design (2026-03-03)**
- Mobile: 14px base, 12px small
- Desktop: 16px base, 13px small
- Headlines: 3em, 2.5em, 2.1em, 1.7em, 1.4em, 1.2em

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--font-family-primary` | `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` | ⬜ | Haupt-Font | Alle Text-Elemente |
| `--font-family-secondary` | `'Georgia', serif` | ⬜ | Sekundär-Font | Headlines (optional) |
| `--font-size-h1` | `clamp(2rem, 5vw, 3rem)` | ✅ | H1 Größe - Fluid | Seiten-Titel |
| `--font-size-h2` | `clamp(1.8em, 4vw, 2.5em)` | ✅ | H2 Größe - Fluid | Bereich-Titel |
| `--font-size-h3` | `clamp(1.3em, 3vw, 2.1em)` | ✅ | H3 Größe - Fluid | Unterbereich-Titel |
| `--font-size-h4` | `clamp(1em, 2.2vw, 1.7em)` | ✅ | H4 Größe - Fluid | Kleine Titel |
| `--font-size-body` | `clamp(14px, 1.6vw, 16px)` | ✅ | Body Text - Fluid | Standard Paragraph |
| `--font-size-small` | `clamp(11px, 1.3vw, 13px)` | ✅ | Kleine Text - Fluid | Labels, Hints |
| `--font-size-tiny` | `clamp(10px, 1.1vw, 12px)` | ✅ | Kleinste Text - Fluid | Footnotes |
| `--font-weight-light` | `300` | ⬜ | Dünne Schrift | - |
| `--font-weight-regular` | `400` | ⬜ | Normal Schrift | Standard |
| `--font-weight-medium` | `500` | ⬜ | Mittlere Schrift | - |
| `--font-weight-bold` | `700` | ⬜ | Fettschrift | Highlights |
| `--line-height-tight` | `1.2` | ⬜ | Enge Zeilen | Headlines |
| `--line-height-normal` | `1.5` | ⬜ | Normale Zeilen | Body Text |
| `--line-height-relaxed` | `1.8` | ⬜ | Lockere Zeilen | Lesbar Text |

---

## 📏 Abstands-Tokens (Spacing) - Fluid Properties

**Neue Fluid Spacings von Figma Design (2026-03-03)**
- Breakpoints: Mobile 280-768px, Tablet 768-1024px, Desktop 1024-1920px
- Desktop-Werte: 8px, 10px, 16px, 20px, 28px, 40px, 64px, 130px, 150px

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--space-xxs` | `clamp(6px, 1vw, 8px)` | ✅ | XXS (8px) - Fluid | Sehr kleine Abstände |
| `--space-xs` | `clamp(8px, 1.2vw, 10px)` | ✅ | XS (10px) - Fluid | Kleine Abstände |
| `--space-sm` | `clamp(12px, 2vw, 16px)` | ✅ | SM (16px) - Fluid | Standard Abstand |
| `--space-md` | `clamp(16px, 2.4vw, 20px)` | ✅ | Normal (20px) - Fluid | Standard Abstand |
| `--space-lg` | `clamp(22px, 3.2vw, 28px)` | ✅ | MD (28px) - Fluid | Große Abstände |
| `--space-xl` | `clamp(32px, 4.8vw, 40px)` | ✅ | LG (40px) - Fluid | Sehr große Abstände |
| `--space-xxl` | `clamp(52px, 7.2vw, 64px)` | ✅ | XL (64px) - Fluid | Größter Abstand |
| `--space-xxxl` | `clamp(104px, 14.8vw, 130px)` | ✅ | 2XL (130px) - Fluid | Sehr großer Abstand |
| `--space-4xl` | `clamp(120px, 17vw, 150px)` | ✅ | 3XL (150px) - Fluid | Riesiger Abstand |

---

## 🎨 Border & Radius Tokens

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--border-width` | `1px` | ⬜ | Standard Border | Normale Linien |
| `--border-width-thick` | `2px` | ⬜ | Dicker Border | Highlights |
| `--border-radius-sm` | `4px` | ⬜ | Kleine Ecken | Buttons, Inputs |
| `--border-radius-md` | `8px` | ⬜ | Standard Ecken | Cards, Modals |
| `--border-radius-lg` | `12px` | ⬜ | Große Ecken | - |
| `--border-radius-full` | `9999px` | ⬜ | Vollständig rund | Pills, Badges |

---

## ⚡ Schatten-Tokens (Shadows)

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | ⬜ | Leichter Schatten | Subtle Depth |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | ⬜ | Standard Schatten | Cards, Buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.15)` | ⬜ | Großer Schatten | Modals, Dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.2)` | ⬜ | Sehr großer Schatten | Overlays |

---

## 📱 Responsive Breakpoints

| Token Name | Wert | Figma? | Beschreibung |
|-----------|------|--------|------------|
| `--breakpoint-xs` | `320px` | ⬜ | Mobile |
| `--breakpoint-sm` | `576px` | ⬜ | Mobile Landscape |
| `--breakpoint-md` | `768px` | ⬜ | Tablet |
| `--breakpoint-lg` | `1024px` | ⬜ | Desktop |
| `--breakpoint-xl` | `1280px` | ⬜ | Large Desktop |
| `--breakpoint-xxl` | `1536px` | ⬜ | Ultra-wide |

---

## ✨ Animation-Tokens

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--transition-fast` | `150ms` | ⬜ | Schnelle Animation | Quick Interactions |
| `--transition-normal` | `300ms` | ⬜ | Normale Animation | Standard Übergänge |
| `--transition-slow` | `500ms` | ⬜ | Langsame Animation | Smooth Effects |
| `--ease-linear` | `linear` | ⬜ | Lineare Kurve | - |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | ⬜ | Sanfte Kurve | Standard |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | ⬜ | Exit Kurve | Fade Out |

---

## 📝 Anleitung

### Neue Tokens hinzufügen:

1. **Wert von Figma kopieren oder manuell definieren**
2. **In diese Tabelle eintragen:**
   - Token Name: `--category-property`
   - Wert: Der aktuelle Wert
   - Figma? Markieren mit ✅ oder ⬜
   - Beschreibung: Was ist das?
   - Verwendung: Wo wird es verwendet?

3. **Token in die CSS-Datei eintragen:**
   ```css
   :root {
     --new-token: value;
   }
   ```

4. **Commit mit aussagekräftiger Message:**
   ```
   feat: Neue Design Tokens - [Token Namen]
   - Token von Figma: [Design-Link oder Beschreibung]
   ```

---

## 🔗 Verknüpfung mit Figma

- **Figma Link:** https://www.figma.com/design/Pu1e7x64fT48lwuznnO55D/Weber-Verpackungen-_-Screendesign
- **Letztes Update:** 2026-03-03
- **Aktualisiert durch:** Claude Code
- **Update:** Fluid Properties für Spacings & Typography von Figma Design implementiert

---

## 💡 Best Practices

✅ **Sollte getan werden:**
- Konsistente Naming Convention: `--category-property`
- Alle Werte dokumentieren
- Tokens vor CSS-Einsatz definieren
- Design-System einhalten
- Regelmäßig mit Figma synchronisieren

❌ **Nicht machen:**
- Hard-coded Werte nutzen (statt Tokens)
- Tokens ohne Dokumentation
- Naming Standards ignorieren
- Werte ohne Grund ändern
