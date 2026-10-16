
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

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  if (
    !openMenuButton ||
    !closeMenuButton ||
    !overlay ||
    !navigation
  ) {
    return;
  }

  function isMobile() {
    return mobileQuery.matches;
  }

  function closeDropdowns() {
    dropdownItems.forEach((item) => {
      item.classList.remove("dropdown-open");

      const button = item.querySelector(":scope > .nav-link");

      if (button) {
        button.classList.remove("link-open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function openMobileMenu() {
    body.classList.add("menu-open");

    openMenuButton.setAttribute("aria-expanded", "true");
    overlay.setAttribute("aria-hidden", "false");
    navigation.setAttribute("aria-hidden", "false");
  }

  function closeMobileMenu(returnFocus = true) {
    body.classList.remove("menu-open");

    openMenuButton.setAttribute("aria-expanded", "false");
    overlay.setAttribute("aria-hidden", "true");
    navigation.setAttribute("aria-hidden", "false");

    closeDropdowns();

    if (returnFocus && isMobile()) {
      openMenuButton.focus();
    }
  }

  // Open and close the mobile navigation
  openMenuButton.addEventListener("click", openMobileMenu);

  closeMenuButton.addEventListener("click", () => {
    closeMobileMenu();
  });

  overlay.addEventListener("click", () => {
    closeMobileMenu();
  });

  // Toggle dropdown menus on click
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const item = button.closest(".has-dropdown");
      const wasOpen = item.classList.contains("dropdown-open");

      closeDropdowns();

      if (!wasOpen) {
        item.classList.add("dropdown-open");
        button.classList.add("link-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
      closeDropdowns();
    }
  });

  // Escape closes menus
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdowns();

      if (body.classList.contains("menu-open")) {
        closeMobileMenu();
      }
    }
  });

  // Close the mobile menu after choosing a navigation link
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeDropdowns();

      if (isMobile() && body.classList.contains("menu-open")) {
        closeMobileMenu();
      }
    });
  });

  // Reset mobile navigation when switching to desktop
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
