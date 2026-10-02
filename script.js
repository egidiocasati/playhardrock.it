(function () {
  'use strict';

  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ═══════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════

  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  var mobileLinks = mobileMenu.querySelectorAll('a');
  var navLinks = document.querySelectorAll('.nav__links a');

  function closeMobile() {
    mobileMenu.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  }

  burger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  });

  mobileLinks.forEach(function (link) { link.addEventListener('click', closeMobile); });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobile();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  // ═══════════════════════════════════════════════════
  // UNIFIED SCROLL (throttled via rAF)
  // ═══════════════════════════════════════════════════

  var ticking = false;

  function onScroll() {
    var y = window.scrollY;

    // Navbar background
    nav.classList.toggle('nav--scrolled', y > 80);

    // Active link
    var current = '';
    document.querySelectorAll('section[id]').forEach(function (s) {
      if (y >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  // ═══════════════════════════════════════════════════
  // SCROLL REVEAL (IntersectionObserver)
  // ═══════════════════════════════════════════════════

  var reveals = document.querySelectorAll('.reveal');
  var observer;

  if (prefersReduced) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  } else {
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  // ═══════════════════════════════════════════════════
  // SHOWS — load from JSON, sort future/past
  // ═══════════════════════════════════════════════════

  var MONTHS = ['GEN','FEB','MAR','APR','MAG','GIU','LUG','AGO','SET','OTT','NOV','DIC'];

  function formatShowDateCompact(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return String(d.getDate()).padStart(2, '0') + '.' +
           String(d.getMonth() + 1).padStart(2, '0') + '.' +
           d.getFullYear();
  }

  function formatShowDateLong(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return String(d.getDate()).padStart(2, '0') + ' ' +
           MONTHS[d.getMonth()] + ' ' + d.getFullYear();
  }

  function renderShows(shows) {
    var container = document.getElementById('shows-container');
    var now = new Date();
    now.setHours(0, 0, 0, 0);

    var upcoming = [];
    var past = [];

    shows.forEach(function (s) {
      var d = new Date(s.date + 'T00:00:00');
      if (d >= now) { upcoming.push(s); }
      else { past.push(s); }
    });

    upcoming.sort(function (a, b) { return new Date(a.date) - new Date(b.date); });
    past.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });

    var html = '';

    function renderShowCard(s, isPast) {
      var d = new Date(s.date + 'T00:00:00');
      var day = String(d.getDate()).padStart(2, '0');
      var month = MONTHS[d.getMonth()];
      var year = d.getFullYear();
      var cls = isPast ? 'show-card show-card--past reveal' : 'show-card reveal';
      var card = '<div class="' + cls + '">';
      if (s.venueLogo) {
        card += '<div class="show-card__logo"><img src="' + s.venueLogo + '" alt="' + s.venue + '" loading="lazy" width="100" height="100"></div>';
      }
      card += '<div class="show-card__info">';
      card += '<div class="show-card__date"><span class="show-card__day">' + day + '</span><span class="show-card__month">' + month + '</span><span class="show-card__year">' + year + '</span></div>';
      card += '<div class="show-card__details">';
      if (s.venueUrl) {
        card += '<h3 class="show-card__venue"><a href="' + s.venueUrl + '" target="_blank" rel="noopener">' + s.venue + '</a></h3>';
      } else {
        card += '<h3 class="show-card__venue">' + s.venue + '</h3>';
      }
      card += '<p class="show-card__time">' + s.day + ', ore ' + s.time + '</p>';
      if (s.mapUrl && s.address) {
        card += '<p class="show-card__address"><a href="' + s.mapUrl + '" target="_blank" rel="noopener">' + s.address + ', ' + s.city + '</a></p>';
      } else {
        card += '<p class="show-card__address">' + (s.address ? s.address + ', ' : '') + s.city + '</p>';
      }
      card += '</div></div></div>';
      return card;
    }

    if (upcoming.length > 0) {
      html += '<p class="shows__label reveal">Prossime Date</p>';
      upcoming.forEach(function (s) { html += renderShowCard(s, false); });
    } else {
      html += '<p class="shows__label reveal">Live</p>';
      html += '<p class="shows__empty reveal">Nuove date in arrivo</p>';
    }

    if (past.length > 0) {
      html += '<div style="margin-top:5rem;">';
      html += '<p class="shows__past-label reveal">Date Passate</p>';
      past.forEach(function (s) { html += renderShowCard(s, true); });
      html += '</div>';
    }

    container.innerHTML = html;

    // Re-observe newly injected .reveal elements
    container.querySelectorAll('.reveal').forEach(function (el) {
      if (!prefersReduced && observer) {
        observer.observe(el);
      } else {
        el.classList.add('visible');
      }
    });
  }

  fetch('data/shows.json')
    .then(function (r) { return r.json(); })
    .then(renderShows)
    .catch(function () {
      document.getElementById('shows-container').innerHTML =
        '<p class="shows__label">Live</p><p class="shows__empty">Nuove date in arrivo</p>';
    });


  // ═══════════════════════════════════════════════════
  // YOUTUBE FACADE (click to load)
  // ═══════════════════════════════════════════════════

  var facade = document.querySelector('.video__facade');
  if (facade) {
    function loadVideo() {
      var videoId = facade.getAttribute('data-video-id');
      if (!videoId || videoId === 'YOUR_VIDEO_ID') {
        window.open('https://www.youtube.com/@playhard5157', '_blank');
        return;
      }
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('title', 'PlayHard video');
      facade.innerHTML = '';
      facade.appendChild(iframe);
      facade.style.cursor = 'default';
      facade.removeEventListener('click', loadVideo);
    }

    facade.addEventListener('click', loadVideo);
    facade.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); loadVideo(); }
    });
  }

  // ═══════════════════════════════════════════════════
  // CONTACT FORM (Formspree)
  // ═══════════════════════════════════════════════════

  var form = document.getElementById('booking-form');
  var msgEl = document.getElementById('booking-message');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(function (r) {
        if (r.ok) {
          msgEl.className = 'booking__message booking__message--success';
          msgEl.textContent = 'Messaggio inviato. Ti contatteremo presto.';
          form.reset();
        } else {
          throw new Error();
        }
      })
      .catch(function () {
        msgEl.className = 'booking__message booking__message--error';
        msgEl.textContent = 'Errore. Riprova o scrivi a booking@playhardrock.it';
      });

      setTimeout(function () {
        msgEl.className = '';
        msgEl.textContent = '';
      }, 6000);
    });
  }

  // ═══════════════════════════════════════════════════
  // COOKIE BANNER
  // ═══════════════════════════════════════════════════

  var cookieBanner = document.getElementById('cookie-banner');
  var cookieAccept = document.getElementById('cookie-accept');

  if (cookieBanner && cookieAccept) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.style.display = 'block';
    }
    cookieAccept.addEventListener('click', function () {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

})();
