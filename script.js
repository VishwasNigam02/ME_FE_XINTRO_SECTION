
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".open-menu");
  const closeMenu = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");
  const navigation = document.querySelector(".navigation");

  const dropdownButtons = document.querySelectorAll(
    ".has-dropdown > .nav-link"
  );

  const mobileQuery = window.matchMedia("(max-width: 767px)");

  function setMenuOpen(open) {
    body.classList.toggle("menu-open", open);

    menuToggle?.setAttribute("aria-expanded", String(open));
    menuToggle?.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );

    navigation?.setAttribute(
      "aria-hidden",
      String(mobileQuery.matches && !open)
    );

    overlay?.setAttribute("aria-hidden", String(!open));
  }

  function closeDropdowns(exceptButton = null) {
    dropdownButtons.forEach((button) => {
      if (button === exceptButton) return;

      button.classList.remove("link-open");
      button.setAttribute("aria-expanded", "false");

      const item = button.closest(".has-dropdown");
      item?.classList.remove("dropdown-open");
    });
  }

  // Mobile navigation controls
  menuToggle?.addEventListener("click", () => {
    setMenuOpen(true);
  });

  closeMenu?.addEventListener("click", () => {
    setMenuOpen(false);
  });

  overlay?.addEventListener("click", () => {
    setMenuOpen(false);
  });

  // Features and Company dropdowns
  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const item = button.closest(".has-dropdown");
      if (!item) return;

      const willOpen = !item.classList.contains("dropdown-open");

      closeDropdowns(button);

      item.classList.toggle("dropdown-open", willOpen);
      button.classList.toggle("link-open", willOpen);
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  // Close dropdowns after choosing a link
  document
    .querySelectorAll(".dropdown-link a, .plain-link, .learn-more")
    .forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdowns();

        if (mobileQuery.matches) {
          setMenuOpen(false);
        }
      });
    });

  // Close the mobile menu and dropdowns with Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      closeDropdowns();
    }
  });

  // Keep navigation state correct when the viewport changes
  function updateForViewport() {
    if (mobileQuery.matches) {
      const isOpen = body.classList.contains("menu-open");

      navigation?.setAttribute("aria-hidden", String(!isOpen));
      overlay?.setAttribute("aria-hidden", String(!isOpen));
    } else {
      body.classList.remove("menu-open");
      navigation?.setAttribute("aria-hidden", "false");
      overlay?.setAttribute("aria-hidden", "true");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  }

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", updateForViewport);
  } else {
    mobileQuery.addListener(updateForViewport);
  }

  updateForViewport();
});
