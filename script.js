document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const closeMenu = document.querySelector(".close-menu");
  const overlay = document.querySelector(".overlay");
  const navigation = document.querySelector(".navigation");
  const dropdownButtons = document.querySelectorAll(".nav-link");
  const mobileQuery = window.matchMedia("(max-width: 600px)");

  function setMenuOpen(open) {
    body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    navigation.setAttribute("aria-hidden", String(mobileQuery.matches && !open));
    overlay.setAttribute("aria-hidden", String(!open));
  }

  function closeDropdowns(exceptButton = null) {
    dropdownButtons.forEach((button) => {
      if (button === exceptButton) return;
      button.classList.remove("link-open");
      button.setAttribute("aria-expanded", "false");
      button.closest(".has-dropdown").classList.remove("dropdown-open");
    });
  }

  menuToggle.addEventListener("click", () => setMenuOpen(true));
  closeMenu.addEventListener("click", () => setMenuOpen(false));
  overlay.addEventListener("click", () => setMenuOpen(false));

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

  document.querySelectorAll(".dropdown-link a, .plain-link, .registration a, .learn-more").forEach((link) => {
    link.addEventListener("click", () => {
      closeDropdowns();
      if (mobileQuery.matches) setMenuOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      closeDropdowns();
    }
  });

  function updateForViewport() {
    if (!mobileQuery.matches) {
      body.classList.remove("menu-open");
      navigation.setAttribute("aria-hidden", "false");
      overlay.setAttribute("aria-hidden", "true");
    } else if (!body.classList.contains("menu-open")) {
      navigation.setAttribute("aria-hidden", "true");
    }
  }

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener("change", updateForViewport);
  } else {
    mobileQuery.addListener(updateForViewport);
  }
  updateForViewport();
});
