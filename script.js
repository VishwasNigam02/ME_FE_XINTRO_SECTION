
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

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

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  function isMobile() {
    return mobileQuery.matches;
  }

  function closeDropdowns(exceptItem = null) {
    dropdownItems.forEach((item) => {
      if (item === exceptItem) {
        return;
      }

      item.classList.remove("dropdown-open");

      const button = item.querySelector(":scope > .nav-link");

      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function openMobileMenu() {
    body.classList.add("menu-open");

    openMenuButton.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    navigation.setAttribute("aria-hidden", "false");

    closeMenuButton.focus();
  }

  function closeMobileMenu(returnFocus = true) {
    body.classList.remove("menu-open");

    openMenuButton.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    navigation.setAttribute("aria-hidden", "true");

    closeDropdowns();

    if (returnFocus && isMobile()) {
      openMenuButton.focus();
    }
  }

  // Mobile menu controls
  openMenuButton.addEventListener("click", openMobileMenu);

  closeMenuButton.addEventListener("click", () => {
    closeMobileMenu();
  });

  overlay.addEventListener("click", () => {
    closeMobileMenu();
  });

  // Dropdown controls: click, not hover
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const item = button.closest(".has-dropdown");
      const isOpen = item.classList.contains("dropdown-open");

      closeDropdowns();

      if (!isOpen) {
        item.classList.add("dropdown-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close dropdowns when clicking elsewhere
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
      closeDropdowns();
    }
  });

  // Escape key closes dropdowns and mobile navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdowns();

      if (body.classList.contains("menu-open")) {
        closeMobileMenu();
      }
    }
  });

  // Close the mobile menu when a navigation link is selected
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeDropdowns();

      if (isMobile() && body.classList.contains("menu-open")) {
        closeMobileMenu();
      }
    });
  });

  // Reset mobile-only state when switching to desktop
  function handleViewportChange() {
    closeDropdowns();

    if (!isMobile()) {
      closeMobileMenu(false);
    }
  }

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", handleViewportChange);
  } else {
    window.addEventListener("resize", handleViewportChange);
  }
});
