const fs = require("fs");

const checks = [
  ["tailwind.config.js", 'darkMode: "class"'],
  ["index.html", 'classList.add("dark")'],
  ["src/App.jsx", "page-shell"],
  ["src/context/AppContext.jsx", "toggleTheme"],
  ["src/components/ThemeToggle.jsx", "toggleTheme"],
  ["src/components/AuthFooter.jsx", "dev-mode-stripes"],
  ["src/components/Logo.jsx", "logo_dark"],
  ["src/assets/logo_dark.svg", "#E8EAEE"],
  ["src/assets/assets.js", "logo_dark"],
  ["src/components/Navbar.jsx", "<ThemeToggle />"],
  ["src/components/Navbar.jsx", "app-header"],
  ["src/components/Navbar.jsx", "<Logo"],
  ["src/components/Footer.jsx", "icon-adaptive"],
  ["src/pages/Dashboard.jsx", "<ThemeToggle />"],
  ["src/pages/Dashboard.jsx", "app-sidebar"],
  ["src/components/Hero.jsx", "hero-band"],
  ["src/components/Hero.jsx", "hero-search"],
  ["src/components/Hero.jsx", "logo-tile"],
  ["src/components/JobCard.jsx", "surface-card"],
  ["src/components/JobListing.jsx", "icon-adaptive"],
  ["src/components/AppDownload.jsx", "promo-band"],
  ["src/pages/ApplyJob.jsx", "logo-tile"],
  ["src/pages/ApplyJob.jsx", "icon-adaptive"],
  ["src/components/RecruiterLogin.jsx", "<AuthFooter />"],
  ["src/components/UserLogin.jsx", "<AuthFooter />"],
  ["src/index.css", "--surface: #171a21"],
  ["src/index.css", ".dark .icon-adaptive"],
];

let failed = 0;
for (const [file, needle] of checks) {
  let ok;
  try {
    ok = fs.readFileSync(file, "utf8").includes(needle);
  } catch {
    ok = null;
  }
  if (ok !== true) failed++;
  console.log(`${ok === null ? "NOFILE" : ok ? "OK    " : "MISS  "} ${file}  ->  ${needle}`);
}
console.log(failed === 0 ? "\nall wired" : `\n${failed} problems`);
