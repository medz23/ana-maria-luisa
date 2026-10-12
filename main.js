(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      const t = localStorage.getItem("theme");
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  applyTheme(savedTheme() || (systemDark.matches ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* private mode: the choice lasts until the page is closed */
      }
    });
  }

  systemDark.addEventListener("change", (e) => {
    if (!savedTheme()) applyTheme(e.matches ? "dark" : "light");
  });

  /* ---------- Header: phone menu + scrolled state ---------- */
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  function setMenu(open) {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".visually-hidden").textContent = open ? "Close menu" : "Menu";
  }

  toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (header.classList.contains("is-open") && !header.contains(e.target)) setMenu(false);
  });
  window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navLinks = Array.from(menu.querySelectorAll('a[href^="#"]'));
  const byId = new Map(navLinks.map((a) => [a.hash.slice(1), a]));
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) => a.removeAttribute("aria-current"));
          const link = byId.get(entry.target.id);
          if (link) link.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    byId.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  const typed = document.getElementById("typed");
  const roles = [
    "nlp researcher",
    "phd student in computer science",
    "data scientist",
    "python teacher",
    "software engineer",
  ];

  function typewriter() {
    let role = 0;
    let chars = roles[0].length;
    let deleting = true;
    const tick = () => {
      chars += deleting ? -1 : 1;
      typed.textContent = roles[role].slice(0, chars);
      let wait = deleting ? 28 : 75;
      if (deleting && chars === 0) {
        deleting = false;
        role = (role + 1) % roles.length;
        wait = 300;
      } else if (!deleting && chars === roles[role].length) {
        deleting = true;
        wait = 1800;
      }
      setTimeout(tick, wait);
    };
    setTimeout(tick, 2200);
  }

  if (typed && !reduceMotion.matches) typewriter();

  const hero = document.getElementById("top");
  const bubbles = document.getElementById("bubbles");

  if (hero && bubbles && !reduceMotion.matches) {
    const count = window.innerWidth < 600 ? 9 : 16;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const b = document.createElement("span");
      b.className = "bubble";
      const size = 14 + Math.random() * 52;
      b.style.setProperty("--size", size.toFixed(0) + "px");
      b.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
      b.style.setProperty("--dur", (11 + Math.random() * 14).toFixed(1) + "s");
      b.style.setProperty("--delay", (-Math.random() * 20).toFixed(1) + "s");
      b.style.setProperty("--drift", (Math.random() * 80 - 40).toFixed(0) + "px");
      frag.appendChild(b);
    }
    bubbles.appendChild(frag);

    const setRise = () => hero.style.setProperty("--rise", hero.offsetHeight + 180 + "px");
    setRise();
    window.addEventListener("resize", setRise, { passive: true });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        hero.classList.toggle("is-offscreen", !entry.isIntersecting);
      }).observe(hero);
    }
  }

  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));

    function select(index, focus) {
      tabs.forEach((tab, i) => {
        const on = i === index;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        if (on) {
          panels[i].classList.remove("is-entering");
          void panels[i].offsetWidth;
          panels[i].classList.add("is-entering");
        }
      });
      if (focus) tabs[index].focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(i, false));
      tab.addEventListener("keydown", (e) => {
        let next = null;
        if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
        else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = tabs.length - 1;
        if (next !== null) {
          e.preventDefault();
          select(next, true);
        }
      });
    });

    panels.forEach((p, i) => {
      p.hidden = tabs[i].getAttribute("aria-selected") !== "true";
    });
  });

  const emailMenu = document.getElementById("email-menu");
  if (emailMenu) {
    document.addEventListener("click", (e) => {
      if (emailMenu.open && !emailMenu.contains(e.target)) emailMenu.open = false;
    });
    emailMenu.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && emailMenu.open) {
        emailMenu.open = false;
        emailMenu.querySelector("summary").focus();
      }
    });
  }

  const filterGroup = document.querySelector("[data-filters]");
  const certItems = Array.from(document.querySelectorAll("#certs > li"));

  if (filterGroup) {
    filterGroup.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      const value = btn.dataset.filter;
      filterGroup.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      certItems.forEach((li) => {
        li.hidden = value !== "all" && li.dataset.group !== value;
      });
    });
  }

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCaption = document.getElementById("lightbox-caption");

  if (lightbox && typeof lightbox.showModal === "function") {
    document.getElementById("certs").addEventListener("click", (e) => {
      const card = e.target.closest(".cert");
      if (!card) return;
      const thumb = card.querySelector("img");
      lbImg.src = card.dataset.full;
      lbImg.alt = thumb.alt;
      lbCaption.textContent = card.dataset.caption;
      lightbox.showModal();
    });
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("close", () => {
      lbImg.removeAttribute("src");
    });
  } else {
    document.getElementById("certs").addEventListener("click", (e) => {
      const card = e.target.closest(".cert");
      if (card) window.open(card.dataset.full, "_blank", "noopener");
    });
  }
})();
