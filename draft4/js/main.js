// eLux Medical - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for anchor links with header offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile-friendly parallax effect
  function initParallax() {
    const parallaxSections = document.querySelectorAll('[data-parallax]');

    if (parallaxSections.length === 0) return;

    let ticking = false;

    function updateParallax() {
      parallaxSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const sectionTop = rect.top + scrolled;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;

        // Check if section is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          // Calculate parallax offset
          const offset = (scrolled - sectionTop + windowHeight) * 0.3;
          section.style.backgroundPosition = `center ${offset}px`;
        }
      });

      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }

    // Initial call
    updateParallax();

    // Update on scroll
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', updateParallax);
  }

  // Initialize parallax
  initParallax();
});
