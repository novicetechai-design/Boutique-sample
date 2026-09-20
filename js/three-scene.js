/**
 * ==============================================================================
 * THREE.JS LUXURY EXPERIENCES (js/three-scene.js)
 * ANY FACE CAN FIT — Contemporary 3D Fashion Web Architecture
 * 
 * Includes:
 * 1. Hero floating subtle silk & gold mote particles
 * 2. Interactive 3D Gold Silk Ribbon Sculpture (Tasteful fashion detail)
 * ==============================================================================
 */

(function () {
  'use strict';

  // Check for WebGL support and prefers-reduced-motion
  const hasWebGL = (function () {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  })();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!hasWebGL || typeof THREE === 'undefined') {
    console.warn('Three.js or WebGL not available. Graceful fallback active.');
    return;
  }

  // ----------------------------------------------------------------------------
  // 1. HERO BACKGROUND PARTICLES & SILK WISPS
  // ----------------------------------------------------------------------------
  function initHeroParticles() {
    const canvas = document.getElementById('hero-particles-canvas');
    if (!canvas) return;

    const parent = canvas.parentElement;
    let width = parent.clientWidth;
    let height = parent.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Geometry — Delicate floating gold particles & fabric motes
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      scales[i] = Math.random() * 2.2 + 0.8;
      alphas[i] = Math.random() * 0.45 + 0.15;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom circular soft particle texture
    const particleTexture = createCircleTexture();
    const material = new THREE.PointsMaterial({
      color: 0xC6A15B,
      size: 3.2,
      map: particleTexture,
      transparent: true,
      opacity: 0.45,
      blending: THREE.NormalBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse coordinates for gentle interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    window.addEventListener('mousemove', function (e) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 20;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 20;
    }, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(parent);

    function resize() {
      if (!canvas || !parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', resize);

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      if (!isVisible || prefersReducedMotion) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      particleSystem.rotation.y = elapsed * 0.03 + mouseX * 0.01;
      particleSystem.rotation.x = Math.sin(elapsed * 0.05) * 0.05 - mouseY * 0.01;

      // Gentle floating drift
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let y = posAttr.getY(i);
        y += Math.sin(elapsed * 0.8 + i) * 0.04;
        posAttr.setY(i, y);
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();
  }

  // Helper function to generate soft circle particle texture
  function createCircleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(198, 161, 91, 0.8)');
    gradient.addColorStop(0.7, 'rgba(198, 161, 91, 0.2)');
    gradient.addColorStop(1, 'rgba(198, 161, 91, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeroParticles();
    });
  } else {
    initHeroParticles();
  }

})();
