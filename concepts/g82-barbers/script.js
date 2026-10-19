/* G82 Barbers — small, dependency-free enhancements.
   The site still works with JavaScript off (you just lose the extras). */
(() => {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Sticky header state ---------- */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav__toggle");
  const menu = $("#nav-menu");

  const setMenu = (open) => {
    // The header sits below the concept bar until you scroll, so place the mobile menu right under it.
    if (open) menu.style.top = `${Math.round(header.getBoundingClientRect().bottom)}px`;
    menu.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    document.body.classList.toggle("no-scroll", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Highlight current section in nav ---------- */
  const navLinks = $$(".nav__links a");
  const sections = navLinks
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) =>
            a.toggleAttribute("aria-current", a.getAttribute("href") === `#${entry.target.id}`)
          );
          navLinks.forEach((a) => {
            if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "true");
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Opening hours: highlight today + live open/closed status ----------
     Hours are read from the table in index.html (data-open / data-close / data-closed),
     so you only ever edit them in one place. Times are evaluated in UK time. */
  const rows = $$("[data-hours] tr[data-day]");
  const hours = {};
  rows.forEach((row) => {
    hours[Number(row.dataset.day)] = row.hasAttribute("data-closed")
      ? null
      : { open: row.dataset.open, close: row.dataset.close };
  });

  const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const toMins = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const ukNow = () => {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(new Date());
    const get = (type) => parts.find((p) => p.type === type).value;
    return {
      day: DAY_NAMES.indexOf(get("weekday")),
      mins: (Number(get("hour")) % 24) * 60 + Number(get("minute")),
    };
  };

  const updateStatus = () => {
    if (!rows.length) return;
    const { day, mins } = ukNow();
    const today = hours[day];
    let state = "closed";
    let text;

    if (today && mins >= toMins(today.open) && mins < toMins(today.close)) {
      state = "open";
      text = `Open now · closes ${today.close}`;
    } else if (today && mins < toMins(today.open)) {
      text = `Closed · opens today at ${today.open}`;
    } else {
      for (let i = 1; i <= 7; i++) {
        const d = (day + i) % 7;
        if (hours[d]) {
          text = `Closed · opens ${i === 1 ? "tomorrow" : DAY_NAMES[d]} at ${hours[d].open}`;
          break;
        }
      }
      text = text || "Closed";
    }

    $$("[data-status]").forEach((el) => {
      el.textContent = text;
      el.dataset.state = state;
    });
    rows.forEach((row) => row.classList.toggle("is-today", Number(row.dataset.day) === day));
  };

  updateStatus();
  setInterval(updateStatus, 60 * 1000);

  /* ---------- Gallery lightbox ---------- */
  const items = $$("[data-full]");
  const lightbox = $(".lightbox");

  if (items.length && lightbox) {
    const img = $("img", lightbox);
    const caption = $("figcaption", lightbox);
    const closeBtn = $(".lightbox__close", lightbox);
    const prevBtn = $(".lightbox__prev", lightbox);
    const nextBtn = $(".lightbox__next", lightbox);
    let index = 0;
    let lastFocus = null;

    const show = (i) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      img.src = item.dataset.full;
      img.alt = item.dataset.alt || "";
      caption.textContent = item.dataset.alt || "";
    };

    const open = (i) => {
      lastFocus = document.activeElement;
      show(i);
      lightbox.classList.add("is-open");
      document.body.classList.add("no-scroll");
      closeBtn.focus();
    };

    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
      img.removeAttribute("src");
      if (lastFocus) lastFocus.focus();
    };

    items.forEach((item, i) => item.addEventListener("click", () => open(i)));
    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", () => show(index - 1));
    nextBtn.addEventListener("click", () => show(index + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
      if (e.key === "Tab") {
        // keep focus inside the dialog
        const focusable = [closeBtn, prevBtn, nextBtn];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ---------- Footer year ---------- */
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
