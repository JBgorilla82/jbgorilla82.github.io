/* =========================================================
   Gorilla82 Digital — site script
   ---------------------------------------------------------
   1. Fill in CONFIG below with your real links and email.
   2. Everything else works as-is on GitHub Pages.
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    // Service buttons (CV review, cover letter, etc.) open an email to this
    // address with the service name in the subject. Leave "" until you're ready.
    email: "",

    // Paste full URLs (https://...) between the quotes. While a link is empty,
    // its button shows a "Coming soon" message instead of going anywhere.
    links: {
      etsy: "",            // Etsy shop
      pod: "",             // Print-on-demand shop
      book: "",            // "Read the Full Book Online — Free"
      youtube: "",
      instagram: "",
      newsletter: "",
      techPack: "",        // Tech Help "Get Full Pack" buttons
      packFamily: "",      // Family Life Pack
      packProductivity: "",// Busy Parent Productivity Pack
      packSideHustle: "",  // Side Hustle Starter Pack
      packKids: ""         // Kids' Learning Pack
    }
  };

  /* ---------- Toast ---------- */
  var toastEl = null;
  var toastTimer = null;

  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 3200);
  }

  /* ---------- Configurable links ---------- */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = (CONFIG.links[el.getAttribute("data-link")] || "").trim();
    if (url) {
      el.setAttribute("href", url);
      if (/^https?:/i.test(url)) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    } else {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Coming soon. This link isn't live yet.");
      });
    }
  });

  /* ---------- Service order buttons ---------- */
  document.querySelectorAll("[data-service]").forEach(function (el) {
    var email = (CONFIG.email || "").trim();
    if (email) {
      var subject = el.getAttribute("data-service") + " - order";
      el.setAttribute("href", "mailto:" + email + "?subject=" + encodeURIComponent(subject));
    } else {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        toast("Ordering opens soon. Please check back shortly.");
      });
    }
  });

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function setNav(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".nav-toggle__label").textContent = open ? "Close" : "Menu";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Etsy shop filter ---------- */
  var chips = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-cat]");
  var countEl = document.getElementById("shop-count");

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var filter = chip.getAttribute("data-filter");
      var shown = 0;

      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });

      cards.forEach(function (card) {
        var cats = card.getAttribute("data-cat").split(" ");
        var show = filter === "all" || cats.indexOf(filter) > -1;
        card.hidden = !show;
        if (show) shown++;
      });

      if (countEl) {
        countEl.textContent = "Showing " + shown + " of " + cards.length + " products";
      }
    });
  });

  /* ---------- Highlight the nav link for the section in view ---------- */
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
  if (navLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    navLinks.forEach(function (link) {
      byId[link.getAttribute("href").slice(1)] = link;
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (l) { l.classList.remove("is-active"); });
          var active = byId[entry.target.id];
          if (active) active.classList.add("is-active");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
