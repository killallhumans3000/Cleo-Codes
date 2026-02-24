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

## 🔤 Typografie-Tokens

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--font-family-primary` | `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` | ⬜ | Haupt-Font | Alle Text-Elemente |
| `--font-family-secondary` | `'Georgia', serif` | ⬜ | Sekundär-Font | Headlines (optional) |
| `--font-size-h1` | `2.5rem` | ⬜ | H1 Größe | Seiten-Titel |
| `--font-size-h2` | `2rem` | ⬜ | H2 Größe | Bereich-Titel |
| `--font-size-h3` | `1.5rem` | ⬜ | H3 Größe | Unterbereich-Titel |
| `--font-size-h4` | `1.25rem` | ⬜ | H4 Größe | Kleine Titel |
| `--font-size-body` | `1rem` | ⬜ | Body Text | Standard Paragraph |
| `--font-size-small` | `0.875rem` | ⬜ | Kleine Text | Labels, Hints |
| `--font-size-tiny` | `0.75rem` | ⬜ | Kleinste Text | Footnotes |
| `--font-weight-light` | `300` | ⬜ | Dünne Schrift | - |
| `--font-weight-regular` | `400` | ⬜ | Normal Schrift | Standard |
| `--font-weight-medium` | `500` | ⬜ | Mittlere Schrift | - |
| `--font-weight-bold` | `700` | ⬜ | Fettschrift | Highlights |
| `--line-height-tight` | `1.2` | ⬜ | Enge Zeilen | Headlines |
| `--line-height-normal` | `1.5` | ⬜ | Normale Zeilen | Body Text |
| `--line-height-relaxed` | `1.8` | ⬜ | Lockere Zeilen | Lesbar Text |

---

## 📏 Abstands-Tokens (Spacing)

| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--space-xs` | `0.25rem` | ⬜ | 4px | Sehr kleine Abstände |
| `--space-sm` | `0.5rem` | ⬜ | 8px | Kleine Abstände |
| `--space-md` | `1rem` | ⬜ | 16px | Standard Abstand |
| `--space-lg` | `1.5rem` | ⬜ | 24px | Große Abstände |
| `--space-xl` | `2rem` | ⬜ | 32px | Sehr große Abstände |
| `--space-xxl` | `3rem` | ⬜ | 48px | Größter Abstand |
| `--space-xxxl` | `4rem` | ⬜ | 64px | Riesiger Abstand |

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

- **Figma Link:** [Hier Figma Design Link einfügen]
- **Letztes Update:** 2026-02-24
- **Aktualisiert durch:** [Name]

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
