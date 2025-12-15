export function setTheme(theme) {
  const html = document.getElementsByTagName("html")[0];
  const oldTheme = html.getAttribute("data-theme");
  if (oldTheme) {
    html.classList.remove(oldTheme);
  }
  html.classList.add(theme);
  html.setAttribute("data-theme", theme);
}
