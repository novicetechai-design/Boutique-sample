/**
 * ==============================================================================
 * 3D INTERACTIONS & PARALLAX ENGINE (js/interactions-3d.js)
 * ANY FACE CAN FIT — Contemporary 3D Fashion Web Architecture
 * ==============================================================================
 */

(function () {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // ----------------------------------------------------------------------------
  // 1. CUSTOM LUXURY CURSOR & MAGNETIC BUTTON INTERACTIONS
  // ----------------------------------------------------------------------------
  function initCustomCursor() {
    if (isTouchDevice || prefersReducedMotion) return;

    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');
    const cursorText = document.getElementById('cursor-text');

    if (!cursorDot || !cursorRing) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isHoveringMagnetic = false;
    let magneticTarget = null;
    let magneticRect = null;

    // Track mouse position
    window.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    // Smooth lerp loop for the outer cursor follower ring
    function renderCursor() {
      if (isHoveringMagnetic && magneticTarget && magneticRect) {
        // Subtle magnetic pull toward element center
        const targetCenterX = magneticRect.left + magneticRect.width / 2;
        const targetCenterY = magneticRect.top + magneticRect.height / 2;
        const pullX = mouseX + (targetCenterX - mouseX) * 0.35;
        const pullY = mouseY + (targetCenterY - mouseY) * 0.35;

        ringX += (pullX - ringX) * 0.2;
        ringY += (pullY - ringY) * 0.2;
      } else {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
      }

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Magnetic links and buttons
    const magneticElements = document.querySelectorAll('.magnetic-target, .btn, .nav-link, .header-icon-btn');
    magneticElements.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        isHoveringMagnetic = true;
        magneticTarget = el;
        magneticRect = el.getBoundingClientRect();
        document.body.classList.add('cursor-active');
      });

      el.addEventListener('mousemove', function () {
        if (magneticTarget === el) {
          magneticRect = el.getBoundingClientRect();
        }
      });

      el.addEventListener('mouseleave', function () {
        isHoveringMagnetic = false;
        magneticTarget = null;
        magneticRect = null;
        document.body.classList.remove('cursor-active');
      });
    });

    // Collection Cards Hover — Expand to gold indicator with "VIEW"
    const collectionCards = document.querySelectorAll('.collection-card-3d');
    collectionCards.forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-card-hover');
        if (cursorText) cursorText.textContent = 'VIEW';
      });

      card.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-card-hover');
        if (cursorText) cursorText.textContent = '';
      });
    });

    // 3D Fashion Detail Viewport Hover — "DRAG"
    const fashionViewport = document.getElementById('fashion-detail-viewport');
    if (fashionViewport) {
      fashionViewport.addEventListener('mouseenter', function () {
        document.body.classList.add('cursor-drag-hover');
        if (cursorText) cursorText.textContent = 'DRAG';
      });

      fashionViewport.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-drag-hover');
        if (cursorText) cursorText.textContent = '';
      });
    }

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function () {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      cursorDot.style.opacity = '1';
      cursorRing.style.opacity = '1';
    });
  }

  // ----------------------------------------------------------------------------
  // 2. HERO SECTION — 3D PARALLAX & CAMERA MOVEMENT
  // ----------------------------------------------------------------------------
  function initHeroParallax() {
    const heroSection = document.getElementById('hero');
    const heroStage = document.getElementById('hero-3d-stage');
    const depthScene = document.getElementById('hero-depth-scene');
    const heroGlare = document.getElementById('hero-glare');
    const heroModelsCard = document.querySelector('.hero-models-card');

    if (!heroSection || !depthScene || prefersReducedMotion) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let targetTransX = 0;
    let targetTransY = 0;

    let currentRotX = 0;
    let currentRotY = 0;
    let currentTransX = 0;
    let currentTransY = 0;

    const layers = depthScene.querySelectorAll('.depth-layer');

    function onMouseMove(e) {
      const rect = heroSection.getBoundingClientRect();
      // Normalized coordinates from -1 to 1 based on hero container
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Subtle tilt: max ±3.5 degrees
      targetRotY = normX * 3.5;
      targetRotX = -normY * 3.5;

      targetTransX = normX * 12;
      targetTransY = normY * 10;

      // Update Glare overlay angle
      if (heroGlare) {
        const glareX = (normX + 1) * 50;
        const glareY = (normY + 1) * 50;
        heroGlare.style.background = `linear-gradient(${120 + normX * 30}deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) ${glareY}%)`;
      }
    }

    heroSection.addEventListener('mousemove', onMouseMove, { passive: true });

    heroSection.addEventListener('mouseleave', function () {
      targetRotX = 0;
      targetRotY = 0;
      targetTransX = 0;
      targetTransY = 0;
    });

    // Render loop with lerp
    function updateHero() {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;
      currentTransX += (targetTransX - currentTransX) * 0.08;
      currentTransY += (targetTransY - currentTransY) * 0.08;

      depthScene.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

      // Parallax translation on individual depth layers
      layers.forEach(function (layer) {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0.05;
        const lx = currentTransX * depth * 8;
        const ly = currentTransY * depth * 8;
        layer.style.transform = `translate3d(${lx.toFixed(1)}px, ${ly.toFixed(1)}px, 0)`;
      });

      requestAnimationFrame(updateHero);
    }
    requestAnimationFrame(updateHero);

    // Mobile / Touch Fallback: Subtle scroll-driven parallax instead of cursor
    if (isTouchDevice) {
      window.addEventListener('scroll', function () {
        const scrollY = window.pageYOffset;
        if (scrollY < window.innerHeight) {
          const factor = scrollY * 0.04;
          depthScene.style.transform = `translateY(${factor}px) rotateX(${factor * 0.05}deg)`;
        }
      }, { passive: true });
    }
  }

  // ----------------------------------------------------------------------------
  // 3. 3D PRODUCT & COLLECTION CARDS TILT
  // ----------------------------------------------------------------------------
  function initCardTilt() {
    const cards = document.querySelectorAll('.collection-card-3d');
    if (prefersReducedMotion || isTouchDevice) return;

    cards.forEach(function (card) {
      const cardInner = card.querySelector('.card-inner');
      const cardMedia = card.querySelector('.card-media');
      const cardGlare = card.querySelector('.card-glare');
      const cardShadow = card.querySelector('.card-depth-shadow');

      if (!cardInner) return;

      let bounds = null;
      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;
      let isHovered = false;
      let rafId = null;

      function updateTilt() {
        currentRotX += (targetRotX - currentRotX) * 0.15;
        currentRotY += (targetRotY - currentRotY) * 0.15;

        cardInner.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateZ(12px)`;

        // Soft dynamic shadow reacting opposite to light
        if (cardShadow) {
          const shadowX = -currentRotY * 1.5;
          const shadowY = currentRotX * 1.5 + 16;
          cardShadow.style.boxShadow = `${shadowX.toFixed(1)}px ${shadowY.toFixed(1)}px 32px rgba(17, 17, 17, 0.14)`;
        }

        if (isHovered || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
          rafId = requestAnimationFrame(updateTilt);
        } else {
          cardInner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
          if (cardShadow) cardShadow.style.boxShadow = '0 16px 32px rgba(17, 17, 17, 0.12)';
          rafId = null;
        }
      }

      card.addEventListener('mouseenter', function () {
        bounds = card.getBoundingClientRect();
        isHovered = true;
        if (!rafId) rafId = requestAnimationFrame(updateTilt);
      });

      card.addEventListener('mousemove', function (e) {
        if (!bounds) bounds = card.getBoundingClientRect();

        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const normX = (x / bounds.width - 0.5) * 2;
        const normY = (y / bounds.height - 0.5) * 2;

        // Realistic tilt perspective (max ±9 degrees)
        targetRotY = normX * 9;
        targetRotX = -normY * 9;

        // Dynamic glare on card
        if (cardGlare) {
          const glareX = (normX + 1) * 50;
          const glareY = (normY + 1) * 50;
          cardGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 65%)`;
        }
      });

      card.addEventListener('mouseleave', function () {
        isHovered = false;
        targetRotX = 0;
        targetRotY = 0;
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 4. JOURNAL CARDS 3D ENTRANCE & HOVER
  // ----------------------------------------------------------------------------
  function initJournalCards() {
    const journalCards = document.querySelectorAll('.journal-card');
    if (prefersReducedMotion || isTouchDevice) return;

    journalCards.forEach(function (card) {
      const media = card.querySelector('.journal-media');
      const glare = card.querySelector('.journal-glare');

      card.addEventListener('mousemove', function (e) {
        const bounds = card.getBoundingClientRect();
        const normX = (e.clientX - bounds.left) / bounds.width - 0.5;
        const normY = (e.clientY - bounds.top) / bounds.height - 0.5;

        card.style.transform = `translateY(-5px) rotateX(${-normY * 4}deg) rotateY(${normX * 4}deg)`;

        if (glare) {
          const gx = (normX + 0.5) * 100;
          const gy = (normY + 0.5) * 100;
          glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)`;
        }
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 5. SCROLL PARALLAX & REVEAL ANIMATIONS (GSAP & IntersectionObserver)
  // ----------------------------------------------------------------------------
  function initScrollParallax() {
    // Page load hero reveal animation
    if (typeof gsap !== 'undefined') {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.1 } });

      heroTl.from('.hero-eyebrow', { opacity: 0, y: 20, delay: 0.2 })
            .from('.hero-headline .line-1', { opacity: 0, y: 35 }, '-=0.9')
            .from('.hero-headline .line-2', { opacity: 0, y: 35 }, '-=0.85')
            .from('.hero-subheadline', { opacity: 0, y: 25 }, '-=0.8')
            .from('.hero-cta-group', { opacity: 0, y: 20 }, '-=0.75')
            .from('.hero-pillars-grid', { opacity: 0, y: 25 }, '-=0.7')
            .from('.hero-depth-scene', { opacity: 0, scale: 0.94, y: 30, duration: 1.3 }, '-=1.2')
            .from('.hero-side-typography', { opacity: 0, x: 20 }, '-=0.9');

      // Scroll reveals with ScrollTrigger if available
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Staggered collection cards reveal
        gsap.from('.collection-card-3d', {
          scrollTrigger: {
            trigger: '#collections',
            start: 'top 80%',
            once: true
          },
          opacity: 0,
          y: 40,
          rotateX: 10,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power2.out'
        });

        // Journal cards reveal
        gsap.from('.journal-card', {
          scrollTrigger: {
            trigger: '#journal',
            start: 'top 80%',
            once: true
          },
          opacity: 0,
          y: 35,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power2.out'
        });

        // Curated Fashion Feature subtle fade-in
        gsap.from(['.fashion-detail-text', '.fashion-detail-viewport'], {
          scrollTrigger: {
            trigger: '.fashion-detail-section',
            start: 'top 82%',
            once: true
          },
          opacity: 0,
          y: 25,
          stagger: 0.15,
          duration: 0.85,
          ease: 'power2.out'
        });

        // About Studio Image Parallax vertical displacement
        const aboutImg = document.querySelector('.about-studio-img');
        if (aboutImg) {
          gsap.to(aboutImg, {
            scrollTrigger: {
              trigger: '.about-section',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2
            },
            y: -35,
            ease: 'none'
          });
        }
      }
    }
  }

  // ----------------------------------------------------------------------------
  // 6. MOBILE NAVIGATION DRAWER
  // ----------------------------------------------------------------------------
  function initMobileDrawer() {
    const menuBtn = document.getElementById('menu-toggle-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close-btn');

    if (!menuBtn || !drawer || !backdrop) return;

    function openDrawer() {
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);

    // Close on drawer link click
    const drawerLinks = drawer.querySelectorAll('.drawer-link');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ----------------------------------------------------------------------------
  // 7. SMOOTH SCROLL FOR ANCHOR LINKS
  // ----------------------------------------------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Initialize all interactions
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initCustomCursor();
      initHeroParallax();
      initCardTilt();
      initJournalCards();
      initScrollParallax();
      initMobileDrawer();
      initSmoothScroll();
    });
  } else {
    initCustomCursor();
    initHeroParallax();
    initCardTilt();
    initJournalCards();
    initScrollParallax();
    initMobileDrawer();
    initSmoothScroll();
  }

})();
