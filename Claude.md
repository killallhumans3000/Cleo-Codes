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

## 🎨 Design Guidelines Integration

### Farben
- Aus Design-Vorgaben des Teams in `config/colors.scss`
- Konsistente Nutzung über alle Komponenten
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

**Erstellt:** 2026-02-24
**Version:** 1.0.0
