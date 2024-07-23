// Get current theme and apply it to project
export function applyInitialTheme() {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode !== null && JSON.parse(savedMode)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
