(function () {
  const root = document.documentElement;

  // Theme
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") root.dataset.theme = stored;

  const modeBtn = document.querySelector(".mode");
  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      const next = root.dataset.theme === "light" ? "dark" : "light";
      root.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
  }

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (e) => {
      if (!links.classList.contains("is-open")) return;
      const t = e.target;
      if (!t.closest(".nav")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Articles filter/search (only on articles page)
  const grid = document.getElementById("articleGrid");
  if (grid) {
    const items = Array.from(grid.querySelectorAll(".filter-item"));
    const search = document.getElementById("articleSearch");
    const chips = Array.from(document.querySelectorAll(".chip"));

    let activeYear = "all";
    let query = "";

    function apply() {
      const q = query.trim().toLowerCase();
      for (const el of items) {
        const year = el.getAttribute("data-year");
        const text = el.getAttribute("data-text") || "";
        const okYear = activeYear === "all" || year === activeYear;
        const okText = !q || text.includes(q);
        el.style.display = (okYear && okText) ? "" : "none";
      }
    }

    if (search) {
      search.addEventListener("input", (e) => {
        query = e.target.value || "";
        apply();
      });
    }

    for (const chip of chips) {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeYear = chip.getAttribute("data-year") || "all";
        apply();
      });
    }

    apply();
  }
})();
