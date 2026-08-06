/* ==========================================================
   Lar do Amigo — interações da página
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Navbar: sombra ao rolar ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", closeMenu)
  );

  /* ---------- Animação de revelação ao rolar ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Formulário de contato ---------- */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
    let valid = true;

    [nome, email, mensagem].forEach((field) => {
      const empty = field.value.trim() === "";
      field.classList.toggle("error", empty);
      if (empty) valid = false;
    });

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    email.classList.toggle("error", !emailOk && email.value.trim() !== "");
    if (!emailOk && email.value.trim() !== "") valid = false;

    if (valid) {
      success.hidden = false;
      form.reset();
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(() => {
        success.hidden = true;
      }, 6000);
    }
  });
});
