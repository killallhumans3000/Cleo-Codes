# Cleo-Codes

<div align="center">

![Cleo-Codes](https://img.shields.io/badge/Brix%20Builder%20Theme-v1.0.0-blue?style=flat-square)
![PHP Version](https://img.shields.io/badge/PHP-8.0+-777BB4?style=flat-square&logo=php)
![WordPress](https://img.shields.io/badge/WordPress-6.0+-21759B?style=flat-square&logo=wordpress)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**A responsive, design-token-based Brix Builder theme for rapid WordPress development.**

[Documentation](#-dokumentation) • [Installation](#-installation) • [Design Tokens](#-design-tokens) • [Components](#-komponenten)

</div>

---

## 🎯 Überblick

**Cleo-Codes** ist ein modulares, wiederverwendbares **Brix Builder Theme**, das auf einem zentralen **Design Token System** basiert. Entwickelt mit modernen Best Practices für responsive Design, User Experience und Performance.

### ✨ Kernfeatures

- 🎨 **Design Token System** - Zentrale Verwaltung aller Design-Properties
- 📱 **Mobile-First Design** - Optimiert für alle Geräte
- 🧩 **Wiederverwendbare Komponenten** - Schnell und konsistent
- ♿ **Accessible** - WCAG 2.1 AA Standards
- ⚡ **Performance-Optimiert** - Schnelle Ladezeiten
- 🔄 **Figma Integration** - Einfache Design-Synchronisation
- 📚 **Gut dokumentiert** - Design Guidelines & Code Examples

---

## 📁 Projektstruktur

```
cleo-codes/
├── 📄 Claude.md                          # Claude Code Dokumentation
├── 📄 README.md                          # Dieses Dokument
│
├── 📁 docs/
│   ├── DESIGN_TOKENS.md                  # Alle Design Tokens dokumentiert
│   ├── DESIGN_GUIDELINES.md              # Design Richtlinien
│   ├── SETUP.md                          # Setup-Anleitung
│   └── COMPONENT_LIBRARY.md              # Komponenten-Katalog
│
├── 📁 theme/brix-theme/
│   ├── functions.php                     # Theme Funktionen
│   ├── style.css                         # Haupt-CSS
│   ├── index.php                         # Template Fallback
│   │
│   ├── 📁 includes/
│   │   ├── setup.php                     # Theme Setup
│   │   ├── enqueue.php                   # Assets laden
│   │   ├── customizer.php                # Theme Customizer
│   │   └── helpers.php                   # Helper-Funktionen
│   │
│   ├── 📁 assets/
│   │   ├── 📁 css/
│   │   │   ├── variables.css             # Design Tokens als CSS Variables
│   │   │   ├── example-components.scss   # Component Beispiele
│   │   │   ├── main.scss                 # Haupt-Styles
│   │   │   ├── responsive.scss           # Media Queries
│   │   │   └── components.scss           # Komponenten-Styles
│   │   ├── 📁 js/
│   │   │   ├── main.js                   # Haupt-JavaScript
│   │   │   └── 📁 components/            # JS-Module
│   │   └── 📁 images/
│   │       └── svg/                      # SVG Icons & Grafiken
│   │
│   ├── 📁 templates/
│   │   ├── 📁 brix-components/           # Brix Builder Komponenten
│   │   └── 📁 pages/                     # Seiten-Templates
│   │
│   └── 📁 config/
│       ├── breakpoints.scss              # Responsive Breakpoints
│       └── colors.scss                   # Farb-Konfiguration
│
└── 📁 tests/
    └── README.md                         # Test-Dokumentation
```

---

## 🚀 Installation

### Voraussetzungen

- WordPress 6.0+
- PHP 8.0+
- Brix Builder installiert & aktiviert
- Git (optional, für Entwicklung)

### Schritt-für-Schritt

#### 1️⃣ Repository klonen oder herunterladen

```bash
# Mit Git klonen
git clone <REPO_URL> cleo-codes
cd cleo-codes

# Oder ZIP herunterladen und extrahieren
```

#### 2️⃣ Theme zu WordPress kopieren

```bash
# Theme zum WordPress kopieren
cp -r theme/brix-theme /path/to/wordpress/wp-content/themes/brix-theme
```

#### 3️⃣ Theme aktivieren

1. Gehe zu **WordPress Admin Dashboard**
2. Navigiere zu **Design → Themes**
3. Suche "Brix Theme" und klicke **Aktivieren**

#### 4️⃣ Fertig! ✅

Das Theme ist nun aktiv und einsatzbereit. Beginne mit der Entwicklung von Seiten in **Brix Builder**.

---

## 🎨 Design Token System

Alle Design-Eigenschaften werden zentral über **Design Tokens** verwaltet.

### Workflow

```
Figma Design
     ↓
Dokumentation in DESIGN_TOKENS.md
     ↓
CSS Variables in variables.css
     ↓
Verwendung in Komponenten
```

### Token-Kategorien

| Kategorie | Beispiele |
|-----------|----------|
| 🎨 **Farben** | `--color-primary`, `--color-bg`, `--color-text` |
| 🔤 **Typografie** | `--font-size-h1`, `--font-weight-bold`, `--line-height-normal` |
| 📏 **Abstände** | `--space-md`, `--padding-lg`, `--margin-sm` |
| 🎯 **Border** | `--border-radius-md`, `--border-width` |
| ✨ **Schatten** | `--shadow-sm`, `--shadow-lg` |
| ⚡ **Animation** | `--transition-normal`, `--ease-in-out` |
| 📱 **Breakpoints** | `--breakpoint-md`, `--breakpoint-lg` |

### Beispiel: Token verwenden

```scss
.my-component {
  padding: var(--space-md);
  background-color: var(--color-primary);
  border-radius: var(--border-radius-md);
  transition: var(--transition);
}
```

👉 **Alle Tokens:**
- 📋 Dokumentation: [`docs/DESIGN_TOKENS.md`](./docs/DESIGN_TOKENS.md)
- 💾 CSS Variablen: [`theme/brix-theme/assets/css/variables.css`](./theme/brix-theme/assets/css/variables.css)

---

## 🧩 Komponenten

Vorkonfigurierte, responsive Komponenten auf Basis von Design Tokens.

### Verfügbare Komponenten

- ✅ **Button** - Primary, Secondary, Outline, Größen
- ✅ **Card** - Standard, Featured, Highlight
- ✅ **Form Elements** - Input, Textarea, Select, Labels
- ✅ **Typography** - H1-H6, Body, Small
- ✅ **Alert/Message** - Success, Warning, Error, Info
- ✅ **Grid Layout** - Responsive, Mobile-First

👉 **Component Library:**
- 📚 [`docs/COMPONENT_LIBRARY.md`](./docs/COMPONENT_LIBRARY.md)
- 📝 Beispiele: [`theme/brix-theme/assets/css/example-components.scss`](./theme/brix-theme/assets/css/example-components.scss)

---

## 📐 Responsive Breakpoints

Mobile-First Entwicklung mit definierten Breakpoints:

```
320px (Mobile)
  ↓
576px (Mobile Landscape)
  ↓
768px (Tablet)
  ↓
1024px (Desktop)
  ↓
1280px (Large Desktop)
  ↓
1536px (Ultra-wide)
```

**CSS Media Query Beispiel:**

```scss
.component {
  // Mobile first
  font-size: 1rem;

  // Tablet
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }

  // Desktop
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
}
```

---

## 💻 Coding Standards

### PHP Best Practices

```php
// ✅ Guter Code
function brix_get_custom_title( $post_id ) {
    return get_the_title( $post_id );
}

// ❌ Schlechter Code
function getTitleOfPost($id){
    return get_the_title($id);
}
```

**Standards:**
- `snake_case` für Funktionsnamen
- `brix_` Prefix für Theme-Funktionen
- WordPress Coding Standards
- Comments für komplexe Logik

### SCSS/CSS Best Practices

```scss
// ✅ BEM Notation mit Tokens
.brix-button {
  padding: var(--space-md);
  border-radius: var(--border-radius-md);

  &__text {
    font-weight: var(--font-weight-bold);
  }

  &--primary {
    background-color: var(--color-primary);
  }
}

// ❌ Schlechter Code
.button-primary { }
div.btn span { }
```

**Standards:**
- BEM Notation
- Mobile-First CSS
- Keine Hard-coded Werte
- SCSS Variablen verwenden

---

## 📝 Dokumentation

| Dokument | Beschreibung |
|----------|------------|
| [**Claude.md**](./Claude.md) | Claude Code Workflow & Richtlinien |
| [**DESIGN_TOKENS.md**](./docs/DESIGN_TOKENS.md) | Alle Design Tokens dokumentiert |
| [**DESIGN_GUIDELINES.md**](./docs/DESIGN_GUIDELINES.md) | Design Richtlinien & Standards |
| [**SETUP.md**](./docs/SETUP.md) | Detaillierte Setup-Anleitung |
| [**COMPONENT_LIBRARY.md**](./docs/COMPONENT_LIBRARY.md) | Komponenten-Katalog |

---

## 🔄 Entwicklung

### Git Workflow

```bash
# 1. Feature Branch erstellen
git checkout -b feature/component-name

# 2. Änderungen machen
# 3. Code testen & reviewen

# 4. Committen mit aussagekräftiger Message
git commit -m "feat: Neue Komponente - Card mit Design Tokens"

# 5. Push
git push origin feature/component-name

# 6. Pull Request erstellen
```

### Branch-Namenskonvention

- `feature/component-name` - Neue Komponenten
- `fix/bug-description` - Bug Fixes
- `docs/topic` - Dokumentation
- `refactor/description` - Refactoring

### Commit Message Format

```
feat: Kurze Beschreibung
fix: Bug fix mit Details
docs: Dokumentation
style: Formatting, missing semicolons, etc
refactor: Code-Umstrukturierung
chore: Dependency Updates, etc

Beispiel:
feat: Neue Button-Komponente mit Design Tokens
- Primary, Secondary, Outline Varianten
- Responsive Größen (sm, md, lg)
- ARIA Labels für Accessibility
```

---

## ✅ Quality Checklist

Vor dem Commit/Push überprüfen:

- [ ] Code folgt Coding Standards
- [ ] Responsive auf Mobile/Tablet/Desktop
- [ ] Keine PHP Errors/Warnings
- [ ] CSS/JS optimiert
- [ ] Accessibility geprüft (WCAG AA)
- [ ] Komponenten dokumentiert
- [ ] Tests bestanden
- [ ] Aussagekräftige Commit-Message

---

## 🎯 Features & Roadmap

### ✅ Current (v1.0.0)

- Design Token System
- Responsive Layout
- Component Library Foundation
- CSS/SCSS Best Practices
- Documentation

### 🚀 Planned (v1.1.0+)

- [ ] Advanced Component Library
- [ ] Interactive JS Components
- [ ] Dark Mode Support
- [ ] Performance Optimization
- [ ] Extended Accessibility
- [ ] Component Storybook
- [ ] Automated Testing

---

## 🤝 Zusammenarbeit

### Mit Claude Code

Das Projekt ist optimiert für **Claude Code** Entwicklung:

**Claude sollte bei diesen Tasks helfen:**
- ✅ Neue Komponenten nach Design-Vorgaben entwickeln
- ✅ Responsive CSS/SCSS schreiben
- ✅ PHP-Funktionen implementieren
- ✅ Design Tokens aktualisieren
- ✅ Tests & Dokumentation
- ✅ Code-Review & Refactoring

**Claude sollte folgende Best Practices einhalten:**
- ✅ Mobile-First CSS Approach
- ✅ Design Tokens verwenden
- ✅ BEM Notation für CSS
- ✅ Moderne JS (ES6+)
- ✅ Accessibility Standards
- ✅ Code dokumentieren

Siehe [`Claude.md`](./Claude.md) für vollständige Richtlinien.

---

## 📚 Ressourcen

- [WordPress Theme Handbook](https://developer.wordpress.org/themes/)
- [Brix Builder Dokumentation](https://www.brixbulider.io/docs/)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Mobile-First CSS](https://www.w3schools.com/css/css_rwd_intro.asp)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## 📄 Lizenz

MIT License - Siehe LICENSE für Details

---

## 💬 Support & Feedback

- 📖 Lese die [Dokumentation](./docs/)
- 🐛 Melde Bugs als Issues
- 💡 Teile Verbesserungsvorschläge
- 👥 Kontaktiere das Team

---

<div align="center">

**Erstellt mit ❤️ für schnelle, konsistente WordPress-Entwicklung**

Made with [Brix Builder](https://www.brixbulider.io/) • Powered by [WordPress](https://wordpress.org/)

</div>
