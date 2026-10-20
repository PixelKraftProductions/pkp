const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const shareStatus = document.querySelector(".share-status");

year.textContent = new Date().getFullYear();

const shareUrl = new URL(window.location.href);
shareUrl.hash = "";
const shareTitle = "Pixel Kraft Productions — Ideas, made delightful.";
const shareText = "Thoughtful apps and digital experiences, made for the way you live.";
const encodedShareUrl = encodeURIComponent(shareUrl.href);
const encodedShareText = encodeURIComponent(`${shareText} ${shareUrl.href}`);

document.querySelector('[data-share="whatsapp"]').href =
  `https://wa.me/?text=${encodedShareText}`;
document.querySelector('[data-share="x"]').href =
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodedShareUrl}`;
document.querySelector('[data-share="linkedin"]').href =
  `https://www.linkedin.com/sharing/share-offsite/?url=${encodedShareUrl}`;

const nativeShareButton = document.querySelector(".share-native");
if (navigator.share) nativeShareButton.hidden = false;

nativeShareButton.addEventListener("click", async () => {
  try {
    await navigator.share({ title: shareTitle, text: shareText, url: shareUrl.href });
    shareStatus.textContent = "Thanks for sharing Pixel Kraft Productions.";
  } catch (error) {
    if (!(error instanceof Error) || error.name !== "AbortError") {
      console.error("Could not share the website.", error);
      shareStatus.textContent = "Sharing failed. Try one of the other share options.";
    }
  }
});

document.querySelector(".copy-link").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.href);
    shareStatus.textContent = "Website link copied to your clipboard.";
  } catch (error) {
    console.error("Could not copy the website link.", error);
    shareStatus.textContent = "Could not copy automatically. You can copy the page URL from your browser.";
  }
});

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navLinks.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
