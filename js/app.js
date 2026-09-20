/**
 * ==============================================================================
 * APPLICATION CONTROLLER (app.js)
 * ==============================================================================
 * Manages interactive behaviors:
 * 1. Accessible Mobile Navigation Drawer (ARIA, Escape key, body scroll lock)
 * 2. Sticky Header scroll transitions
 * 3. Active navigation highlight on scroll
 * 4. Smooth anchor scroll handling
 * 5. Dynamic Category Filter Tabs for the Product Catalog
 * 6. Product Quick-View Details Modal
 * 7. Accessible Full-Screen Lookbook Lightbox (Prev/Next, Keys, ARIA, Scroll Lock)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----------------------------------------------------------------------------
  // 1. STICKY HEADER SCROLL TRANSITION
  // ----------------------------------------------------------------------------
  const siteHeader = document.querySelector('.site-header');
  
  function handleHeaderScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 30) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ----------------------------------------------------------------------------
  // 2. ACCESSIBLE MOBILE NAVIGATION DRAWER
  // ----------------------------------------------------------------------------
  const menuToggleBtn = document.querySelector('.menu-toggle-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  function openDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.add('is-active');
    drawerBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (menuToggleBtn) menuToggleBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (drawerCloseBtn) drawerCloseBtn.focus();
  }

  function closeDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.remove('is-active');
    drawerBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
    if (menuToggleBtn) {
      menuToggleBtn.setAttribute('aria-expanded', 'false');
      menuToggleBtn.focus();
    }
    mobileDrawer.setAttribute('aria-hidden', 'true');
  }

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-active');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      const clickedLink = e.target.closest('a');
      if (clickedLink) {
        closeDrawer();
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 3. CATEGORY FILTER TABS (CATALOG)
  // ----------------------------------------------------------------------------
  const filterContainer = document.querySelector('[data-catalog-filters]');
  
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filterValue = btn.getAttribute('data-filter');
      const productCards = document.querySelectorAll('.product-card');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-product-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 4. PRODUCT QUICK-VIEW DETAILS MODAL
  // ----------------------------------------------------------------------------
  const modalBackdrop = document.querySelector('.product-modal-backdrop');
  const modalCloseBtn = document.querySelector('.product-modal-close');
  const modalMedia = document.querySelector('[data-modal-img]');
  const modalCategory = document.querySelector('[data-modal-category]');
  const modalTitle = document.querySelector('[data-modal-title]');
  const modalPrice = document.querySelector('[data-modal-price]');
  const modalDesc = document.querySelector('[data-modal-desc]');
  const modalFabrics = document.querySelector('[data-modal-fabrics]');
  const modalSizes = document.querySelector('[data-modal-sizes]');
  const modalWhatsAppBtn = document.querySelector('[data-modal-whatsapp]');

  function openProductModal(productId) {
    if (!window.SITE_CONFIG || !window.SITE_CONFIG.products) return;
    const prod = window.SITE_CONFIG.products.find(p => p.id === productId);
    if (!prod || !modalBackdrop) return;

    const currency = (window.SITE_CONFIG.commerce && window.SITE_CONFIG.commerce.currencySymbol) || '$';
    const formatPrice = (window.SITE_CONFIG.commerce && window.SITE_CONFIG.commerce.priceFormat) || ((p) => `${currency}${p.toLocaleString()}`);
    const whatsappClean = (window.SITE_CONFIG.contact && window.SITE_CONFIG.contact.whatsappNumber) ? window.SITE_CONFIG.contact.whatsappNumber.replace(/\D/g, '') : '';
    
    if (modalMedia) {
      modalMedia.setAttribute('src', prod.image || 'assets/images/placeholder.svg');
      modalMedia.setAttribute('alt', prod.imageAlt || prod.name);
    }
    if (modalCategory) modalCategory.textContent = prod.categoryName || prod.category;
    if (modalTitle) modalTitle.textContent = prod.name;
    if (modalPrice) modalPrice.textContent = formatPrice(prod.price);
    if (modalDesc) modalDesc.textContent = prod.description;
    if (modalFabrics) modalFabrics.textContent = prod.fabrics || '100% Responsibly sourced natural textiles';
    if (modalSizes) modalSizes.textContent = prod.sizes ? prod.sizes.join(' • ') : 'Standard Sizing';

    if (modalWhatsAppBtn) {
      const prodMsg = prod.whatsappMessage || `Hello! I would like to inquire about "${prod.name}" (${formatPrice(prod.price)}).`;
      modalWhatsAppBtn.setAttribute('href', `https://wa.me/${whatsappClean}?text=${encodeURIComponent(prodMsg)}`);
    }

    modalBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeProductModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const quickViewBtn = e.target.closest('[data-quick-view]');
    if (quickViewBtn) {
      const productId = quickViewBtn.getAttribute('data-quick-view');
      openProductModal(productId);
    }
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProductModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProductModal();
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 5. ACCESSIBLE FULL-SCREEN LOOKBOOK LIGHTBOX
  // ----------------------------------------------------------------------------
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
  const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');
  const lightboxPrevBtn = document.querySelector('.lightbox-prev');
  const lightboxNextBtn = document.querySelector('.lightbox-next');
  const lightboxImg = document.querySelector('[data-lightbox-img]');
  const lightboxTitle = document.querySelector('[data-lightbox-title]');
  const lightboxCat = document.querySelector('[data-lightbox-cat]');
  const lightboxDesc = document.querySelector('[data-lightbox-desc]');
  const lightboxCounter = document.querySelector('[data-lightbox-counter]');

  let currentLookbookIndex = 0;

  function getLookbookItems() {
    if (!window.SITE_CONFIG) return [];
    return window.SITE_CONFIG.lookbook || window.SITE_CONFIG.gallery || [];
  }

  function renderLightboxItem(index) {
    const items = getLookbookItems();
    if (!items || items.length === 0) return;

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentLookbookIndex = index;

    const item = items[index];

    if (lightboxImg) {
      lightboxImg.setAttribute('src', item.image || 'assets/images/placeholder.svg');
      lightboxImg.setAttribute('alt', item.imageAlt || item.title);
    }
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxCat) lightboxCat.textContent = item.category;
    if (lightboxDesc) lightboxDesc.textContent = item.description || '';
    if (lightboxCounter) lightboxCounter.textContent = `${index + 1} / ${items.length}`;
  }

  function openLightbox(index) {
    if (!lightboxBackdrop) return;
    renderLightboxItem(index);
    lightboxBackdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (lightboxCloseBtn) lightboxCloseBtn.focus();
  }

  function closeLightbox() {
    if (!lightboxBackdrop) return;
    lightboxBackdrop.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function nextLightboxItem() {
    renderLightboxItem(currentLookbookIndex + 1);
  }

  function prevLightboxItem() {
    renderLightboxItem(currentLookbookIndex - 1);
  }

  // Lookbook item click & key delegation
  document.addEventListener('click', (e) => {
    const lookCard = e.target.closest('.lookbook-card');
    if (lookCard) {
      const index = parseInt(lookCard.getAttribute('data-lookbook-index'), 10) || 0;
      openLightbox(index);
    }
  });

  document.addEventListener('keydown', (e) => {
    // Check if Lookbook Card has focus and user pressed Enter or Space
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement && document.activeElement.classList.contains('lookbook-card')) {
      e.preventDefault();
      const index = parseInt(document.activeElement.getAttribute('data-lookbook-index'), 10) || 0;
      openLightbox(index);
      return;
    }

    // Lightbox keyboard shortcuts
    if (lightboxBackdrop && lightboxBackdrop.classList.contains('is-active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightboxItem();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxItem();
      }
    } else if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('is-active')) {
        closeDrawer();
      }
      if (modalBackdrop && modalBackdrop.classList.contains('is-active')) {
        closeProductModal();
      }
    }
  });

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightboxItem);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightboxItem);
  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (e) => {
      if (e.target === lightboxBackdrop) {
        closeLightbox();
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 6. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
  // ----------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id], header[id]');

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  // ----------------------------------------------------------------------------
  // 7. SMOOTH SCROLLING FOR INTERNAL ANCHORS
  // ----------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = siteHeader ? siteHeader.offsetHeight + 10 : 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  // ----------------------------------------------------------------------------
  // 8. TESTIMONIALS CAROUSEL CONTROLLER
  // ----------------------------------------------------------------------------
  const testimonialsCarouselWrap = document.querySelector('[data-testimonials-carousel]');
  const testimonialsTrackEl = document.querySelector('[data-testimonials-track]');
  const testimonialsPrevBtn = document.querySelector('.testimonials-prev-btn');
  const testimonialsNextBtn = document.querySelector('.testimonials-next-btn');
  const testimonialsDotsContainer = document.querySelector('[data-testimonials-dots]');

  if (testimonialsTrackEl && testimonialsCarouselWrap) {
    let currentSlide = 0;
    let totalSlides = 0;
    let isAnimating = false;

    // Wait for theme.js to finish rendering slides before initialising
    function initTestimonialsCarousel() {
      const slides = testimonialsTrackEl.querySelectorAll('.testimonial-card');
      totalSlides = slides.length;

      if (totalSlides === 0) return;

      // Build dot buttons
      if (testimonialsDotsContainer) {
        testimonialsDotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
          const dot = document.createElement('button');
          dot.className = `testimonials-dot-btn${i === 0 ? ' is-active' : ''}`;
          dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
          dot.setAttribute('data-dot-index', i);
          dot.addEventListener('click', () => goToSlide(i));
          testimonialsDotsContainer.appendChild(dot);
        }
      }

      // Set initial position
      updateCarousel(false);
    }

    function goToSlide(index) {
      if (isAnimating) return;
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentSlide = index;
      updateCarousel(true);
    }

    function updateCarousel(animate = true) {
      if (animate) {
        isAnimating = true;
      }

      // Slide the track
      testimonialsTrackEl.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update dots
      if (testimonialsDotsContainer) {
        testimonialsDotsContainer.querySelectorAll('.testimonials-dot-btn').forEach((dot, i) => {
          const isActive = i === currentSlide;
          dot.classList.toggle('is-active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      // Prevent rapid firing — reset after transition completes (~650ms)
      if (animate) {
        setTimeout(() => { isAnimating = false; }, 700);
      }
    }

    // Prev / Next button listeners
    if (testimonialsPrevBtn) {
      testimonialsPrevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    if (testimonialsNextBtn) {
      testimonialsNextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }

    // Keyboard arrow navigation when focus is inside the carousel
    testimonialsCarouselWrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      }
    });

    // Touch / Swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

    testimonialsTrackEl.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
    }, { passive: true });

    testimonialsTrackEl.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      isDragging = false;

      // Only trigger horizontal swipe if dominant axis
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) {
          goToSlide(currentSlide + 1); // swipe left → next
        } else {
          goToSlide(currentSlide - 1); // swipe right → prev
        }
      }
    }, { passive: true });

    testimonialsTrackEl.addEventListener('touchcancel', () => {
      isDragging = false;
    }, { passive: true });

    // IntersectionObserver — entrance animation
    if ('IntersectionObserver' in window) {
      const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            testimonialsCarouselWrap.classList.add('is-visible');
            carouselObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      carouselObserver.observe(testimonialsCarouselWrap);
    } else {
      // Fallback: immediately show
      testimonialsCarouselWrap.classList.add('is-visible');
    }

    // Initialise after theme.js has rendered slides
    // theme.js runs synchronously on DOMContentLoaded so slides are ready here
    initTestimonialsCarousel();
  }

});
