# ASTE - Copilot Instructions

## Project Overview

ASTE is a static website for a computer repair and maintenance service company. It's a client-side only application with no build system or backend dependencies.

**Tech Stack:**
- HTML5 (site.html) with form handling
- CSS3 (style.css) with custom properties for theming
- Vanilla JavaScript + jQuery 3.3.1 (CDN)
- External services: Telegram Bot API for form submissions, Google Fonts (CDN)

## File Structure

- `site.html` (369 lines) — Main HTML document with sections: hero/home, services, pricing, companies carousel, advantages, and contacts
- `style.css` (450 lines) — Complete styling including responsive layout, dark/light theme system, utility classes
- `index.js` (87 lines) — Client-side functionality: scroll behavior, theme toggle, Telegram form submission
- `images/` — Hero images, contact icons; `images/companies/` — Client company logos for scrolling carousel

## Development & Local Testing

Since this is a static site, there are **no build or test commands**. To preview changes:

1. Open `site.html` directly in a browser
2. Use a local HTTP server (e.g., `python -m http.server 8000` or `npx http-server`)
   - This is necessary for testing Telegram API calls and avoiding CORS issues

**Live Site:** https://github.com/aurikqq/aste (deploy via GitHub Pages)

## Key Conventions

### 1. Theme System (Dark/Light Mode)

The site uses **CSS custom properties** for theming with runtime switching:

**CSS Variables (in `:root`):**
- `--font` — Text color
- `--bg` — Background color
- `--card` — Card/container background
- `--accent` — Primary accent color
- `--bars` — Navigation bar background
- `--shadow` — Shadow color

**How it works:**
- `data-theme="light"` or `data-theme="dark"` attribute on `<html>` element
- `index.js` detects system preference on load using `window.matchMedia("(prefers-color-scheme: dark)")`
- `toggleTheme()` function switches themes and updates `document.documentElement.dataset["theme"]`

**When modifying colors:** Always update both theme variants in style.css (`:root[data-theme="light"]` and `:root[data-theme="dark"]`)

### 2. Border-Radius Utility Classes

Custom classes for border-radius shortcuts (e.g., `tl-32`, `br-12`):
- `tl-{n}` = border-top-left-radius: {n}px
- `tr-{n}` = border-top-right-radius: {n}px
- `bl-{n}` = border-bottom-left-radius: {n}px
- `br-{n}` = border-bottom-right-radius: {n}px

Common values: 8, 12, 16, 32

**Example:** `<div class="card tl-32 tr-12 bl-32 br-12">` applies asymmetrical rounded corners

### 3. Form & Telegram Integration

The form (in home section) submits to Telegram Bot API:

```javascript
function sendTelegramMessage() {
  // Collects: name, phone, device, problem
  // Sends to: Telegram bot via HTTP POST
}
```

**Form fields:**
- `device` (select) — Type of device with problem
- `problem` (select) — Problem description
- `name` (text) — User's name
- `number` (tel) — Phone number (Belarus format: +375000000000)

**Security note:** Telegram bot token is currently exposed in index.js (not a security risk for public bots, but consider environment variables if migrating to backend)

### 4. CSS Class Patterns

Key reusable classes:
- `.card` — Container with background, padding, shadow, overflow handling
- `.row` — Flexbox row layout with space-between justification
- `.centered` — Flex centered alignment
- `.purple` — Accent color text with monospace font
- `.purple-with-bg` — Accent text with card background (badge style)
- `.topbar` — Fixed navigation with custom transform on scroll
- `.title` — Section header with underline decoration
- `.adv-*` — Advantages section (title, line, text)
- `.services-*` — Services section (icon, title, text, price)

### 5. Navigation & Section Structure

**Navigation bar (`.topbar`):**
- Fixed at top of page
- Links to: #home (главная), #services (услуги), #price (цены), #contacts (контакты)
- Home link is highlighted by default (`.highlighted` class)
- Theme toggle button on right

**Page sections:**
- `#home` — Hero section with form (67/31 card layout)
- `#services` — Section header (h2 ID); pricing cards in `#price` divs (BUG: two divs share same ID)
- `#clients` — Company logos carousel (horizontal infinite scroll animation)
- `#adv` — Advantages section (four cards with title + accent line)
- `#contacts` — Contact info cards (email, phone, Telegram)

**On scroll ≥100px:**
  - Topbar shrinks to right side with rounded bottom-left corner (`topbar.scroll`)
  - Logo is hidden (`.logo.toggle(false)`)
  - Decorative pseudo-elements (::before, ::after) are removed (`.no-after`, `.no-before`)
- Navigation links are section anchors (smooth scroll on click)

### 6. Companies Logo Carousel (Infinite Scroll)

The clients section features an infinite scrolling carousel of company logos:

**HTML structure:**
```html
<div id='container'>
  <div class='scroll'>
    <!-- Items list (duplicated for seamless loop) -->
    <div class="item"><img src='...'/></div>
    <!-- All items repeated twice -->
  </div>
  <div class='fade'></div>
</div>
```

**How it works:**
- `.scroll` animates left using `@keyframes loop` (30s duration)
- Items are duplicated in HTML to create seamless infinite loop
- `.fade` div overlays gradient masks on left/right edges (prevents harsh cutoff)
- `.item` has custom shadow for depth effect

**To add/remove logos:**
- Update both copies of the item list in `#container` to keep loop seamless
- Maintain 150px width for images (inline `style="width:150px"`)
- Images stored in `images/companies/`

### 7. Section-Specific Classes

**Advantages section (`.adv-*`):**
- `.adv-title` — Advantage heading (no-wrap)
- `.adv-line` — Decorative accent line (flex: 1, grows to fill space)
- `.adv-text` — Advantage description paragraph

**Services section (`.services-*`):**
- `.services-icon` — Service icon image (100px width)
- `.services-title` — Service name heading
- `.services-text` — Service description
- `.services-price` — Service cost (uses `.purple` color)

**Button variants:**
- `.help-button` — Form submit button (accent background)
- `.price-button` — Secondary button (accent background)

## Code Style & Patterns

**HTML:**
- Inline styles mixed with classes (could be consolidated to CSS classes)
- IDs for form inputs: `name`, `number`, `device`, `problem`
- Inline event handlers (e.g., `onclick="toggleTheme()"`)

**CSS:**
- CSS custom properties for all colors (no hardcoded hex values)
- Mobile-first approach recommended but not currently enforced
- Extensive use of flexbox; no CSS grid
- Border-radius utility classes reduce CSS duplication

**JavaScript:**
- jQuery for DOM queries and animations (`.scroll()`, `.addClass()`, `.toggle()`)
- Vanilla JS for form handling and theme detection
- Functions are global (no module system)

## Important Implementation Details

1. **Font Stack:** Multiple Google Fonts loaded (IBM Plex Mono, Inter, JetBrains Mono, Noto Sans, Open Sans, PT Mono)
   - Headings use "Open Sans"
   - Body text uses "Noto Sans"
   - Accent/code uses "JetBrains Mono"

2. **Shadow System:** All cards and elements use consistent shadow: `box-shadow: 0 8px 16px;`

3. **Slideshow Overlay:** Hero image has a radial gradient overlay (pseudo-element) to blend with card background

4. **SVG Handling in Dark Mode:** SVGs in dark theme are inverted via CSS filter for visibility

5. **Language:** Content is in Russian; maintain Russian text in UI elements and form labels

## Common Tasks

**To add a new section:**
1. Create an `<h2>` with unique ID and `.title` class for the section header
2. Create a `.row` container with `.card` elements below it
3. Use `.centered` class if content should be centered
4. Use custom CSS variable colors for text/background
5. Add asymmetrical border-radius classes (e.g., `tl-32 tr-12 bl-32 br-12`)
6. Apply inline `style` for width/height/padding (% units for responsive layout)

**To add a navigation link:**
1. Update `.topbar` navigation list with new `<li><a href="#section-id">Label</a></li>`
2. Ensure corresponding section has matching `id="section-id"` (on h2 or div)

**To add items to the companies carousel:**
1. Locate the `#container` > `.scroll` div
2. Add new `.item` to the FIRST item list
3. Copy the same `.item` to the SECOND list (after the first ~15 items)
4. Keep width at 150px and maintain consistent spacing

**To modify colors:**
1. Update both `:root[data-theme="light"]` and `:root[data-theme="dark"]` in style.css
2. Test theme toggle in browser
3. Verify contrast meets accessibility standards

**To update the contact form:**
1. Add/remove options in `<select id="device">` and `<select id="problem">` elements
2. Update corresponding variable names in `sendTelegramMessage()` function in index.js
3. Ensure input `id` attributes match those in the function
4. Test form submission to verify Telegram bot receives correct data

**To persist theme preference:**
1. Modify `toggleTheme()` in index.js to save to `localStorage.setItem('theme', theme)`
2. Update initial theme detection to check `localStorage.getItem('theme')` first
3. Test persistence across page reloads

## Known Quirks & Technical Debt

**Critical bugs:**
- **Duplicate `#price` ID:** Two divs have `id="price"` (service cards at lines 108 & 155). This breaks anchor linking. Fix: rename one to `#pricing` or `#services-pricing`

**Other issues:**
- No production build step (source files served directly)
- Inline styles mixed with CSS classes (refactor potential)
- No form validation before Telegram submission
- Theme preference not persisted to localStorage (resets on page reload)
- jQuery dependency for simple DOM manipulation (could use vanilla JS)
- Image filenames suggest incomplete setup (pic-.png, pic-1.jpg, pic-2.jpg in root)
- Telegram bot token exposed in index.js (not a security risk for public bots, but consider env variables if migrating to backend)

**Design patterns to maintain:**
- All new sections should follow card + flexbox pattern
- Always define colors in both light and dark theme CSS variables
- Use `.row` with percentage widths for responsive multi-column layouts
- Inline styles for one-off positioning/sizing; use CSS classes for reusable styles
