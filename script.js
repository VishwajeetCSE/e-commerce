// Script for navigation bar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.remove("active");
  });
}

document.addEventListener("click", (e) => {
  if (nav && nav.classList.contains("active") && !nav.contains(e.target) && bar && !bar.contains(e.target)) {
    nav.classList.remove("active");
  }
});
