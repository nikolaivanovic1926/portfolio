const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const backdrop = document.getElementById("backdrop");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

burger.addEventListener("click", () => {
  setMenu(!document.body.classList.contains("menu-open"));
});

backdrop.addEventListener("click", () => setMenu(false));

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const links = [...menu.querySelectorAll("a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((s) => s && observer.observe(s));
