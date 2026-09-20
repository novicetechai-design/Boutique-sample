document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[href]');

  links.forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      
      // Ignore clicks that shouldn't transition:
      // - Empty links
      // - Anchor links (starting with #)
      // - Links meant to open in a new tab
      // - External links
      // - Email links
      if (!target || 
          target.startsWith('#') || 
          link.target === '_blank' || 
          target.startsWith('http') || 
          target.startsWith('mailto:')) {
        return;
      }
      
      // If it's a valid internal navigation, intercept it
      e.preventDefault();
      
      // Add the transition class to the body to trigger fade out
      document.body.classList.add('page-is-transitioning');
      
      // Wait for the CSS transition duration (350ms) before changing URL
      setTimeout(() => {
        window.location.href = target;
      }, 350);
    });
  });

  // Handle browser back/forward buttons seamlessly
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // If page is loaded from bfcache, remove the transitioning class so it's visible
      document.body.classList.remove('page-is-transitioning');
    }
  });
});
