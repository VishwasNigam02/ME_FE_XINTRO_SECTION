
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");
  const navigation = document.querySelector(".navigation");
  const dropdownButtons = document.querySelectorAll(".nav-link");
  const mobileQuery = window.matchMedia("(max-width: 600px)");

  // Open or close the mobile navigation menu
  function setMenuOpen(open) {
    body.classList.toggle("menu-open", open);

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );

    navigation.setAttribute(
      "aria-hidden",
      String(mobileQuery.matches && !open)
    );

    overlay.setAttribute("aria-hidden", String(!open));
  }

  // Close dropdowns except the currently selected dropdown
  function closeDropdowns(exceptButton = null) {
    dropdownButtons.forEach((button) => {
      if (button === exceptButton) return;

      button.classList.remove("link-open");
      button.setAttribute("aria-expanded", "false");

      const item = button.closest(".has-dropdown");
      if (item) {
        item.classList.remove("dropdown-open");
      }
    });
  }

  // Mobile menu controls
  menuToggle.addEventListener("click", () => {
    setMenuOpen(true);
  });

  closeMenu.addEventListener("click", () => {
    setMenuOpen(false);
  });

  overlay.addEventListener("click", () => {
    setMenuOpen(false);
  });

  // Dropdown navigation
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const item = button.closest(".has-dropdown");
      const willOpen = !item.classList.contains("dropdown-open");

      closeDropdowns(button);

      item.classList.toggle("dropdown-open", willOpen);
      button.classList.toggle("link-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  // Close menus after selecting a navigation link
  document
    .querySelectorAll(
      ".dropdown-link a, .plain-link, .registration a, .learn-more"
    )
    .forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdowns();

        if (mobileQuery.matches) {
          setMenuOpen(false);
        }
      });
    });

  // Close menus when Escape is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      closeDropdowns();
    }
  });

  // Keep navigation state synchronized with viewport changes
  function updateForViewport() {
    if (!mobileQuery.matches) {
      body.classList.remove("menu-open");
      navigation.setAttribute("aria-hidden", "false");
      overlay.setAttribute("aria-hidden", "true");
    } else if (!body.classList.contains("menu-open")) {
      navigation.setAttribute("aria-hidden", "true");
      overlay.setAttribute("aria-hidden", "true");
    }
  }

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", updateForViewport);
  } else {
    mobileQuery.addListener(updateForViewport);
  }

  // Initialize the correct state on page load
  updateForViewport();
});
