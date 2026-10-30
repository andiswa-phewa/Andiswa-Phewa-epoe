const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('is-ready');

  const menuButton = $('.menu-toggle');
  const nav = $('.site-nav');
  if (menuButton && nav) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    $$('.site-nav a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in-view'));
  }

  $$('[data-back-to-top]').forEach(button => {
    button.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'website visitor'}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:anphewa@rbi.ac.za?subject=${subject}&body=${body}`;
    });
  }

  initProjectPortfolio();
});

const projectData = {
  cyber: {
    type: 'Software development',
    title: 'Cybersecurity Awareness Chatbot',
    description: 'A C# cybersecurity awareness application that progressed from console interaction to a Windows Forms interface. The implementation focuses on conversational guidance, user interaction and core C# concepts.',
    features: [
      'Cybersecurity awareness responses',
      'Password, phishing and safe browsing guidance',
      'Keyword recognition and fallback handling',
      'Randomised responses and conversation flow',
      'Memory and recall',
      'Sentiment handling',
      'Audio greeting and graphical interface',
      'Collections, delegates, events and lambda expressions'
    ],
    tech: ['C#', '.NET', 'Windows Forms', 'Visual Studio', 'Git and GitHub']
  },
  raceday: {
    type: 'API and database development',
    title: 'RaceDay Event Management Platform',
    description: 'A structured ASP.NET Core REST API for event registration and race management. The system models users, roles, events, categories, enrolments and results through a relational design.',
    features: [
      'User registration and login architecture',
      'Roles and user profiles',
      'Event and category management',
      'Participant enrolments and race results',
      'DTOs and validation',
      'GET, POST, PUT and DELETE endpoints',
      'Relational database modelling',
      'Swagger and OpenAPI testing'
    ],
    tech: ['C#', 'ASP.NET Core', 'REST API', 'SQL Server', 'JSON', 'Visual Studio', 'GitHub']
  },
  login: {
    type: 'Java programming',
    title: 'Java Registration and Login System',
    description: 'A console-based Java implementation focused on registration, authentication, input rules, regular expressions and unit testing.',
    features: [
      'User registration',
      'Username validation',
      'Password complexity validation',
      'South African cellphone number validation',
      'Login authentication',
      'Personalised login messages',
      'Input validation',
      'JUnit testing'
    ],
    tech: ['Java', 'NetBeans', 'Maven', 'JUnit', 'Regular expressions']
  },
  lab: {
    type: 'Java programming',
    title: 'Java Laboratory Booking Data Analysis',
    description: 'A compact Java data-processing implementation that uses one-dimensional and two-dimensional arrays to calculate and compare booking information.',
    features: ['One-dimensional arrays', 'Two-dimensional arrays', 'Nested loops', 'Totals and averages', 'Minimum and maximum values', 'Structured console output'],
    tech: ['Java', 'NetBeans']
  },
  medicare: {
    type: 'Object-oriented programming',
    title: 'Medicare Patient Management System',
    description: 'An inheritance-based Java model that separates shared patient behaviour from specialised inpatient, outpatient and emergency patient requirements.',
    features: ['Patient superclass', 'Inpatient, Outpatient and Emergency Patient subclasses', 'Encapsulation', 'Constructors', 'Final and mutable fields', 'Ward and bed allocation', 'Object-oriented design', 'Unit testing'],
    tech: ['Java', 'Object-oriented programming', 'JUnit', 'NetBeans']
  },
  support: {
    type: 'Web application development',
    title: 'Support Ticket Management Application',
    description: 'An ASP.NET Core MVC application for capturing structured support requests and demonstrating the relationship between models, views and controllers.',
    features: ['Support ticket creation', 'Form submission', 'Models, views and controllers', 'Input validation', 'Confirmation flow', 'Structured MVC architecture'],
    tech: ['C#', 'ASP.NET Core MVC', 'Bootstrap', 'Visual Studio']
  },
  dealership: {
    type: 'Web and database development',
    title: 'Vehicle Dealership Web and Database System',
    description: 'A relational web system built around vehicle, customer and sales information with database design and server-side integration.',
    features: ['Vehicle records', 'Customer records', 'Sales data', 'Relational database design', 'ERD development', 'Primary and foreign keys', 'CRUD operations', 'Database queries'],
    tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'MariaDB', 'XAMPP', 'phpMyAdmin']
  },
  claims: {
    type: 'C# application development',
    title: 'Contract Lecturer Claim Preview System',
    description: 'A C# implementation for capturing lecturer claim information and calculating preview totals while demonstrating selected advanced language concepts.',
    features: ['Claim entry', 'Module codes', 'Hours worked', 'Hourly rate', 'Calculated totals', 'Operator overloading', 'Extension methods', 'Anonymous objects', 'Text file output'],
    tech: ['C#', '.NET', 'Visual Studio']
  },
  ticketapi: {
    type: 'REST API development',
    title: 'Ticket Management REST API',
    description: 'A RESTful ASP.NET Core Web API for managing ticket resources and practising resource-oriented controller design.',
    features: ['RESTful resources', 'Controllers', 'GET endpoints', 'POST endpoints', 'PUT endpoints', 'DELETE endpoints', 'JSON responses', 'HTTPS and API testing'],
    tech: ['C#', 'ASP.NET Core Web API', 'JSON', 'Swagger', 'OpenAPI']
  },
  testing: {
    type: 'Software quality and testing',
    title: 'Software Quality Assurance and Testing Portfolio',
    description: 'A practical testing portfolio focused on planning, documenting and evaluating software behaviour against requirements.',
    features: ['Test case design', 'Functional testing', 'Unit testing', 'Integration and system testing', 'User acceptance testing concepts', 'Expected versus actual results', 'Defect identification and reporting', 'Requirements traceability', 'Website and form testing', 'Quality documentation'],
    tech: ['Software quality assurance', 'JUnit', 'Test documentation', 'Functional testing', 'Statistical Process Control concepts']
  }
};

function initProjectPortfolio() {
  const grid = $('#project-grid');
  if (!grid) return;

  const cards = $$('.project-card', grid);
  const filters = $$('.filter');
  const count = $('#project-count');
  const modal = $('#project-modal');

  const refreshCount = () => {
    if (!count) return;
    const visible = cards.filter(card => !card.hidden).length;
    count.textContent = `${visible} project${visible === 1 ? '' : 's'} shown`;
  };

  filters.forEach(button => {
    button.addEventListener('click', () => {
      filters.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      const filter = button.dataset.filter;
      cards.forEach(card => {
        card.hidden = filter !== 'all' && card.dataset.category !== filter;
      });
      refreshCount();
    });
  });
  refreshCount();

  if (!modal) return;
  const title = $('#modal-title', modal);
  const kicker = $('#modal-kicker', modal);
  const description = $('#modal-description', modal);
  const features = $('#modal-features', modal);
  const tech = $('#modal-tech', modal);
  const close = $('.modal-close', modal);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const data = projectData[card.dataset.project];
      if (!data) return;
      kicker.textContent = data.type;
      title.textContent = data.title;
      description.textContent = data.description;
      features.innerHTML = data.features.map(item => `<li>${escapeHtml(item)}</li>`).join('');
      tech.innerHTML = data.tech.map(item => `<li>${escapeHtml(item)}</li>`).join('');
      modal.showModal();
    });
  });

  close?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => {
    const rect = modal.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) modal.close();
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
}



// Immersive video UX: keep an independently muted blurred copy in sync with the primary video.
function initialiseImmersiveVideo(stage){
  if(stage.dataset.initialised==='yes')return;
  stage.dataset.initialised='yes';
  const main=stage.querySelector('video.video-foreground');
  const blurred=stage.querySelector('video.video-backdrop');
  const cover=stage.querySelector('.video-cover');
  if(!main||!blurred||!cover)return;
  blurred.muted=true;blurred.volume=0;
  blurred.controls=false;
  const sync=()=>{
    if(!Number.isFinite(main.currentTime))return;
    if(Math.abs((blurred.currentTime||0)-main.currentTime)>0.45){
      try{blurred.currentTime=main.currentTime}catch(_e){}
    }
  };
  const resumeBackdrop=()=>{
    sync();
    blurred.playbackRate=main.playbackRate;
    blurred.play().catch(()=>{});
  };
  cover.addEventListener('click',()=>{
    main.controls=true;stage.classList.add('has-started');
    main.play().catch(()=>{stage.classList.remove('has-started');main.controls=false});
  });
  main.addEventListener('play',()=>{stage.classList.add('is-playing','has-started');resumeBackdrop()});
  main.addEventListener('pause',()=>{stage.classList.remove('is-playing');blurred.pause()});
  main.addEventListener('seeking',sync);
  main.addEventListener('seeked',sync);
  main.addEventListener('ratechange',()=>{blurred.playbackRate=main.playbackRate});
  main.addEventListener('timeupdate',sync);
  main.addEventListener('ended',()=>{blurred.pause();stage.classList.remove('is-playing')});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)blurred.pause();else if(!main.paused)resumeBackdrop()});
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.immersive-video').forEach(initialiseImmersiveVideo);
  // Student videos: drop the requested MP4 in assets/videos/. A real playable player
  // replaces each designed placeholder automatically when the file becomes available.
  document.querySelectorAll('.student-demo[data-demo-file]').forEach(container=>{
    const filename=container.dataset.demoFile;
    const preview=container.querySelector('.demo-preview');
    const status=container.querySelector('.student-demo-status');
    if(!filename||!preview)return;
    const probe=document.createElement('video');
    probe.preload='metadata';probe.muted=true;
    probe.src=filename;
    probe.addEventListener('loadedmetadata',()=>{
      const label='Watch '+(container.closest('.student-project')?.querySelector('h3')?.textContent||'project')+' demonstration';
      const stage=document.createElement('div');
      stage.className='immersive-video is-idle';
      stage.setAttribute('data-media-player','');
      const art=preview.querySelector('.demo-preview-art');
      const theme=getComputedStyle(preview).backgroundImage;
      stage.style.background=theme||'#183a32';
      const background=document.createElement('video');
      background.src=filename;background.className='video-backdrop';background.muted=true;background.loop=true;background.playsInline=true;background.preload='none';background.tabIndex=-1;background.setAttribute('aria-hidden','true');
      const foreground=document.createElement('video');
      foreground.src=filename;foreground.className='video-foreground';foreground.preload='metadata';foreground.playsInline=true;foreground.setAttribute('aria-label',label);
      const cover=document.createElement('button');
      cover.className='video-cover';cover.type='button';cover.setAttribute('aria-label',label);
      cover.style.background='linear-gradient(130deg,rgba(19,54,46,.25),rgba(19,54,46,.78)),'+(theme||'linear-gradient(135deg,#183a32,#4f7465)');
      const play=document.createElement('span');play.className='video-cover-play';play.setAttribute('aria-hidden','true');play.textContent='▶';
      const title=document.createElement('span');title.className='video-cover-title';title.textContent=label;
      const helper=document.createElement('span');helper.className='video-cover-helper';helper.textContent='Play video';
      cover.append(play,title,helper);stage.append(background,foreground,cover);
      preview.replaceWith(stage);
      container.classList.add('demo-loaded');
      if(status)status.textContent='Play student demonstration';
      initialiseImmersiveVideo(stage);
    },{once:true});
    probe.addEventListener('error',()=>{if(status)status.textContent='Demo video coming soon'},{once:true});
  });
});


/* Editorial on-page navigation — progress, section tracking and quick jumps. */
document.addEventListener('DOMContentLoaded', () => {
  const points = [...document.querySelectorAll('main [data-journey-label]')];
  if (!points.length) return;
  const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = prefersLessMotion ? 'auto' : 'smooth';

  // A slim progress line, separate from site content and not a judging score.
  const progress = document.createElement('div');
  progress.className = 'page-read-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  const dock = document.createElement('div');
  dock.className = 'page-section-dock';
  dock.innerHTML = `
    <button class="page-section-trigger" type="button" aria-expanded="false" aria-controls="page-section-list" aria-label="Explore sections on this page">
      <span class="page-section-dot" aria-hidden="true"></span>
      <span class="page-section-trigger-text"><small>ON THIS PAGE</small><strong class="page-section-active">${points[0].dataset.journeyLabel}</strong></span>
      <span class="page-section-counter" aria-hidden="true">01 / ${String(points.length).padStart(2, '0')}</span>
      <svg class="page-section-chevron" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m6 14 6-6 6 6" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.7"/></svg>
    </button>
    <nav class="page-section-panel" id="page-section-list" aria-label="Sections on this page" hidden>
      <p class="page-section-panel-heading">JUMP TO A SECTION</p>
      <ol class="page-section-links"></ol>
    </nav>`;
  document.body.append(dock);
  const trigger = dock.querySelector('.page-section-trigger');
  const panel = dock.querySelector('.page-section-panel');
  const links = dock.querySelector('.page-section-links');
  const activeName = dock.querySelector('.page-section-active');
  const counter = dock.querySelector('.page-section-counter');
  const footer = document.querySelector('.site-footer');

  points.forEach((section, index) => {
    if (!section.id) section.id = `portfolio-section-${index + 1}`;
    const item = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${section.id}`;
    a.className = 'page-section-link';
    a.innerHTML = `<span class="page-section-number">${String(index + 1).padStart(2, '0')}</span><span>${section.dataset.journeyLabel}</span>`;
    a.addEventListener('click', (event) => {
      event.preventDefault();
      setOpen(false);
      section.scrollIntoView({ behavior: motion, block: 'start' });
      if (history.replaceState) history.replaceState(null, '', `#${section.id}`);
      setActive(index);
    });
    item.append(a); links.append(item);
  });
  const anchorLinks = [...links.querySelectorAll('a')];

  let selected = -1;
  const setActive = (index) => {
    if (selected === index) return;
    selected = index;
    activeName.textContent = points[index].dataset.journeyLabel;
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(points.length).padStart(2, '0')}`;
    anchorLinks.forEach((link, i) => {
      if (i === index) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  function setOpen(open) {
    trigger.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    dock.classList.toggle('is-open', open);
  }
  trigger.addEventListener('click', () => setOpen(panel.hidden));
  document.addEventListener('pointerdown', event => {
    if (!dock.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) {
      setOpen(false); trigger.focus();
    }
  });

  let ticking = false;
  function updatePosition() {
    ticking = false;
    const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const percentage = Math.max(0, Math.min(1, window.scrollY / scrollable));
    progress.style.transform = `scaleX(${percentage})`;

    // Keep the floating guide above the footer, not over its contact links.
    // The base bottom is read from CSS, so it works at desktop and mobile sizes.
    // As the footer scrolls into view the guide smoothly moves above it, then
    // naturally leaves the screen when the page ends. It returns on scroll up.
    if (footer) {
      const bottomInset = parseFloat(window.getComputedStyle(dock).bottom) || 0;
      const normalDockBottom = window.innerHeight - bottomInset;
      const clearance = 16;
      const footerTop = footer.getBoundingClientRect().top;
      const lift = Math.max(0, Math.ceil(normalDockBottom - footerTop + clearance));
      dock.style.setProperty('--footer-clearance', `${lift}px`);
      // When the footer takes over the screen, don't leave an open menu behind.
      if (footerTop < 0 && !panel.hidden) setOpen(false);
    }

    // An anchor near the upper third feels consistent during normal scrolling.
    const referenceY = window.scrollY + Math.min(window.innerHeight * 0.37, 310);
    let activeIndex = 0;
    points.forEach((point, index) => {
      if (point.getBoundingClientRect().top + window.scrollY <= referenceY) activeIndex = index;
    });
    setActive(activeIndex);
  }
  function scheduleUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updatePosition);
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('load', scheduleUpdate, { once: true });
  scheduleUpdate();

  // Second subtle effect: stagger selected evidence/cards as they enter view.
  if (prefersLessMotion || !('IntersectionObserver' in window)) return;
  const items = [...document.querySelectorAll(
    '.practice-grid article, .discipline, .outcome-stats > *, .evidence-links a, .cert-grid > *, .workshop-grid > *'
  )];
  items.forEach((item, index) => {
    item.classList.add('quiet-reveal');
    item.style.setProperty('--entry-delay', `${(index % 3) * 65}ms`);
  });
  if (!items.length) return;
  document.body.classList.add('motion-enabled');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      observer.unobserve(target);
    });
  }, { threshold: .08, rootMargin: '0px 0px 25px 0px' });
  items.forEach(item => observer.observe(item));
});
