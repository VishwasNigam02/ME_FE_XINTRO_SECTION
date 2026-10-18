
document.addEventListener("DOMContentLoaded", () => {
  const openMenu = document.querySelector(".open-menu");
  const closeMenu = document.querySelector(".close-menu");
  const navigation = document.querySelector(".navigation");
  const overlay = document.querySelector(".overlay");

  const dropdownButtons = document.querySelectorAll(
    ".has-dropdown > .nav-link"
  );

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("nav-open", isOpen);
    overlay.classList.toggle("overlay-open", isOpen);

    navigation.setAttribute("aria-hidden", String(!isOpen));
    overlay.setAttribute("aria-hidden", String(!isOpen));
    openMenu.setAttribute("aria-expanded", String(isOpen));

    document.body.classList.toggle("menu-open", isOpen);
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
      const isOpen = !parent.classList.contains("link-open");

      document.querySelectorAll(".has-dropdown").forEach((item) => {
        item.classList.remove("link-open");

        const itemButton = item.querySelector(":scope > .nav-link");
        itemButton.classList.remove("link-open");
        itemButton.setAttribute("aria-expanded", "false");
      });

      if (isOpen) {
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

      document.querySelectorAll(".has-dropdown").forEach((item) => {
        item.classList.remove("link-open");
        const button = item.querySelector(":scope > .nav-link");
        button.classList.remove("link-open");
        button.setAttribute("aria-expanded", "false");
      });
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      setMenuOpen(false);
    }
  });
});
