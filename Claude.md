# Cleo-Codes - Brix Builder Theme

## 📋 Projektbeschreibung

Cleo-Codes ist ein **wiederverwendbares Brix Builder Theme**, das auf festen Design-Vorgaben des Design Teams basiert. Es transformiert diese Designvorgaben in ein flexibles, reaktives Template-System für schnelle und konsistente Website-Entwicklung.

**Ziel:** Ein modulares, responsive Brix Builder Theme mit exzellenter UX/UI schaffen, das als Template für mehrere Projekte einsetzbar ist.

---

## 🎯 Kernmerkmale & Anforderungen

### Funktional
- ✅ Responsive Design (Mobile-First Approach)
- ✅ Optimiert für Mobilgeräte, Tablets und Desktop
- ✅ Wiederverwendbare Komponenten & Pattern Library
- ✅ Konsistent mit Design-Richtlinien des Teams
- ✅ Performance-optimiert

### Code Quality
- ✅ PHP Best Practices (2026 Standard)
- ✅ Klare, wartbare Code-Struktur
- ✅ Gute Dokumentation
- ✅ Semantisches HTML5
- ✅ Accessibility (WCAG 2.1 AA)

### UX/UI
- ✅ Intuitive User Interface
- ✅ Gute User Experience
- ✅ Schnelle Ladezeiten
- ✅ Smooth Interactions & Transitions
- ✅ Konsistente Design Language

---

## 🛠️ Technologie-Stack

| Komponente | Technologie |
|-----------|------------|
| **CMS** | WordPress |
| **Page Builder** | Brix Builder |
| **Sprache** | PHP 8.0+ |
| **CSS** | SCSS/CSS3 (Mobile-First) |
| **JavaScript** | Vanilla JS / Moderne ES6+ (kein jQuery) |
| **Versionskontrolle** | Git |

---

## 📁 Projektstruktur

```
cleo-codes/
├── Claude.md                    # Dieses Dokument
├── README.md                    # Projekt-Übersicht
├── theme/
│   ├── brix-theme/
│   │   ├── functions.php        # Theme-Funktionen & Hooks
│   │   ├── style.css            # Haupt-CSS
│   │   ├── index.php            # Template-Fallback
│   │   └── screenshot.png       # Theme-Screenshot
│   ├── includes/
│   │   ├── helpers.php          # Helper-Funktionen
│   │   ├── setup.php            # Theme Setup & Registrierung
│   │   ├── enqueue.php          # CSS/JS laden
│   │   └── customizer.php       # Theme Customizer
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.scss        # Haupt-Styles
│   │   │   ├── components.scss  # Komponenten
│   │   │   ├── responsive.scss  # Media Queries
│   │   │   └── variables.scss   # SCSS Variablen
│   │   ├── js/
│   │   │   ├── main.js          # Haupt-JavaScript
│   │   │   └── components/      # JS-Komponenten
│   │   └── images/
│   │       └── svg/             # SVG-Icons & Grafiken
│   ├── templates/
│   │   ├── brix-components/     # Brix Builder Komponenten
│   │   └── pages/               # Seiten-Templates
│   └── config/
│       ├── breakpoints.scss     # Responsive Breakpoints
│       └── colors.scss          # Design-Farben
├── docs/
│   ├── DESIGN_GUIDELINES.md     # Design-Richtlinien
│   ├── SETUP.md                 # Setup-Anleitung
│   └── COMPONENT_LIBRARY.md     # Komponenten-Dokumentation
├── tests/
│   └── README.md                # Test-Dokumentation
└── .gitignore
```

---

## 🚀 Setup & Installation

### Voraussetzungen
- WordPress 6.0+
- PHP 8.0+
- Brix Builder installiert
- Git

### Installation

```bash
# 1. Repository klonen
git clone [REPO_URL] cleo-codes
cd cleo-codes

# 2. Theme im WordPress installieren
cp -r theme/brix-theme /path/to/wordpress/wp-content/themes/

# 3. WordPress Admin: Theme aktivieren
# Dashboard → Design → Themes → Brix Theme aktivieren
```

---

## 📐 Responsive Design Breakpoints

```scss
// Mobile-First Approach
$breakpoints: (
  'xs': 320px,      // Mobile
  'sm': 576px,      // Mobile horizontal
  'md': 768px,      // Tablet
  'lg': 1024px,     // Desktop
  'xl': 1280px,     // Large Desktop
  'xxl': 1536px     // Ultra-wide
);
```

---

## 💻 Coding Standards für PHP & CSS

### PHP
```php
// ✅ Guter Code
function get_custom_post_title( $post_id ) {
    return get_the_title( $post_id );
}

// ❌ Schlechter Code
function getTitleOfPost($id){
    return get_the_title($id);
}
```

**Standards:**
- Snake_case für Funktionsnamen
- Prefixes für Theme-Funktionen: `brix_`
- Hooks dokumentieren: `do_action()` & `apply_filters()`
- WordPress Coding Standards befolgen
- Comments für komplexe Logik

### CSS/SCSS
```scss
// ✅ BEM-Notation
.brix-card {
  padding: 1rem;

  &__header {
    font-weight: bold;
  }

  &__content {
    color: $text-color;
  }

  &--featured {
    background: $accent-color;
  }

  @media (max-width: $breakpoint-md) {
    padding: 0.75rem;
  }
}

// ❌ Nicht: .card-header, nested divitis
```

**Standards:**
- Mobile-First (kleine Screens zuerst)
- BEM-Notation für Klassen
- SCSS Variablen für Farben, Abstände, Breakpoints
- Keine Inline-Styles
- Responsive Images verwenden

### JavaScript (ES6+)
```javascript
// ✅ Modernes JavaScript
const initializeComponent = (elementSelector) => {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  element.addEventListener('click', handleClick);
};

// ❌ Nicht: jQuery, var, Inline-Handler
```

---

## 🎨 Design Token System

### Überblick

Das Projekt nutzt ein **zentrales Design Token System**, das alle Design-Eigenschaften dokumentiert und als CSS-Variablen zur Verfügung stellt. Diese Tokens kommen entweder von **Figma Design** oder werden **manuell definiert**.

**Workflow:**
```
Figma Design / Design Vorgaben
         ↓
DESIGN_TOKENS.md (Tabelle)
         ↓
variables.css (CSS Custom Properties)
         ↓
SCSS Komponenten (Verwendung)
```

### Dateien im Design Token System

1. **`/docs/DESIGN_TOKENS.md`** - Dokumentation aller Tokens in Tabellen-Form
   - Farben, Typografie, Abstände, Border, Schatten, etc.
   - Markiert welche Tokens von Figma kommen
   - Benutzung & Beschreibung

2. **`/theme/brix-theme/assets/css/variables.css`** - CSS-Variablen
   - Alle Design Tokens als CSS Custom Properties
   - Mobile-First Responsive Anpassungen
   - Ready to use in SCSS/CSS

3. **`/theme/brix-theme/assets/css/example-components.scss`** - Best Practice Beispiele
   - Zeigt wie Tokens in Komponenten verwendet werden
   - Buttons, Cards, Forms, Typografie, etc.

### Neuen Token Hinzufügen

**Schritt 1:** Neuen Token in `DESIGN_TOKENS.md` dokumentieren

```markdown
| Token Name | Wert | Figma? | Beschreibung | Verwendung |
|-----------|------|--------|------------|-----------|
| `--my-new-token` | `value` | ✅ | Beschreibung | Wo wird es verwendet |
```

**Schritt 2:** Token in `variables.css` hinzufügen

```css
:root {
  --my-new-token: value;
}
```

**Schritt 3:** In SCSS/CSS verwenden

```scss
.component {
  property: var(--my-new-token);
}
```

**Schritt 4:** Committen

```bash
git add docs/DESIGN_TOKENS.md theme/brix-theme/assets/css/variables.css
git commit -m "feat: Neuer Design Token - --my-new-token"
```

### Token Kategorien

| Kategorie | Datei | Beispiele |
|-----------|-------|----------|
| **Farben** | variables.css | `--color-primary`, `--color-bg`, `--color-text` |
| **Typografie** | variables.css | `--font-size-h1`, `--font-weight-bold`, `--line-height-normal` |
| **Abstände** | variables.css | `--space-sm`, `--padding-md`, `--margin-lg` |
| **Border** | variables.css | `--border-radius-md`, `--border-width` |
| **Schatten** | variables.css | `--shadow-sm`, `--shadow-lg` |
| **Animation** | variables.css | `--transition-normal`, `--ease-in-out` |
| **Breakpoints** | variables.css | `--breakpoint-md`, `--breakpoint-lg` |

### ✅ Best Practices

**Sollte getan werden:**
- ✅ Immer Tokens verwenden, niemals Hard-coded Werte
- ✅ Token-Namen konsistent: `--category-property`
- ✅ Neue Tokens erst in DESIGN_TOKENS.md dokumentieren
- ✅ Farben mit ausreichend Kontrast (WCAG AA)
- ✅ Mobile-First: Tokens anpassen über Media Queries

**Nicht machen:**
- ❌ Hard-coded Farben/Werte wie `color: #006bb3`
- ❌ Inline-Styles
- ❌ Tokens ohne Dokumentation hinzufügen
- ❌ Werte willkürlich ändern

### Beispiel: Button mit Tokens

```scss
.brix-btn {
  height: var(--button-height-md);
  padding: 0 var(--space-md);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-primary);
  color: var(--color-text-white);
  transition: var(--transition);
}
```

---

## 🎨 Design Guidelines Integration

### Farben
- Aus Design-Vorgaben des Teams in `variables.css`
- Konsistente Nutzung über alle Komponenten via Tokens
- Accessible Contrast Ratios (WCAG AA)

### Typografie
- Responsive Font-Sizes
- Lesbare Line-Heights (1.5 - 1.8)
- Semantische HTML-Tags (h1, h2, p, etc.)

### Spacing
- Konsistente Abstände (8px Grid)
- Breakpoint-basierte Anpassungen

---

## 📱 Mobile-First Entwicklung

1. **Desktop-Features NICHT zuerst entwickeln**
2. **Mobil optimieren**, dann für größere Screens erweitern
3. **Touch-Targets:** Mindestens 48x48px
4. **Performance:** Bilder lazy-loaded, minimierte Assets
5. **Testing:** Auf echten Geräten testen (nicht nur Browser DevTools)

---

## 🔄 Komponenten & Wiederverwendbarkeit

Jede Komponente sollte:
- ✅ In Brix Builder registriert sein
- ✅ Mit Varianten vorhanden (z.B. Standard, Featured, Disabled)
- ✅ Responsive sein
- ✅ Zugänglich sein (ARIA-Labels, etc.)
- ✅ Dokumentiert sein

**Beispiel-Komponente:**
```
templates/brix-components/
├── card.php          # Card Template
├── card.css          # Card Styles
├── card.js           # Card Logik
└── card-config.php   # Brix-Registrierung
```

---

## ✅ Qualitätskriterien

Bevor Code committed wird:

- [ ] Responsiv auf mobil/tablet/desktop getestet
- [ ] Keine PHP-Fehler/Warnings
- [ ] Coding Standards eingehalten
- [ ] Performance-optimiert (PageSpeed 85+)
- [ ] Accessibility geprüft (WCAG AA)
- [ ] Code dokumentiert
- [ ] Commit-Message aussagekräftig

---

## 📚 Hilfreiche Ressourcen

- [WordPress Theme Handbook](https://developer.wordpress.org/themes/)
- [Brix Builder Dokumentation](https://www.brixbulider.io/docs/)
- [Mobile-First CSS](https://www.w3schools.com/css/css_rwd_intro.asp)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)
- [PHP Best Practices 2026](https://www.php.net/manual/en/)

---

## 🤝 Zusammenarbeit mit Claude Code

Claude sollte bei folgenden Aufgaben helfen:

✅ **Kann Claude tun:**
- Komponenten nach Design-Vorgaben entwickeln
- Responsive CSS/SCSS schreiben
- PHP-Funktionen implementieren
- Tests schreiben
- Code-Review & Refactoring
- Dokumentation erstellen

❌ **Sollte Claude NICHT tun:**
- Alte jQuery-Patterns verwenden
- Inline-Styles hinzufügen
- Design-Richtlinien ignoren
- Ohne Mobile-First denken
- Accessibility übersehen

---

## 📝 Hinweise für Entwicklung

- **Branch-Namenskonvention:** `feature/komponenten-name` oder `fix/bug-description`
- **Commits:** Aussagekräftige Messages, z.B. `feat: Neue Hero-Komponente mit Responsive Design`
- **Testing:** Lokal auf verschiedenen Geräten testen vor Commit
- **Performance:** CSS/JS minifizieren, Bilder optimieren

---

## 🔄 Synchronisation mit Figma

### Workflow bei Design-Änderungen

1. **In Figma ändern** - Design Team aktualisiert Design
2. **Link dokumentieren** - In `DESIGN_TOKENS.md` unter "Verknüpfung mit Figma"
3. **Tokens aktualisieren**
   - In `DESIGN_TOKENS.md` neue Werte eintragen
   - Mit ✅ markieren, dass diese von Figma kommen
   - In `variables.css` Wert aktualisieren
4. **Komponenten anpassen** - SCSS/CSS überprüfen und anpassen
5. **Committen** - Mit Figma-Link oder Design-Version

### Commit-Beispiel mit Figma

```bash
git commit -m "feat: Update Design Tokens von Figma
- Farben: Primär-blau von #006bb3 zu #0077cc
- Abstand: spacing-lg von 24px zu 28px
Figma: https://figma.com/file/xxx"
```

---

**Erstellt:** 2026-02-24
**Version:** 1.0.0
**Letztes Update:** 2026-02-24 - Design Token System hinzugefügt
