
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body;
  const openMenuButton = document.querySelector(".open-menu");
  const closeMenuButton = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");
  const navigation = document.querySelector(".navigation");
  const dropdownItems = document.querySelectorAll(".has-dropdown");
  const dropdownButtons = document.querySelectorAll(
    ".has-dropdown > .nav-link"
  );

  if (
    !openMenuButton ||
    !closeMenuButton ||
    !overlay ||
    !navigation
  ) {
    return;
  }

  function isMobile() {
    return window.matchMedia("(max-width: 767px)").matches;
  }

  function closeDropdowns(exceptItem = null) {
    dropdownItems.forEach((item) => {
      if (item === exceptItem) return;

      item.classList.remove("dropdown-open");

      const button = item.querySelector(":scope > .nav-link");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeMobileMenu() {
    page.classList.remove("menu-open");
    openMenuButton.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    closeDropdowns();

    if (isMobile()) {
      openMenuButton.focus();
    }
  }

  function openMobileMenu() {
    page.classList.add("menu-open");
    openMenuButton.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
  }

  openMenuButton.addEventListener("click", openMobileMenu);
  closeMenuButton.addEventListener("click", closeMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const item = button.closest(".has-dropdown");
      const isAlreadyOpen = item.classList.contains("dropdown-open");

      closeDropdowns();

      if (!isAlreadyOpen) {
        item.classList.add("dropdown-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
      closeDropdowns();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdowns();

      if (page.classList.contains("menu-open")) {
        closeMobileMenu();
      }
    }
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeDropdowns();

      if (isMobile() && page.classList.contains("menu-open")) {
        closeMobileMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) {
      page.classList.remove("menu-open");
      openMenuButton.setAttribute("aria-expanded", "false");
      overlay.setAttribute("aria-hidden", "true");
    }

    closeDropdowns();
  });
});
