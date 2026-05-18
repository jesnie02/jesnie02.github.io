# Language Selector — Design Spec

Date: 2026-05-18

## Overview

Add a language selector to the portfolio that allows switching between Danish (DA), English (EN), and German (DE). All text is currently hardcoded in Danish in `index.html`.

## Approach

Data-attributes + JS translations object. No external libraries or build process required. Works with GitHub Pages as-is.

- `index.html` — add dropdown in header + `data-i18n` attributes on all text elements
- `assets/js/script.js` — add translations object and `setLanguage()` function
- `assets/css/style.css` — add dropdown styling
- `localStorage` persists the user's language choice across visits
- Default language: Danish

## HTML

### Dropdown placement

In the header, after the hamburger button:

```html
<div class="lang-select" id="langSelect">
  <button class="lang-btn" id="langCurrent">
    <img class="lang-flag" src="https://flagcdn.com/20x15/dk.png" alt="Dansk">
    <span class="lang-code">DA</span>
    <span class="lang-arrow">▾</span>
  </button>
  <ul class="lang-options" id="langOptions">
    <li data-lang="da"><img src="https://flagcdn.com/20x15/dk.png" alt=""> Dansk</li>
    <li data-lang="en"><img src="https://flagcdn.com/20x15/gb.png" alt=""> English</li>
    <li data-lang="de"><img src="https://flagcdn.com/20x15/de.png" alt=""> Deutsch</li>
  </ul>
</div>
```

Flag images from flagcdn.com — no API key required.

### data-i18n attributes

All visible text elements get a `data-i18n="section.key"` attribute.
Input placeholders get `data-i18n-placeholder="section.key"`.

Key namespaces: `nav`, `hero`, `about`, `experience`, `projects`, `contact`, `footer`.

## JavaScript

```js
const translations = {
  da: { ... },
  en: { ... },
  de: { ... }
}

function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = translations[lang][el.dataset.i18n]
  })
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = translations[lang][el.dataset.i18nPlaceholder]
  })
  // Update button flag + code
  const flags = { da: 'dk', en: 'gb', de: 'de' }
  const codes = { da: 'DA', en: 'EN', de: 'DE' }
  document.querySelector('#langCurrent .lang-flag').src =
    `https://flagcdn.com/20x15/${flags[lang]}.png`
  document.querySelector('#langCurrent .lang-code').textContent = codes[lang]
  document.getElementById('langOptions').classList.remove('open')
  localStorage.setItem('lang', lang)
}

// Toggle dropdown
document.getElementById('langCurrent').addEventListener('click', () => {
  document.getElementById('langOptions').classList.toggle('open')
})

// Close on outside click
document.addEventListener('click', e => {
  if (!document.getElementById('langSelect').contains(e.target)) {
    document.getElementById('langOptions').classList.remove('open')
  }
})

// Click on option
document.querySelectorAll('#langOptions li').forEach(li => {
  li.addEventListener('click', () => setLanguage(li.dataset.lang))
})

// Init
setLanguage(localStorage.getItem('lang') || 'da')
```

## CSS

Styled to match existing header — dark background, white text, subtle border:

```css
.lang-select { position: relative; }

.lang-btn {
  display: flex; align-items: center; gap: 6px;
  background: none; border: 1px solid rgba(255,255,255,0.2);
  color: #fff; padding: 4px 10px; border-radius: 4px;
  cursor: pointer; font-family: inherit;
}

.lang-options {
  display: none; position: absolute; right: 0; top: calc(100% + 6px);
  background: #111; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px; list-style: none; padding: 4px 0; min-width: 130px;
  z-index: 100;
}

.lang-options.open { display: block; }

.lang-options li {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; cursor: pointer; font-size: 0.9rem;
}

.lang-options li:hover { background: rgba(255,255,255,0.08); }
```

## Translations scope

All user-visible text strings across:
- Navigation links (nav overlay)
- Hero section (overline, subtitle, buttons)
- About section (title, 3 bio paragraphs, skills label)
- Experience section (title, all 5 timeline items: role, place, description)
- Projects section (title, 3 project descriptions)
- Contact section (title, quote, form labels, placeholders, submit button)
- Footer text
