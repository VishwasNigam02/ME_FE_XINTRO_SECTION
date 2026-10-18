
document.addEventListener("DOMContentLoaded", () => {
  const openMenu = document.querySelector(".open-menu");
  const closeMenu = document.querySelector(".close-menu");
  const navigation = document.querySelector(".navigation");
  const overlay = document.querySelector(".overlay");

  const dropdownButtons = document.querySelectorAll(
    ".has-dropdown > .nav-link"
  );

  if (!openMenu || !closeMenu || !navigation || !overlay) {
    return;
  }

  function closeDropdowns() {
    document.querySelectorAll(".has-dropdown").forEach((item) => {
      item.classList.remove("link-open");

      const button = item.querySelector(":scope > .nav-link");

      if (button) {
        button.classList.remove("link-open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("nav-open", isOpen);
    overlay.classList.toggle("overlay-open", isOpen);

    navigation.setAttribute("aria-hidden", String(!isOpen));
    overlay.setAttribute("aria-hidden", String(!isOpen));
    openMenu.setAttribute("aria-expanded", String(isOpen));

    document.body.classList.toggle("menu-open", isOpen);

    if (!isOpen) {
      closeDropdowns();
    }
  }

  openMenu.addEventListener("click", () => {
    setMenuOpen(true);
  });

  closeMenu.addEventListener("click", () => {
    setMenuOpen(false);
  });

  overlay.addEventListener("click", () => {
    setMenuOpen(false);
  });

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const parent = button.closest(".has-dropdown");

      if (!parent) return;

      const shouldOpen = !parent.classList.contains("link-open");

      closeDropdowns();

      if (shouldOpen) {
        parent.classList.add("link-open");
        button.classList.add("link-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll(".dropdown-list a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        setMenuOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  });
});
