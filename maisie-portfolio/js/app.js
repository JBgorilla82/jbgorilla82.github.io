(function () {
  'use strict';
  var D = window.PORTFOLIO;
  var projects = D.projects;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'text') el.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) el.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function full(it) { return 'images/full/' + it.img + '.jpg'; }
  function thumb(it) { return 'images/thumb/' + it.img + '.jpg'; }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function fallback(img, src) { img.addEventListener('error', function once() { img.removeEventListener('error', once); img.src = src; }); }

  /* ---------- hero + about ---------- */
  $('#hero-lead').textContent = D.lead;
  function findItem(slug) { for (var i = 0; i < projects.length; i++) for (var j = 0; j < projects[i].items.length; j++) if (projects[i].items[j].img === slug) return projects[i].items[j]; }
  var heroPick = ['mixed-wings', 'bloom-poster', 'passenger-final-mockup'];
  var heroBox = $('#hero-art');
  heroPick.forEach(function (slug, i) {
    var it = findItem(slug); if (!it) return;
    var im = h('img', { src: 'images/full/' + slug + '.jpg', alt: '', loading: i ? 'lazy' : 'eager', decoding: 'async' });
    heroBox.appendChild(h('figure', { 'class': 'h' + (i + 1) }, [im]));
  });
  D.about.forEach(function (t) { $('#about-text').appendChild(h('p', { text: t })); });
  D.skills.forEach(function (t) { $('#skills').appendChild(h('li', { text: t })); });
  D.steps.forEach(function (s) { $('#steps').appendChild(h('li', null, [h('h4', { text: s.title }), h('p', { text: s.text })])); });

  /* ---------- nav + index ---------- */
  var navLinks = $('#nav-links');
  navLinks.appendChild(h('a', { href: '#about', text: 'About' }));
  navLinks.appendChild(h('a', { href: '#work', text: 'Work' }));
  var idx = $('#index');
  projects.forEach(function (p, i) {
    navLinks.appendChild(h('a', { href: '#' + p.id, text: p.title.split(':')[0] }));
    var cover = h('img', { src: thumb(p.items[0]), alt: '', loading: 'lazy', width: p.items[0].w, height: p.items[0].h });
    fallback(cover, full(p.items[0]));
    idx.appendChild(h('a', { href: '#' + p.id, 'data-accent': p.accent }, [
      h('div', { 'class': 'thumb' }, [cover]),
      h('div', { 'class': 'meta' }, [h('b', { text: p.title }), h('span', { text: p.items.length + ' pieces' })])
    ]));
  });

  /* ---------- projects ---------- */
  var queue = []; // every image in order, for the whole slideshow
  var host = $('#projects');
  projects.forEach(function (p, pi) {
    p.items.forEach(function (it, ii) { it._pi = pi; it._ii = ii; queue.push(it); });
    var sec = h('section', { 'class': 'project', id: p.id, 'data-accent': p.accent, 'aria-labelledby': p.id + '-h' });
    var wrap = h('div', { 'class': 'wrap' });
    var play = h('button', { type: 'button', 'class': 'btn small', text: '▶ Slideshow' });
    play.addEventListener('click', function () { openLB(pi, 0, true); });
    wrap.appendChild(h('header', { 'class': 'p-head' }, [
      h('span', { 'class': 'p-num', 'aria-hidden': 'true', text: pad(pi + 1) }),
      h('div', { 'class': 'p-title' }, [h('h2', { id: p.id + '-h', text: p.title }), h('p', { text: p.subtitle })]),
      play
    ]));
    var left = h('div', null, [h('p', { 'class': 'blurb', text: p.blurb })]);
    left.appendChild(h('ul', { 'class': 'tags' }, p.tags.map(function (t) { return h('li', { text: t }); })));
    if (p.facts && p.facts.length) left.appendChild(h('ul', { 'class': 'facts' }, p.facts.map(function (t) { return h('li', { text: t }); })));
    var right = h('aside', { 'class': 'p-notes', 'aria-label': 'In my own words' });
    if (p.quote) right.appendChild(h('div', { 'class': 'note' }, [h('h3', { text: 'In my own words' }), h('blockquote', { text: '“' + p.quote + '”' }), p.quote_src ? h('cite', { text: p.quote_src }) : null]));
    if (p.change) right.appendChild(h('div', { 'class': 'note' }, [h('h3', { text: 'What I would change' }), h('p', { text: p.change })]));
    wrap.appendChild(h('div', { 'class': 'p-body' }, [left, right]));

    var feat = h('div', { 'class': 'featured' }), rest = h('div', { 'class': 'masonry' });
    p.items.forEach(function (it, ii) {
      var isF = !!it.featured;
      var img = h('img', { src: isF ? full(it) : thumb(it), alt: it.title + '. ' + it.caption, loading: 'lazy', decoding: 'async', width: it.w, height: it.h });
      if (!isF) fallback(img, full(it));
      var btn = h('button', { type: 'button', 'aria-label': 'View larger: ' + it.title }, [img]);
      btn.addEventListener('click', function () { openLB(pi, ii, false); });
      var fig = h('figure', { 'class': 'fig' }, [btn, h('figcaption', null, [h('b', { text: it.title }), h('span', { text: it.caption })])]);
      (isF ? feat : rest).appendChild(fig);
    });
    if (feat.children.length) wrap.appendChild(feat);
    if (rest.children.length) {
      wrap.appendChild(h('h3', { 'class': 'p-sub-title', text: feat.children.length ? 'Research, sketches and more' : 'The work' }));
      wrap.appendChild(rest);
    }
    sec.appendChild(wrap); host.appendChild(sec);
  });

  /* active nav link */
  if ('IntersectionObserver' in window) {
    var links = {}; [].forEach.call(navLinks.querySelectorAll('a'), function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          for (var k in links) links[k].classList.remove('active');
          links[e.target.id].classList.add('active');
          var a = links[e.target.id];
          if (a.scrollIntoView && navLinks.scrollWidth > navLinks.clientWidth) navLinks.scrollTo({ left: a.offsetLeft - 60, behavior: 'smooth' });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    ['about'].concat(projects.map(function (p) { return p.id; })).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* ---------- lightbox / slideshow ---------- */
  var lb = $('#lb'), lbImg = $('#lb-img'), notesPanel = $('#lb-notes'), notesBtn = $('#lb-notes-btn');
  var list = [], pos = 0, lastFocus = null, notesOn = false;

  function openLB(pi, ii, wholeProject) {
    // from a project's image or slideshow button: browse that project; from the hero button: browse everything
    if (pi === -1) { list = queue.slice(); pos = 0; }
    else { list = projects[pi].items; pos = ii; }
    lastFocus = document.activeElement;
    lb.hidden = false; document.body.style.overflow = 'hidden';
    show(); $('#lb-close').focus();
  }
  function closeLB() {
    lb.hidden = true; document.body.style.overflow = '';
    if (document.fullscreenElement && document.exitFullscreen) document.exitFullscreen();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function show() {
    var it = list[pos], p = projects[it._pi];
    lbImg.src = full(it); lbImg.alt = it.title + '. ' + it.caption;
    $('#lb-title').textContent = it.title; $('#lb-cap').textContent = it.caption;
    $('#lb-proj').textContent = p.title; $('#lb-count').textContent = (pos + 1) + ' of ' + list.length;
    renderNotes(p);
    [1, -1].forEach(function (d) { var n = list[(pos + d + list.length) % list.length]; var pre = new Image(); pre.src = full(n); });
  }
  function step(d) { pos = (pos + d + list.length) % list.length; show(); }
  function renderNotes(p) {
    notesPanel.textContent = '';
    notesPanel.appendChild(h('h3', { text: p.title }));
    notesPanel.appendChild(h('p', { text: p.subtitle }));
    if (p.quote) { notesPanel.appendChild(h('h4', { text: 'In my own words' })); notesPanel.appendChild(h('blockquote', { text: '“' + p.quote + '”' })); }
    if (p.change) { notesPanel.appendChild(h('h4', { text: 'What I would change' })); notesPanel.appendChild(h('p', { text: p.change })); }
    if (p.facts && p.facts.length) { notesPanel.appendChild(h('h4', { text: 'Key points' })); notesPanel.appendChild(h('ul', null, p.facts.map(function (t) { return h('li', { text: t }); }))); }
  }
  function toggleNotes() { notesOn = !notesOn; notesPanel.hidden = !notesOn; lb.classList.toggle('notes-on', notesOn); notesBtn.setAttribute('aria-pressed', notesOn ? 'true' : 'false'); }
  function toggleFS() {
    if (document.fullscreenElement) { document.exitFullscreen && document.exitFullscreen(); }
    else if (lb.requestFullscreen) { lb.requestFullscreen().catch(function () {}); }
  }

  $('#play-all').addEventListener('click', function () { openLB(-1, 0); });
  $('#lb-close').addEventListener('click', closeLB);
  $('#lb-prev').addEventListener('click', function () { step(-1); });
  $('#lb-next').addEventListener('click', function () { step(1); });
  notesBtn.addEventListener('click', toggleNotes);
  $('#lb-fs').addEventListener('click', toggleFS);
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb-stage')) closeLB(); });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLB();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'n' || e.key === 'N') toggleNotes();
    else if (e.key === 'f' || e.key === 'F') toggleFS();
    else if (e.key === 'Tab') { // keep focus inside the viewer
      var f = [].filter.call(lb.querySelectorAll('button'), function (b) { return b.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  }, { passive: true });
})();
