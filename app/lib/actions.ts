// Small cross-component actions shared by the navbar, terminal and command palette.

export const PROJECT_EVENT = "portfolio:show-project";
export const PALETTE_EVENT = "portfolio:open-palette";

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** Scrolls to the projects showcase and brings the given project into view. */
export function showProject(projectId: string) {
  window.dispatchEvent(new CustomEvent(PROJECT_EVENT, { detail: projectId }));
  scrollToSection("projects");
}

export function openPalette() {
  window.dispatchEvent(new Event(PALETTE_EVENT));
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
