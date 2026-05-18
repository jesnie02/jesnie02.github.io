(() => {
  // ── HAMBURGER MENU ──
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const navClose = document.getElementById('navClose');
  const navLinks = document.querySelectorAll('.nav-link');

  function openNav() {
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    navClose.focus();
  }
  function closeNav() {
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }

  hamburger.addEventListener('click', openNav);
  navClose.addEventListener('click', closeNav);
  navLinks.forEach(link => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  // ── HEADER SCROLL SHADOW ──
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.08)'
      : 'none';
  }, { passive: true });

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (hash === '#') return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
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
      'exp.desc4': 'Kørsel af mad ud til ældre borgere i Esbjerg-området. Lærte at planlægge ruter, kommunikere med mange slags mennesker og møde op til tiden.',
      'exp.date5': '1998 — 2002', 'exp.role5': 'Kok / Kokkeelev',
      'exp.place5': 'Esbjerg Tekniske Skole & Rudbøl Grænsekro',
      'exp.desc5': 'Uddannet kok med et par år i et rigtigt køkken bagefter. Et sted der lærte mig, hvad det vil sige at arbejde under pres.',

      'proj.label': 'Sektion 03', 'proj.title': 'Projekter',
      'proj.desc1': 'Eksamenprojekt på 3. semester bygget for Jerne IF. Fuldt deployed webapplikation med rolle-baseret adgang (admin/spiller), client/server-arkitektur og automatiserede tests.',
      'proj.desc2': 'Java desktop-applikation udviklet i samarbejde med Schneider Electric. JavaFX-interface med Microsoft SQL Server i baggrunden og unit tests.',
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
      'exp.desc4': 'Food delivery to elderly residents around Esbjerg. Learned route planning, talking to all kinds of people, and showing up on time.',
      'exp.date5': '1998 — 2002', 'exp.role5': 'Chef / Chef Apprentice',
      'exp.place5': 'Esbjerg Tekniske Skole & Rudbøl Grænsekro',
      'exp.desc5': 'Trained as a chef, then worked in a real kitchen for a couple of years. It taught me what working under pressure actually means.',

      'proj.label': 'Section 03', 'proj.title': 'Projects',
      'proj.desc1': '3rd semester exam project built for Jerne IF. Fully deployed web application with role-based access (admin/player), client/server architecture, and automated tests.',
      'proj.desc2': 'Java desktop application built in collaboration with Schneider Electric. JavaFX interface backed by Microsoft SQL Server, with unit tests.',
      'proj.name3': 'Movie Recommendation System',
      'proj.desc3': 'Java recommendation system using caching, HashMap structures, and user comparison to suggest movies based on similar users\' ratings.',

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
      'exp.desc4': 'Essenslieferung an ältere Bewohner im Raum Esbjerg. Routenplanung, Kommunikation mit verschiedenen Menschen und Zuverlässigkeit.',
      'exp.date5': '1998 — 2002', 'exp.role5': 'Koch / Kochlehrling',
      'exp.place5': 'Esbjerg Tekniske Skole & Rudbøl Grænsekro',
      'exp.desc5': 'Ausbildung zum Koch, dann ein paar Jahre in einer echten Küche. Dort habe ich gelernt, was Arbeiten unter Druck wirklich bedeutet.',

      'proj.label': 'Abschnitt 03', 'proj.title': 'Projekte',
      'proj.desc1': 'Abschlussprojekt im 3. Semester für Jerne IF. Vollständig deployte Webanwendung mit rollenbasiertem Zugriff (Admin/Spieler), Client/Server-Architektur und automatisierten Tests.',
      'proj.desc2': 'Java-Desktop-Anwendung in Zusammenarbeit mit Schneider Electric. JavaFX-Interface mit Microsoft SQL Server im Hintergrund und Unit-Tests.',
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
    document.getElementById('langCurrent').setAttribute('aria-expanded', 'false');
    localStorage.setItem('lang', lang);
  }

  const langSelect = document.getElementById('langSelect');
  const langOptions = document.getElementById('langOptions');
  const langCurrent = document.getElementById('langCurrent');

  function openLangMenu() {
    langOptions.classList.add('open');
    langCurrent.setAttribute('aria-expanded', 'true');
    langOptions.querySelector('li').focus();
  }
  function closeLangMenu() {
    langOptions.classList.remove('open');
    langCurrent.setAttribute('aria-expanded', 'false');
  }

  langCurrent.addEventListener('click', () => {
    langOptions.classList.contains('open') ? closeLangMenu() : openLangMenu();
  });

  document.addEventListener('click', e => {
    if (!langSelect.contains(e.target)) closeLangMenu();
  });

  langOptions.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => { setLanguage(li.dataset.lang); langCurrent.focus(); });
    li.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLanguage(li.dataset.lang); langCurrent.focus(); }
      if (e.key === 'Escape') { closeLangMenu(); langCurrent.focus(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); (li.nextElementSibling || langOptions.firstElementChild).focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); (li.previousElementSibling || langOptions.lastElementChild).focus(); }
    });
  });

  setLanguage(localStorage.getItem('lang') || 'da');
})();
