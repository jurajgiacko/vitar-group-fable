/* VITAR Group — motion engine (GSAP ScrollTrigger + Lenis) */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined";

  /* ---------- helpers ---------- */
  function qs(s, c) { return (c || document).querySelector(s); }
  function qsa(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- mobile nav ---------- */
  var toggle = qs(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    qsa(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- current year ---------- */
  qsa("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- header show/hide + scrolled state ---------- */
  var header = qs(".site-header");
  var lastY = 0;
  function onScrollHeader(y) {
    if (!header) return;
    header.classList.toggle("is-scrolled", y > 16);
    if (y > 140 && y > lastY + 4 && !document.body.classList.contains("nav-open")) {
      header.classList.add("is-hidden");
    } else if (y < lastY - 4 || y <= 140) {
      header.classList.remove("is-hidden");
    }
    lastY = y;
  }

  /* ---------- reduced motion / no GSAP: static fallback ---------- */
  if (reduced || !hasGsap) {
    document.documentElement.classList.add("no-motion");
    qsa(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
    qsa(".statement .word").forEach(function (el) { el.style.opacity = 1; });
    window.addEventListener("scroll", function () { onScrollHeader(window.scrollY); }, { passive: true });
    onScrollHeader(window.scrollY);
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Lenis smooth scroll ---------- */
  var lenis = new Lenis({
    duration: 1.15,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true
  });
  lenis.on("scroll", function (e) {
    ScrollTrigger.update();
    onScrollHeader(e.scroll);
  });
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  /* anchor links through Lenis */
  qsa('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var id = a.getAttribute("href");
      if (id.length > 1 && qs(id)) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: -70 });
      }
    });
  });

  /* ---------- split words for hero/heading reveals ---------- */
  function splitWords(el) {
    var text = el.textContent;
    var nodes = [];
    el.childNodes.forEach(function (n) { nodes.push(n); });
    var frag = document.createDocumentFragment();
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          var w = document.createElement("span");
          w.className = "w";
          var inner = document.createElement("span");
          inner.textContent = part;
          w.appendChild(inner);
          frag.appendChild(w);
        });
      } else if (node.nodeType === 1) {
        var wrap = document.createElement("span");
        wrap.className = "w";
        var inner2 = document.createElement("span");
        inner2.className = node.className;
        inner2.textContent = node.textContent;
        wrap.appendChild(inner2);
        frag.appendChild(wrap);
        frag.appendChild(document.createTextNode(" "));
      }
    });
    el.textContent = "";
    el.classList.add("split-words");
    el.appendChild(frag);
    return qsa(".w > span", el);
  }

  qsa("[data-split]").forEach(function (el) {
    var spans = splitWords(el);
    gsap.set(spans, { yPercent: 110 });
    gsap.to(spans, {
      yPercent: 0,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.055,
      scrollTrigger: { trigger: el, start: "top 88%", once: true }
    });
  });

  /* ---------- hero entrance + parallax ---------- */
  var hero = qs(".hero") || qs(".page-hero");
  if (hero) {
    gsap.to(qsa(".hero-flower", hero), {
      y: function (i) { return (i + 1) * -90; },
      rotate: function (i) { return i % 2 ? -14 : 12; },
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 }
    });
    var lead = qs(".hero .lead, .page-hero .lead");
    var actions = qs(".hero-actions", hero);
    var eyebrow = qs(".eyebrow", hero);
    gsap.from([eyebrow, lead, actions].filter(Boolean), {
      opacity: 0,
      y: 26,
      duration: 1,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.35
    });
  }

  /* ---------- generic reveal ---------- */
  qsa(".reveal").forEach(function (el) {
    gsap.fromTo(el,
      { opacity: 0, y: 34 },
      {
        opacity: 1, y: 0,
        duration: 1,
        ease: "power3.out",
        delay: (parseInt(el.getAttribute("data-delay") || "0", 10)) * 0.12,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
        onStart: function () { el.classList.add("is-visible"); }
      }
    );
  });

  /* ---------- statement: word-by-word scrub ---------- */
  qsa(".statement p").forEach(function (p) {
    var words = [];
    var nodes = Array.prototype.slice.call(p.childNodes);
    var frag = document.createDocumentFragment();
    nodes.forEach(function (node) {
      var cls = node.nodeType === 1 ? node.className : "";
      String(node.textContent).split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
        var s = document.createElement("span");
        s.className = "word" + (cls ? " " + cls : "");
        s.textContent = part;
        frag.appendChild(s);
        words.push(s);
      });
    });
    p.textContent = "";
    p.appendChild(frag);
    gsap.to(words, {
      opacity: 1,
      ease: "none",
      stagger: 0.06,
      scrollTrigger: { trigger: p, start: "top 78%", end: "bottom 45%", scrub: 0.4 }
    });
  });

  /* ---------- counters (scrub to value) ---------- */
  qsa("[data-count]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
      onUpdate: function () {
        el.textContent = prefix + Math.round(obj.v) + suffix.replace(/&nbsp;/g, " ");
      }
    });
  });

  /* ---------- panels: scale-in like app cards ---------- */
  qsa(".panel, .cta-band").forEach(function (el) {
    gsap.fromTo(el,
      { scale: 0.94, y: 40 },
      {
        scale: 1, y: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", end: "top 45%", scrub: 0.5 }
      }
    );
  });

  /* ---------- stacked role cards (desktop only) ---------- */
  var stackCards = window.innerWidth > 860 ? qsa(".stack-card") : [];
  stackCards.forEach(function (card, i) {
    if (i === stackCards.length - 1) return;
    gsap.to(card, {
      scale: 0.92 + i * 0.015,
      filter: "blur(2px)",
      transformOrigin: "center top",
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top " + (110 + i * 24) + "px",
        end: "bottom top",
        scrub: 0.4
      }
    });
  });

  /* ---------- brand rail: horizontal pinned scroll ---------- */
  var rail = qs(".rail-track");
  if (rail && window.innerWidth > 760) {
    var railSection = rail.closest(".rail-section");
    var getDist = function () { return rail.scrollWidth - railSection.clientWidth + 80; };
    gsap.to(rail, {
      x: function () { return -getDist(); },
      ease: "none",
      scrollTrigger: {
        trigger: railSection,
        start: "top top",
        end: function () { return "+=" + getDist(); },
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });
  }

  /* ---------- flower mask reveal ---------- */
  var maskStage = qs(".mask-stage");
  var maskSvg = qs(".mask-over svg");
  if (maskStage && maskSvg) {
    gsap.fromTo(maskSvg,
      { scale: 1 },
      {
        scale: 14,
        ease: "power1.in",
        scrollTrigger: {
          trigger: maskStage,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.5
        }
      }
    );
    gsap.fromTo(qs(".mask-under-inner"),
      { opacity: 0, y: 60, scale: 0.96 },
      {
        opacity: 1, y: 0, scale: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: maskStage, start: "top top", end: "+=110%", scrub: 0.5 }
      }
    );
  }

  /* ---------- marquee (scroll-speed reactive) ---------- */
  qsa(".marquee-track").forEach(function (track) {
    var half = track.scrollWidth / 2;
    var tl = gsap.to(track, { x: -half, duration: 26, ease: "none", repeat: -1 });
    ScrollTrigger.create({
      onUpdate: function (self) {
        var v = Math.abs(self.getVelocity());
        gsap.to(tl, { timeScale: 1 + Math.min(v / 900, 3), duration: 0.3, overwrite: true });
      }
    });
  });

  /* ---------- parallax util: data-parallax="0.2" ---------- */
  qsa("[data-parallax]").forEach(function (el) {
    var amt = parseFloat(el.getAttribute("data-parallax")) || 0.2;
    gsap.to(el, {
      yPercent: -amt * 100,
      ease: "none",
      scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 }
    });
  });

  /* ---------- magnetic buttons ---------- */
  if (window.matchMedia("(pointer: fine)").matches) {
    qsa(".btn").forEach(function (btn) {
      var sx = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power3.out" });
      var sy = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power3.out" });
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        sx((e.clientX - r.left - r.width / 2) * 0.25);
        sy((e.clientY - r.top - r.height / 2) * 0.35);
      });
      btn.addEventListener("mouseleave", function () { sx(0); sy(0); });
    });
  }

  /* ---------- footer wordmark rise ---------- */
  var fw = qs(".footer-wordmark");
  if (fw) {
    gsap.from(fw, {
      yPercent: 30,
      opacity: 0,
      ease: "power2.out",
      scrollTrigger: { trigger: qs(".site-footer"), start: "top 85%", end: "top 45%", scrub: 0.5 }
    });
  }

  onScrollHeader(window.scrollY);
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
