/**
 * Sleek interactive effects for Grabcode portfolio
 * - Mouse-tracking glow on hero section
 * - Tilt effect on cards
 * - Scroll-based fade-in animations
 * - Cursor spotlight effect
 * - Mosaic tile interactions
 * - Stat counter animation
 */

(function () {
  'use strict';

  /* ── Hero mouse-glow ─────────────────────────────────── */
  var heroEl = document.querySelector('[data-mouse-glow]');
  if (heroEl) {
    heroEl.addEventListener('mousemove', function (e) {
      var rect = heroEl.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      heroEl.style.setProperty('--glow-x', x + 'px');
      heroEl.style.setProperty('--glow-y', y + 'px');
    });
  }

  /* ── Card tilt on hover ──────────────────────────────── */
  var tiltEls = document.querySelectorAll('[data-tilt]');
  tiltEls.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var dx = (x - cx) / cx;
      var dy = (y - cy) / cy;

      var tiltX = dy * -4;
      var tiltY = dx * 4;

      card.style.transform =
        'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale3d(1.02,1.02,1.02)';

      // Move the inner glow to follow the cursor
      var glow = card.querySelector('.value-card-glow, .featured-card-glow, .timeline-card-glow');
      if (glow) {
        glow.style.background =
          'radial-gradient(600px circle at ' + x + 'px ' + y + 'px, rgba(88,166,255,0.12), transparent 40%)';
      }
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      var glow = card.querySelector('.value-card-glow, .featured-card-glow, .timeline-card-glow');
      if (glow) {
        glow.style.background = 'transparent';
      }
    });
  });

  /* ── Mosaic tile mouse-tracking spotlight ─────────────── */
  var mosaicTiles = document.querySelectorAll('.mosaic-tile');
  mosaicTiles.forEach(function (tile) {
    tile.addEventListener('mousemove', function (e) {
      var rect = tile.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      // Add a subtle spotlight that follows the cursor on the fog layer
      var fog = tile.querySelector('.mosaic-fog');
      if (fog) {
        fog.style.background =
          'radial-gradient(350px circle at ' + x + 'px ' + y + 'px, ' +
          'rgba(10,14,23,0.15), rgba(10,14,23,0.55) 60%)';
      }
    });

    tile.addEventListener('mouseleave', function () {
      var fog = tile.querySelector('.mosaic-fog');
      if (fog) {
        fog.style.background = '';
      }
    });
  });

  /* ── Timeline card clickability ──────────────────────── */
  var timelineCards = document.querySelectorAll('.timeline-card');
  timelineCards.forEach(function (card) {
    var link = card.querySelector('h3 a');
    if (link) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', function (e) {
        // Don't double-navigate if they clicked the actual link
        if (e.target.tagName === 'A' || e.target.closest('a')) return;
        link.click();
      });
    }
  });

  /* ── Scroll reveal ───────────────────────────────────── */
  var reveals = document.querySelectorAll(
    '.value-card, .stat-item, .featured-card, .post-item, .resource-item, .section-heading, .timeline-entry, .mosaic-tile, .git-row'
  );

  // Add reveal base class to mosaic tiles
  mosaicTiles.forEach(function (tile, i) {
    tile.style.opacity = '0';
    tile.style.transform = 'translateY(30px)';
    tile.style.transition = 'opacity 0.6s ease ' + (i * 0.1) + 's, transform 0.6s ease ' + (i * 0.1) + 's';
  });

  function checkReveal() {
    var trigger = window.innerHeight * 0.88;
    reveals.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('revealed');
        // For mosaic tiles, set inline styles since they use inline transitions
        if (el.classList.contains('mosaic-tile')) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      }
    });
  }

  window.addEventListener('scroll', checkReveal, { passive: true });
  checkReveal(); // run on load

  /* ── Theme toggle ──────────────────────────────────────── */
  var themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var html = document.documentElement;
      var current = html.getAttribute('data-theme') || 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      // Update theme-color meta
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = next === 'dark' ? '#0a0e17' : '#f8fafc';
    });
  }

  // Listen for OS-level theme changes (if user hasn't manually set a preference)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  /* ── Git Branch SVG Overlay ──────────────────────────── */
  function drawGitBranches() {
    var timeline = document.querySelector('.git-timeline');
    if (!timeline) return;

    // Remove old overlay
    var old = timeline.querySelector('.git-svg-overlay');
    if (old) old.remove();

    var rect = timeline.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'git-svg-overlay');
    svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
    svg.setAttribute('width', w);
    svg.setAttribute('height', h);

    var rows = timeline.querySelectorAll('.git-row');
    var origin = timeline.querySelector('.git-origin');

    // Find connector center X positions
    var connectors = [];
    rows.forEach(function(row) {
      var conn = row.querySelector('.git-connector');
      if (conn) {
        var cr = conn.getBoundingClientRect();
        var cx = cr.left + cr.width / 2 - rect.left;
        connectors.push({ el: conn, cx: cx, w: cr.width });
      }
    });

    if (connectors.length === 0) return;

    var mainX = connectors[0].cx - 10;
    var founderX = connectors[0].cx + 10;

    // Collect row positions
    var segments = [];
    rows.forEach(function(row, i) {
      var rr = row.getBoundingClientRect();
      var top = rr.top - rect.top;
      var bot = rr.bottom - rect.top;
      var mid = top + 24; // dot position
      var isTrunk = row.classList.contains('git-trunk');
      var isBranched = row.classList.contains('git-branched');
      var isBranchPoint = row.classList.contains('git-branch-point');
      var isMerge = row.querySelector('.git-connector-merge') !== null;
      var hasDashed = row.querySelector('.git-line-main-dashed') !== null;
      segments.push({ top: top, bot: bot, mid: mid, trunk: isTrunk, branched: isBranched, branchPoint: isBranchPoint, merge: isMerge, dashed: hasDashed });
    });

    // Helper: create SVG element
    function makeLine(x1, y1, x2, y2, color, opacity, dashed) {
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', x1); line.setAttribute('y1', y1);
      line.setAttribute('x2', x2); line.setAttribute('y2', y2);
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', '3');
      line.setAttribute('opacity', opacity || '0.6');
      if (dashed) line.setAttribute('stroke-dasharray', '6,6');
      return line;
    }
    function makeDot(cx, cy, color, pulse) {
      var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', cx); c.setAttribute('cy', cy);
      c.setAttribute('r', '6');
      c.setAttribute('fill', color);
      c.setAttribute('stroke', 'var(--bg, #0a0e17)');
      c.setAttribute('stroke-width', '2');
      if (pulse) {
        var c2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c2.setAttribute('cx', cx); c2.setAttribute('cy', cy);
        c2.setAttribute('r', '6');
        c2.setAttribute('fill', color);
        c2.setAttribute('opacity', '0.4');
        var anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        anim.setAttribute('attributeName', 'r');
        anim.setAttribute('values', '6;14;6');
        anim.setAttribute('dur', '2s');
        anim.setAttribute('repeatCount', 'indefinite');
        var anim2 = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        anim2.setAttribute('attributeName', 'opacity');
        anim2.setAttribute('values', '0.4;0;0.4');
        anim2.setAttribute('dur', '2s');
        anim2.setAttribute('repeatCount', 'indefinite');
        c2.appendChild(anim); c2.appendChild(anim2);
        svg.appendChild(c2);
      }
      return c;
    }
    function makeCurve(x1, y1, x2, y2, color, dashed) {
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var my = (y1 + y2) / 2;
      var d = 'M' + x1 + ' ' + y1 + ' C' + x1 + ' ' + my + ', ' + x2 + ' ' + my + ', ' + x2 + ' ' + y2;
      path.setAttribute('d', d);
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '3');
      path.setAttribute('fill', 'none');
      path.setAttribute('opacity', '0.6');
      if (dashed) path.setAttribute('stroke-dasharray', '6,6');
      return path;
    }

    var blue = 'var(--accent, #58a6ff)';
    var purple = 'var(--accent-purple, #a855f7)';

    // Find the first/last branched row index and the branch-point row index
    var firstBranchedIdx = -1;
    var lastBranchedIdx = -1;
    var branchPointIdx = -1;
    for (var i = 0; i < segments.length; i++) {
      if (segments[i].branched && firstBranchedIdx === -1) firstBranchedIdx = i;
      if (segments[i].branched) lastBranchedIdx = i;
      if (segments[i].branchPoint) branchPointIdx = i;
    }

    // Draw continuous lines first, then dots on top
    // Pass 1: Lines
    for (var i = 0; i < segments.length; i++) {
      var s = segments[i];
      var nextTop = (i < segments.length - 1) ? segments[i + 1].top : s.bot;
      // Connect to next row's top (no gap)
      var lineBot = nextTop;

      if (s.trunk) {
        svg.appendChild(makeLine(mainX, s.top, mainX, lineBot, blue, '0.6', false));

        // At branch point: draw curve from main dot to bottom of last branched row's founder line
        if (s.branchPoint && lastBranchedIdx >= 0) {
          var target = segments[lastBranchedIdx];
          svg.appendChild(makeCurve(mainX, s.mid, founderX, target.bot - 30, purple, false));
        }
      }

      if (s.branched) {
        // Main line (dashed if dormant)
        svg.appendChild(makeLine(mainX, s.top, mainX, lineBot, blue, s.dashed ? '0.2' : '0.6', s.dashed));
        // Founder line
        var nextBranch = segments[i+1];
        if (nextBranch?.branched) {
          console.log(nextBranch);
          svg.appendChild(makeLine(founderX, s.top, founderX, lineBot, purple, '0.6', false));
        } else {
          svg.appendChild(makeLine(founderX, s.top-62, founderX, lineBot-62, purple, '0.6', false));
        }
      }

      // Merge curve: from first branched row's founder to the merge trunk row's main
      if (s.merge && firstBranchedIdx >= 0) {
        var founderSeg = segments[firstBranchedIdx];
        svg.appendChild(makeCurve(founderX, founderSeg.top, mainX, s.bot, purple, true));
      }
    }

    // Pass 2: Dots (on top of lines)
    for (var i = 0; i < segments.length; i++) {
      var s = segments[i];

      if (s.trunk) {
        svg.appendChild(makeDot(mainX, s.mid, blue, i === 0));
      }

      if (s.branched) {
        if (!s.dashed) {
          svg.appendChild(makeDot(mainX, s.mid, blue, false));
        }
        svg.appendChild(makeDot(founderX, s.mid, purple, false));
      }
    }

    // Origin line connection
    if (origin && segments.length > 0) {
      var lastSeg = segments[segments.length - 1];
      var or = origin.getBoundingClientRect();
      var oy = or.top - rect.top + or.height / 2;
      svg.appendChild(makeLine(mainX, lastSeg.bot, mainX, oy, blue, '0.4', false));
      svg.appendChild(makeDot(mainX, oy, blue, false));
    }

    timeline.insertBefore(svg, timeline.firstChild);
  }

  drawGitBranches();
  window.addEventListener('resize', function() {
    clearTimeout(window._gitResize);
    window._gitResize = setTimeout(drawGitBranches, 200);
  });

  /* ── Mobile hamburger menu ──────────────────────────── */
  var menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      var wrap = this.closest('.wrap');
      wrap.classList.toggle('nav-open');
    });
    // Close menu when clicking a link
    document.querySelectorAll('.site-nav .trigger .page-link').forEach(function(link) {
      link.addEventListener('click', function() {
        var wrap = document.querySelector('.site-header .wrap');
        if (wrap) wrap.classList.remove('nav-open');
      });
    });
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      var wrap = document.querySelector('.site-header .wrap');
      if (wrap && wrap.classList.contains('nav-open') && !e.target.closest('.site-nav')) {
        wrap.classList.remove('nav-open');
      }
    });
  }

  /* ── Navbar shadow on scroll ─────────────────────────── */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ── Hide scroll hint after scrolling ────────────────── */
  var scrollHint = document.querySelector('.hero-scroll-hint');
  if (scrollHint) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        scrollHint.style.opacity = '0';
        scrollHint.style.pointerEvents = 'none';
      } else {
        scrollHint.style.opacity = '0.7';
        scrollHint.style.pointerEvents = '';
      }
    }, { passive: true });
  }

  /* ── Stat counter animation ──────────────────────────── */
  var statNumbers = document.querySelectorAll('.stat-number');
  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var text = el.textContent.trim();
        var suffix = text.replace(/[\d,.]/g, '');
        var num = parseInt(text.replace(/[^\d]/g, ''), 10);
        if (isNaN(num)) return;

        var duration = 1600;
        var start = performance.now();

        function tick(now) {
          var t = Math.min((now - start) / duration, 1);
          t = t * (2 - t); // ease-out quad
          var current = Math.round(t * num);
          el.textContent = current.toLocaleString() + suffix;
          if (t < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(function (el) { statObserver.observe(el); });

})();
