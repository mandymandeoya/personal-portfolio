// Mobile menu
const menuBtn = document.getElementById("menu-btn");
const links = document.getElementById("links");
menuBtn.addEventListener("click", () => {
  menuBtn.setAttribute("aria-expanded", links.classList.toggle("open"));
});
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    links.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", false);
  }),
);

// Your Gmail address (the contact form opens Gmail with a message to this address)
const MY_EMAIL = "mandymandeoya@gmail.com";

// Contact form validation, then open Gmail compose (only on the Contact page)
const form = document.getElementById("contact-form");
if (form) {
  const msg = document.getElementById("form-msg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements.namedItem("name").value.trim();
    const email = form.elements.namedItem("email").value.trim();
    const text = form.elements.namedItem("msg").value.trim();
    if (!name || !text) {
      msg.textContent = "Please fill in your name and message.";
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      msg.textContent = "Please enter a valid email address.";
      return;
    }
    const url =
      "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(MY_EMAIL) +
      "&su=" +
      encodeURIComponent(
        form.elements.namedItem("subject").value.trim() || "Portfolio message from " + name,
      ) +
      "&body=" +
      encodeURIComponent(text + "\n\nFrom: " + name + " (" + email + ")");
    window.open(url, "_blank", "noopener");
    msg.textContent =
      "Opening Gmail, just press Send there. Thank you, " + name + "!";
    form.reset();
  });
}
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll animations: elements fade up every time they enter the screen
const targets = document.querySelectorAll(
  ".title, .sub, .card, .avatar, .about > div > p, .foot-in > div",
);
targets.forEach((el) => {
  el.classList.add("reveal");
  const i = Array.prototype.indexOf.call(el.parentElement.children, el);
  el.style.setProperty("--d", (i % 4) * 0.12 + "s");
});
const hero = document.getElementById("home");
if ("IntersectionObserver" in window) {
  // Animate every time an element enters the screen (scrolling down or up);
  // reset it once it is completely out of view so it can animate again.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.intersectionRatio >= 0.15) e.target.classList.add("in");
        else if (!e.isIntersecting) e.target.classList.remove("in");
      });
    },
    { threshold: [0, 0.15], rootMargin: "0px 0px -6% 0px" },
  );
  targets.forEach((el) => io.observe(el));

  // Home page: replay the entrance animation when you scroll back to the top
  if (hero) {
    hero.classList.add("play");
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.3) hero.classList.add("play");
          else if (!e.isIntersecting) hero.classList.remove("play");
        });
      },
      { threshold: [0, 0.3] },
    ).observe(hero);
  }
} else {
  targets.forEach((el) => el.classList.add("in"));
  if (hero) hero.classList.add("play");
}

// Back-to-top button (on every page): appears after scrolling down, returns to the top
const toTop = document.getElementById("to-top");
window.addEventListener(
  "scroll",
  () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  },
  { passive: true },
);
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
