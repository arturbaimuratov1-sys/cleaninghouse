(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobileMenu");
  if (toggle && menu) {
    const closeMenu = (returnFocus) => {
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Открыть меню");
      if (returnFocus) toggle.focus();
    };
    toggle.addEventListener("click", () => {
      const open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
      if (open) {
        const firstLink = menu.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    });
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeMenu(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !menu.hidden) closeMenu(true);
    });
  }

  // Soft reveal on scroll (disabled under reduced motion).
  // IntersectionObserver is primary; a sweep on scroll/resize covers
  // fast jumps that leap over short sections between frames.
  const items = document.querySelectorAll(".reveal");
  const revealEls = Array.from(items);
  const revealOne = (el) => el.classList.add("visible");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(revealOne);
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            revealOne(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
    let sweepQueued = false;
    const sweep = () => {
      sweepQueued = false;
      const limit = window.scrollY + window.innerHeight * 1.1;
      revealEls.forEach((el) => {
        if (el.classList.contains("visible")) return;
        const docTop = el.getBoundingClientRect().top + window.scrollY;
        if (docTop < limit) {
          revealOne(el);
          io.unobserve(el);
        }
      });
    };
    const queueSweep = () => {
      if (!sweepQueued) {
        sweepQueued = true;
        requestAnimationFrame(sweep);
      }
    };
    window.addEventListener("scroll", queueSweep, { passive: true });
    window.addEventListener("resize", queueSweep);
    queueSweep();
  }

  // FAQ accordion (ids wired for aria-controls)
  document.querySelectorAll(".faq-item").forEach((item, i) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    const panelId = `faq-panel-${i + 1}`;
    panel.id = panelId;
    btn.setAttribute("aria-controls", panelId);
    btn.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // WhatsApp: single entry point
  const toast = document.getElementById("demoToast");
  const toastClose = document.getElementById("toastClose");
  let lastInvoker = null;
  if (toastClose) {
    toastClose.addEventListener("click", () => {
      toast.hidden = true;
      if (lastInvoker) lastInvoker.focus();
    });
  }
  function openWhatsApp(e) {
    const cfg = window.HAPPYHOME_CONFIG || {};
    const num = (cfg.WHATSAPP_NUMBER || "").replace(/\D/g, "");
    if (!num) {
      lastInvoker = e && e.currentTarget ? e.currentTarget : null;
      toast.hidden = false;
      toastClose.focus();
      return;
    }
    const text = encodeURIComponent(cfg.DEFAULT_MESSAGE || "");
    window.open(`https://wa.me/${num}?text=${text}`, "_blank", "noopener");
  }
  document.querySelectorAll("[data-whatsapp]").forEach((b) => {
    b.addEventListener("click", openWhatsApp);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !toast.hidden) {
      toast.hidden = true;
      if (lastInvoker) lastInvoker.focus();
    }
  });
})();
