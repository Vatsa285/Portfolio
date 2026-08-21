document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(
    ".hero, .stats-grid, .section:not(.projects-section), .stack-section"
  );

  sections.forEach((section) => section.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));

  const root = document.documentElement;
  let pointerX = 0;
  let pointerY = 0;
  let targetX = 0;
  let targetY = 0;
  let scrollY = window.scrollY;
  let ticking = false;

  const applyParallax = () => {
    pointerX += (targetX - pointerX) * 0.08;
    pointerY += (targetY - pointerY) * 0.08;
    scrollY += (window.scrollY - scrollY) * 0.08;

    root.style.setProperty("--parallax-x", pointerX.toFixed(2));
    root.style.setProperty("--parallax-y", pointerY.toFixed(2));
    root.style.setProperty("--scroll-y", scrollY.toFixed(2));

    if (
      Math.abs(targetX - pointerX) > 0.02 ||
      Math.abs(targetY - pointerY) > 0.02 ||
      Math.abs(window.scrollY - scrollY) > 0.02
    ) {
      requestAnimationFrame(applyParallax);
    } else {
      ticking = false;
    }
  };

  window.addEventListener("pointermove", (event) => {
    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    targetX = (event.clientX / width - 0.5) * 2;
    targetY = (event.clientY / height - 0.5) * 2;

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(applyParallax);
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    },
    { passive: true }
  );

});
