/**
 * ==============================================================================
 * THEME & CONFIGURATION ENGINE (theme.js)
 * ==============================================================================
 * Automatically applies configuration parameters from `site.config.js`
 * to the DOM, navigation menus, hero showcase, collections spotlights,
 * product catalog grid, value highlights, about story, lookbook gallery,
 * and CSS Custom Properties.
 * 
 * Ensures all client customization happens through `site.config.js`
 * without touching core HTML or CSS files.
 * ==============================================================================
 */

(function () {
  'use strict';

  function initThemeEngine() {
    if (typeof SITE_CONFIG === 'undefined') {
      console.warn('SITE_CONFIG is not loaded. Using default markup.');
      return;
    }

    const config = SITE_CONFIG;
    const root = document.documentElement;

    // --------------------------------------------------------------------------
    // 1. APPLY THEME COLOR & FONT OVERRIDES TO CSS CUSTOM PROPERTIES
    // --------------------------------------------------------------------------
    if (config.theme && config.theme.colors) {
      const colors = config.theme.colors;
      if (colors.primary) root.style.setProperty('--color-primary', colors.primary);
      if (colors.accent) root.style.setProperty('--color-accent', colors.accent);
      if (colors.accentHover) root.style.setProperty('--color-accent-hover', colors.accentHover);
      if (colors.accentSoft) root.style.setProperty('--color-accent-soft', colors.accentSoft);
      if (colors.secondary) root.style.setProperty('--color-secondary', colors.secondary);
      if (colors.bgMain) root.style.setProperty('--color-bg-main', colors.bgMain);
      if (colors.bgDark) root.style.setProperty('--color-bg-dark', colors.bgDark);
    }

    if (config.theme && config.theme.fonts) {
      const fonts = config.theme.fonts;
      if (fonts.serif) root.style.setProperty('--font-serif', fonts.serif);
      if (fonts.sans) root.style.setProperty('--font-sans', fonts.sans);
    }

    // --------------------------------------------------------------------------
    // 2. HELPER TO RESOLVE NESTED KEYS ("brand.name" -> config.brand.name)
    // --------------------------------------------------------------------------
    function getNestedValue(obj, path) {
      return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined ? prev[curr] : null), obj);
    }

    // --------------------------------------------------------------------------
    // 3. AUTO-BIND TEXT AND ATTRIBUTES
    // --------------------------------------------------------------------------
    document.querySelectorAll('[data-config]').forEach(el => {
      const keyPath = el.getAttribute('data-config');
      const value = getNestedValue(config, keyPath);
      if (value !== null) {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-config-href]').forEach(el => {
      const keyPath = el.getAttribute('data-config-href');
      const value = getNestedValue(config, keyPath);
      if (value !== null) {
        el.setAttribute('href', value);
      }
    });

    // --------------------------------------------------------------------------
    // 4. WHATSAPP GENERATOR
    // --------------------------------------------------------------------------
    const whatsappClean = (config.contact && config.contact.whatsappNumber) ? config.contact.whatsappNumber.replace(/\D/g, '') : '';
    const whatsappMsg = (config.contact && config.contact.whatsappDefaultMessage) ? encodeURIComponent(config.contact.whatsappDefaultMessage) : '';
    const whatsappUrl = `https://wa.me/${whatsappClean}?text=${whatsappMsg}`;

    document.querySelectorAll('[data-whatsapp-link]').forEach(el => {
      el.setAttribute('href', whatsappUrl);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    // --------------------------------------------------------------------------
    // 5. BRAND LOGO RENDERING (Image Logo vs Serif Typography)
    // --------------------------------------------------------------------------
    document.querySelectorAll('[data-brand-logo-container]').forEach(container => {
      if (config.brand && config.brand.logoImage) {
        container.innerHTML = `<img src="${config.brand.logoImage}" alt="${config.brand.logoAlt || config.brand.name}" class="brand-logo-img">`;
      } else if (config.brand) {
        container.innerHTML = `
          <span class="brand-title">${config.brand.name}</span>
          ${config.brand.tagline ? `<span class="brand-tagline-sub">${config.brand.tagline}</span>` : ''}
        `;
      }
    });

    // --------------------------------------------------------------------------
    // 6. POPULATE NAVIGATION MENUS (Desktop & Mobile Drawer)
    // --------------------------------------------------------------------------
    if (Array.isArray(config.navigation)) {
      // Desktop Nav
      const desktopNavContainer = document.querySelector('[data-nav-container]');
      if (desktopNavContainer) {
        desktopNavContainer.innerHTML = '';
        config.navigation.forEach((item, index) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.className = `nav-link ${index === 0 ? 'active' : ''}`;
          a.href = item.href;
          a.textContent = item.label;
          li.appendChild(a);
          desktopNavContainer.appendChild(li);
        });
      }

      // Mobile Drawer Nav
      const drawerNavContainer = document.querySelector('[data-drawer-nav-container]');
      if (drawerNavContainer) {
        drawerNavContainer.innerHTML = '';
        config.navigation.forEach(item => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.className = 'drawer-nav-link';
          a.href = item.href;
          a.innerHTML = `
            <span>${item.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          `;
          li.appendChild(a);
          drawerNavContainer.appendChild(li);
        });
      }
    }

    // --------------------------------------------------------------------------
    // 7. HERO SECTION DYNAMIC RENDERING
    // --------------------------------------------------------------------------
    if (config.hero) {
      const hero = config.hero;

      const eyebrowEl = document.querySelector('[data-hero-eyebrow]');
      if (eyebrowEl && hero.eyebrow) eyebrowEl.textContent = hero.eyebrow;

      const headlineEl = document.querySelector('[data-hero-headline]');
      if (headlineEl && hero.headline) headlineEl.innerHTML = hero.headline;

      const subheadlineEl = document.querySelector('[data-hero-subheadline]');
      if (subheadlineEl && hero.subheadline) subheadlineEl.textContent = hero.subheadline;

      const primaryCtaEl = document.querySelector('[data-hero-primary-cta]');
      if (primaryCtaEl && hero.primaryCta) {
        primaryCtaEl.textContent = hero.primaryCta.text;
        primaryCtaEl.setAttribute('href', hero.primaryCta.href || '#featured-collection');
      }

      const secondaryCtaEl = document.querySelector('[data-hero-secondary-cta]');
      if (secondaryCtaEl && hero.secondaryCta) {
        const ctaTextSpan = secondaryCtaEl.querySelector('.cta-text') || secondaryCtaEl;
        ctaTextSpan.textContent = hero.secondaryCta.text;
        
        if (hero.secondaryCta.isWhatsApp) {
          const msg = hero.secondaryCta.whatsAppMessage ? encodeURIComponent(hero.secondaryCta.whatsAppMessage) : whatsappMsg;
          secondaryCtaEl.setAttribute('href', `https://wa.me/${whatsappClean}?text=${msg}`);
          secondaryCtaEl.setAttribute('target', '_blank');
          secondaryCtaEl.setAttribute('rel', 'noopener noreferrer');
        } else {
          secondaryCtaEl.setAttribute('href', hero.secondaryCta.href || '#contact');
        }
      }

      const heroImgEl = document.querySelector('[data-hero-img]');
      if (heroImgEl && hero.image) {
        heroImgEl.setAttribute('src', hero.image);
        heroImgEl.setAttribute('alt', hero.imageAlt || (config.brand ? config.brand.name : 'Boutique Collection'));
      }

      if (hero.floatingBadge) {
        const pretitle = document.querySelector('[data-hero-badge-pretitle]');
        const title = document.querySelector('[data-hero-badge-title]');
        const subtitle = document.querySelector('[data-hero-badge-subtitle]');
        if (pretitle) pretitle.textContent = hero.floatingBadge.pretitle || '';
        if (title) title.textContent = hero.floatingBadge.title || '';
        if (subtitle) subtitle.textContent = hero.floatingBadge.subtitle || '';
      }

      const featuresContainer = document.querySelector('[data-hero-features-container]');
      if (featuresContainer && Array.isArray(hero.featuresList)) {
        featuresContainer.innerHTML = '';
        hero.featuresList.forEach(featureText => {
          const li = document.createElement('li');
          li.className = 'hero-feature-item';
          li.innerHTML = `<span class="hero-feature-dot"></span> <span>${featureText}</span>`;
          featuresContainer.appendChild(li);
        });
      }
    }

    // --------------------------------------------------------------------------
    // 8. VALUE HIGHLIGHTS BAR DYNAMIC RENDERING
    // --------------------------------------------------------------------------
    const valuesContainer = document.querySelector('[data-values-container]');
    if (valuesContainer && Array.isArray(config.valueHighlights)) {
      valuesContainer.innerHTML = '';

      const iconMap = {
        scissors: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`,
        sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
        gem: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9Z"></path><path d="M11 3 8 9l4 12 4-12-3-6"></path><path d="M2 9h20"></path></svg>`,
        calendar: `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`
      };

      config.valueHighlights.forEach(val => {
        const card = document.createElement('div');
        card.className = 'value-card';
        const iconSvg = iconMap[val.icon] || iconMap.scissors;

        card.innerHTML = `
          <div class="value-icon-wrap">${iconSvg}</div>
          <h3 class="value-title">${val.title}</h3>
          <p class="value-desc">${val.description}</p>
        `;

        valuesContainer.appendChild(card);
      });
    }

    // --------------------------------------------------------------------------
    // 9. COLLECTIONS & CATEGORY SPOTLIGHT DYNAMIC RENDERING
    // --------------------------------------------------------------------------
    if (config.collectionsSection) {
      const colSec = config.collectionsSection;
      const eyebrow = document.querySelector('[data-collections-eyebrow]');
      const headline = document.querySelector('[data-collections-headline]');
      const subheadline = document.querySelector('[data-collections-subheadline]');
      
      if (eyebrow && colSec.eyebrow) eyebrow.textContent = colSec.eyebrow;
      if (headline && colSec.headline) headline.textContent = colSec.headline;
      if (subheadline && colSec.subheadline) subheadline.textContent = colSec.subheadline;
    }

    const categoriesContainer = document.querySelector('[data-categories-container]');
    if (categoriesContainer && Array.isArray(config.categories)) {
      categoriesContainer.innerHTML = '';
      const ctaLabel = (config.collectionsSection && config.collectionsSection.ctaText) || 'Explore Collection';

      config.categories.forEach(cat => {
        const card = document.createElement('a');
        card.className = 'collection-card';
        card.href = cat.link || '#featured-collection';
        card.setAttribute('aria-label', `Explore ${cat.name} Collection`);

        card.innerHTML = `
          <div class="collection-card-img-wrap">
            <img 
              src="${cat.image || 'assets/images/placeholder.svg'}" 
              alt="${cat.imageAlt || cat.name}" 
              class="collection-card-img" 
              loading="lazy"
            >
          </div>
          <div class="collection-card-overlay"></div>
          ${cat.label ? `<span class="collection-card-badge">${cat.label}</span>` : ''}
          ${cat.itemCount ? `<span class="collection-card-count">${cat.itemCount}</span>` : ''}
          <div class="collection-card-content">
            <h3 class="collection-card-title">${cat.name}</h3>
            ${cat.shortDescription ? `<p class="collection-card-desc">${cat.shortDescription}</p>` : ''}
            <span class="collection-card-cta">
              <span>${ctaLabel}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        `;

        card.addEventListener('click', (e) => {
          if (cat.link === '#featured-collection') {
            const filterBtn = document.querySelector(`.filter-btn[data-filter="${cat.id}"]`);
            if (filterBtn) {
              filterBtn.click();
            }
          }
        });

        categoriesContainer.appendChild(card);
      });
    }

    // --------------------------------------------------------------------------
    // 10. PRODUCT CATALOG & DYNAMIC CATEGORY FILTERS
    // --------------------------------------------------------------------------
    if (config.catalogSection) {
      const catSec = config.catalogSection;
      const eyebrow = document.querySelector('[data-catalog-eyebrow]');
      const headline = document.querySelector('[data-catalog-headline]');
      const subheadline = document.querySelector('[data-catalog-subheadline]');
      
      if (eyebrow && catSec.eyebrow) eyebrow.textContent = catSec.eyebrow;
      if (headline && catSec.headline) headline.textContent = catSec.headline;
      if (subheadline && catSec.subheadline) subheadline.textContent = catSec.subheadline;
    }

    const filterTabsContainer = document.querySelector('[data-catalog-filters]');
    if (filterTabsContainer && Array.isArray(config.categories)) {
      filterTabsContainer.innerHTML = '';
      
      const allLabel = (config.catalogSection && config.catalogSection.allFilterLabel) || 'All Creations';
      const allBtn = document.createElement('button');
      allBtn.className = 'filter-btn is-active';
      allBtn.setAttribute('data-filter', 'all');
      allBtn.textContent = allLabel;
      filterTabsContainer.appendChild(allBtn);

      config.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', cat.id);
        btn.textContent = cat.name;
        filterTabsContainer.appendChild(btn);
      });
    }

    const productsContainer = document.querySelector('[data-products-container]');
    if (productsContainer && Array.isArray(config.products)) {
      productsContainer.innerHTML = '';
      const currency = (config.commerce && config.commerce.currencySymbol) || '$';
      const formatPrice = (config.commerce && config.commerce.priceFormat) || ((p) => `${currency}${p.toLocaleString()}`);
      const viewDetailsText = (config.catalogSection && config.catalogSection.viewDetailsLabel) || 'View Details';
      const enquireText = (config.catalogSection && config.catalogSection.enquireWhatsAppLabel) || 'Inquire on WhatsApp';

      config.products.forEach(prod => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.setAttribute('data-product-category', prod.category);
        card.setAttribute('data-product-id', prod.id);

        const prodMsg = prod.whatsappMessage || 
          `Hello ${config.brand ? config.brand.name : 'AURA STUDIO'}! I would like to inquire about "${prod.name}" (${formatPrice(prod.price)}).`;
        const prodWhatsAppUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(prodMsg)}`;

        let badgeClass = 'badge-accent';
        if (prod.badgeType === 'new') badgeClass = 'badge-new';
        if (prod.badgeType === 'sale') badgeClass = 'badge-sale';

        card.innerHTML = `
          <div class="product-media-wrap">
            <img 
              src="${prod.image || 'assets/images/placeholder.svg'}" 
              alt="${prod.imageAlt || prod.name}" 
              class="product-img" 
              loading="lazy"
            >
            <div class="product-badge-wrap">
              ${prod.badge ? `<span class="product-badge ${badgeClass}">${prod.badge}</span>` : '<span></span>'}
              ${prod.availability ? `<span class="product-availability">${prod.availability}</span>` : ''}
            </div>
            <button class="product-quick-view-btn" data-quick-view="${prod.id}">
              ${viewDetailsText}
            </button>
          </div>

          <div class="product-info">
            <span class="product-category-tag">${prod.categoryName || prod.category}</span>
            <h3 class="product-title">${prod.name}</h3>
            <p class="product-desc">${prod.description}</p>
            
            <div class="product-price-wrap">
              <span class="product-current-price">${formatPrice(prod.price)}</span>
              ${prod.originalPrice ? `<span class="product-original-price">${formatPrice(prod.originalPrice)}</span>` : ''}
            </div>

            <div class="product-actions">
              <a href="${prodWhatsAppUrl}" target="_blank" rel="noopener noreferrer" class="btn-product-whatsapp">
                <svg viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                <span>${enquireText}</span>
              </a>
            </div>
          </div>
        `;

        productsContainer.appendChild(card);
      });
    }

    // --------------------------------------------------------------------------
    // 11. ABOUT THE ATELIER & BRAND STORY DYNAMIC RENDERING
    // --------------------------------------------------------------------------
    if (config.about) {
      const about = config.about;

      const eyebrow = document.querySelector('[data-about-eyebrow]');
      const headline = document.querySelector('[data-about-headline]');
      const image = document.querySelector('[data-about-img]');
      const sealYear = document.querySelector('[data-about-seal-year]');
      const sealText = document.querySelector('[data-about-seal-text]');
      const quoteText = document.querySelector('[data-about-quote]');
      const quoteAuthor = document.querySelector('[data-about-quote-author]');

      if (eyebrow && about.eyebrow) eyebrow.textContent = about.eyebrow;
      if (headline && about.headline) headline.textContent = about.headline;
      if (image && about.image) {
        image.setAttribute('src', about.image);
        image.setAttribute('alt', about.imageAlt || 'AURA STUDIO Boutique');
      }
      if (sealYear) sealYear.textContent = `Est. ${about.establishedYear || 2020}`;
      if (sealText) sealText.textContent = about.establishedText || 'Ready-to-Wear';
      if (quoteText && about.quote) quoteText.textContent = `“${about.quote}”`;
      if (quoteAuthor && about.quoteAuthor) quoteAuthor.textContent = `— ${about.quoteAuthor}`;

      const paragraphsContainer = document.querySelector('[data-about-paragraphs-container]');
      if (paragraphsContainer && Array.isArray(about.storyParagraphs)) {
        paragraphsContainer.innerHTML = '';
        about.storyParagraphs.forEach(pText => {
          const p = document.createElement('p');
          p.className = 'about-paragraph';
          p.textContent = pText;
          paragraphsContainer.appendChild(p);
        });
      }

      const statsContainer = document.querySelector('[data-about-stats-container]');
      if (statsContainer && Array.isArray(about.stats)) {
        statsContainer.innerHTML = '';
        about.stats.forEach(stat => {
          const div = document.createElement('div');
          div.className = 'about-stat-item';
          div.innerHTML = `
            <span class="about-stat-value">${stat.value}</span>
            <span class="about-stat-label">${stat.label}</span>
          `;
          statsContainer.appendChild(div);
        });
      }

      const primaryCta = document.querySelector('[data-about-primary-cta]');
      if (primaryCta && about.primaryCta) {
        const span = primaryCta.querySelector('.cta-text') || primaryCta;
        span.textContent = about.primaryCta.text;
        if (about.primaryCta.isWhatsApp) {
          const msg = about.primaryCta.whatsAppMessage ? encodeURIComponent(about.primaryCta.whatsAppMessage) : whatsappMsg;
          primaryCta.setAttribute('href', `https://wa.me/${whatsappClean}?text=${msg}`);
          primaryCta.setAttribute('target', '_blank');
          primaryCta.setAttribute('rel', 'noopener noreferrer');
        } else {
          primaryCta.setAttribute('href', about.primaryCta.href || '#contact');
        }
      }

      const secondaryCta = document.querySelector('[data-about-secondary-cta]');
      if (secondaryCta && about.secondaryCta) {
        secondaryCta.textContent = about.secondaryCta.text;
        secondaryCta.setAttribute('href', about.secondaryCta.href || '#collections');
      }
    }

    // --------------------------------------------------------------------------
    // 12. LOOKBOOK & EDITORIAL GALLERY DYNAMIC RENDERING
    // --------------------------------------------------------------------------
    if (config.lookbookSection) {
      const lbSec = config.lookbookSection;
      const eyebrow = document.querySelector('[data-lookbook-eyebrow]');
      const headline = document.querySelector('[data-lookbook-headline]');
      const subheadline = document.querySelector('[data-lookbook-subheadline]');

      if (eyebrow && lbSec.eyebrow) eyebrow.textContent = lbSec.eyebrow;
      if (headline && lbSec.headline) headline.textContent = lbSec.headline;
      if (subheadline && lbSec.subheadline) subheadline.textContent = lbSec.subheadline;
    }

    const lookbookItems = config.lookbook || config.gallery;
    const lookbookContainer = document.querySelector('[data-lookbook-container]');
    if (lookbookContainer && Array.isArray(lookbookItems)) {
      lookbookContainer.innerHTML = '';

      lookbookItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'lookbook-card';
        card.setAttribute('data-lookbook-index', index);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${item.title} (${item.category}) in lookbook`);

        card.innerHTML = `
          <div class="lookbook-card-media">
            <img 
              src="${item.image || 'assets/images/placeholder.svg'}" 
              alt="${item.imageAlt || item.title}" 
              class="lookbook-card-img" 
              loading="lazy"
            >
          </div>
          <div class="lookbook-card-overlay"></div>
          <div class="lookbook-card-content">
            <div class="lookbook-card-text">
              <span class="lookbook-card-cat">${item.category}</span>
              <h3 class="lookbook-card-title">${item.title}</h3>
            </div>
            <div class="lookbook-expand-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            </div>
          </div>
        `;

        lookbookContainer.appendChild(card);
      });
    }

    // --------------------------------------------------------------------------
    // 13. TESTIMONIALS / CLIENT REFLECTIONS DYNAMIC RENDERING
    // --------------------------------------------------------------------------
    if (config.testimonialsSection) {
      const tSec = config.testimonialsSection;
      const eyebrow = document.querySelector('[data-testimonials-eyebrow]');
      const headline = document.querySelector('[data-testimonials-headline]');
      const subheadline = document.querySelector('[data-testimonials-subheadline]');

      if (eyebrow && tSec.eyebrow) eyebrow.textContent = tSec.eyebrow;
      if (headline && tSec.headline) headline.textContent = tSec.headline;
      if (subheadline && tSec.subheadline) subheadline.textContent = tSec.subheadline;
    }

    const testimonialsTrack = document.querySelector('[data-testimonials-track]');
    if (testimonialsTrack && Array.isArray(config.testimonials) && config.testimonials.length > 0) {
      testimonialsTrack.innerHTML = '';

      config.testimonials.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.setAttribute('role', 'listitem');
        card.setAttribute('aria-roledescription', 'slide');
        card.setAttribute('aria-label', `Testimonial ${index + 1} of ${config.testimonials.length}: ${item.clientName}`);
        card.setAttribute('data-slide-index', index);

        // Build star rating HTML (5 stars)
        const totalStars = 5;
        const rating = typeof item.rating === 'number' ? Math.max(0, Math.min(5, item.rating)) : 0;
        const starSVG = (filled) => {
          const cls = filled ? 'testimonial-star' : 'testimonial-star is-empty';
          return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        };
        const starsHTML = Array.from({ length: totalStars }, (_, i) => starSVG(i < rating)).join('');

        // Avatar: image if provided, else initials
        const initials = item.clientName
          ? item.clientName.split(' ').map(n => n[0]).slice(0, 2).join('')
          : '?';
        const avatarInner = item.avatar
          ? `<img src="${item.avatar}" alt="${item.clientName}" loading="lazy">`
          : initials;

        // Occasion + location meta line
        const metaParts = [];
        if (item.occasion) metaParts.push(item.occasion);
        if (item.location) metaParts.push(item.location);
        const metaLine = metaParts.length > 0
          ? `<span class="testimonial-occasion-location">${metaParts.join(' &nbsp;·&nbsp; ')}</span>`
          : '';

        // Featured badge
        const featuredBadge = item.featured
          ? `<span class="testimonial-featured-badge" aria-label="Featured testimonial">
               <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
               Featured
             </span>`
          : '';

        card.innerHTML = `
          ${featuredBadge}
          <span class="testimonial-quote-mark" aria-hidden="true">&ldquo;</span>
          <p class="testimonial-quote">${item.quote || ''}</p>
          <hr class="testimonial-divider" aria-hidden="true">
          <div class="testimonial-attribution">
            <div class="testimonial-avatar" aria-hidden="true">${avatarInner}</div>
            <div class="testimonial-meta">
              <span class="testimonial-client-name">${item.clientName || 'Anonymous'}</span>
              ${metaLine}
              ${rating > 0 ? `<div class="testimonial-stars" aria-label="Rating: ${rating} out of 5 stars">${starsHTML}</div>` : ''}
            </div>
          </div>
        `;

        testimonialsTrack.appendChild(card);
      });
    }

    // --------------------------------------------------------------------------
    // 14. SOCIAL MEDIA LINKS
    // --------------------------------------------------------------------------

    if (config.socialLinks) {
      document.querySelectorAll('[data-social]').forEach(el => {
        const platform = el.getAttribute('data-social');
        const url = config.socialLinks[platform];
        if (url) {
          el.setAttribute('href', url);
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
          el.style.display = 'inline-flex';
        } else {
          el.style.display = 'none';
        }
      });
    }

    // --------------------------------------------------------------------------
    // 15. DOCUMENT TITLE
    // --------------------------------------------------------------------------

    if (config.brand && config.brand.name) {
      document.title = `${config.brand.name} | ${config.brand.tagline || 'Contemporary Ready-to-Wear'}`;
    }
  }

  // Execute on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeEngine);
  } else {
    initThemeEngine();
  }

  window.ThemeEngine = {
    refresh: initThemeEngine
  };
})();
