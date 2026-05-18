# Language Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a DA/EN/DE language selector dropdown to the portfolio header, replacing all hardcoded Danish text with translatable strings.

**Architecture:** All translations live in a JS object in `script.js`. HTML elements are tagged with `data-i18n` attributes. `setLanguage(lang)` swaps text on every tagged element. Choice is persisted in `localStorage`.

**Tech Stack:** Vanilla HTML, CSS, JavaScript. Flag images from flagcdn.com (no API key). No build process.

---

## File Map

| File | Change |
|------|--------|
| `index.html` | Add `<div class="lang-select">` in header; add `data-i18n` / `data-i18n-placeholder` attributes on all text elements; wrap bare text nodes in `<span>` where needed |
| `assets/css/style.css` | Append lang-select dropdown styles at end of file |
| `assets/js/script.js` | Add `translations` object + `setLanguage()` + dropdown event handlers + startup init |

---

## Task 1: CSS — Language dropdown styles

**Files:**
- Modify: `assets/css/style.css` (append after last line)

- [ ] **Step 1: Append styles to style.css**

Add at the very end of `assets/css/style.css`:

```css
/* ── LANGUAGE SELECTOR ── */
.lang-select { position: relative; display: flex; align-items: center; }

.lang-btn {
  display: flex; align-items: center; gap: 6px;
  background: none; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px;
  color: #fff; padding: 4px 10px; cursor: pointer;
  font-family: inherit; font-size: 0.85rem; transition: border-color 0.2s;
}
.lang-btn:hover { border-color: rgba(255,255,255,0.5); }

.lang-flag { width: 20px; height: 15px; display: block; }
.lang-arrow { font-size: 0.7rem; opacity: 0.7; }

.lang-options {
  display: none; position: absolute; right: 0; top: calc(100% + 8px);
  background: #111; border: 1px solid rgba(255,255,255,0.15); border-radius: 4px;
  list-style: none; padding: 4px 0; min-width: 130px; z-index: 200;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.lang-options.open { display: block; }

.lang-options li {
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px; cursor: pointer; font-size: 0.9rem; color: #fff;
}
.lang-options li:hover { background: rgba(255,255,255,0.08); }
.lang-options li img { width: 20px; height: 15px; }
```

- [ ] **Step 2: Verify no syntax errors**

Open `index.html` in a browser and confirm the page still looks correct (no CSS breakage).

---

## Task 2: HTML — Add dropdown to header

**Files:**
- Modify: `index.html` (lines 28–34, the `<header>` block)

- [ ] **Step 1: Replace the header block**

Find this in `index.html`:

```html
  <header class="site-header" id="siteHeader">
    <a href="#" class="header-logo">Jesper A. Nielsen</a>
    <span class="header-center">Portfolio · 2026</span>
    <button class="hamburger" id="hamburger" aria-label="Åbn menu">
      <span></span><span></span><span></span>
    </button>
  </header>
```

Replace with:

```html
  <header class="site-header" id="siteHeader">
    <a href="#" class="header-logo">Jesper A. Nielsen</a>
    <span class="header-center">Portfolio · 2026</span>
    <div style="display:flex;align-items:center;gap:12px;">
      <div class="lang-select" id="langSelect">
        <button class="lang-btn" id="langCurrent" aria-label="Vælg sprog">
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
      <button class="hamburger" id="hamburger" aria-label="Åbn menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
```

- [ ] **Step 2: Verify in browser**

Open `index.html` — the dropdown button should appear in the header to the left of the hamburger. Clicking the flag button should do nothing yet (JS comes in Task 4).

---

## Task 3: HTML — Add data-i18n attributes to all text elements

**Files:**
- Modify: `index.html` (nav overlay, hero, about, experience, projects, contact sections)

- [ ] **Step 1: Nav overlay links**

Find:
```html
      <a href="#about" class="nav-link">Om mig</a>
      <a href="#experience" class="nav-link">Erfaring</a>
      <a href="#projects" class="nav-link">Projekter</a>
      <a href="#contact" class="nav-link">Kontakt</a>
```

Replace with:
```html
      <a href="#about" class="nav-link" data-i18n="nav.about">Om mig</a>
      <a href="#experience" class="nav-link" data-i18n="nav.experience">Erfaring</a>
      <a href="#projects" class="nav-link" data-i18n="nav.projects">Projekter</a>
      <a href="#contact" class="nav-link" data-i18n="nav.contact">Kontakt</a>
```

- [ ] **Step 2: Hero section**

Find:
```html
      <div class="hero-overline">
        <span class="overline-dash"></span>
        Softwareudvikler · Esbjerg
      </div>
      <h1 class="hero-name">JESPER<br>ANTONISEN<br>NIELSEN</h1>
      <p class="hero-subtitle">Datamatiker &amp; Webudvikler</p>
      <div class="hero-buttons">
        <a href="#about" class="btn btn-fill">Om mig</a>
        <a href="#projects" class="btn btn-outline">Projekter</a>
      </div>
      <div class="hero-meta">
        <div class="age-badge">45</div>
        <div class="hero-location">
          Esbjerg, Danmark<br>
          <span class="accent">Open to work</span>
        </div>
      </div>
```

Replace with:
```html
      <div class="hero-overline">
        <span class="overline-dash"></span>
        <span data-i18n="hero.overline">Softwareudvikler · Esbjerg</span>
      </div>
      <h1 class="hero-name">JESPER<br>ANTONISEN<br>NIELSEN</h1>
      <p class="hero-subtitle" data-i18n="hero.subtitle">Datamatiker & Webudvikler</p>
      <div class="hero-buttons">
        <a href="#about" class="btn btn-fill" data-i18n="hero.btn1">Om mig</a>
        <a href="#projects" class="btn btn-outline" data-i18n="hero.btn2">Projekter</a>
      </div>
      <div class="hero-meta">
        <div class="age-badge">45</div>
        <div class="hero-location">
          <span data-i18n="hero.location">Esbjerg, Danmark</span><br>
          <span class="accent" data-i18n="hero.status">Open to work</span>
        </div>
      </div>
```

- [ ] **Step 3: About section**

Find:
```html
      <div class="section-label">Sektion 01</div>
      <div class="section-num">01</div>
      <div class="section-title">Om mig</div>
```
Replace with:
```html
      <div class="section-label" data-i18n="about.label">Sektion 01</div>
      <div class="section-num">01</div>
      <div class="section-title" data-i18n="about.title">Om mig</div>
```

Find:
```html
        <p>Jeg er en dedikeret datamatiker på 45 år med en god arbejdsmoral og en dyb interesse indenfor softwareudvikling. Jeg er i gang med Professionsbacheloren i Softwareudvikling ved Erhvervsakademi SydVest i Esbjerg.</p>
        <p>Jeg har en baggrund i kokkebranchen, hvor jeg opbyggede stærke evner inden for teamwork, kommunikation og at arbejde under pres. Disse kompetencer er nu en naturlig del af mit arbejde som udvikler — problemløsning og samarbejde spiller en central rolle i det jeg laver.</p>
        <p>Udover mit studie engagerer jeg mig i frivilligt arbejde på flere områder, herunder app-udvikling og ansvar for en forenings hjemmeside. Jeg er passioneret om Linux-customization, rejser og at bidrage aktivt til communities.</p>
```
Replace with:
```html
        <p data-i18n="about.bio1">Jeg er en dedikeret datamatiker på 45 år med en god arbejdsmoral og en dyb interesse indenfor softwareudvikling. Jeg er i gang med Professionsbacheloren i Softwareudvikling ved Erhvervsakademi SydVest i Esbjerg.</p>
        <p data-i18n="about.bio2">Jeg har en baggrund i kokkebranchen, hvor jeg opbyggede stærke evner inden for teamwork, kommunikation og at arbejde under pres. Disse kompetencer er nu en naturlig del af mit arbejde som udvikler — problemløsning og samarbejde spiller en central rolle i det jeg laver.</p>
        <p data-i18n="about.bio3">Udover mit studie engagerer jeg mig i frivilligt arbejde på flere områder, herunder app-udvikling og ansvar for en forenings hjemmeside. Jeg er passioneret om Linux-customization, rejser og at bidrage aktivt til communities.</p>
```

Find:
```html
        <div class="skills-label">Teknologier &amp; Værktøjer</div>
```
Replace with:
```html
        <div class="skills-label" data-i18n="about.skillsLabel">Teknologier & Værktøjer</div>
```

- [ ] **Step 4: Experience section**

Find:
```html
      <div class="section-label">Sektion 02</div>
      <div class="section-num">02</div>
      <div class="section-title">Erfaring</div>
```
Replace with:
```html
      <div class="section-label" data-i18n="exp.label">Sektion 02</div>
      <div class="section-num">02</div>
      <div class="section-title" data-i18n="exp.title">Erfaring</div>
```

Find:
```html
        <div class="timeline-item">
          <div class="timeline-date">2024 — Nu</div>
          <div class="timeline-body">
            <div class="timeline-role">Tutor</div>
            <div class="timeline-place">Erhvervsakademi SydVest · Esbjerg</div>
            <div class="timeline-desc">Vejledning og hjælp til 1. semester studerende inden for programmering og softwareudvikling.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date">2026 — Nu</div>
          <div class="timeline-body">
            <div class="timeline-role">Professionsbachelor Softwareudvikling</div>
            <div class="timeline-place">Erhvervsakademi SydVest</div>
            <div class="timeline-desc">Videregående uddannelse med fokus på backend-arkitektur, cloud og distribuerede systemer.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date">2023 — 2026</div>
          <div class="timeline-body">
            <div class="timeline-role">Datamatiker</div>
            <div class="timeline-place">Erhvervsakademi SydVest</div>
            <div class="timeline-desc">AP-uddannelse med fokus på .NET, databaser, cloud-løsninger og agile udviklingsmetoder.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date">2017 — 2022</div>
          <div class="timeline-body">
            <div class="timeline-role">Chauffør</div>
            <div class="timeline-place">Hotel Outrup · Esbjerg</div>
            <div class="timeline-desc">Kørsel af mad ud til ældre. Opbyggede stærke kommunikations- og servicekompetencer.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date">1998 — 2002</div>
          <div class="timeline-body">
            <div class="timeline-role">Kok / Kokkeelev</div>
            <div class="timeline-place">Esbjerg Tekniske Skole &amp; Rudbøl Grænsekro</div>
            <div class="timeline-desc">Uddannelse og arbejde som kok. Udviklede evner inden for teamwork, stresshåndtering og ansvarlighed.</div>
          </div>
        </div>
```

Replace with:
```html
        <div class="timeline-item">
          <div class="timeline-date" data-i18n="exp.date1">2024 — Nu</div>
          <div class="timeline-body">
            <div class="timeline-role" data-i18n="exp.role1">Tutor</div>
            <div class="timeline-place" data-i18n="exp.place1">Erhvervsakademi SydVest · Esbjerg</div>
            <div class="timeline-desc" data-i18n="exp.desc1">Vejledning og hjælp til 1. semester studerende inden for programmering og softwareudvikling.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date" data-i18n="exp.date2">2026 — Nu</div>
          <div class="timeline-body">
            <div class="timeline-role" data-i18n="exp.role2">Professionsbachelor Softwareudvikling</div>
            <div class="timeline-place" data-i18n="exp.place2">Erhvervsakademi SydVest</div>
            <div class="timeline-desc" data-i18n="exp.desc2">Videregående uddannelse med fokus på backend-arkitektur, cloud og distribuerede systemer.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date" data-i18n="exp.date3">2023 — 2026</div>
          <div class="timeline-body">
            <div class="timeline-role" data-i18n="exp.role3">Datamatiker</div>
            <div class="timeline-place" data-i18n="exp.place3">Erhvervsakademi SydVest</div>
            <div class="timeline-desc" data-i18n="exp.desc3">AP-uddannelse med fokus på .NET, databaser, cloud-løsninger og agile udviklingsmetoder.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date" data-i18n="exp.date4">2017 — 2022</div>
          <div class="timeline-body">
            <div class="timeline-role" data-i18n="exp.role4">Chauffør</div>
            <div class="timeline-place" data-i18n="exp.place4">Hotel Outrup · Esbjerg</div>
            <div class="timeline-desc" data-i18n="exp.desc4">Kørsel af mad ud til ældre. Opbyggede stærke kommunikations- og servicekompetencer.</div>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-date" data-i18n="exp.date5">1998 — 2002</div>
          <div class="timeline-body">
            <div class="timeline-role" data-i18n="exp.role5">Kok / Kokkeelev</div>
            <div class="timeline-place" data-i18n="exp.place5">Esbjerg Tekniske Skole & Rudbøl Grænsekro</div>
            <div class="timeline-desc" data-i18n="exp.desc5">Uddannelse og arbejde som kok. Udviklede evner inden for teamwork, stresshåndtering og ansvarlighed.</div>
          </div>
        </div>
```

- [ ] **Step 5: Projects section**

Find:
```html
      <div class="section-label">Sektion 03</div>
      <div class="section-num">03</div>
      <div class="section-title">Projekter</div>
```
Replace with:
```html
      <div class="section-label" data-i18n="proj.label">Sektion 03</div>
      <div class="section-num">03</div>
      <div class="section-title" data-i18n="proj.title">Projekter</div>
```

Find:
```html
        <p class="project-desc">Eksamenprojekt på 3. semester bygget for Jerne IF. Fuldt deployed webapplikation med rolle-baseret adgang (admin/spiller), client/server-arkitektur og automatiserede tests.</p>
```
Replace with:
```html
        <p class="project-desc" data-i18n="proj.desc1">Eksamenprojekt på 3. semester bygget for Jerne IF. Fuldt deployed webapplikation med rolle-baseret adgang (admin/spiller), client/server-arkitektur og automatiserede tests.</p>
```

Find:
```html
        <p class="project-desc">Java desktop-applikation udviklet i samarbejde med Schneider Electric. Moderne JavaFX-interface med Microsoft SQL Server og unit tests.</p>
```
Replace with:
```html
        <p class="project-desc" data-i18n="proj.desc2">Java desktop-applikation udviklet i samarbejde med Schneider Electric. Moderne JavaFX-interface med Microsoft SQL Server og unit tests.</p>
```

Find:
```html
        <h3 class="project-name">Film Anbefalingssystem</h3>
        <p class="project-desc">Anbefalingssystem i Java der bruger caching, HashMap-strukturer og brugersammenligning til at anbefale film baseret på lignende brugeres ratings.</p>
```
Replace with:
```html
        <h3 class="project-name" data-i18n="proj.name3">Film Anbefalingssystem</h3>
        <p class="project-desc" data-i18n="proj.desc3">Anbefalingssystem i Java der bruger caching, HashMap-strukturer og brugersammenligning til at anbefale film baseret på lignende brugeres ratings.</p>
```

- [ ] **Step 6: Contact section**

Find:
```html
      <div class="section-label" style="color:#888">Sektion 04</div>
      <div class="section-num contact-num">04</div>
      <div class="section-title contact-title">Kontakt</div>
      <blockquote class="contact-quote">"Lad os bygge noget sammen."</blockquote>
```
Replace with:
```html
      <div class="section-label" style="color:#888" data-i18n="contact.label">Sektion 04</div>
      <div class="section-num contact-num">04</div>
      <div class="section-title contact-title" data-i18n="contact.title">Kontakt</div>
      <blockquote class="contact-quote" data-i18n="contact.quote">"Lad os bygge noget sammen."</blockquote>
```

Find:
```html
      <div class="form-label-top">Skriv en besked</div>
      <form class="contact-form" action="https://formspree.io/f/mredzwgk" method="POST">
        <div class="form-group">
          <label for="name">Navn</label>
          <input type="text" id="name" name="name" placeholder="Dit navn" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="din@email.dk" required>
        </div>
        <div class="form-group">
          <label for="message">Besked</label>
          <textarea id="message" name="message" placeholder="Hvad vil du sige?" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn-send">Send besked →</button>
      </form>
```
Replace with:
```html
      <div class="form-label-top" data-i18n="contact.formLabel">Skriv en besked</div>
      <form class="contact-form" action="https://formspree.io/f/mredzwgk" method="POST">
        <div class="form-group">
          <label for="name" data-i18n="contact.nameLabel">Navn</label>
          <input type="text" id="name" name="name" placeholder="Dit navn" data-i18n-placeholder="contact.namePlaceholder" required>
        </div>
        <div class="form-group">
          <label for="email" data-i18n="contact.emailLabel">Email</label>
          <input type="email" id="email" name="email" placeholder="din@email.dk" data-i18n-placeholder="contact.emailPlaceholder" required>
        </div>
        <div class="form-group">
          <label for="message" data-i18n="contact.msgLabel">Besked</label>
          <textarea id="message" name="message" placeholder="Hvad vil du sige?" data-i18n-placeholder="contact.msgPlaceholder" rows="5" required></textarea>
        </div>
        <button type="submit" class="btn-send" data-i18n="contact.submit">Send besked →</button>
      </form>
```

- [ ] **Step 7: Verify in browser**

Open `index.html` — the page should still show all Danish text correctly. No visual changes yet.

---

## Task 4: JS — Translations object + setLanguage logic

**Files:**
- Modify: `assets/js/script.js` (add before the closing `})();`)

- [ ] **Step 1: Add language logic to script.js**

Find the closing `})();` at the end of `script.js` and insert the following block just before it:

```js
  // ── LANGUAGE SELECTOR ──
  const translations = {
    da: {
      'nav.about': 'Om mig', 'nav.experience': 'Erfaring',
      'nav.projects': 'Projekter', 'nav.contact': 'Kontakt',

      'hero.overline': 'Softwareudvikler · Esbjerg',
      'hero.subtitle': 'Datamatiker & Webudvikler',
      'hero.btn1': 'Om mig', 'hero.btn2': 'Projekter',
      'hero.location': 'Esbjerg, Danmark', 'hero.status': 'Open to work',

      'about.label': 'Sektion 01', 'about.title': 'Om mig',
      'about.bio1': 'Jeg er en dedikeret datamatiker på 45 år med en god arbejdsmoral og en dyb interesse indenfor softwareudvikling. Jeg er i gang med Professionsbacheloren i Softwareudvikling ved Erhvervsakademi SydVest i Esbjerg.',
      'about.bio2': 'Jeg har en baggrund i kokkebranchen, hvor jeg opbyggede stærke evner inden for teamwork, kommunikation og at arbejde under pres. Disse kompetencer er nu en naturlig del af mit arbejde som udvikler — problemløsning og samarbejde spiller en central rolle i det jeg laver.',
      'about.bio3': 'Udover mit studie engagerer jeg mig i frivilligt arbejde på flere områder, herunder app-udvikling og ansvar for en forenings hjemmeside. Jeg er passioneret om Linux-customization, rejser og at bidrage aktivt til communities.',
      'about.skillsLabel': 'Teknologier & Værktøjer',

      'exp.label': 'Sektion 02', 'exp.title': 'Erfaring',
      'exp.date1': '2024 — Nu', 'exp.role1': 'Tutor',
      'exp.place1': 'Erhvervsakademi SydVest · Esbjerg',
      'exp.desc1': 'Vejledning og hjælp til 1. semester studerende inden for programmering og softwareudvikling.',
      'exp.date2': '2026 — Nu', 'exp.role2': 'Professionsbachelor Softwareudvikling',
      'exp.place2': 'Erhvervsakademi SydVest',
      'exp.desc2': 'Videregående uddannelse med fokus på backend-arkitektur, cloud og distribuerede systemer.',
      'exp.date3': '2023 — 2026', 'exp.role3': 'Datamatiker',
      'exp.place3': 'Erhvervsakademi SydVest',
      'exp.desc3': 'AP-uddannelse med fokus på .NET, databaser, cloud-løsninger og agile udviklingsmetoder.',
      'exp.date4': '2017 — 2022', 'exp.role4': 'Chauffør',
      'exp.place4': 'Hotel Outrup · Esbjerg',
      'exp.desc4': 'Kørsel af mad ud til ældre. Opbyggede stærke kommunikations- og servicekompetencer.',
      'exp.date5': '1998 — 2002', 'exp.role5': 'Kok / Kokkeelev',
      'exp.place5': 'Esbjerg Tekniske Skole & Rudbøl Grænsekro',
      'exp.desc5': 'Uddannelse og arbejde som kok. Udviklede evner inden for teamwork, stresshåndtering og ansvarlighed.',

      'proj.label': 'Sektion 03', 'proj.title': 'Projekter',
      'proj.desc1': 'Eksamenprojekt på 3. semester bygget for Jerne IF. Fuldt deployed webapplikation med rolle-baseret adgang (admin/spiller), client/server-arkitektur og automatiserede tests.',
      'proj.desc2': 'Java desktop-applikation udviklet i samarbejde med Schneider Electric. Moderne JavaFX-interface med Microsoft SQL Server og unit tests.',
      'proj.name3': 'Film Anbefalingssystem',
      'proj.desc3': 'Anbefalingssystem i Java der bruger caching, HashMap-strukturer og brugersammenligning til at anbefale film baseret på lignende brugeres ratings.',

      'contact.label': 'Sektion 04', 'contact.title': 'Kontakt',
      'contact.quote': '"Lad os bygge noget sammen."',
      'contact.formLabel': 'Skriv en besked',
      'contact.nameLabel': 'Navn', 'contact.emailLabel': 'Email', 'contact.msgLabel': 'Besked',
      'contact.namePlaceholder': 'Dit navn',
      'contact.emailPlaceholder': 'din@email.dk',
      'contact.msgPlaceholder': 'Hvad vil du sige?',
      'contact.submit': 'Send besked →',
    },

    en: {
      'nav.about': 'About', 'nav.experience': 'Experience',
      'nav.projects': 'Projects', 'nav.contact': 'Contact',

      'hero.overline': 'Software Developer · Esbjerg',
      'hero.subtitle': 'Computer Scientist & Web Developer',
      'hero.btn1': 'About me', 'hero.btn2': 'Projects',
      'hero.location': 'Esbjerg, Denmark', 'hero.status': 'Open to work',

      'about.label': 'Section 01', 'about.title': 'About me',
      'about.bio1': 'I am a dedicated computer science graduate aged 45, with a strong work ethic and a deep passion for software development. I am currently pursuing a Professional Bachelor\'s degree in Software Development at Erhvervsakademi SydVest in Esbjerg.',
      'about.bio2': 'I have a background in the culinary industry, where I developed strong skills in teamwork, communication, and working under pressure. These competencies now form a natural part of my work as a developer — problem-solving and collaboration play a central role in what I do.',
      'about.bio3': 'Alongside my studies, I engage in voluntary work in several areas, including app development and managing a club\'s website. I am passionate about Linux customization, travel, and actively contributing to communities.',
      'about.skillsLabel': 'Technologies & Tools',

      'exp.label': 'Section 02', 'exp.title': 'Experience',
      'exp.date1': '2024 — Present', 'exp.role1': 'Tutor',
      'exp.place1': 'Erhvervsakademi SydVest · Esbjerg',
      'exp.desc1': 'Mentoring and support for 1st semester students in programming and software development.',
      'exp.date2': '2026 — Present', 'exp.role2': 'Professional Bachelor in Software Development',
      'exp.place2': 'Erhvervsakademi SydVest',
      'exp.desc2': 'Advanced degree focused on backend architecture, cloud computing, and distributed systems.',
      'exp.date3': '2023 — 2026', 'exp.role3': 'Computer Science (AP)',
      'exp.place3': 'Erhvervsakademi SydVest',
      'exp.desc3': 'AP degree focused on .NET, databases, cloud solutions, and agile development methods.',
      'exp.date4': '2017 — 2022', 'exp.role4': 'Driver',
      'exp.place4': 'Hotel Outrup · Esbjerg',
      'exp.desc4': 'Food delivery to elderly residents. Developed strong communication and service skills.',
      'exp.date5': '1998 — 2002', 'exp.role5': 'Chef / Chef Apprentice',
      'exp.place5': 'Esbjerg Tekniske Skole & Rudbøl Grænsekro',
      'exp.desc5': 'Training and work as a chef. Developed skills in teamwork, stress management, and accountability.',

      'proj.label': 'Section 03', 'proj.title': 'Projects',
      'proj.desc1': '3rd semester exam project built for Jerne IF. Fully deployed web application with role-based access (admin/player), client/server architecture, and automated tests.',
      'proj.desc2': 'Java desktop application developed in collaboration with Schneider Electric. Modern JavaFX interface with Microsoft SQL Server and unit tests.',
      'proj.name3': 'Movie Recommendation System',
      'proj.desc3': 'Java recommendation system using caching, HashMap structures, and user comparison to recommend movies based on similar users\' ratings.',

      'contact.label': 'Section 04', 'contact.title': 'Contact',
      'contact.quote': '"Let\'s build something together."',
      'contact.formLabel': 'Send a message',
      'contact.nameLabel': 'Name', 'contact.emailLabel': 'Email', 'contact.msgLabel': 'Message',
      'contact.namePlaceholder': 'Your name',
      'contact.emailPlaceholder': 'your@email.com',
      'contact.msgPlaceholder': 'What would you like to say?',
      'contact.submit': 'Send message →',
    },

    de: {
      'nav.about': 'Über mich', 'nav.experience': 'Erfahrung',
      'nav.projects': 'Projekte', 'nav.contact': 'Kontakt',

      'hero.overline': 'Softwareentwickler · Esbjerg',
      'hero.subtitle': 'Informatiker & Webentwickler',
      'hero.btn1': 'Über mich', 'hero.btn2': 'Projekte',
      'hero.location': 'Esbjerg, Dänemark', 'hero.status': 'Offen für Arbeit',

      'about.label': 'Abschnitt 01', 'about.title': 'Über mich',
      'about.bio1': 'Ich bin ein engagierter Informatiker, 45 Jahre alt, mit einer starken Arbeitsmoral und einem tiefen Interesse an der Softwareentwicklung. Ich absolviere derzeit den Professionsbachelor in Softwareentwicklung an der Erhvervsakademi SydVest in Esbjerg.',
      'about.bio2': 'Ich habe einen Hintergrund in der Gastronomie, wo ich starke Fähigkeiten in Teamarbeit, Kommunikation und dem Arbeiten unter Druck entwickelt habe. Diese Kompetenzen sind nun ein natürlicher Teil meiner Arbeit als Entwickler — Problemlösung und Zusammenarbeit spielen dabei eine zentrale Rolle.',
      'about.bio3': 'Neben meinem Studium engagiere ich mich ehrenamtlich in verschiedenen Bereichen, darunter App-Entwicklung und die Betreuung einer Vereinswebsite. Ich bin begeistert von Linux-Customization, Reisen und aktivem Community-Beitrag.',
      'about.skillsLabel': 'Technologien & Werkzeuge',

      'exp.label': 'Abschnitt 02', 'exp.title': 'Erfahrung',
      'exp.date1': '2024 — Heute', 'exp.role1': 'Tutor',
      'exp.place1': 'Erhvervsakademi SydVest · Esbjerg',
      'exp.desc1': 'Betreuung und Unterstützung von Erstsemesterstudierenden in Programmierung und Softwareentwicklung.',
      'exp.date2': '2026 — Heute', 'exp.role2': 'Professionsbachelor Softwareentwicklung',
      'exp.place2': 'Erhvervsakademi SydVest',
      'exp.desc2': 'Weiterführender Studiengang mit Schwerpunkt auf Backend-Architektur, Cloud und verteilten Systemen.',
      'exp.date3': '2023 — 2026', 'exp.role3': 'Informatiker (AP)',
      'exp.place3': 'Erhvervsakademi SydVest',
      'exp.desc3': 'AP-Studium mit Fokus auf .NET, Datenbanken, Cloud-Lösungen und agile Entwicklungsmethoden.',
      'exp.date4': '2017 — 2022', 'exp.role4': 'Fahrer',
      'exp.place4': 'Hotel Outrup · Esbjerg',
      'exp.desc4': 'Essenslieferung an ältere Menschen. Entwicklung starker Kommunikations- und Servicekompetenzen.',
      'exp.date5': '1998 — 2002', 'exp.role5': 'Koch / Kochlehrling',
      'exp.place5': 'Esbjerg Tekniske Skole & Rudbøl Grænsekro',
      'exp.desc5': 'Ausbildung und Arbeit als Koch. Entwicklung von Fähigkeiten in Teamarbeit, Stressmanagement und Verantwortungsbewusstsein.',

      'proj.label': 'Abschnitt 03', 'proj.title': 'Projekte',
      'proj.desc1': 'Abschlussprojekt im 3. Semester für Jerne IF. Vollständig deployte Webanwendung mit rollenbasiertem Zugriff (Admin/Spieler), Client/Server-Architektur und automatisierten Tests.',
      'proj.desc2': 'Java-Desktop-Anwendung in Zusammenarbeit mit Schneider Electric. Modernes JavaFX-Interface mit Microsoft SQL Server und Unit-Tests.',
      'proj.name3': 'Filmempfehlungssystem',
      'proj.desc3': 'Java-Empfehlungssystem mit Caching, HashMap-Strukturen und Benutzervergleich zur Filmempfehlung auf Basis ähnlicher Bewertungen.',

      'contact.label': 'Abschnitt 04', 'contact.title': 'Kontakt',
      'contact.quote': '"Lass uns gemeinsam etwas bauen."',
      'contact.formLabel': 'Schreib eine Nachricht',
      'contact.nameLabel': 'Name', 'contact.emailLabel': 'E-Mail', 'contact.msgLabel': 'Nachricht',
      'contact.namePlaceholder': 'Dein Name',
      'contact.emailPlaceholder': 'deine@email.de',
      'contact.msgPlaceholder': 'Was möchtest du sagen?',
      'contact.submit': 'Nachricht senden →',
    }
  };

  const flagSrc = { da: 'dk', en: 'gb', de: 'de' };
  const langCode = { da: 'DA', en: 'EN', de: 'DE' };

  function setLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang][key] !== undefined) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (translations[lang][key] !== undefined) el.placeholder = translations[lang][key];
    });
    document.querySelector('#langCurrent .lang-flag').src =
      `https://flagcdn.com/20x15/${flagSrc[lang]}.png`;
    document.querySelector('#langCurrent .lang-code').textContent = langCode[lang];
    document.documentElement.lang = lang;
    document.getElementById('langOptions').classList.remove('open');
    localStorage.setItem('lang', lang);
  }

  const langSelect = document.getElementById('langSelect');
  const langOptions = document.getElementById('langOptions');

  document.getElementById('langCurrent').addEventListener('click', () => {
    langOptions.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!langSelect.contains(e.target)) langOptions.classList.remove('open');
  });

  langOptions.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => setLanguage(li.dataset.lang));
  });

  setLanguage(localStorage.getItem('lang') || 'da');
```

- [ ] **Step 2: Verify language switching works**

Open `index.html` in a browser:
1. Click the flag dropdown — should show three options with flags
2. Click English — all text should switch to English, button should show 🇬🇧 EN
3. Click German — all text should switch to German, button should show 🇩🇪 DE
4. Click Danish — all text should return to Danish
5. Reload the page — last chosen language should persist

---

## Task 5: Commit and push

- [ ] **Step 1: Commit**

```bash
git add index.html assets/css/style.css assets/js/script.js
git commit -m "feat: add DA/EN/DE language selector to portfolio header"
```

- [ ] **Step 2: Push**

```bash
git push
```

- [ ] **Step 3: Verify on GitHub Pages**

Visit the live site and confirm the language selector works in production.
