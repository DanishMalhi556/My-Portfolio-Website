// FOOTER YEAR
document.getElementById("year").textContent = new Date().getFullYear();

// MOBILE NAV TOGGLE
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  navToggle.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// HERO TERMINAL TYPING EFFECT
const codeLines = [
  "const developer = {",
  "  name: 'Danish Malhi',",
  "  role: 'Full-Stack Developer',",
  "  stack: ['Node.js', 'Express', 'C++', 'Python'],",
  "  currentProject: 'SpaceAR',",
  "  status: 'open_to_work',",
  "};",
];

const typedCodeEl = document.getElementById("typedCode");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function typeTerminal() {
  if (prefersReducedMotion) {
    typedCodeEl.textContent = codeLines.join("\n");
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let output = "";

  function typeChar() {
    if (lineIndex >= codeLines.length) return;

    const currentLine = codeLines[lineIndex];

    if (charIndex < currentLine.length) {
      output += currentLine[charIndex];
      charIndex++;
      typedCodeEl.textContent = output;
      setTimeout(typeChar, 18 + Math.random() * 25);
    } else {
      output += "\n";
      lineIndex++;
      charIndex = 0;
      typedCodeEl.textContent = output;
      setTimeout(typeChar, 120);
    }
  }

  typeChar();
}

typeTerminal();

// STICKY NAV SHADOW ON SCROLL

const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    nav.style.boxShadow = "0 8px 24px -12px rgba(0,0,0,0.5)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// ===================================================
// CONTACT FORM VALIDATION
// (No backend attached yet — swap the fetch() block below
//  for a real endpoint or form service like Formspree when ready.)
// ===================================================
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + "Error");
  field.classList.toggle("invalid", Boolean(message));
  errorEl.textContent = message || "";
}

function validateForm(data) {
  let valid = true;

  if (!data.name.trim()) {
    setError("name", "Please enter your name.");
    valid = false;
  } else {
    setError("name", "");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(data.email.trim())) {
    setError("email", "Enter a valid email address.");
    valid = false;
  } else {
    setError("email", "");
  }

  if (!data.message.trim() || data.message.trim().length < 10) {
    setError("message", "Message should be at least 10 characters.");
    valid = false;
  } else {
    setError("message", "");
  }

  return valid;
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  if (!validateForm(data)) {
    formNote.textContent = "";
    return;
  }

  // No backend is wired up yet, so this just confirms locally.
  // To actually receive messages, connect this form to something like
  // Formspree, EmailJS, or your own backend endpoint.
  formNote.textContent =
    "Thanks — this form isn't connected to a backend yet, so nothing was sent. Email me directly for now.";
  contactForm.reset();
});
